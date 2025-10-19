import os
from Forbidden_Paradise_Graphics.characters import Character
from Forbidden_Paradise_Graphics.characters.character import resource_path


class LilyEvent3(Character):
    def __init__(self):
        super().__init__()
        self.image_path = resource_path(os.path.join("img", "pictures", "characters", "lily_event_3"))

    def build_layers(self):
        self.layers = {}

        cocoonType = int(self.cocoonType)

        # self.upsideDown = self.gamePlayer._isUpsideDown or False
        # self.cocoonType = (
        #     -1 if self.storyVars.cave.ca2.cocoonType is None else self.storyVars.cave.ca2.cocoonType
        # ) # 0: partial | 1: full, translucent | 2: full, head translucent | 3: full
        stuckToGround = self.hasShoes
        hasWristWebbing = self.hasAcc1
        hasFeetWebbing = self.hasLegWear or self.hasShoes
        hasMittens = (self.mittensMaterial() == "web")
        coveringBreasts = (not self.armsAreTogether() and not self.armsBehindBackPose())

        kneesBound = (1 if self.hasAcc3 else 0)

        # cocoon background
        if cocoonType > 0:
            self.modifyLayer(0,0)

        # legs base
        if not self.legsAreInvisible():
            if hasFeetWebbing:
                if self.legsAreTogether():
                    self.modifyLayer(1,5)
                elif kneesBound:
                    self.modifyLayer(1,3)
                else:
                    self.modifyLayer(1,4)
            else:
                if self.legsAreTogether():
                    self.modifyLayer(1,2)
                elif kneesBound:
                    self.modifyLayer(1,0)
                else:
                    self.modifyLayer(1,1)

        # upper base
        if self.armsBehindBackPose() or cocoonType == 0:
            if self.upsideDown:
                if self.eyesMaterial() == "web":
                    self.modifyLayer(2,6)
                else:
                    self.modifyLayer(2,5)
            else:
                self.modifyLayer(2,3)
        elif self.armsAreTogether() or cocoonType > 0:
            if hasMittens:
                self.modifyLayer(9,2)
            self.modifyLayer(2,2)
        elif coveringBreasts:
            if hasWristWebbing:
                self.modifyLayer(8,1)

            if hasMittens:
                self.modifyLayer(2,4)
                self.modifyLayer(9,1)
            else:
                self.modifyLayer(2,1)
        else:
            if hasWristWebbing:
                self.modifyLayer(8,0)
            if hasMittens:
                self.modifyLayer(9,0)
            self.modifyLayer(2,0)

        # mummified material
        if self.mummifiedMaterial() == "web" and cocoonType != 0:
            self.modifyLayer(3,0)

        # ground trap
        if stuckToGround:
            self.modifyLayer(4,0)

        # legs bound
        if self.legsMaterial() == "web" and cocoonType != 0:
            self.modifyLayer(5,0)
            self.modifyLayer(6,0)

            if self.upsideDown:
                self.modifyLayer(7,0)
        elif kneesBound:
            self.modifyLayer(5,1)

        # Nipples
        if self.nippleMaterial() == "caterpillars":
            self.modifyLayer(11,0)


        # head
        if not self.isMouthBound():
            self.modifyLayer(20,self.mouthIndex-1)
        if self.mouthMaterial() == "web_cleave":
            self.modifyLayer(25,0)
        elif self.mouthMaterial() == "web":
            if self.upsideDown:
                self.modifyLayer(25,2)
            else:
                self.modifyLayer(25,1)

        self.modifyLayer(22,self.eyebrowsIndex-1)
        if not self.isEyesBound():
            if self.upsideDown:
                self.modifyLayer(21, 30 + self.eyesIndex - 1)
            else:
                self.modifyLayer(21,self.eyesIndex-1)
        if self.eyesMaterial() == "web":
            if self.upsideDown:
                self.modifyLayer(26,2)
            else:
                self.modifyLayer(26,0)

        if self.hasAnger:
            self.modifyLayer(34,0)
        if self.hasBlush:
            self.modifyLayer(27,0)
        if self.hasFaceShadow:
            self.modifyLayer(28,0)
        if self.hasAshen:
            self.modifyLayer(29,0)
        if self.hasExtraBlush:
            self.modifyLayer(30,0)
        if self.hasSweat:
            if self.upsideDown:
                self.modifyLayer(31,1)
            else:
                self.modifyLayer(31,0)
        if self.hasExtraSweat:
            if self.upsideDown:
                self.modifyLayer(32,1)
            else:
                self.modifyLayer(32,0)

        # neck
        if self.collarMaterial() == "rune":
            if self.mummifiedMaterial() == "web":
                self.modifyLayer(33,1)
            else:
                self.modifyLayer(33,0)

        # cocoon
        if cocoonType == 0:
            self.modifyLayer(37,0)
        elif cocoonType > 0:
            self.modifyLayer(40,cocoonType-1)