import os
from Forbidden_Paradise_Graphics.characters import Character
from Forbidden_Paradise_Graphics.characters.character import resource_path


class Rinne(Character):
    def __init__(self):
        super().__init__()
        self.image_path = resource_path(os.path.join("img", "pictures", "characters", "rinne"))

    def build_layers(self):
        self.layers = {}

        disgust = self.hasAcc1
        faceShadowed = self.hasAcc2

        if self.hasHeadwear:
            self.modifyLayer(0, 1)
            if faceShadowed:
                self.modifyLayer(8, 0)
            self.modifyLayer(7, 0)
        else:
            self.modifyLayer(0, 0)

        if disgust:
            self.modifyLayer(2, 0)

        if self.hasSweat:
            self.modifyLayer(5, 0)
        if self.hasBlush:
            self.modifyLayer(6, 0)

        if not self.isMouthBound():
            self.modifyLayer(1, self.mouthIndex - 1)
        else:
            self.modifyLayer(1, -1)

        if not self.isEyesBound():
            self.modifyLayer(3, self.eyesIndex - 1)
        else:
            self.modifyLayer(3, -1)

        self.modifyLayer(4, self.eyebrowsIndex - 1)