import os
from Forbidden_Paradise_Graphics.characters import Character
from Forbidden_Paradise_Graphics.characters.character import resource_path


class LilyEvent4(Character):
    def __init__(self):
        super().__init__()
        self.image_path = resource_path(os.path.join("img", "pictures", "characters", "lily_event_4"))

    def build_layers(self):
        self.layers = {}

        if not self.isGrounded():
            if self.legsAreTogether():
                # standing, legs tied
                self.modifyLayer(5,0)
                self.modifyLayer(1,3)
            else:
                # standing, legs free
                self.modifyLayer(1,1)
            self.modifyLayer(3,0)

            if self.armsMaterial() == "straitjacket":
                self.modifyLayer(6,1)
            else:
                # even if not bound, this outfit shows special straitjacket
                self.modifyLayer(6,0)
        else:
            if self.legsAreTogether():
                # trip 2
                self.modifyLayer(7,0)
                self.modifyLayer(4,1)
            else:
                # trip 1
                self.modifyLayer(3,1)
                self.modifyLayer(1,5)

            if self.armsMaterial() == "straitjacket":
                self.modifyLayer(6,3)
            else:
                # even if not bound, this outfit shows special straitjacket
                self.modifyLayer(6,2)

        # upper body
        self.modifyLayer(2,0)

        # hair
        self.modifyLayer(8,0)

        # mouth, eyebrows, eyes
        if not self.isMouthBound():
            self.modifyLayer(10, self.mouthIndex - 1)
        self.modifyLayer(13, self.eyebrowsIndex - 1)
        if not self.isEyesBound():
            if self.eyesIndex in [1,3,5,10,12,13] and self.hypnoStacks > 0:
                self.modifyLayer(14, self.eyesIndex - 1 + 100 * self.hypnoStacks)
            else:
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