import re
import json

with open("src/Forbidden_Paradise_Graphics/characters/secunda.py", 'r') as f:
    content = f.read()

    materials = set()

    matches = re.findall(r'grabberConfig(?:\(\))? [!=]= "(\w+?)"', content)
    for match in matches:
        materials.add(match)
    
    materials = sorted(materials)

# for i in range(0, len(materials), 5):
#     print("            #", ", ".join(materials[i:i+5]))
print(json.dumps(["NONE"]+[x.upper() for x in materials]))