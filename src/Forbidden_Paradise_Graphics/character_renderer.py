import os
import tkinter as tk
from tkinter import ttk, filedialog
from PIL import Image, ImageTk
from .characters import LilySports, LilyUrban
from .characters.character import Arms, Collar, CrotchRope, Eyes, Grabber, Intimate, Legs, Mittens, Mouth, Mummified, Nipples

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
        self.original_image = None
        self.property_vars = {}

        self.enum_map = {
            "mummifiedMaterial": Mummified,
            "mouthMaterial": Mouth,
            "eyesMaterial": Eyes,
            "collarMaterial": Collar,
            "armsMaterial": Arms,
            "mittensMaterial": Mittens,
            "nippleMaterial": Nipples,
            "legsMaterial": Legs,
            "crotchRopeMaterial": CrotchRope,
            "intimateMaterial": Intimate,
            "grabberConfig": Grabber,
        }

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
        right_panel.rowconfigure(1, weight=1)

        # --- Widgets ---
        # Character List
        ttk.Label(left_panel, text="Characters", font=("Arial", 12, "bold")).pack(anchor="w", pady=(0, 5))
        self.char_listbox = tk.Listbox(left_panel, exportselection=False)
        for char_name in list_characters():
            self.char_listbox.insert(tk.END, char_name)
        self.char_listbox.pack(fill=tk.Y, expand=True, anchor="n", side="left")
        self.char_listbox.bind("<<ListboxSelect>>", self.on_character_select)

        # Controls
        controls_frame = ttk.LabelFrame(right_panel, text="Controls")
        controls_frame.grid(row=0, column=0, sticky="ew", pady=(0, 10))

        # Properties
        self.properties_frame = ttk.LabelFrame(right_panel, text="Properties")
        self.properties_frame.grid(row=1, column=0, sticky="nsew")

        # Scaling Options
        ttk.Label(controls_frame, text="View Options:").grid(row=0, column=0, sticky="w")
        self.scaling_mode = tk.StringVar(value="Fit in Frame")
        scaling_options = ["Fit in Frame", "Fit to Width", "Original Size"]
        scale_dropdown = ttk.Combobox(controls_frame, textvariable=self.scaling_mode, values=scaling_options, state="readonly")
        scale_dropdown.grid(row=1, column=0, sticky="ew", pady=(0, 10))
        scale_dropdown.bind("<<ComboboxSelected>>", self.update_image_display)

        # Bind resize event
        self.image_panel.bind("<Configure>", self.update_image_display)

        # Save Button
        save_button = ttk.Button(controls_frame, text="Save Image", command=self.save_image)
        save_button.grid(row=2, column=0, sticky="ew", pady=(10, 0))

    def on_character_select(self, event):
        selection_indices = self.char_listbox.curselection()
        if not selection_indices:
            return
        selected_name = self.char_listbox.get(selection_indices[0])
        character_class = self.character_map.get(selected_name)
        if character_class:
            self.active_character = character_class()
            self.update_properties_panel()
            self.render_character()

    def update_properties_panel(self):
        # --- Clean up previous widgets and variables ---
        for widget in self.properties_frame.winfo_children():
            widget.destroy()
        self.property_vars = {}

        if not self.active_character:
            return

        # --- Create a scrollable frame ---
        canvas = tk.Canvas(self.properties_frame)
        scrollbar = ttk.Scrollbar(self.properties_frame, orient="vertical", command=canvas.yview)
        scrollable_frame = ttk.Frame(canvas)

        scrollable_frame.bind(
            "<Configure>",
            lambda e: canvas.configure(scrollregion=canvas.bbox("all"))
        )

        canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
        canvas.configure(yscrollcommand=scrollbar.set)

        # --- Populate the scrollable frame with property editors ---
        properties = self.active_character.get_used_properties()

        for prop_name in properties:
            prop_frame = ttk.Frame(scrollable_frame)
            prop_frame.pack(fill="x", pady=2, padx=5)

            label = ttk.Label(prop_frame, text=prop_name, width=20)
            label.pack(side="left")

            prop_attr = getattr(self.active_character, prop_name)
            is_callable = callable(prop_attr)
            actual_value = prop_attr() if is_callable else prop_attr

            # --- Define a generic setter that re-renders ---
            def create_setter(p_name, var, is_callable=False, is_enum=False, enum_type=None):
                def setter(*args):
                    print(p_name)
                    new_value = var.get()
                    print(new_value)
                    if is_enum and enum_type:
                        setattr(self.active_character, p_name, enum_type(new_value))
                    # elif is_callable:
                    #     # For callable properties (like isGrounded), we need to wrap the new value in a lambda
                    #     # to maintain the callable interface of the property.
                    #     setattr(self.active_character, p_name, lambda: new_value)
                    else:
                        setattr(self.active_character, p_name, new_value)
                    self.render_character()
                return setter

            # --- Create editor widgets and store their variables ---
            if prop_name in self.enum_map:
                enum_type = self.enum_map[prop_name]
                options = [e.value for e in enum_type]
                var = tk.StringVar(value=str(actual_value))
                self.property_vars[prop_name] = var
                setter_callback = create_setter(prop_name, var, is_enum=True, enum_type=enum_type)
                option_menu = ttk.OptionMenu(prop_frame, var, str(actual_value), *options, command=setter_callback)
                option_menu.pack(side="left")
            elif isinstance(actual_value, bool):
                var = tk.BooleanVar(value=actual_value)
                self.property_vars[prop_name] = var
                setter_callback = create_setter(prop_name, var, is_callable)
                check = ttk.Checkbutton(prop_frame, variable=var, command=setter_callback)
                check.pack(side="left")
            elif isinstance(actual_value, int):
                var = tk.IntVar(value=actual_value)
                self.property_vars[prop_name] = var
                entry = ttk.Entry(prop_frame, textvariable=var)
                entry.bind("<FocusOut>", create_setter(prop_name, var, is_callable))
                entry.pack(side="left")
            elif isinstance(actual_value, str):
                var = tk.StringVar(value=actual_value)
                self.property_vars[prop_name] = var
                entry = ttk.Entry(prop_frame, textvariable=var)
                entry.bind("<FocusOut>", create_setter(prop_name, var))
                entry.pack(side="left")

        # --- Pack the canvas and scrollbar ---
        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

    def render_character(self):
        if not self.active_character:
            return
        print(self.active_character.legsAreInvisible())
        # print("legs", self.active_character.legsAreTogether())
        self.active_character.build_layers()
        self.original_image = self.active_character.render()
        self.update_image_display()

    def update_image_display(self, event=None):
        if not self.original_image:
            return

        panel_width = self.image_panel.winfo_width()
        panel_height = self.image_panel.winfo_height()

        if panel_width <= 1 or panel_height <= 1:
            return

        img = self.original_image
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
        self.image_panel.image = tk_image # type: ignore

    def save_image(self):
        if not self.original_image:
            return

        script_dir = "."
        file_path = filedialog.asksaveasfilename(
            initialdir=script_dir,
            defaultextension=".png",
            filetypes=[
                ("PNG files", "*.png"),
                ("All files", "*.*")
            ],
            title="Save Image As"
        )

        if file_path:
            self.original_image.save(file_path)

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