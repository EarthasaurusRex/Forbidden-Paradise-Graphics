import os
from Forbidden_Paradise_Graphics.characters import Character
from Forbidden_Paradise_Graphics.characters.character import resource_path


class RinneFox(Character):
    def __init__(self):
        super().__init__()
        self.image_path = resource_path(os.path.join("img", "pictures", "characters", "rinne_fox"))

    def build_layers(self):
        self.layers = {}

        disgust = self.hasAcc1
        hasHeartMark = self.hasAcc2

        if self.armsAreTogether():
            self.modifyLayer(0, 1)
        else:
            self.modifyLayer(0, 0)

        if disgust:
            self.modifyLayer(3, 0)

        # heart
        if hasHeartMark:
            self.modifyLayer(2, 0)

        if self.hasSweat:
            self.modifyLayer(6, 0)
        if self.hasBlush > 0:
            if not self.isEyesBound() and self.eyesIndex - 1 == 7:
                self.modifyLayer(7, 1)
            else:
                self.modifyLayer(7, 0)

        if not self.isMouthBound():
            self.modifyLayer(1, self.mouthIndex - 1)
        else:
            self.modifyLayer(1, -1)

        if not self.isEyesBound():
            self.modifyLayer(4, self.eyesIndex - 1)
        else:
            self.modifyLayer(3, -1)

        self.modifyLayer(5, self.eyebrowsIndex - 1)
