import re

with open("src/Forbidden_Paradise_Graphics/characters/lily_urban.py", 'r') as f:
    content = f.read()

    materials = set()

    matches = re.findall(r'mouthMaterial\(\)\s*==\s*"(.*?)"', content)
    for match in matches:
        materials.add(match)
    
    materials = sorted(materials)

for i in range(0, len(materials), 5):
    print("            #", ", ".join(materials[i:i+5]))