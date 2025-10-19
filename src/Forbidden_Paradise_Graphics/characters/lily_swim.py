import os
from Forbidden_Paradise_Graphics.characters import Character
from Forbidden_Paradise_Graphics.characters.character import resource_path


class LilySwim(Character):
    def __init__(self):
        super().__init__()
        self.image_path = resource_path(os.path.join("img", "pictures", "characters", "lily_swim"))

    def build_layers(self):
        self.layers = {}
        
        # Swim ring
        if not self.isGrounded() and not self.armsAreTogether():
            self.modifyLayer(1,0)


        # Legs area
        if not self.legsAreInvisible():
            if not self.isGrounded():
                if self.legsAreTogether():
                    # standing, legs tied
                    if self.legsWebLikePose():
                        pass #this.modifyLayer(2,3);
                    else:
                        self.modifyLayer(2,1)

                    if self.hasPanties:
                        if self.hasLegWear:
                            self.modifyLayer(7,3)
                        else:
                            self.modifyLayer(7,2)
                    if self.hasLegWear:
                        self.modifyLayer(8,1)

                    if self.hasShoes:
                        if self.isFullyMummified():
                            self.modifyLayer(4,-1)
                        else:
                            self.modifyLayer(4,1)

                    if self.isFullyMummified():
                        # NOTHING - mummification layer is on arms layer
                        pass
                    elif self.legsMaterial() == "rope":
                        self.modifyLayer(16,0)
                    elif self.legsMaterial() == "vines":
                        self.modifyLayer(16,1)
                    elif self.legsMaterial() == "regen_vines":
                        pass
                    elif self.legsMaterial() == "web":
                        pass
                    elif self.legsMaterial() == "tape":
                        pass
                    elif self.legsMaterial() == "glow":
                        self.modifyLayer(16,2)
                        self.modifyLayer(1,0)
                else:
                    # standing, legs free
                    self.modifyLayer(2,0)

                    if self.hasPanties:
                        if self.hasLegWear:
                            self.modifyLayer(7,1)
                        else:
                            self.modifyLayer(7,0)
                    if self.hasLegWear:
                        self.modifyLayer(8,0)
                    if self.hasShoes:
                        self.modifyLayer(4,0)

                # TODO: export crotch rope shading layer too

                if self.isFullyMummified():
                    # DO NOTHING
                    pass
                elif self.crotchRopeMaterial() == "rope":
                    self.modifyLayer(17,0)
                elif self.crotchRopeMaterial() == "vines":
                    self.modifyLayer(17,1)
                elif self.crotchRopeMaterial() == "regen_vines":
                    pass
                elif self.crotchRopeMaterial() == "glow":
                    self.modifyLayer(17,2)
                    self.modifyLayer(2,0)
            elif not self.legsAreTogether():
                # trip 1
                self.modifyLayer(2,2)

                if self.hasPanties:
                    if self.hasLegWear:
                        self.modifyLayer(7,5)
                    else:
                        self.modifyLayer(7,4)
                if self.hasLegWear:
                    self.modifyLayer(8,2)

                if self.hasShoes:
                    if self.armsAreTogether():
                        self.modifyLayer(4,2)
                    else:
                        self.modifyLayer(4,3)

                # TODO: export crotch rope shading layer too

                if self.isFullyMummified():
                    # DO NOTHING
                    pass
                elif self.crotchRopeMaterial() == "rope":
                    self.modifyLayer(17,0)
                elif self.crotchRopeMaterial() == "vines":
                    self.modifyLayer(17,1)
                elif self.crotchRopeMaterial() == "regen_vines":
                    pass
                elif self.crotchRopeMaterial() == "glow":
                    self.modifyLayer(17,2)
                    self.modifyLayer(2,0)
            else:
                # trip 2
                self.modifyLayer(20,0)

                if self.hasShoes:
                    if self.isFullyMummified():
                        self.modifyLayer(21,-1)
                    else:
                        self.modifyLayer(21,0)

                if self.hasPanties:
                    self.modifyLayer(22,0)

                if self.isFullyMummified():
                    # DO NOTHING
                    pass
                elif self.crotchRopeMaterial() == "rope":
                    self.modifyLayer(23,0)
                elif self.crotchRopeMaterial() == "vines":
                    self.modifyLayer(23,1)
                elif self.crotchRopeMaterial() == "regen_vines":
                    pass
                elif self.crotchRopeMaterial() == "glow":
                    self.modifyLayer(23,2)
                    self.modifyLayer(2,1)

                if self.legsMaterial() == "rope":
                    self.modifyLayer(24,0)
                elif self.legsMaterial() == "vines":
                    self.modifyLayer(24,1)
                elif self.legsMaterial() == "regen_vines":
                    # TODO
                    pass
                elif self.legsMaterial() == "web":
                    # TODO
                    pass
                elif self.legsMaterial() == "tape":
                    # TODO
                    pass
                elif self.legsMaterial() == "glow":
                    self.modifyLayer(24,2)
                    self.modifyLayer(1,1)

        # Arms area
        if self.armsAreTogether():
            # Bound arms
            if self.armsBehindBackPose():
                pass
            else:
                self.modifyLayer(3,1)

            if self.hasBra:
                self.modifyLayer(12,2)

            if self.hasInner:
                self.modifyLayer(13,1)


            if self.mummifiedMaterial() == "web" and not self.legsAreInvisible():
                pass
            elif self.mummifiedMaterial() == "tape" and not self.legsAreInvisible():
                pass
            elif self.armsMaterial() == "rope":
                self.modifyLayer(15,0)
            elif self.armsMaterial() == "vines":
                self.modifyLayer(15,1)
            elif self.armsMaterial() == "regen_vines":
                pass
            elif self.armsMaterial() == "web":
                pass
            elif self.armsMaterial() == "tape":
                pass
            elif self.armsMaterial() == "glow":
                self.modifyLayer(15,2)
                # self.modifyLayer(0,0)
        else:
            # Free arms
            if self.isGrounded() and not self.legsAreTogether():
                self.modifyLayer(3,2)
            else:
                self.modifyLayer(3,0)

            if self.hasAcc1:
                self.modifyLayer(10,0)

            if self.hasBra:
                self.modifyLayer(12,1)
            if self.hasInner:
                self.modifyLayer(13,0)

        # Hair
        self.modifyLayer(25,0)

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
            self.modifyLayer(46,0)
