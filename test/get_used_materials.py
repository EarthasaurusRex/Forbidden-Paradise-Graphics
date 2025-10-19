'''
This script scans all character files to find used materials, 
parses the Enums in character.py to get all defined materials, 
and then compares them to find and report any inconsistencies.
'''
import os
import re
import json
import glob
import ast
from collections import defaultdict

def get_used_materials():
    """Scans character files and returns a dictionary of used materials for each type."""
    material_types = [
        "mummifiedMaterial", "mouthMaterial", "eyesMaterial", "collarMaterial",
        "armsMaterial", "mittensMaterial", "nippleMaterial", "legsMaterial",
        "crotchRopeMaterial", "intimateMaterial", "lastBaseOutfit",
        "specialHeadwear", "specialInner", "specialLegwear", "specialBoots",
        "grabberConfig"
    ]
    character_dir = "src/Forbidden_Paradise_Graphics/characters"
    character_paths = glob.glob(os.path.join(character_dir, "*.py"))
    character_paths = [p for p in character_paths if not p.endswith("__init__.py") and not p.endswith("character.py")]
    
    all_materials = {material_type: set() for material_type in material_types}
    
    for path in character_paths:
        try:
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                for material_type in material_types:
                    pattern = rf'self\.{material_type}(?:\(\))? *== *["\']([\w_]+)["\']'
                    matches = re.findall(pattern, content)
                    for match in matches:
                        all_materials[material_type].add(match)
        except Exception as e:
            print(f"Error processing file {path}: {e}")
            
    return all_materials

def get_enum_definitions(character_py_path):
    """Parses character.py and returns a dictionary of all Enum members."""
    with open(character_py_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    tree = ast.parse(content)
    enum_definitions = {}

    class EnumVisitor(ast.NodeVisitor):
        def visit_ClassDef(self, node):
            is_enum = any(isinstance(b, ast.Name) and b.id == 'Enum' for b in node.bases)
            if is_enum:
                members = {
                    target.id
                    for item in node.body if isinstance(item, ast.Assign)
                    for target in item.targets if isinstance(target, ast.Name)
                }
                enum_definitions[node.name] = members
            self.generic_visit(node)

    EnumVisitor().visit(tree)
    return enum_definitions

def compare_and_report(used_materials, enum_materials):
    """Compares used materials against enum definitions and returns a report."""
    property_to_enum_map = {
        "mummifiedMaterial": "Mummified", "mouthMaterial": "Mouth", "eyesMaterial": "Eyes",
        "collarMaterial": "Collar", "armsMaterial": "Arms", "mittensMaterial": "Mittens",
        "nippleMaterial": "Nipples", "legsMaterial": "Legs", "crotchRopeMaterial": "CrotchRope",
        "intimateMaterial": "Intimate", "lastBaseOutfit": "LastBaseOutfit",
        "specialHeadwear": "SpecialHeadwear", "specialInner": "SpecialInner",
        "specialLegwear": "SpecialLegwear", "specialBoots": "SpecialBoots", "grabberConfig": "Grabber"
    }
    
    report = defaultdict(dict)
    
    for prop, used_set in used_materials.items():
        enum_name = property_to_enum_map.get(prop)
        if not enum_name or enum_name not in enum_materials:
            report[prop]["error"] = f"Could not find corresponding enum '{enum_name}'"
            continue
        
        used_set_upper = {m.upper() for m in used_set}
        defined_set = enum_materials[enum_name]

        used_not_defined = used_set_upper - defined_set
        # Exclude NONE from the "unused" report as it's a valid default
        defined_not_used = defined_set - used_set_upper - {"NONE"}

        if used_not_defined:
            report[prop]["used_but_not_in_enum"] = sorted(list(used_not_defined))
        if defined_not_used:
            report[prop]["in_enum_but_not_used"] = sorted(list(defined_not_used))
    
    # Filter out empty reports for a cleaner output
    final_report = {k: v for k, v in report.items() if v}
    return final_report

def main():
    """Main function to run the comparison and print the report."""
    print("Scanning for material inconsistencies...")
    used_mats = get_used_materials()
    enum_defs = get_enum_definitions("src/Forbidden_Paradise_Graphics/characters/character.py")
    report = compare_and_report(used_mats, enum_defs)
    
    if not report:
        print("\n✅ All used materials are consistent with the Enums in character.py!")
    else:
        print("\n⚠️ Found inconsistencies between used materials and Enum definitions:")
        print(json.dumps(report, indent=4))

if __name__ == "__main__":
    main()