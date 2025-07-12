import os
from PIL import Image


class Character:
    """
    A class representing a character in the game.
    """

    def __init__(self):
        self.image_path = None
        self.layers = {}

        # bossPillar, caterpillar, human, none, plant
        # pole, red_plant, rope_walk, sandbag
        self.grabberConfig = "none"

        self.mouthIndex = 1
        self.eyesIndex = 1
        self.eyebrowsIndex = 1
        self.hasFaceShadow = 0
        self.hasAshen = 0
        self.hasSweat = 0
        self.hasExtraSweat = 0
        self.hasAnger = 0
        self.hasBlush = 0
        self.hasExtraBlush = 0
        self.hasDrool = 0

        # Character configs
        # Character
        self.hasHeadwear = False
        self.hasOuter = True
        self.hasInner = True
        self.hasBra = True
        self.hasPanties = True
        self.hasLegWear = True
        self.hasShoes = True
        self.hasAcc1 = True
        self.hasAcc2 = True

        # Full Body
        self.__mummifiedMaterial = lambda: ""
        self.isFullyMummified = lambda: False

        # Eyes
        self.__eyesMaterial = lambda: ""
        self.isEyesBound = lambda: False

        # Mouth
        self.__mouthMaterial = lambda: ""
        self.isMouthBound = lambda: False

        # Neck
        self.__collarMaterial = lambda: ""

        # Arms
        # Must be True if isFullyMummified or armsAreTogether is True
        self.armsAreTogether = lambda: False
        self.__armsBehindBackPose = lambda: False
        self.__armsMaterial = lambda: ""

        # Mittens
        self.__mittensMaterial = lambda: ""

        # Nipples
        self.__nippleMaterial = lambda: ""  # caterpillars, nipple_clamps

        # Legs
        self.__legsAreInvisible = lambda: False
        self.__legsAreTogether = lambda: False
        self.legsWebLikePose = lambda: False
        self.__legsMaterial = lambda: ""
        self.__isGrounded = lambda: False  # On the ground/tripped

        # Crotch
        self.hasCrotchRope = lambda: False
        self.__crotchRopeMaterial = lambda: ""

        # Intimate
        self.__intimateMaterial = lambda: ""
        self.__vibeIntensity = lambda: 0

    # tape, web
    # region Full Body
    @property
    def mummifiedMaterial(self):
        return self.__mummifiedMaterial

    @mummifiedMaterial.setter
    def mummifiedMaterial(self, value: str):
        self.__mummifiedMaterial = lambda: value
        self.isFullyMummified = lambda: bool(self.__mummifiedMaterial())
        self.armsAreTogether = lambda: self.armsMaterial or self.isFullyMummified(
        ) or self.armsBehindBackPose()
    # endregion

    # ball, ball_big, ball_cloth, ball_strict, ball_tape,
    # ball_tape_cloth, bit_gag, cloth, cloth_tape, mouth_mask,
    # rope, tape, web, web_cleave
    # region Mouth
    @property
    def mouthMaterial(self):
        return self.__mouthMaterial

    @mouthMaterial.setter
    def mouthMaterial(self, value: str):
        self.__mouthMaterial = lambda: value
        self.isMouthBound = lambda: bool(self.mouthMaterial())
    # endregion

    # cloth, leather_blindfold, rope, tape, tape_hood,
    # web
    # region Eyes
    @property
    def eyesMaterial(self):
        return self.__eyesMaterial

    @eyesMaterial.setter
    def eyesMaterial(self, value: str):
        self.__eyesMaterial = lambda: value
        self.isEyesBound = lambda: bool(self.eyesMaterial())
    # endregion

    # bell, leash, prisoner, prisoner_chain, prisoner_chain_yank,
    # rune, seal
    # region Neck
    @property
    def collarMaterial(self):
        return self.__collarMaterial

    @collarMaterial.setter
    def collarMaterial(self, value: str):
        self.__collarMaterial = lambda: value
    # endregion

    # cuffs, metal_cuffs, partial_tape_mummy, regen_vines, rope
    # tape, vines, web
    # region Arms
    @property
    def armsMaterial(self):
        return self.__armsMaterial

    @armsMaterial.setter
    def armsMaterial(self, value: str):
        self.__armsMaterial = lambda: value
        self.armsAreTogether = lambda: bool(self.armsMaterial or self.isFullyMummified(
        ) or self.armsBehindBackPose())

    @property
    def armsBehindBackPose(self):
        return self.__armsBehindBackPose

    @armsBehindBackPose.setter
    def armsBehindBackPose(self, value: bool):
        self.__armsBehindBackPose = lambda: value
        self.armsAreTogether = lambda: bool(self.armsMaterial or self.isFullyMummified(
        ) or self.armsBehindBackPose())
    # endregion

    # leather_binder, web
    # region Mittens
    @property
    def mittensMaterial(self):
        return self.__mittensMaterial

    @mittensMaterial.setter
    def mittensMaterial(self, value: str):
        self.__mittensMaterial = lambda: value
    # endregion

    # caterpillars, nipple_clamps
    # region Nipples
    @property
    def nippleMaterial(self):
        return self.__nippleMaterial

    @nippleMaterial.setter
    def nippleMaterial(self, value: str):
        self.__nippleMaterial = lambda: value
    # endregion

    # regen_vines, rope, tape, vines, web
    # region Legs
    @property
    def legsMaterial(self):
        return self.__legsMaterial

    @legsMaterial.setter
    def legsMaterial(self, value: str):
        self.__legsMaterial = lambda: value
        self.legsWebLikePose = self.legsMaterial() in ["tape", "web"]

    @property
    def legsAreTogether(self):
        return self.__legsAreTogether

    @legsAreTogether.setter
    def legsAreTogether(self, value: bool):
        self.__legsAreTogether = lambda: value

    @property
    def legsAreInvisible(self):
        return self.__legsAreInvisible

    @legsAreInvisible.setter
    def legsAreInvisible(self, value: bool):
        self.__legsAreInvisible = lambda: value

    @property
    def isGrounded(self):
        return self.__isGrounded

    @isGrounded.setter
    def isGrounded(self, value: bool):
        self.__isGrounded = lambda: value
    # endregion

    # regen_vines, rope, vines
    # region Crotch
    @property
    def crotchRopeMaterial(self):
        return self.__crotchRopeMaterial

    @crotchRopeMaterial.setter
    def crotchRopeMaterial(self, value: str):
        self.__crotchRopeMaterial = lambda: value
        self.hasCrotchRope = lambda: bool(self.crotchRopeMaterial())
    # endregion

    # bullet_vibe
    # region Intimate
    @property
    def intimateMaterial(self):
        return self.__intimateMaterial

    @intimateMaterial.setter
    def intimateMaterial(self, value: str):
        self.__intimateMaterial = lambda: value

    @property
    def vibeIntensity(self):
        return self.__vibeIntensity

    @vibeIntensity.setter
    def vibeIntensity(self, value: int):
        self.__vibeIntensity = lambda: value
    # endregion

    def sort_layers(self):
        # Sort layers by index
        self.layers = dict(sorted(self.layers.items()))

        # Get rid of empty layers
        self.layers = {k: v for k, v in self.layers.items() if v}

    def modify_layer(self, layer_index, new_value):
        if new_value < 0:
            self.layers[layer_index] = ""
        else:
            self.layers[layer_index] = os.path.join(
                self.image_path, f"{layer_index}_{new_value}.png")

        self.sort_layers()

    def render(self):
        if not self.layers:
            print("No layers defined. Please add layers before rendering.")
            return

        base_layer = list(self.layers.values())[0]
        base_image = Image.open(base_layer)
        for layer in self.layers.values():
            base_image = Image.alpha_composite(base_image, Image.open(layer))

        return base_image
