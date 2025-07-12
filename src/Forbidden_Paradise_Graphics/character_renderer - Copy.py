import os
from .characters import LilySports, LilyUrban

IMAGES = ".\\img\\pictures\\characters"

def list_characters():
    dirs = os.listdir(IMAGES)
    return dirs

def render_character_cli():
    # Get list of characters with their index starting from 1
    characters = enumerate(list_characters(), start=1)
    print("Characters:")
    for i, character in characters:
        print(f"{i}. {character}")
    choice = input("Select a character to render: ")

    match choice:
        case '9':
            lily = LilySports()

            lily.hasBra = 0
            lily.hasPanties = 0
            lily.crotchRopeMaterial = "rope"

            lily.build_layers()
            img = lily.render()
            
            img.save("lily_sports.png")

        case '10':
            lily = LilyUrban()
            
            lily.hasOuter = True
            lily.hasInner = True

            # Enemy
            # bossPillar, caterpillar, human, plant, pole
            # red_plant, sandbag
            lily.grabberConfig = ""

            # Mouth
            # ball, ball_big, ball_strict, bit_gag, cloth
            # rope, tape, web
            lily.mouthMaterial = "cloth"
            lily.hasDrool = 1


            lily.build_layers()
            img = lily.render()
            
            img.save("lily_urban.png")

        case _:
            print("Invalid choice.")



if __name__ == "__main__":
    render_character_cli()
