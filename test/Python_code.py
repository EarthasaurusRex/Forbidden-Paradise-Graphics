# Enemy
if grabberConfig == "human":
    self.modifyLayer(0,0)

    if self.armsBehindBackPose():
        self.modifyLayer(45,3)
    elif self.armsAreTogether():
        self.modifyLayer(45,2)
    elif hasAcc1:
        self.modifyLayer(45,1)
    else:
        self.modifyLayer(45,0)
elif grabberConfig == "plant":
    self.modifyLayer(45,5)
elif grabberConfig == "sandbag":
    self.modifyLayer(45,4)
elif grabberConfig == "pole":
    self.modifyLayer(0,1)
elif grabberConfig == "caterpillar":
    self.modifyLayer(0,2)
elif grabberConfig == "bossPillar":
    self.modifyLayer(45,7)
elif grabberConfig == "rope_walk":
    self.modifyLayer(0,3)
    self.modifyLayer(45,6)

isTrip1 = None

# Legs area
if not self.legsAreInvisible():
    if not self.isGrounded():
        if self.legsAreTogether():
            # standing, legs tied
            if self.legsWebLikePose():
                self.modifyLayer(1,3)
            else:
                self.modifyLayer(1,1)

            if hasLegWear:
                if self.legsWebLikePose():
                    if hasAcc3:
                        self.modifyLayer(7,7)
                    else:
                        self.modifyLayer(7,6)
                    self.modifyLayer(8,3)
                else:
                    if hasAcc3:
                        self.modifyLayer(7,3)
                    else:
                        self.modifyLayer(7,2)
                    self.modifyLayer(8,1)

            if self.isFullyMummified():
                # DO NOTHING
                pass
            elif hasShoes:
                self.modifyLayer(13,1)

            if self.isFullyMummified():
                # NOTHING - mummification layer is on arms layer
                pass
            elif self.legsMaterial() == "rope":
                self.modifyLayer(18,0)
            elif self.legsMaterial() == "vines":
                self.modifyLayer(18,1)
            elif self.legsMaterial() == "regen_vines":
                self.modifyLayer(18,6)
            elif self.legsMaterial() == "web":
                self.modifyLayer(18,2)
            elif self.legsMaterial() == "tape":
                self.modifyLayer(18,5)
        else:
            # standing, legs free
            self.modifyLayer(1,0)
            if hasLegWear:
                if hasAcc3:
                    self.modifyLayer(7,1)
                else:
                    self.modifyLayer(7,0)
                self.modifyLayer(8,0)
            if hasShoes:
                self.modifyLayer(13,0)

        if self.hasCrotchRope():
            if hasInner:
                self.modifyLayer(12,2)
            elif hasPanties:
                self.modifyLayer(12,1)
            else:
                self.modifyLayer(12,0)
        if hasPanties:
            self.modifyLayer(5,0)

        if self.isFullyMummified():
            # DO NOTHING
            pass
        elif self.crotchRopeMaterial() == "rope":
            self.modifyLayer(19,0)
        elif self.crotchRopeMaterial() == "vines":
            self.modifyLayer(19,1)
        elif self.crotchRopeMaterial() == "regen_vines":
            self.modifyLayer(19,2)
    elif not self.legsAreTogether():
        # trip 1
        isTrip1 = True

        if hasShoes:
            self.modifyLayer(1,4)
            self.modifyLayer(13,2)
            if hasLegWear:
                if hasAcc3:
                    self.modifyLayer(7,9)
                else:
                    self.modifyLayer(7,8)
        else:
            self.modifyLayer(1,2)
            if hasLegWear:
                if hasAcc3:
                    self.modifyLayer(7,5)
                else:
                    self.modifyLayer(7,4)
                self.modifyLayer(8,2)

        if self.hasCrotchRope():
            if hasInner:
                self.modifyLayer(12,5)
            elif hasPanties:
                self.modifyLayer(12,4)
            else:
                self.modifyLayer(12,3)
        if hasPanties:
            self.modifyLayer(5,3)

        if self.isFullyMummified():
            # DO NOTHING
            pass
        elif self.crotchRopeMaterial() == "rope":
            self.modifyLayer(19,0)
        elif self.crotchRopeMaterial() == "vines":
            self.modifyLayer(19,1)
        elif self.crotchRopeMaterial() == "regen_vines":
            self.modifyLayer(19,2)
    else:
        # trip 2

        self.modifyLayer(22,0)

        if hasPanties:
            self.modifyLayer(23,0)
        if hasInner:
            self.modifyLayer(26,0)
        if hasLegWear:
            if hasAcc3:
                self.modifyLayer(24,1)
            else:
                self.modifyLayer(24,0)
            self.modifyLayer(25,0)

        if hasShoes:
            if self.isFullyMummified():
                self.modifyLayer(28,-1)
            else:
                self.modifyLayer(28,0)

        if self.isFullyMummified():
            # DO NOTHING
            pass
        elif self.crotchRopeMaterial() == "rope":
            self.modifyLayer(27,0)
        elif self.crotchRopeMaterial() == "vines":
            self.modifyLayer(27,1)
        elif self.crotchRopeMaterial() == "regen_vines":
            self.modifyLayer(27,2)

        if self.legsMaterial() == "rope":
            self.modifyLayer(29,0)
        elif self.legsMaterial() == "vines":
            self.modifyLayer(29,1)
        elif self.legsMaterial() == "regen_vines":
            self.modifyLayer(29,4)
        elif self.legsMaterial() == "web":
            self.modifyLayer(22,1)
            if self.mummifiedMaterial() == "web":
                self.modifyLayer(29,3)
            else:
                self.modifyLayer(29,2)
        elif self.legsMaterial() == "tape":
            self.modifyLayer(22,1)
            if self.mummifiedMaterial() == "tape":
                self.modifyLayer(29,6)
            else:
                self.modifyLayer(29,5)

trip1Mod = 1 if isTrip1 else 0

upperBodyMod = 3 if self.eyesMaterial() == "tape_hood" else 0

# Arms area
if self.armsAreTogether():
    # Bound arms
    if self.armsBehindBackPose():
        self.modifyLayer(2,2+upperBodyMod)
    else:
        self.modifyLayer(2,1+upperBodyMod)

    if hasBra:
        if self.isFullyMummified():
            self.modifyLayer(10,-1)
        elif self.armsBehindBackPose():
            self.modifyLayer(10,2)
        else:
            self.modifyLayer(10,1)
    if hasInner:
        if self.isFullyMummified():
            self.modifyLayer(11,-1)
        elif self.armsBehindBackPose():
            self.modifyLayer(11,4 + trip1Mod)
            if hasLegWear:
                self.modifyLayer(9,3)
        else:
            if hasLegWear:
                self.modifyLayer(9,1)
            self.modifyLayer(11,2 + trip1Mod)

    if self.mummifiedMaterial() == "web" and not self.legsAreInvisible():
        if self.isGrounded():
            self.modifyLayer(17,7)
        else:
            self.modifyLayer(17,6)
    elif self.mummifiedMaterial() == "tape" and not self.legsAreInvisible():
        if self.isGrounded():
            self.modifyLayer(17,9)
        else:
            self.modifyLayer(17,8)
    elif self.armsMaterial() == "rope":
        self.modifyLayer(17,0)
    elif self.armsMaterial() == "vines":
        self.modifyLayer(17,1)
    elif self.armsMaterial() == "regen_vines":
        self.modifyLayer(17,10)
    elif self.armsMaterial() == "web":
        self.modifyLayer(17,2)
    elif self.armsMaterial() == "tape":
        if hasInner:
            self.modifyLayer(17,4)
        elif hasBra:
            self.modifyLayer(17,4)
        else:
            self.modifyLayer(17,5)
    elif self.armsMaterial() == "partial_tape_mummy":
        self.modifyLayer(17,9)
else:
    # Free arms
    self.modifyLayer(2,0+upperBodyMod)
    if hasBra:
        self.modifyLayer(10,0)
    if hasInner:
        if hasLegWear:
            self.modifyLayer(9,0)
        self.modifyLayer(11,0 + trip1Mod)
    if hasAcc1:
        self.modifyLayer(14,0)

# neck
if self.collarMaterial() == "bell":
    self.modifyLayer(31,2)
elif self.collarMaterial() == "rune":
    if self.isFullyMummified():
        self.modifyLayer(31,4)
    else:
        self.modifyLayer(31,3)
elif hasAcc2:
    if self.armsAreTogether():
        self.modifyLayer(31,1)
    else:
        self.modifyLayer(31,0)

# head
if hasAnger:
    self.modifyLayer(32,0)
if not self.isMouthBound():
    self.modifyLayer(33,mouthIndex-1)

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

if hasDrool:
    if self.mouthMaterial() == "ball_big":
        self.modifyLayer(35,0)
    elif self.mouthMaterial() == "ball":
        self.modifyLayer(35,1)
    elif self.mouthMaterial() == "ball_strict":
        self.modifyLayer(35,1)
    elif self.mouthMaterial() == "cloth":
        self.modifyLayer(35,2)

if self.eyesMaterial() != "tape_hood":
    self.modifyLayer(36,eyebrowsIndex-1)
if not self.isEyesBound():
    self.modifyLayer(37,eyesIndex-1)

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

if hasBlush:
    self.modifyLayer(39,0)
if hasFaceShadow:
    self.modifyLayer(40,0)
if hasAshen:
    self.modifyLayer(41,0)
if hasExtraBlush:
    self.modifyLayer(42,0)
if hasSweat:
    self.modifyLayer(43,0)
if hasExtraSweat:
    self.modifyLayer(44,0)

if hasHeadwear and grabberConfig != "sandbag":
    self.modifyLayer(48,0)
    if self.eyesMaterial() == "tape_hood":
        self.modifyLayer(48,1)

# Set this back to -1. Do not use this layer as it does not seem to actually fix the aliasing problem.
self.modifyLayer(8,-1)