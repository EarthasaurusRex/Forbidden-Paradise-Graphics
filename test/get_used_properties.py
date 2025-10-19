import re
import json

with open("src/Forbidden_Paradise_Graphics/characters/lily_swim.py", 'r') as f:
    content = f.read()

    materials = set()

    matches = re.findall(r'self\.(\w+?)[^\w]', content)
    for match in matches:
        if match in ["image_path", "layers", "modifyLayer"]:
            continue
        materials.add(match)
    
    materials = sorted(materials)

# for i in range(0, len(materials), 5):
#     print("            #", ", ".join(materials[i:i+5]))
print(json.dumps(materials))