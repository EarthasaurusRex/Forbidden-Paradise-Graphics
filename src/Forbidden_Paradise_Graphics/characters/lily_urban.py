from .character import Character


class LilyUrban(Character):
    def __init__(self):
        super().__init__()
        self.image_path = "img\\pictures\\characters\\lily_urban"

    def build_layers(self):
        self.layers = {}
        
        # region Enemy
        if self.grabberConfig == "human":
            self.modifyLayer(0, 0)

            if self.armsMaterial() == "web":
                self.modifyLayer(42, 12)
            else:
                if self.armsAreTogether():
                    if self.hasOuter:
                        self.modifyLayer(42, 7)
                    elif self.hasInner:
                        self.modifyLayer(42, 6)
                    elif self.hasBra:
                        self.modifyLayer(42, 5)
                    else:
                        self.modifyLayer(42, 4)
                else:
                    if self.hasOuter:
                        self.modifyLayer(42, 3)
                    elif self.hasInner:
                        self.modifyLayer(42, 2)
                    elif self.hasBra:
                        self.modifyLayer(42, 1)
                    else:
                        self.modifyLayer(42, 0)
        elif self.grabberConfig == "plant":
            self.modifyLayer(42, 8)
            self.modifyLayer(43, 0)
        elif self.grabberConfig == "red_plant":
            self.modifyLayer(42, 9)
            self.modifyLayer(43, 0)
        elif self.grabberConfig == "sandbag":
            self.modifyLayer(42, 10)
        elif self.grabberConfig == "pole":
            self.modifyLayer(0, 1)
        elif self.grabberConfig == "caterpillar":
            self.modifyLayer(0, 2)
        elif self.grabberConfig == "bossPillar":
            self.modifyLayer(42, 11)
        # endregion

        # region Legs
        if not self.legsAreInvisible():
            if not self.isGrounded():
                if self.legsAreTogether():
                    # standing, legs tied
                    if self.legsWebLikePose():
                        self.modifyLayer(1, 3)
                    else:
                        self.modifyLayer(1, 1)

                    if self.hasCrotchRope():
                        self.modifyLayer(3, 0)
                        if self.hasInner:
                            if self.isFullyMummified():
                                pass
                            else:
                                if (self.armsMaterial() == "web" or self.armsMaterial() == "tape"):
                                    self.modifyLayer(13, 6)
                                else:
                                    self.modifyLayer(13, 2)
                    else:
                        if self.hasInner:
                            if self.isFullyMummified():
                                pass
                            else:
                                if (self.armsMaterial() == "web" or self.armsMaterial() == "tape"):
                                    self.modifyLayer(13, 5)
                                else:
                                    self.modifyLayer(13, 1)

                    if self.hasLegWear:
                        if self.legsWebLikePose():
                            self.modifyLayer(4, 3)
                        else:
                            self.modifyLayer(4, 1)
                    if self.hasShoes:
                        if self.isFullyMummified():
                            pass
                        else:
                            if (self.legsMaterial() == "web"):
                                self.modifyLayer(9, 3)
                            else:
                                self.modifyLayer(9, 1)

                            if self.hasLegWear:
                                self.modifyLayer(8, 5)
                            else:
                                self.modifyLayer(8, 4)

                    if (self.legsMaterial() == "rope"):
                        self.modifyLayer(18, 0)
                    elif (self.legsMaterial() == "vines"):
                        self.modifyLayer(18, 1)
                    elif (self.legsMaterial() == "regen_vines"):
                        self.modifyLayer(18, 2)
                    elif (self.legsMaterial() == "web"):
                        self.modifyLayer(18, 4)
                    elif (self.legsMaterial() == "tape"):
                        if self.hasShoes:
                            self.modifyLayer(18, 6)
                        else:
                            self.modifyLayer(18, 5)

                else:
                    # standing, legs free
                    self.modifyLayer(1, 0)
                    if self.hasCrotchRope():
                        self.modifyLayer(3, 0)
                        if self.hasInner:
                            if self.isFullyMummified():
                                pass
                            else:
                                if (self.armsMaterial() == "web" or self.armsMaterial() == "tape"):
                                    self.modifyLayer(13, 6)
                                else:
                                    self.modifyLayer(13, 2)

                    else:
                        if self.hasInner:
                            if self.isFullyMummified():
                                pass
                            else:
                                if (self.armsMaterial() == "web" or self.armsMaterial() == "tape"):
                                    self.modifyLayer(13, 5)
                                elif (self.armsAreTogether() and self.hasOuter):
                                    self.modifyLayer(13, 1)
                                else:
                                    self.modifyLayer(13, 0)

                    if self.hasLegWear:
                        self.modifyLayer(4, 0)
                    if self.hasShoes:
                        if self.hasLegWear:
                            self.modifyLayer(8, 1)
                        else:
                            self.modifyLayer(8, 0)
                        self.modifyLayer(9, 0)

                if self.hasCrotchRope():
                    if self.hasPanties:
                        self.modifyLayer(7, 1)
                else:
                    if self.hasPanties:
                        self.modifyLayer(7, 0)

                if self.isFullyMummified():
                    pass
                else:
                    if (self.crotchRopeMaterial() == "rope"):
                        self.modifyLayer(14, 0)
                    elif (self.crotchRopeMaterial() == "vines"):
                        self.modifyLayer(14, 1)
                    elif (self.crotchRopeMaterial() == "regen_vines"):
                        self.modifyLayer(14, 2)

            else:  # if (!this.isGrounded())
                if not self.legsAreTogether():  # trip 1
                    self.modifyLayer(1, 2)
                    if self.hasLegWear:
                        self.modifyLayer(4, 2)
                    if self.hasShoes:
                        if self.hasLegWear:
                            self.modifyLayer(8, 3)
                        else:
                            self.modifyLayer(8, 2)

                        self.modifyLayer(9, 2)

                    if self.hasCrotchRope():
                        self.modifyLayer(3, 0)
                        if self.hasPanties:
                            self.modifyLayer(7, 3)
                        if self.hasInner:
                            self.modifyLayer(12, 1)
                            if self.isFullyMummified():
                                pass
                            else:
                                if (self.armsMaterial() == "web" or self.armsMaterial() == "tape"):
                                    self.modifyLayer(13, 8)
                                else:
                                    self.modifyLayer(13, 4)

                    else:
                        if self.hasPanties:
                            self.modifyLayer(7, 2)
                        if self.hasInner:
                            self.modifyLayer(12, 0)
                            if self.isFullyMummified():
                                pass
                            else:
                                if (self.armsMaterial() == "web" or self.armsMaterial() == "tape"):
                                    self.modifyLayer(13, 7)
                                else:
                                    self.modifyLayer(13, 3)

                else:  # trip 2

                    self.modifyLayer(21, 0)
                    if self.hasPanties:
                        self.modifyLayer(22, 0)
                    if self.hasLegWear:
                        self.modifyLayer(24, 0)

                    if self.hasShoes:
                        if self.isFullyMummified():
                            pass
                        else:
                            if (self.legsMaterial() == "web"):
                                self.modifyLayer(26, -1)
                                self.modifyLayer(27, 1)
                            else:
                                if self.hasLegWear:
                                    self.modifyLayer(26, 1)
                                else:
                                    self.modifyLayer(26, 0)

                                if (self.legsMaterial() == "tape"):
                                    self.modifyLayer(27, 2)
                                else:
                                    self.modifyLayer(27, 0)

                    if self.isFullyMummified():
                        pass
                    else:
                        if (self.crotchRopeMaterial() == "rope"):
                            self.modifyLayer(23, 0)
                        elif (self.crotchRopeMaterial() == "vines"):
                            self.modifyLayer(23, 1)
                        elif (self.crotchRopeMaterial() == "regen_vines"):
                            self.modifyLayer(23, 2)

                    if (self.legsMaterial() == "rope"):
                        self.modifyLayer(25, 0)
                    elif (self.legsMaterial() == "vines"):
                        self.modifyLayer(25, 1)
                    elif (self.legsMaterial() == "regen_vines"):
                        self.modifyLayer(25, 2)

                    elif (self.legsMaterial() == "web"):
                        self.modifyLayer(21, 1)
                        if self.hasLegWear:
                            self.modifyLayer(24, 1)
                        if (self.mummifiedMaterial() == "web"):
                            self.modifyLayer(25, 4)
                        else:
                            self.modifyLayer(25, 3)

                    elif (self.legsMaterial() == "tape"):
                        self.modifyLayer(21, 1)
                        if self.hasLegWear:
                            self.modifyLayer(24, 1)
                        if (self.mummifiedMaterial() == "tape"):
                            self.modifyLayer(25, 6)
                        else:
                            self.modifyLayer(25, 5)

                    if self.isFullyMummified():
                        self.modifyLayer(13, -1)
                    if self.hasInner:
                        if self.isFullyMummified():
                            pass
                        else:
                            if (self.armsMaterial() == "web" or self.armsMaterial() == "tape"):
                                self.modifyLayer(13, 9)
                            else:
                                self.modifyLayer(13, 3)
        # endregion

        # region Arms
        if self.armsAreTogether():
            # Bound arms
            if self.armsBehindBackPose():

                if self.hasBra:
                    self.modifyLayer(2, 3)
                else:
                    self.modifyLayer(2, 2)

                self.modifyLayer(6, -1)
            else:
                self.modifyLayer(2, 1)
                if self.hasBra:
                    self.modifyLayer(6, 1)

            if self.hasInner:
                if self.mummifiedMaterial() == "tape":
                    self.modifyLayer(11, -1)
                elif self.mummifiedMaterial() == "web":
                    self.modifyLayer(11, 4)
                elif self.armsMaterial() == "web":
                    self.modifyLayer(11, 3)
                elif self.armsMaterial() == "tape":
                    self.modifyLayer(11, 5)
                elif self.mittensMaterial() != "leather_binder":
                    self.modifyLayer(11, 1)
                else:
                    self.modifyLayer(11, 2)

            if self.hasOuter:
                if self.mummifiedMaterial() == "web":
                    self.modifyLayer(17, 5)
                elif self.mummifiedMaterial() == "tape":
                    self.modifyLayer(17, -1)
                elif (
                    self.armsMaterial() == "web"
                    or self.armsMaterial() == "tape"
                ):
                    if self.hasInner:
                        self.modifyLayer(15, 14)
                    elif self.hasPanties:
                        self.modifyLayer(15, 13)
                    else:
                        self.modifyLayer(15, 12)

                    if self.armsMaterial() == "web":
                        if self.isGrounded():
                            self.modifyLayer(17, 3)
                        else:
                            self.modifyLayer(17, 4)
                    elif self.armsMaterial() == "tape":
                        if self.isGrounded():
                            self.modifyLayer(17, 7)
                        else:
                            self.modifyLayer(17, 6)
                else:
                    if self.hasInner:
                        self.modifyLayer(15, 1)
                    elif self.hasBra and self.hasPanties:
                        self.modifyLayer(15, 9)

                    if self.isGrounded():
                        if self.hasInner:
                            self.modifyLayer(15, 2)
                        elif self.hasBra and self.hasPanties:
                            self.modifyLayer(15, 10)
                        self.modifyLayer(17, 2)
                    else:
                        self.modifyLayer(17, 1)

            if (
                self.mummifiedMaterial() == "web"
                and not self.legsAreInvisible()
            ):
                if self.isGrounded():
                    if self.hasBra:
                        self.modifyLayer(19, 7)
                    else:
                        self.modifyLayer(19, 6)
                else:
                    if self.hasBra:
                        self.modifyLayer(19, 9)
                    else:
                        self.modifyLayer(19, 8)
            elif (
                self.mummifiedMaterial() == "tape"
                and not self.legsAreInvisible()
            ):
                if self.isGrounded():
                    self.modifyLayer(19, 11)
                else:
                    self.modifyLayer(19, 10)
            elif self.armsMaterial() == "rope":
                self.modifyLayer(19, 0)
            elif self.armsMaterial() == "vines":
                self.modifyLayer(19, 1)
            elif self.armsMaterial() == "regen_vines":
                self.modifyLayer(19, 2)
            elif self.armsMaterial() == "web":
                if self.hasBra:
                    self.modifyLayer(19, 5)
                else:
                    self.modifyLayer(19, 4)
            elif self.armsMaterial() == "tape":
                if self.hasOuter:
                    self.modifyLayer(19, 14)
                elif self.hasInner:
                    self.modifyLayer(19, 13)
                elif self.hasBra:
                    self.modifyLayer(19, 14)
                else:
                    self.modifyLayer(19, 12)

            if self.mittensMaterial() == "leather_binder":
                self.modifyLayer(10, 0)
        else:
            # Free arms
            self.modifyLayer(2, 0)
            if self.hasBra:
                self.modifyLayer(6, 0)
            if self.hasInner:
                self.modifyLayer(11, 0)

            if self.hasOuter:
                if self.hasInner:
                    self.modifyLayer(15, 0)
                elif self.hasBra and self.hasPanties:
                    self.modifyLayer(15, 8)

                if self.isGrounded():
                    if self.hasInner:
                        self.modifyLayer(15, 0)  # TODO: missing 3 here
                    elif self.hasBra and self.hasPanties:
                        self.modifyLayer(15, 11)
                self.modifyLayer(17, 0)
        # endregion

        # region Nipples
        if self.nippleMaterial() == "nipple_clamps":
            self.modifyLayer(20, 0)
        # endregion

        # region Special
        if self.hasOuter and not self.hasInner and self.armsAreTogether() and not self.isGrounded():
            if self.isFullyMummified():
                pass
            elif self.armsMaterial() == "web" or self.armsMaterial() == "tape":
                self.modifyLayer(16, 1)
            else:
                self.modifyLayer(16, 0)
        # endregion

        # region Neck
        if self.collarMaterial() == "bell":
            self.modifyLayer(28, 0)
        elif self.collarMaterial() == "rune":
            self.modifyLayer(28, 1)
        # endregion

        # region Head
        if self.hasAnger:
            self.modifyLayer(29, 0)
        if not self.isMouthBound():
            self.modifyLayer(30, self.mouthIndex - 1)

        if self.mouthMaterial() == "rope":
            self.modifyLayer(31, 0)
        elif self.mouthMaterial() == "ball_big":
            self.modifyLayer(31, 1)
        elif self.mouthMaterial() == "ball":
            self.modifyLayer(31, 2)
        elif self.mouthMaterial() == "ball_strict":
            self.modifyLayer(31, 2)

            if self.eyesMaterial() == "leather_blindfold":
                self.modifyLayer(44, 1)
            else:
                self.modifyLayer(44, 0)
        elif self.mouthMaterial() == "cloth":
            self.modifyLayer(31, 3)
        elif self.mouthMaterial() == "bit_gag":
            self.modifyLayer(31, 4)
        elif self.mouthMaterial() == "web":
            if self.mummifiedMaterial() == "web":
                self.modifyLayer(31, 6)
            else:
                self.modifyLayer(31, 5)
        elif self.mouthMaterial() == "tape":
            if self.mummifiedMaterial() == "tape":
                self.modifyLayer(31, 8)
            else:
                self.modifyLayer(31, 7)

        if self.hasDrool:
            if self.mouthMaterial() == "ball_big":
                self.modifyLayer(32, 0)
            elif self.mouthMaterial() == "ball":
                self.modifyLayer(32, 1)
            elif self.mouthMaterial() == "ball_strict":
                self.modifyLayer(32, 1)
            elif self.mouthMaterial() == "cloth":
                self.modifyLayer(32, 2)
            elif self.mouthMaterial() == "bit_gag":
                self.modifyLayer(32, 3)

        self.modifyLayer(33, self.eyebrowsIndex - 1)
        if not self.isEyesBound():
            self.modifyLayer(34, self.eyesIndex - 1)

        if self.eyesMaterial() == "cloth":
            self.modifyLayer(35, 0)
        elif self.eyesMaterial() == "rope":
            self.modifyLayer(35, 1)
        elif self.eyesMaterial() == "leather_blindfold":
            self.modifyLayer(35, 2)
        elif self.eyesMaterial() == "web":
            self.modifyLayer(35, 3)

        if self.hasBlush:
            self.modifyLayer(36, 0)
        if self.hasFaceShadow:
            self.modifyLayer(37, 0)
        if self.hasAshen:
            self.modifyLayer(38, 0)
        if self.hasExtraBlush:
            self.modifyLayer(39, 0)
        if self.hasSweat:
            self.modifyLayer(40, 0)
        if self.hasExtraSweat:
            self.modifyLayer(41, 0)

        if self.hasHeadwear and self.grabberConfig != "sandbag":
            self.modifyLayer(45, 0)
            self.modifyLayer(46, 0)
        # endregion

        # region Hide outer when grabbed by plant
        if self.grabberConfig == "plant":
            self.modifyLayer(17, -1)
        # endregion

        # region Vibe
        if self.intimateMaterial() == "bullet_vibe":
            if self.vibeIntensity() == 0:
                self.modifyLayer(5, 0)
            elif self.vibeIntensity() > 0:
                self.modifyLayer(5, 1)
        # endregion
