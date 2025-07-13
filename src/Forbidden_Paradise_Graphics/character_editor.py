import tkinter as tk
from tkinter import ttk, filedialog
from PIL import Image, ImageTk
import json
import os
import sys
import tkinter as tk
from tkinter import ttk, filedialog
from PIL import Image, ImageTk
import json
import os
import sys
import importlib.util
import inspect

from Forbidden_Paradise_Graphics.characters.character import Character, CocoonType, Arms, Collar, CrotchRope, Eyes, Grabber, LastBaseOutfit, Intimate, Legs, Mittens, Mouth, Mummified, Nipples

def resource_path(relative_path):
    """Get absolute path to resource, works for dev and for PyInstaller"""
    try:
        # PyInstaller creates a temp folder and stores path in _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".\\src\\Forbidden_Paradise_Graphics")

    return os.path.join(base_path, relative_path)

def load_character_classes():
    character_classes = {}
    characters_dir = resource_path(os.path.join("characters"))

    for filename in os.listdir(characters_dir):
        if filename.endswith(".py") and filename not in ["__init__.py", "character.py"]:
            module_name = filename[:-3]  # Remove .py extension
            file_path = os.path.join(characters_dir, filename)

            spec = importlib.util.spec_from_file_location(f"Forbidden_Paradise_Graphics.characters.{module_name}", file_path)
            if spec:
                module = importlib.util.module_from_spec(spec)
                sys.modules[spec.name] = module
                spec.loader.exec_module(module)

                for name, obj in inspect.getmembers(module, inspect.isclass):
                    if issubclass(obj, Character) and obj is not Character:
                        # Convert class name (e.g., LilySports) to desired key (e.g., lily_sports)
                        key_name = ''.join(['_' + c.lower() if c.isupper() else c for c in name]).lstrip('_')
                        character_classes[key_name] = obj
    return character_classes

class CharacterEditor:

    def __init__(self, root):
        self.root = root
        self.root.title("Character Editor")
        self.root.geometry("800x600")
        self.root.minsize(400, 300)

        self.character_map = load_character_classes()
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
            "lastBaseOutfit": LastBaseOutfit,
            "cocoonType": CocoonType
        }

        # Load character material configurations
        materials_config_path = resource_path(os.path.join("configs", "character_materials.json"))
        try:
            with open(materials_config_path, "r") as f:
                self.character_materials_config = json.load(f)
        except FileNotFoundError:
            print(f"Error: character_materials.json not found at {materials_config_path}")
            self.character_materials_config = {}
        except json.JSONDecodeError:
            print(f"Error: Could not decode character_materials.json at {materials_config_path}")
            self.character_materials_config = {}

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
        self.image_panel = tk.Canvas(main_frame, background="#333333", highlightthickness=0)
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
        for char_name in self.character_map.keys():
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
        canvas.bind_all("<MouseWheel>", lambda event: canvas.yview_scroll(int(-1*(event.delta/120)), "units"))

        # --- Populate the scrollable frame with property editors ---
        
        configs_path = resource_path(os.path.join("configs", "property_order.json"))
        with open(configs_path, "r") as f:
            config = json.load(f)
        property_order = config.get("DEFAULT_PROPERTY_ORDER", [])
        active_character_properties = self.active_character.get_used_properties()


        for prop_name in property_order:
            # Check if the property exists in the active character
            if not prop_name in active_character_properties:
                continue

            prop_frame = ttk.Frame(scrollable_frame)
            prop_frame.pack(fill="x", pady=2, padx=5)

            label = ttk.Label(prop_frame, text=prop_name, width=20)
            label.pack(side="left")

            prop_attr = getattr(self.active_character, prop_name)
            actual_value = prop_attr() if callable(prop_attr) else prop_attr

            # --- Define a generic setter that re-renders ---
            def create_setter(p_name, var, is_enum=False, enum_type=None, min_val=None, max_val=None):
                def setter(*args):
                    new_value = var.get()
                    if isinstance(var, tk.IntVar):
                        try:
                            new_value = int(new_value)
                            if min_val is not None and new_value < min_val:
                                new_value = min_val
                            if max_val is not None and new_value > max_val:
                                new_value = max_val
                            var.set(new_value) # Update the Tkinter variable with the clamped value
                        except ValueError:
                            # If input is not a valid integer, revert to the last valid value
                            current_char_value = getattr(self.active_character, p_name)
                            actual_char_value = current_char_value() if callable(current_char_value) else current_char_value
                            if isinstance(actual_char_value, int):
                                var.set(actual_char_value)
                            else:
                                raise ValueError(f"Last value was not an integer ({type(actual_char_value)})")
                            return # Do not proceed with setting on character or re-rendering

                    if is_enum and enum_type:
                        setattr(self.active_character, p_name, enum_type(new_value))
                    else:
                        setattr(self.active_character, p_name, new_value)
                    self.render_character()
                    self.refresh_property_values()
                return setter

            # --- Create editor widgets and store their variables ---
            if prop_name in self.enum_map:
                enum_type = self.enum_map[prop_name]
                
                # Get allowed options from config, or all enum values if not specified
                character_name = self.active_character.__class__.__name__
                allowed_options = self.character_materials_config.get(character_name, {}).get(prop_name, [e.name for e in enum_type])
                options = [e.value for e in enum_type if e.name in allowed_options]

                var = tk.StringVar(value=str(actual_value))
                self.property_vars[prop_name] = var
                setter_callback = create_setter(prop_name, var, is_enum=True, enum_type=enum_type)
                option_menu = ttk.OptionMenu(prop_frame, var, str(actual_value), *options, command=setter_callback)
                option_menu.pack(side="left")
            elif isinstance(actual_value, bool):
                var = tk.BooleanVar(value=actual_value)
                self.property_vars[prop_name] = var
                setter_callback = create_setter(prop_name, var)
                check = ttk.Checkbutton(prop_frame, variable=var, command=setter_callback)
                check.pack(side="left")
            elif isinstance(actual_value, int):
                var = tk.IntVar(value=actual_value)
                self.property_vars[prop_name] = var
                
                min_val = getattr(self.active_character.__class__, f"MIN_{prop_name.upper()}", None)
                max_val = getattr(self.active_character.__class__, f"MAX_{prop_name.upper()}", None)

                entry = ttk.Entry(prop_frame, textvariable=var)
                setter_callback = create_setter(prop_name, var, min_val=min_val, max_val=max_val)
                entry.bind("<FocusOut>", setter_callback)
                entry.bind("<KeyRelease>", setter_callback)
                entry.pack(side="left")

                if min_val is not None and max_val is not None:
                    range_label = ttk.Label(prop_frame, text=f" (Min: {min_val}, Max: {max_val})")
                    range_label.pack(side="left")
            elif isinstance(actual_value, str):
                var = tk.StringVar(value=actual_value)
                self.property_vars[prop_name] = var
                entry = ttk.Entry(prop_frame, textvariable=var)
                setter_callback = create_setter(prop_name, var)
                entry.bind("<FocusOut>", setter_callback)
                entry.bind("<KeyRelease>", setter_callback)
                entry.pack(side="left")

        # --- Pack the canvas and scrollbar ---
        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

    def refresh_property_values(self):
        if not self.active_character:
            return

        for prop_name, var in self.property_vars.items():
            prop_attr = getattr(self.active_character, prop_name)
            actual_value = prop_attr() if callable(prop_attr) else prop_attr

            if prop_name in self.enum_map:
                if isinstance(actual_value, (str, int)):
                    var.set(actual_value)
                else:
                    raise ValueError(f"Value is not a str or int ({type(actual_value)})")
            elif isinstance(var, tk.BooleanVar):
                if isinstance(actual_value, bool):
                    var.set(actual_value)
                else:
                    raise ValueError(f"Value is not a bool ({type(actual_value)})")
            elif isinstance(var, tk.IntVar):
                if isinstance(actual_value, int):
                    var.set(actual_value)
                else:
                    raise ValueError(f"Value is not an int ({type(actual_value)})")
            elif isinstance(var, tk.StringVar):
                var.set(str(actual_value))

    def render_character(self):
        if not self.active_character:
            return
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
        
        self.image_panel.delete("all") # Clear previous image
        
        # Calculate position to center the image
        x_center = panel_width / 2
        y_center = panel_height / 2

        self.image_panel.create_image(x_center, y_center, image=tk_image, anchor=tk.CENTER)
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
