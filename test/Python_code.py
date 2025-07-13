isCat = self.hasAcc2
baseOutfit = self.lastBaseOutfit()

# Enemy
if self.grabberConfig == "human":
    self.modifyLayer(0,0)

    if self.armsAreTogether():
        if self.hasOuter:
            self.modifyLayer(32,7)
        elif self.hasInner:
            self.modifyLayer(32,6)
        elif self.hasBra:
            self.modifyLayer(32,5)
        else:
            self.modifyLayer(32,4)
    else:
        if self.hasOuter:
            self.modifyLayer(32,3)
        elif self.hasInner:
            self.modifyLayer(32,2)
        elif self.hasBra:
            self.modifyLayer(32,1)
        else:
            self.modifyLayer(32,0)


# Tripped
if self.isGrounded():
    self.modifyLayer(13,1)
    if isCat:
        self.modifyLayer(1,3)
else:
    self.modifyLayer(3,0) # leg belt

    if isCat:
        self.modifyLayer(1,4)
    else:
        # Legs area
        if self.hasShoes:
            self.modifyLayer(1,1) # leg base with boots
        else:
            self.modifyLayer(1,0)

        # Has legs chains
        if self.hasAcc1:
            self.modifyLayer(1,2)


# Arms
if self.armsAreTogether():
    self.modifyLayer(4,1) # arms bound
    if self.mittensMaterial() == "leather_binder":
        self.modifyLayer(5,0) # arms mittened
else:
    self.modifyLayer(4,0) # arms visible

self.modifyLayer(6,0) # harness

# Hair
if self.isAlter:
    self.modifyLayer(7,1)
else:
    if baseOutfit:
        idToIndex = {
            "lily_urban": 0,
            "lily_bandit": 2,
            "lily_bunny": 3,
            "lily_sports": 4,
        }.get(baseOutfit)

        if idToIndex is not None:
            self.modifyLayer(7,idToIndex)
    else:
        self.modifyLayer(7,0)


# Nipples
if self.nippleMaterial() == "nipple_clamps":
    self.modifyLayer(8, 0)

# Inner
if self.hasInner:
    if self.armsAreTogether():
        self.modifyLayer(9,1)
    else:
        self.modifyLayer(9,0)

# Outer
if self.hasOuter:
    if self.armsAreTogether():
        if self.hasInner:
            self.modifyLayer(11,2)
        else:
            self.modifyLayer(11,0)
    else:
        self.modifyLayer(11,1)

    if self.hasInner:
        if self.armsAreTogether():
            self.modifyLayer(10,2)
        else:
            self.modifyLayer(10,1)
    else:
        self.modifyLayer(10,0)

# face
if not self.isMouthBound():
    self.modifyLayer(15,self.mouthIndex-1)

if self.mouthMaterial() == "ball_big" or self.mouthMaterial() == "ball_strict":
    self.modifyLayer(16,0)
    if self.eyesMaterial() == "leather_blindfold":
        self.modifyLayer(29,1)
elif self.mouthMaterial() == "ball":
    self.modifyLayer(16,1)
elif self.mouthMaterial() == "mouth_mask":
    self.modifyLayer(28,0)

if self.hasDrool:
    if self.mouthMaterial() == "ball_big" or self.mouthMaterial() == "ball_strict":
        self.modifyLayer(17,0)
    elif self.mouthMaterial() == "ball":
        self.modifyLayer(17,1)

self.modifyLayer(18,self.eyebrowsIndex-1)
if not self.isEyesBound():
    self.modifyLayer(19,self.eyesIndex-1)

if self.eyesMaterial() == "leather_blindfold":
    self.modifyLayer(27,0)

if self.hasBlush:
    self.modifyLayer(21,0)
if self.hasFaceShadow:
    self.modifyLayer(22,0)
if self.hasAshen:
    self.modifyLayer(23,0)
if self.hasExtraBlush:
    self.modifyLayer(24,0)
if self.hasSweat:
    self.modifyLayer(25,0)
if self.hasExtraSweat:
    self.modifyLayer(26,0)

# neck
if self.collarMaterial() == "bell":
    self.modifyLayer(30,0)
elif self.isAlter:
    self.modifyLayer(30,1)
elif self.hasAcc4:
    self.modifyLayer(8,0)

# headwear
if self.hasHeadwear:
    if isCat:
        self.modifyLayer(34,1)
    else:
        self.modifyLayer(34,0)