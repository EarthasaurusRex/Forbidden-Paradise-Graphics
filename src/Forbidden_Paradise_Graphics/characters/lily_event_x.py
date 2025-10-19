import os
from Forbidden_Paradise_Graphics.characters import Character
from Forbidden_Paradise_Graphics.characters.character import resource_path


class LilyEventX(Character):
    def __init__(self):
        super().__init__()
        self.image_path = resource_path(os.path.join("img", "pictures", "characters", "lily_event_x"))

    def build_layers(self):
        self.layers = {}

        # outfit
        if self.armsAreTogether():
            if self.hasInner:
                self.modifyLayer(1,1)
            else:
                self.modifyLayer(1,3)
        else:
            if self.hasInner:
                self.modifyLayer(1,0)
            else:
                self.modifyLayer(1,2)
        if self.nippleMaterial() == "nipple_clamps":
            self.modifyLayer(8,0)

        # head
        if self.hasAnger:
            self.modifyLayer(9,0)
        if not self.isMouthBound():
            self.modifyLayer(10, self.mouthIndex - 1)

        if self.mouthMaterial() == "bit_gag":
            self.modifyLayer(11,4)
        elif self.mouthMaterial() == "ball":
            self.modifyLayer(11,2)
        elif self.mouthMaterial() == "ball_strict":
            self.modifyLayer(11,2)
            self.modifyLayer(22,0)

        if self.hasDrool:
            if self.mouthMaterial() == "bit_gag":
                self.modifyLayer(12,3)
            elif self.mouthMaterial() == "ball":
                self.modifyLayer(12,1)
            elif self.mouthMaterial() == "ball_strict":
                self.modifyLayer(12,1)

        self.modifyLayer(13, self.eyebrowsIndex - 1)
        if not self.isEyesBound():
            self.modifyLayer(14, self.eyesIndex - 1)

        if self.hasBlush:
            self.modifyLayer(16,0)
        if self.hasFaceShadow:
            self.modifyLayer(17,0)
        if self.hasAshen:
            self.modifyLayer(18,0)
        if self.hasExtraBlush:
            self.modifyLayer(19,0)
        if self.hasSweat:
            self.modifyLayer(20,0)
        if self.hasExtraSweat:
            self.modifyLayer(21,0)