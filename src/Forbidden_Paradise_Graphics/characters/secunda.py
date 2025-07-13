import os
from Forbidden_Paradise_Graphics.characters import Character
from Forbidden_Paradise_Graphics.characters.character import resource_path


class Secunda(Character):
    def __init__(self):
        super().__init__()
        self.image_path = resource_path(os.path.join("img", "pictures", "characters", "secunda"))
        self.hasHeadwear = False

    def build_layers(self):
        self.layers = {}

        isArmsBound = self.armsAreTogether
        isLegsBound = self.legsAreTogether

        # Hair ornaments
        self.modifyLayer(1, (0 if self.hasHeadwear else -1))
        self.modifyLayer(20, (0 if self.hasHeadwear else -1))

        # Hair and back hair for long hair
        if not self.hasHeadwear:
            self.modifyLayer(0, 1)

            if (isArmsBound() and self.armsMaterial() == "cuffs") or self.mittensMaterial == "leather_binder":
                self.modifyLayer(19, 7)
            elif isArmsBound():
                if self.hasOuter:
                    self.modifyLayer(19, 6)
                elif self.hasInner:
                    self.modifyLayer(19, 5)
                else:
                    self.modifyLayer(19, 4)
            else:
                if self.hasOuter:
                    self.modifyLayer(19, 3)
                elif self.hasInner:
                    self.modifyLayer(19, 2)
                else:
                    self.modifyLayer(19, 1)

        if not self.isMouthBound():
            self.modifyLayer(21, self.mouthIndex - 1)
        else:
            self.modifyLayer(21, -1)

        if not self.isEyesBound():
            self.modifyLayer(22, self.eyesIndex - 1)
        else:
            self.modifyLayer(22, -1)

        self.modifyLayer(24, self.eyebrowsIndex - 1)

        # Binding layers
        self.modifyLayer(3, -1) # legs
        self.modifyLayer(11, -1) # arms
        self.modifyLayer(23, -1) # eyes
        self.modifyLayer(25, -1) #mouth

        shoesModifier = 1 if self.hasShoes else 0
        crotchRopeModifier = 2 if self.hasCrotchRope() else 0

        if self.hasCrotchRope():
            self.modifyLayer(9, 0)
            self.modifyLayer(5, 1)

        if isLegsBound():
            self.modifyLayer(2, 4 + shoesModifier + crotchRopeModifier)
            self.modifyLayer(3, 0)
            self.modifyLayer(6, 4 + shoesModifier + crotchRopeModifier)
            self.modifyLayer(7, 3)
            self.modifyLayer(8, 2)

            if self.hasCrotchRope():
                self.modifyLayer(7, 4)
                self.modifyLayer(8, 3)

            #if (hasOuter) this.modifyLayer(15, 1); # Commented out in original JS
        else:
            self.modifyLayer(2, 0 + shoesModifier + crotchRopeModifier)
            self.modifyLayer(6, 0 + shoesModifier + crotchRopeModifier)
            self.modifyLayer(7, 0)
            self.modifyLayer(8, 0)

            if self.hasCrotchRope():
                self.modifyLayer(7, 2)
                self.modifyLayer(8, 1)

            #if (hasOuter) this.modifyLayer(15, 0); # Commented out in original JS

        # do stuff like this later:
        # if no skirt: self.modifyLayer(8, -1);

        # Remove tablet
        self.modifyLayer(18, -1)

        if isArmsBound() and self.armsMaterial() == "cuffs":
            self.modifyLayer(10, 2)
            if self.hasBra:
                self.modifyLayer(14, 0)
            else:
                self.modifyLayer(12, 0)
        elif isArmsBound():
            self.modifyLayer(10, 1)

            if self.mittensMaterial() == "leather_binder":
                self.modifyLayer(11, 1)
            else:
                self.modifyLayer(11, 0)

            if self.hasBra:
                self.modifyLayer(14, 1)
            else:
                self.modifyLayer(12, 1)

            self.modifyLayer(16, (3 if self.hasOuter else 2))
            self.modifyLayer(17, 2)
        else:
            self.modifyLayer(10, 0)

            if self.hasBra:
                self.modifyLayer(14, 0)
            else:
                self.modifyLayer(12, 0)

            self.modifyLayer(16, (1 if self.hasOuter else 0))
            self.modifyLayer(17, 1)

            if self.hasAcc2:
                self.modifyLayer(18, 0)

        self.modifyLayer(32, -1)
        if self.isEyesBound():
            if self.eyesMaterial() == "leather_blindfold":
                if self.hasHeadwear:
                    self.modifyLayer(32, 1)
                else:
                    self.modifyLayer(32, 3)
            elif self.eyesMaterial() == "cloth":
                self.modifyLayer(32, 2)
        else:
            if self.hasAcc1 and self.mouthMaterial() != "ball_strict":
                self.modifyLayer(32, 0)

        if self.isMouthBound():
            if self.mouthMaterial() == "ball":
                self.modifyLayer(25, 0)
            elif self.mouthMaterial() == "cloth":
                self.modifyLayer(25, 1)
            elif self.mouthMaterial() == "rope":
                self.modifyLayer(25, 2)
            elif self.mouthMaterial() == "bit_gag":
                self.modifyLayer(25, 3)
            elif self.mouthMaterial() == "ball_strict":
                self.modifyLayer(25, 0)
                if self.eyesMaterial() == "leather_blindfold":
                    self.modifyLayer(34, 1)
                elif self.eyesMaterial() != "leather_blindfold":
                    self.modifyLayer(34, 0)

        self.modifyLayer(27, -1)
        self.modifyLayer(28, -1)

        sweatDropType = self.hasSweat + self.hasExtraSweat * 2

        if sweatDropType == 1:
            self.modifyLayer(27, 0)
        elif sweatDropType == 2:
            self.modifyLayer(28, 0)
        elif sweatDropType == 3:
            self.modifyLayer(27, 0)
            self.modifyLayer(28, 0)

        self.modifyLayer(30, -1)
        self.modifyLayer(31, -1)
        
        embarrassment = self.hasBlush + self.hasExtraBlush

        if embarrassment >= 1:
            self.modifyLayer(30, (0 if self.hasHeadwear else 1))
        if embarrassment >= 2:
            self.modifyLayer(31, (0 if self.hasHeadwear else 1))

        # Nipples
        if self.nippleMaterial() == "nipple_clamps":
            self.modifyLayer(13, 0)


        # Remove coat
        if not self.hasOuter:
            self.modifyLayer(17, -1)
            self.modifyLayer(15, -1)

        # Remove legwear
        if not self.hasLegWear:
            self.modifyLayer(6, -1)

        # Remove skirt and shirt
        if not self.hasInner:
            self.modifyLayer(7, -1)
            self.modifyLayer(8, -1)
            self.modifyLayer(16, -1)

        # Mittens
        if self.mittensMaterial() == "leather_binder":
            self.modifyLayer(10,2)

            if self.armsMaterial() != "rope":
                self.modifyLayer(16,4)

        if self.hasDrool:
            if self.mouthMaterial() == "ball":
                self.modifyLayer(33,0)
            elif self.mouthMaterial() == "ball_strict":
                self.modifyLayer(33,0)
            elif self.mouthMaterial() == "cloth":
                self.modifyLayer(33,1)
            elif self.mouthMaterial() == "bit_gag":
                self.modifyLayer(33,2)

        if self.collarMaterial() == "bell":
            self.modifyLayer(29,0)
        elif self.collarMaterial() == "leash":
            self.modifyLayer(29,1)

        # Some special event layers
        if self.specialBoots == "leather":
            self.modifyLayer(3,1)
        elif self.specialBoots == "leather_chained":
            self.modifyLayer(3,2)
        if self.specialLegwear == "belt":
            self.modifyLayer(4,4)
        if self.specialHeadwear == "ribbon":
            self.modifyLayer(20,1)
        if self.specialInner == "skirt_only":
            self.modifyLayer(8,4)
            self.modifyLayer(16,-1)

        # Lily hat for Secunda; only as gameplayer
        if self.hasLilyCosplayHat:
            self.modifyLayer(35, 0)
            self.modifyLayer(36, 0)