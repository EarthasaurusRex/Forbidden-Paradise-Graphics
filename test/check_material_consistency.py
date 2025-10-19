
'''
This script scans all character files to find used materials, 
and compares them against the definitions in character_materials.json
to find and report any inconsistencies.
'''
import os
import re
import json
import glob
from collections import defaultdict

def get_used_materials_per_character():
    """Scans character files and returns a dictionary of used materials for each character and type."""
    material_types = [
        "mummifiedMaterial", "mouthMaterial", "eyesMaterial", "collarMaterial",
        "armsMaterial", "mittensMaterial", "nippleMaterial", "legsMaterial",
        "crotchRopeMaterial", "intimateMaterial", "lastBaseOutfit",
        "specialHeadwear", "specialInner", "specialLegwear", "specialBoots",
        "grabberConfig"
    ]
    character_dir = "src/Forbidden_Paradise_Graphics/characters"
    character_paths = glob.glob(os.path.join(character_dir, "*.py"))
    # Filter out __init__.py and the base character.py
    character_paths = [p for p in character_paths if not (p.endswith("__init__.py") or p.endswith("character.py"))]
    
    all_materials = defaultdict(lambda: defaultdict(set))
    
    for path in character_paths:
        try:
            # From '.../lily_bandit.py' to 'LilyBandit'
            filename = os.path.basename(path)
            class_name = "".join(word.capitalize() for word in filename.replace(".py", "").split('_'))

            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                for material_type in material_types:
                    # This regex handles both self.material() == "value" and self.material == "value"
                    pattern = rf'self\.{material_type}(?:\(\))? *== *["\']([\w_]+)["\']'
                    matches = re.findall(pattern, content)
                    for match in matches:
                        if match.upper() != 'NONE':
                            all_materials[class_name][material_type].add(match)
        except Exception as e:
            print(f"Error processing file {path}: {e}")
            
    return all_materials

def get_materials_from_json(json_path):
    """Loads character materials from the specified JSON file."""
    with open(json_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def compare_and_report(used_materials, defined_materials):
    """Compares used materials against defined materials from JSON and returns a report."""
    report = defaultdict(lambda: defaultdict(list))

    all_character_names = set(used_materials.keys()) | set(defined_materials.keys())

    for char_name in sorted(list(all_character_names)):
        used_char_materials = used_materials.get(char_name, {})
        defined_char_materials = defined_materials.get(char_name, {})

        all_material_types = set(used_char_materials.keys()) | set(defined_char_materials.keys())

        for mat_type in sorted(list(all_material_types)):
            used_set = {m.upper() for m in used_char_materials.get(mat_type, set())}
            
            defined_list = defined_char_materials.get(mat_type, [])
            defined_set = {m.upper() for m in defined_list}

            used_not_defined = used_set - defined_set
            if used_not_defined:
                report[char_name][f"{mat_type}_used_but_not_in_json"] = ["NONE"] + sorted(list(used_set))

            # We should ignore "NONE" as it's a valid default that might not be explicitly checked.
            defined_not_used = defined_set - used_set - {"NONE"}
            if defined_not_used:
                report[char_name][f"{mat_type}_in_json_but_not_used"] = sorted(list(defined_not_used))

    final_report = {k: v for k, v in report.items() if v}
    return final_report

def main():
    """Main function to run the comparison and print the report."""
    json_path = "src/Forbidden_Paradise_Graphics/configs/character_materials.json"
    print(f"Scanning for material inconsistencies between python files and {json_path}...")
    
    used_mats = get_used_materials_per_character()
    defined_mats = get_materials_from_json(json_path)
    
    report = compare_and_report(used_mats, defined_mats)
    
    if not report:
        print(f"\n✅ All materials used in character files are consistent with {json_path}!")
    else:
        print(f"\n⚠️ Found inconsistencies between used materials and {json_path}:")
        print(json.dumps(report, indent=4))

if __name__ == "__main__":
    main()
