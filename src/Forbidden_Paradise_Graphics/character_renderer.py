import os
import tkinter as tk
from tkinter import ttk
from PIL import Image, ImageTk
from .characters import LilySports, LilyUrban
from .characters.character import Grabber, Arms, Legs, CrotchRope, Collar, Mouth, Eyes, Nipples, Mummified

IMAGES = ".\\img\\pictures\\characters"

def list_characters():
    """Returns a list of available character directories."""
    return ["lily_sports", "lily_urban"]

class CharacterEditor:
    def __init__(self, root):
        self.root = root
        self.root.title("Character Editor")
        self.root.geometry("800x600")
        self.root.minsize(400, 300)

        self.character_map = {
            "lily_sports": LilySports,
            "lily_urban": LilyUrban,
        }
        self.active_character = None
        self.original_pil_image = None

        # --- Layout ---
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.pack(fill=tk.BOTH, expand=True)

        # Configure grid layout
        main_frame.columnconfigure(1, weight=1)
        main_frame.rowconfigure(0, weight=1)

        # Left panel for character list
        left_panel = ttk.Frame(main_frame, width=200)
        left_panel.grid(row=0, column=0, sticky="ns", padx=(0, 10))

        # Center panel for image display
        self.image_panel = ttk.Label(main_frame, background="#333333")
        self.image_panel.grid(row=0, column=1, sticky="nsew")

        # Right panel for controls
        right_panel = ttk.Frame(main_frame, width=200)
        right_panel.grid(row=0, column=2, sticky="ns", padx=(10, 0))
        right_panel.columnconfigure(0, weight=1)

        # --- Widgets ---
        # Character List
        ttk.Label(left_panel, text="Characters", font=("Arial", 12, "bold")).pack(anchor="w", pady=(0, 5))
        self.char_listbox = tk.Listbox(left_panel, exportselection=False)
        for char_name in list_characters():
            self.char_listbox.insert(tk.END, char_name)
        self.char_listbox.pack(fill=tk.Y, expand=True, anchor="n", side="left")
        self.char_listbox.bind("<<ListboxSelect>>", self.on_character_select)

        # Controls
        ttk.Label(right_panel, text="Controls", font=("Arial", 12, "bold")).grid(row=0, column=0, sticky="ew", pady=(0, 10))

        # Scaling Options
        ttk.Label(right_panel, text="View Options:").grid(row=1, column=0, sticky="w")
        self.scaling_mode = tk.StringVar(value="Fit in Frame")
        scaling_options = ["Fit in Frame", "Fit to Width", "Original Size"]
        scale_dropdown = ttk.Combobox(right_panel, textvariable=self.scaling_mode, values=scaling_options, state="readonly")
        scale_dropdown.grid(row=2, column=0, sticky="ew", pady=(0, 10))
        scale_dropdown.bind("<<ComboboxSelected>>", self.update_image_display)

        # Bind resize event
        self.image_panel.bind("<Configure>", self.update_image_display)

    def on_character_select(self, event):
        selection_indices = self.char_listbox.curselection()
        if not selection_indices:
            return
        selected_name = self.char_listbox.get(selection_indices[0])
        character_class = self.character_map.get(selected_name)
        if character_class:
            self.active_character = character_class()
            self.render_character()

    def render_character(self):
        if not self.active_character:
            return

        if isinstance(self.active_character, LilySports):
            self.active_character.hasBra = False
            self.active_character.hasPanties = False
            self.active_character.crotchRopeMaterial = CrotchRope.ROPE
            self.active_character.mouthMaterial = Mouth.BALL
        elif isinstance(self.active_character, LilyUrban):
            self.active_character.hasOuter = True
            self.active_character.hasInner = True
            self.active_character.mouthMaterial = Mouth.CLOTH
            self.active_character.hasDrool = True

        self.active_character.build_layers()
        self.original_pil_image = self.active_character.render()
        self.update_image_display()

    def update_image_display(self, event=None):
        if not self.original_pil_image:
            return

        panel_width = self.image_panel.winfo_width()
        panel_height = self.image_panel.winfo_height()

        if panel_width <= 1 or panel_height <= 1:
            return

        img = self.original_pil_image
        img_width, img_height = img.size
        mode = self.scaling_mode.get()

        if mode == "Original Size":
            new_size = (img_width, img_height)
        elif mode == "Fit to Width":
            ratio = panel_width / img_width
            new_size = (panel_width, int(img_height * ratio))
        else: # Fit in Frame
            w_ratio = panel_width / img_width
            h_ratio = panel_height / img_height
            ratio = min(w_ratio, h_ratio)
            new_size = (int(img_width * ratio), int(img_height * ratio))

        resized_pil = img.resize(new_size, Image.Resampling.LANCZOS)
        tk_image = ImageTk.PhotoImage(resized_pil)
        self.image_panel.configure(image=tk_image)
        self.image_panel.image = tk_image

def launch_character_editor():
    root = tk.Tk()
    app = CharacterEditor(root)
    # Lift the window to the front and give it focus.
    root.lift()
    root.attributes('-topmost', True)
    root.after_idle(root.attributes, '-topmost', False)
    root.focus_force()
    root.mainloop()

if __name__ == "__main__":
    launch_character_editor()
