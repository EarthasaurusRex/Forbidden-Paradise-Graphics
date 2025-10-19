import os
from Forbidden_Paradise_Graphics.characters import Character
from Forbidden_Paradise_Graphics.characters.character import resource_path


class LilyBandit(Character):
    def __init__(self):
        super().__init__()
        self.image_path = resource_path(os.path.join("img", "pictures", "characters", "lily_bandit"))

    def build_layers(self):
        self.layers = {}
        
        # Enemy
        if self.grabberConfig == "human":
            self.modifyLayer(0,0)

            if self.armsMaterial() == "web":
                self.modifyLayer(42,0)
            elif self.armsAreTogether():
                if self.hasInner:
                    self.modifyLayer(42,3)
                else:
                    self.modifyLayer(42,2)
            else:
                if self.hasInner:
                    self.modifyLayer(42,1)
                else:
                    self.modifyLayer(42,0)
        elif self.grabberConfig == "plant":
            self.modifyLayer(42,4)
            self.modifyLayer(43,0)
        elif self.grabberConfig == "red_plant":
            self.modifyLayer(42,5)
            self.modifyLayer(43,0)
        elif self.grabberConfig == "sandbag":
            self.modifyLayer(42,6)
        elif self.grabberConfig == "pole":
            self.modifyLayer(0,1)
        elif self.grabberConfig == "caterpillar":
            self.modifyLayer(0,2)
        elif self.grabberConfig == "bossPillar":
            self.modifyLayer(42,7)

        # Accessory 5. Only used in certain escapes.
        if self.hasAcc5 and not self.isGrounded():
            self.modifyLayer(1,0)


        # Legs area
        if not self.legsAreInvisible():
            if not self.isGrounded():
                if self.legsAreTogether():
                    # standing, legs tied
                    if self.legsWebLikePose():
                        self.modifyLayer(2,3)
                    else:
                        self.modifyLayer(2,1)

                    if self.hasPanties:
                        if self.hasLegWear:
                            self.modifyLayer(7,3)
                        else:
                            self.modifyLayer(7,1)
                    if self.hasLegWear:
                        if self.legsMaterial() == "web":
                            self.modifyLayer(9,3)
                        elif self.legsMaterial() == "tape":
                            self.modifyLayer(9,4)
                        else:
                            self.modifyLayer(9,1)

                    if self.hasShoes:
                        if self.isFullyMummified():
                            self.modifyLayer(13,-1)
                        elif self.legsMaterial() == "web":
                            self.modifyLayer(13,3)
                        elif self.legsMaterial() == "tape":
                            self.modifyLayer(13,4)
                        else:
                            if self.hasLegWear:
                                self.modifyLayer(12,1)
                            else:
                                self.modifyLayer(12,0)
                            self.modifyLayer(13,1)

                    if self.hasAcc3 and not self.hasCrotchRope():
                        if self.hasLegWear:
                            self.modifyLayer(10,5)
                        elif self.hasPanties:
                            self.modifyLayer(10,4)
                        else:
                            self.modifyLayer(10,3)
                        self.modifyLayer(16,1)

                    if self.isFullyMummified():
                        # NOTHING - mummification layer is on arms layer
                        pass
                    elif self.legsMaterial() == "rope":
                        if self.hasShoes:
                            self.modifyLayer(20,1)
                        else:
                            self.modifyLayer(20,0)
                    elif self.legsMaterial() == "vines":
                        if self.hasShoes:
                            self.modifyLayer(20,3)
                        else:
                            self.modifyLayer(20,2)
                    elif self.legsMaterial() == "regen_vines":
                        if self.hasShoes:
                            self.modifyLayer(20,5)
                        else:
                            self.modifyLayer(20,4)
                    elif self.legsMaterial() == "web":
                        if self.hasShoes:
                            self.modifyLayer(20,6)
                        else:
                            self.modifyLayer(20,7)
                    elif self.legsMaterial() == "tape":
                        if self.hasShoes:
                            self.modifyLayer(20,8)
                        else:
                            self.modifyLayer(20,9)
                    elif self.legsMaterial() == "glow":
                        if self.hasShoes:
                            self.modifyLayer(20,11)
                            self.modifyLayer(1,2)
                        else:
                            self.modifyLayer(20,10)
                            self.modifyLayer(1,0)

                    if self.hasCrotchRope():
                        if self.hasLegWear:
                            self.modifyLayer(15,1)
                        elif self.hasPanties:
                            self.modifyLayer(15,2)
                        else:
                            self.modifyLayer(15,0)

                    if self.isFullyMummified():
                        # DO NOTHING
                        pass
                    elif self.crotchRopeMaterial() == "rope":
                        self.modifyLayer(17,1)
                    elif self.crotchRopeMaterial() == "vines":
                        self.modifyLayer(17,3)
                    elif self.crotchRopeMaterial() == "regen_vines":
                        self.modifyLayer(17,5)
                    elif self.crotchRopeMaterial() == "glow":
                        self.modifyLayer(17,6)
                        self.modifyLayer(2,0)
                else:
                    # standing, legs free
                    self.modifyLayer(2,0)

                    if self.hasAcc3 and not self.hasCrotchRope():
                        if self.hasLegWear:
                            self.modifyLayer(10,2)
                        elif self.hasPanties:
                            self.modifyLayer(10,1)
                        else:
                            self.modifyLayer(10,0)
                        self.modifyLayer(16,0)

                    if self.hasPanties:
                        if self.hasLegWear:
                            self.modifyLayer(7,2)
                        else:
                            self.modifyLayer(7,0)
                    if self.hasLegWear:
                        self.modifyLayer(9,0)
                    if self.hasShoes:
                        if self.hasLegWear:
                            self.modifyLayer(11,1)
                        else:
                            self.modifyLayer(11,0)
                        self.modifyLayer(13,0)

                    if self.hasCrotchRope():
                        if self.hasLegWear:
                            self.modifyLayer(15,4)
                        elif self.hasPanties:
                            self.modifyLayer(15,5)
                        else:
                            self.modifyLayer(15,3)

                    if self.isFullyMummified():
                        # DO NOTHING
                        pass
                    elif self.crotchRopeMaterial() == "rope":
                        self.modifyLayer(17,0)
                    elif self.crotchRopeMaterial() == "vines":
                        self.modifyLayer(17,2)
                    elif self.crotchRopeMaterial() == "regen_vines":
                        self.modifyLayer(17,4)
                    elif self.crotchRopeMaterial() == "glow":
                        self.modifyLayer(17,7)
                        self.modifyLayer(2,2)
            elif not self.legsAreTogether():
                # trip 1
                self.modifyLayer(2,2)

                if self.hasAcc3 and not self.hasCrotchRope():
                    if self.hasLegWear:
                        self.modifyLayer(10,8)
                    elif self.hasPanties:
                        self.modifyLayer(10,7)
                    else:
                        self.modifyLayer(10,6)
                    self.modifyLayer(16,2)

                if self.hasPanties:
                    if self.hasLegWear:
                        self.modifyLayer(7,3)
                    else:
                        self.modifyLayer(7,1)
                if self.hasLegWear:
                    self.modifyLayer(9,2)

                if self.hasShoes:
                    self.modifyLayer(13,2)

                if self.hasCrotchRope():
                    if self.hasLegWear:
                        self.modifyLayer(15,1)
                    elif self.hasPanties:
                        self.modifyLayer(15,2)
                    else:
                        self.modifyLayer(15,0)

                if self.isFullyMummified():
                    # DO NOTHING
                    pass
                elif self.crotchRopeMaterial() == "rope":
                    self.modifyLayer(17,1)
                elif self.crotchRopeMaterial() == "vines":
                    self.modifyLayer(17,3)
                elif self.crotchRopeMaterial() == "regen_vines":
                    self.modifyLayer(17,5)
                elif self.crotchRopeMaterial() == "glow":
                    self.modifyLayer(17,6)
                    self.modifyLayer(2,0)
            else:
                # trip 2
                self.modifyLayer(22,0)
                if self.hasLegWear:
                    self.modifyLayer(23,0)

                if self.hasShoes:
                    if self.legsMaterial() != "web":
                        if self.hasLegWear:
                            self.modifyLayer(24,1)
                        else:
                            self.modifyLayer(24,0)

                    if self.isFullyMummified():
                        self.modifyLayer(26,-1)
                    elif self.legsMaterial() == "web":
                        self.modifyLayer(26,1)
                    else:
                        self.modifyLayer(26,0)

                if self.isFullyMummified():
                    # DO NOTHING
                    pass
                elif self.crotchRopeMaterial() == "rope":
                    self.modifyLayer(25,0)
                elif self.crotchRopeMaterial() == "vines":
                    self.modifyLayer(25,1)
                elif self.crotchRopeMaterial() == "regen_vines":
                    self.modifyLayer(25,2)
                elif self.crotchRopeMaterial() == "glow":
                    self.modifyLayer(25,3)
                    self.modifyLayer(2,1)

                if self.legsMaterial() == "rope":
                    if self.hasShoes:
                        self.modifyLayer(27,1)
                    else:
                        self.modifyLayer(27,0)
                elif self.legsMaterial() == "vines":
                    if self.hasShoes:
                        self.modifyLayer(27,3)
                    else:
                        self.modifyLayer(27,2)
                elif self.legsMaterial() == "regen_vines":
                    if self.hasShoes:
                        self.modifyLayer(27,5)
                    else:
                        self.modifyLayer(27,4)
                elif self.legsMaterial() == "web":
                    self.modifyLayer(22,1)
                    if self.hasLegWear:
                        self.modifyLayer(23,1)
                    if self.mummifiedMaterial() == "web":
                        self.modifyLayer(27,8)
                    elif self.hasShoes:
                        self.modifyLayer(27,7)
                    else:
                        self.modifyLayer(27,6)
                elif self.legsMaterial() == "tape":
                    self.modifyLayer(22,1)
                    if self.hasLegWear:
                        self.modifyLayer(23,1)
                    if self.mummifiedMaterial() == "tape":
                        self.modifyLayer(27,11)
                    elif self.hasShoes:
                        self.modifyLayer(27,10)
                    else:
                        self.modifyLayer(27,9)
                elif self.legsMaterial() == "glow":
                    if self.hasShoes:
                        self.modifyLayer(27,13)
                        self.modifyLayer(1,3)
                    else:
                        self.modifyLayer(27,12)
                        self.modifyLayer(1,1)

        # Arms area
        if self.armsAreTogether():
            # Bound arms
            if self.armsBehindBackPose():
                self.modifyLayer(3,2)
            else:
                self.modifyLayer(3,1)

            if self.hasAcc1:
                if self.armsBehindBackPose():
                    self.modifyLayer(4,2)
                else:
                    self.modifyLayer(4,1)
            if self.hasAcc2 and not self.armsBehindBackPose():
                self.modifyLayer(5,1)

            if self.hasBra:
                if self.armsMaterial() == "tape":
                    self.modifyLayer(14,2)
                elif self.armsMaterial() != "web":
                    self.modifyLayer(14,1)
            if self.hasInner:
                if self.mummifiedMaterial() == "tape":
                    self.modifyLayer(19,-1)
                elif self.mummifiedMaterial() == "web":
                    self.modifyLayer(19,3)
                elif self.armsMaterial() == "tape":
                    self.modifyLayer(19,4)
                elif self.armsMaterial() == "web":
                    self.modifyLayer(19,2)
                else:
                    self.modifyLayer(19,1)

            if self.mummifiedMaterial() == "web" and not self.legsAreInvisible():
                if self.isGrounded():
                    self.modifyLayer(21,4)
                else:
                    self.modifyLayer(21,5)
            elif self.mummifiedMaterial() == "tape" and not self.legsAreInvisible():
                if self.isGrounded():
                    self.modifyLayer(21,6)
                else:
                    self.modifyLayer(21,7)
            elif self.armsMaterial() == "rope":
                self.modifyLayer(21,0)
            elif self.armsMaterial() == "vines":
                self.modifyLayer(21,1)
            elif self.armsMaterial() == "regen_vines":
                self.modifyLayer(21,2)
            elif self.armsMaterial() == "web":
                self.modifyLayer(21,3)
            elif self.armsMaterial() == "tape":
                if self.hasBra or self.hasInner:
                    self.modifyLayer(21,9)
                else:
                    self.modifyLayer(21,8)
            elif self.armsMaterial() == "glow":
                self.modifyLayer(21,10)
                self.modifyLayer(0,0)
        else:
            # Free arms
            self.modifyLayer(3,0)
            if self.hasAcc1:
                self.modifyLayer(4,0)
            if self.hasAcc2:
                self.modifyLayer(5,0)

            if self.hasBra:
                self.modifyLayer(14,0)
            if self.hasInner:
                self.modifyLayer(18,0)
                self.modifyLayer(19,0)

        # neck
        if self.collarMaterial() == "bell":
            self.modifyLayer(28,0)
        elif self.collarMaterial() == "rune":
            self.modifyLayer(28,1)
        elif self.hasAcc4:
            self.modifyLayer(8,0)

        # head
        if self.hasAnger:
            self.modifyLayer(29,0)
        if not self.isMouthBound():
            self.modifyLayer(30,self.mouthIndex-1)

        if self.mouthMaterial() == "rope":
            self.modifyLayer(31,0)
        elif self.mouthMaterial() == "ball_big":
            self.modifyLayer(31,1)
        elif self.mouthMaterial() == "ball":
            self.modifyLayer(31,2)
        elif self.mouthMaterial() == "ball_strict":
            self.modifyLayer(31,2)
            if self.eyesMaterial() == "leather_blindfold":
                self.modifyLayer(45,1)
            else:
                self.modifyLayer(45,0)
        elif self.mouthMaterial() == "cloth":
            self.modifyLayer(31,3)
        elif self.mouthMaterial() == "web":
            if self.mummifiedMaterial() == "web":
                self.modifyLayer(31,5)
            else:
                self.modifyLayer(31,4)
        elif self.mouthMaterial() == "tape":
            if self.mummifiedMaterial() == "tape":
                self.modifyLayer(31,7)
            else:
                self.modifyLayer(31,6)

        if self.hasDrool:
            if self.mouthMaterial() == "ball_big":
                self.modifyLayer(32,0)
            elif self.mouthMaterial() == "ball":
                self.modifyLayer(32,1)
            elif self.mouthMaterial() == "ball_strict":
                self.modifyLayer(32,1)
            elif self.mouthMaterial() == "cloth":
                self.modifyLayer(32,2)

        self.modifyLayer(33,self.eyebrowsIndex-1)
        if not self.isEyesBound():
            self.modifyLayer(34,self.eyesIndex-1)

        if self.eyesMaterial() == "cloth":
            self.modifyLayer(35,0)
        elif self.eyesMaterial() == "rope":
            self.modifyLayer(35,1)
        elif self.eyesMaterial() == "web":
            self.modifyLayer(35,2)
        elif self.eyesMaterial() == "leather_blindfold":
            self.modifyLayer(35,3)

        if self.hasBlush:
            self.modifyLayer(36,0)
        if self.hasFaceShadow:
            self.modifyLayer(37,0)
        if self.hasAshen:
            self.modifyLayer(38,0)
        if self.hasExtraBlush:
            self.modifyLayer(39,0)
        if self.hasSweat:
            self.modifyLayer(40,0)
        if self.hasExtraSweat:
            self.modifyLayer(41,0)

        if self.hasHeadwear and self.grabberConfig != "sandbag":
            self.modifyLayer(44,0)
