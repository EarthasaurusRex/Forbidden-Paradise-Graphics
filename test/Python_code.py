self.legsPose = (1 if self.hasAcc1 else 0)
self.hasDecorativeLegCollars = self.hasLegWear
self.wearingBelt = self.hasPanties
self.legsChained = self.hasAcc2

self.fullShirt = self.hasOuter
self.noRipping = self.hasInner
self.hasShirt = self.hasBra

if self.legsPose == 0:
    # legs base
    self.modifyLayer(1,0)

    # shoes
    if self.hasShoes:
        self.modifyLayer(2,0)
        self.modifyLayer(3,0)

    # belt
    if self.wearingBelt:
        self.modifyLayer(4,0)

    # leg bindings
    if self.hasDecorativeLegCollars:
        self.modifyLayer(5,0)
    if self.legsChained:
        self.modifyLayer(5,1)
elif self.legsPose == 1:
    # legs base
    self.modifyLayer(1,1)

    # shoes
    if self.hasShoes:
        self.modifyLayer(2,1)
        self.modifyLayer(3,1)

    # belt
    if self.wearingBelt:
        self.modifyLayer(4,2)

    # leg bindings
    if self.hasDecorativeLegCollars:
        self.modifyLayer(5,2)
    if self.legsChained:
        self.modifyLayer(5,3)

# Arms
self.armsPose = 0
if self.armsAreTogether() or self.armsBehindBackPose():
    self.armsPose = 1 # arms behind back
else:
    self.armsPose = 0 # arms free

self.shirtState = (0 if self.noRipping else 2) + (0 if self.fullShirt else 1)

self.modifyLayer(8,self.armsPose) # arms pose

if self.hasShirt:
    if self.fullShirt:
        self.modifyLayer(10, 0) # shirt shade
        if not self.noRipping:
            self.modifyLayer(11, 0) # shirt shade
    else:
        self.modifyLayer(10, 1) # shirt shade
        if not self.noRipping:
            self.modifyLayer(11, 1) # shirt shade
    self.modifyLayer(12,self.armsPose + self.shirtState * 3) # shirt

# arm bindings
if self.armsAreTogether():
    if self.armsMaterial() == "metal_cuffs":
        self.modifyLayer(15,0)

# Nipples
if self.nippleMaterial() == "nipple_clamps":
    self.modifyLayer(17, 0)

# face
if not self.isMouthBound():
    self.modifyLayer(24,self.mouthIndex-1)

if self.mouthMaterial() == "cloth":
    self.modifyLayer(25,0)
if self.hasDrool:
    if self.mouthMaterial() == "cloth":
        self.modifyLayer(26,0)

self.modifyLayer(27,self.eyebrowsIndex-1)
if not self.isEyesBound():
    self.modifyLayer(28,self.eyesIndex-1)

if self.eyesMaterial() == "cloth":
    self.modifyLayer(29,0)

if self.hasBlush:
    self.modifyLayer(31,0)
if self.hasFaceShadow:
    self.modifyLayer(32,0)
if self.hasAshen:
    self.modifyLayer(33,0)
if self.hasExtraBlush:
    self.modifyLayer(34,0)
if self.hasSweat:
    self.modifyLayer(35,0)
if self.hasExtraSweat:
    self.modifyLayer(36,0)

# neck
if self.collarMaterial() == "rune":
    self.modifyLayer(39,0)