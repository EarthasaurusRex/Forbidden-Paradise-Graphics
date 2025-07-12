import os
from . import character_renderer

def main():
    # Prompt user for what to render
    while True:
        choice = input(
            "What would you like to render?\n"
            "1. Character\n"
            "2. CGs\n"
        )
        match choice:
            case '1':
                character_renderer.launch_character_editor()
                break
            case '2':
                print("CGs are not yet implemented.")
            case _:
                print("Invalid choice.")

    
if __name__ == "__main__":
    main()