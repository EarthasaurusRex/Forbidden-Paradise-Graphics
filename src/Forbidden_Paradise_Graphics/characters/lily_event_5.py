import os
from Forbidden_Paradise_Graphics.characters import Character
from Forbidden_Paradise_Graphics.characters.character import resource_path


class LilyEvent5(Character):
    def __init__(self):
        super().__init__()
        self.image_path = resource_path(os.path.join("img", "pictures", "characters", "lily_event_5"))

    def build_layers(self):
        self.layers = {}

        if self.grabberConfig == "pole":
            self.modifyLayer(0,0)

        # lower body
        if self.legsAreTogether():
            self.modifyLayer(12,0) # ropes
            self.modifyLayer(1,1)
            # Vibe
            if self.intimateMaterial() == "bullet_vibe":
                self.modifyLayer(8,1)
        else:
            self.modifyLayer(1,0)
            # Vibe
            if self.intimateMaterial() == "bullet_vibe":
                self.modifyLayer(2,1)
        if self.hasCrotchRope():
            self.modifyLayer(10, 0)
            self.modifyLayer(13, 0)

        # upper body
        if self.armsAreTogether():
            self.modifyLayer(11,0) # ropes
            self.modifyLayer(3,1)
            if self.hasAcc1:
                self.modifyLayer(4,1)

            if self.legsAreTogether():
                self.modifyLayer(5,2)
            else:
                self.modifyLayer(5,1)
        else:
            self.modifyLayer(3,0)
            self.modifyLayer(4,0)
            if self.hasAcc1:
                self.modifyLayer(5,0)

        # Breast area
        if self.armsAreTogether():
            if self.nippleMaterial() == "nipple_clamps":
                self.modifyLayer(14,1)
            elif self.nippleMaterial() == "nipple_vibe":
                self.modifyLayer(14,0)
        elif self.hasInner:
            self.modifyLayer(6,1)
            if self.nippleMaterial() == "nipple_clamps":
                self.modifyLayer(14,2)
        else:
            self.modifyLayer(6,0)
            if self.nippleMaterial() == "nipple_clamps":
                self.modifyLayer(14,3)

        # hair
        baseOutfit = self.lastBaseOutfit()
        if self.armsAreTogether():
            if baseOutfit:
                idToIndex = {
                    "lily_urban": 1,
                    "lily_bandit": 2,
                    "lily_event_x": 2,
                    "lily_bunny": 4,
                    "lily_sports": 6,
                }.get(baseOutfit)
                if idToIndex is not None:
                    self.modifyLayer(29,idToIndex)
            else:
                self.modifyLayer(29,7)
        else:
            if baseOutfit:
                idToIndex = {
                    "lily_urban": 0,
                    "lily_bandit": 2,
                    "lily_event_x": 2,
                    "lily_bunny": 3,
                    "lily_sports": 5,
                }.get(baseOutfit)
                if idToIndex is not None:
                    self.modifyLayer(29,idToIndex)
            else:
                self.modifyLayer(29,7)

        # neck
        if self.collarMaterial() == "bell":
            self.modifyLayer(31,2)
        elif self.collarMaterial() == "rune":
            if self.isFullyMummified():
                self.modifyLayer(31,4)
            else:
                self.modifyLayer(31,3)
        elif self.hasAcc2:
            if self.hasInner:
                self.modifyLayer(31,0)
            else:
                self.modifyLayer(31,1)

        # head
        if self.hasAnger:
            self.modifyLayer(32,0)
        if not self.isMouthBound():
            self.modifyLayer(33,self.mouthIndex-1)

        if self.mouthMaterial() == "rope":
            self.modifyLayer(34,0)
        elif self.mouthMaterial() == "ball_big":
            self.modifyLayer(34,1)
        elif self.mouthMaterial() == "ball":
            self.modifyLayer(34,2)
        elif self.mouthMaterial() == "ball_strict":
            self.modifyLayer(34,2)

            if self.eyesMaterial() == "leather_blindfold":
                self.modifyLayer(47,1)
            else:
                self.modifyLayer(47,0)
        elif self.mouthMaterial() == "cloth":
            self.modifyLayer(34,3)
        elif self.mouthMaterial() == "ball_cloth":
            self.modifyLayer(34,6)
        elif self.mouthMaterial() == "ball_tape":
            self.modifyLayer(34,7)
        elif self.mouthMaterial() == "ball_tape_cloth":
            self.modifyLayer(34,8)
        elif self.mouthMaterial() == "web":
            if self.mummifiedMaterial() == "web":
                self.modifyLayer(34,5)
            else:
                self.modifyLayer(34,4)
        elif self.mouthMaterial() == "tape":
            if self.mummifiedMaterial() == "tape":
                self.modifyLayer(34,10)
            else:
                self.modifyLayer(34,9)
        elif self.mouthMaterial() == "cloth_tape":
            self.modifyLayer(34,11)

        if self.hasDrool:
            if self.mouthMaterial() == "ball_big":
                self.modifyLayer(35,0)
            elif self.mouthMaterial() == "ball":
                self.modifyLayer(35,1)
            elif self.mouthMaterial() == "ball_strict":
                self.modifyLayer(35,1)
            elif self.mouthMaterial() == "cloth":
                self.modifyLayer(35,2)

        if self.eyesMaterial() != "tape_hood":
            self.modifyLayer(36,self.eyebrowsIndex-1)
        if not self.isEyesBound():
            self.modifyLayer(37,self.eyesIndex-1)

        if self.eyesMaterial() == "cloth":
            self.modifyLayer(38,0)
        elif self.eyesMaterial() == "rope":
            self.modifyLayer(38,1)
        elif self.eyesMaterial() == "web":
            self.modifyLayer(38,2)
        elif self.eyesMaterial() == "tape_hood":
            self.modifyLayer(38,3)
        elif self.eyesMaterial() == "leather_blindfold":
            self.modifyLayer(38,4)

        if self.hasBlush:
            self.modifyLayer(39,0)
        if self.hasFaceShadow:
            self.modifyLayer(40,0)
        if self.hasAshen:
            self.modifyLayer(41,0)
        if self.hasExtraBlush:
            self.modifyLayer(42,0)
        if self.hasSweat:
            self.modifyLayer(43,0)
        if self.hasExtraSweat:
            self.modifyLayer(44,0)
