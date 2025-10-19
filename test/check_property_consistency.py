
'''
This script scans all character files to find used properties, 
and compares them against the definitions in character_properties.json
to find and report any inconsistencies.
'''
import os
import re
import json
import glob
from collections import defaultdict

def get_used_properties_per_character():
    """Scans character files and returns a set of used properties for each character."""
    character_dir = "src/Forbidden_Paradise_Graphics/characters"
    character_paths = glob.glob(os.path.join(character_dir, "*.py"))
    # Filter out __init__.py and the base character.py
    character_paths = [p for p in character_paths if not (p.endswith("__init__.py") or p.endswith("character.py"))]
    
    all_properties = defaultdict(set)
    
    for path in character_paths:
        try:
            # From '.../lily_bandit.py' to 'LilyBandit'
            filename = os.path.basename(path)
            class_name = "".join(word.capitalize() for word in filename.replace(".py", "").split('_'))

            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                # This regex finds all attributes accessed on 'self' (e.g., self.hasShoes, self.armsMaterial())
                pattern = r'self\.([a-zA-Z_]\w*)'
                matches = re.findall(pattern, content)
                for match in matches:
                    all_properties[class_name].add(match)
        except Exception as e:
            print(f"Error processing file {path}: {e}")
            
    return all_properties

def get_properties_from_json(json_path):
    """Loads character properties from the specified JSON file."""
    with open(json_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def compare_and_report(used_properties, defined_properties):
    """Compares used properties against defined properties from JSON and returns a report."""
    report = defaultdict(lambda: defaultdict(list))
    excluded_properties = {"__hasOuter", "image_path", "gamePlayer", "layers", "modifyLayer", "storyVars"}

    all_character_names = set(used_properties.keys()) | set(defined_properties.keys())

    for char_name in sorted(list(all_character_names)):
        used_set = used_properties.get(char_name, set()) - excluded_properties
        defined_set = set(defined_properties.get(char_name, [])) - excluded_properties

        # Inconsistency 1: Used in code, but not defined in JSON
        used_not_defined = used_set - defined_set
        if used_not_defined:
            # For this report, show the full list of used properties for easy copy-pasting
            report[char_name]["used_but_not_in_json"] = sorted(list(used_set))

        # Inconsistency 2: Defined in JSON, but not used in code
        defined_not_used = defined_set - used_set
        if defined_not_used:
            report[char_name]["in_json_but_not_used"] = sorted(list(defined_not_used))

    final_report = {k: v for k, v in report.items() if v}
    return final_report

def main():
    """Main function to run the comparison and print the report."""
    json_path = "src/Forbidden_Paradise_Graphics/configs/character_properties.json"
    print(f"Scanning for property inconsistencies between python files and {json_path}...")
    
    used_props = get_used_properties_per_character()
    defined_props = get_properties_from_json(json_path)
    
    report = compare_and_report(used_props, defined_props)
    
    if not report:
        print(f"\n✅ All properties used in character files are consistent with {json_path}!")
    else:
        print(f"\n⚠️ Found inconsistencies between used properties and {json_path}:")
        print(json.dumps(report, indent=4))

if __name__ == "__main__":
    main()
