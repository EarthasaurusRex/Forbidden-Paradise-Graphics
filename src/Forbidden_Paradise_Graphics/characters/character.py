import os
import json
from enum import Enum
from PIL import Image
from typing import Callable

# region Enums
class Grabber(Enum):
    NONE = ""
    BOSS_PILLAR = "bossPillar"
    CATERPILLAR = "caterpillar"
    HUMAN = "human"
    PLANT = "plant"
    POLE = "pole"
    RED_PLANT = "red_plant"
    SANDBAG = "sandbag"

class Mummified(Enum):
    NONE = ""
    TAPE = "tape"
    WEB = "web"

class Mouth(Enum):
    NONE = ""
    BALL = "ball"
    BALL_BIG = "ball_big"
    BALL_CLOTH = "ball_cloth"
    BALL_STRICT = "ball_strict"
    BALL_TAPE = "ball_tape"
    BALL_TAPE_CLOTH = "ball_tape_cloth"
    BIT_GAG = "bit_gag"
    CLOTH = "cloth"
    CLOTH_TAPE = "cloth_tape"
    MOUTH_MASK = "mouth_mask"
    ROPE = "rope"
    TAPE = "tape"
    WEB = "web"
    WEB_CLEAVE = "web_cleave"

class Eyes(Enum):
    NONE = ""
    CLOTH = "cloth"
    LEATHER_BLINDFOLD = "leather_blindfold"
    ROPE = "rope"
    TAPE = "tape"
    TAPE_HOOD = "tape_hood"
    WEB = "web"

class Collar(Enum):
    NONE = ""
    BELL = "bell"
    LEASH = "leash"
    PRISONER = "prisoner"
    PRISONER_CHAIN = "prisoner_chain"
    PRISONER_CHAIN_YANK = "prisoner_chain_yank"
    RUNE = "rune"
    SEAL = "seal"

class Arms(Enum):
    NONE = ""
    CUFFS = "cuffs"
    METAL_CUFFS = "metal_cuffs"
    PARTIAL_TAPE_MUMMY = "partial_tape_mummy"
    REGEN_VINES = "regen_vines"
    ROPE = "rope"
    TAPE = "tape"
    VINES = "vines"
    WEB = "web"

class Mittens(Enum):
    NONE = ""
    LEATHER_BINDER = "leather_binder"
    WEB = "web"

class Nipples(Enum):
    NONE = ""
    CATERPILLARS = "caterpillars"
    NIPPLE_CLAMPS = "nipple_clamps"

class Legs(Enum):
    NONE = ""
    REGEN_VINES = "regen_vines"
    ROPE = "rope"
    TAPE = "tape"
    VINES = "vines"
    WEB = "web"

class CrotchRope(Enum):
    NONE = ""
    REGEN_VINES = "regen_vines"
    ROPE = "rope"
    VINES = "vines"

class Intimate(Enum):
    NONE = ""
    BULLET_VIBE = "bullet_vibe"

# endregion

class Character:
    """
    A class representing a character in the game.
    """

    def __init__(self):
        self.image_path = ""
        self.layers = {}

        self.grabberConfig: str = Grabber.NONE.value

        self.mouthIndex = True # 1
        self.eyesIndex = True # 1
        self.eyebrowsIndex = True # 1
        self.hasFaceShadow = False # 0
        self.hasAshen = False # 0
        self.hasSweat = False # 0
        self.hasExtraSweat = False # 0
        self.hasAnger = False # 0
        self.hasBlush = False # 0
        self.hasExtraBlush = False # 0
        self.hasDrool = False # 0

        # Character configs
        self.hasHeadwear = False
        self.hasOuter = True
        self.hasInner = True
        self.hasBra = True
        self.hasPanties = True
        self.hasLegWear = True
        self.hasShoes = True
        self.hasAcc1 = True
        self.hasAcc2 = True

        # Private attributes storing the callable that returns the string value
        self.__mummifiedMaterial: Callable[[], str] = lambda: Mummified.NONE.value
        self.__eyesMaterial: Callable[[], str] = lambda: Eyes.NONE.value
        self.__mouthMaterial: Callable[[], str] = lambda: Mouth.NONE.value
        self.__collarMaterial: Callable[[], str] = lambda: Collar.NONE.value
        self.__armsMaterial: Callable[[], str] = lambda: Arms.NONE.value
        self.__mittensMaterial: Callable[[], str] = lambda: Mittens.NONE.value
        self.__nippleMaterial: Callable[[], str] = lambda: Nipples.NONE.value
        self.__legsMaterial: Callable[[], str] = lambda: Legs.NONE.value
        self.__crotchRopeMaterial: Callable[[], str] = lambda: CrotchRope.NONE.value
        self.__intimateMaterial: Callable[[], str] = lambda: Intimate.NONE.value

        # Lambdas for dynamic properties
        self.isFullyMummified = lambda: bool(self.mummifiedMaterial())
        self.isMouthBound = lambda: bool(self.mouthMaterial())
        self.isEyesBound = lambda: bool(self.eyesMaterial())
        self.armsAreTogether = lambda: bool(self.armsMaterial() or self.isFullyMummified() or self.armsBehindBackPose())
        self.hasCrotchRope = lambda: bool(self.crotchRopeMaterial())

        self.__armsBehindBackPose: Callable[[], bool] = lambda: False
        self.__legsAreInvisible: Callable[[], bool] = lambda: False
        self.__legsAreTogether: Callable[[], bool] = lambda: False
        self.legsWebLikePose: Callable[[], bool] = lambda: False
        self.__isGrounded: Callable[[], bool] = lambda: False
        self.__vibeIntensity: Callable[[], int] = lambda: 0

    # region Full Body
    @property
    def mummifiedMaterial(self) -> Callable[[], str]:
        return self.__mummifiedMaterial

    @mummifiedMaterial.setter
    def mummifiedMaterial(self, value: Mummified):
        self.__mummifiedMaterial = lambda: value.value
        self.isFullyMummified = lambda: bool(self.mummifiedMaterial())
        self.armsAreTogether = lambda: bool(self.armsMaterial() or self.isFullyMummified() or self.armsBehindBackPose())
    # endregion

    # region Mouth
    @property
    def mouthMaterial(self) -> Callable[[], str]:
        return self.__mouthMaterial

    @mouthMaterial.setter
    def mouthMaterial(self, value: Mouth):
        self.__mouthMaterial = lambda: value.value
        self.isMouthBound = lambda: bool(self.mouthMaterial())
    # endregion

    # region Eyes
    @property
    def eyesMaterial(self) -> Callable[[], str]:
        return self.__eyesMaterial

    @eyesMaterial.setter
    def eyesMaterial(self, value: Eyes):
        self.__eyesMaterial = lambda: value.value
        self.isEyesBound = lambda: bool(self.eyesMaterial())
    # endregion

    # region Neck
    @property
    def collarMaterial(self) -> Callable[[], str]:
        return self.__collarMaterial

    @collarMaterial.setter
    def collarMaterial(self, value: Collar):
        self.__collarMaterial = lambda: value.value
    # endregion

    # region Arms
    @property
    def armsMaterial(self) -> Callable[[], str]:
        return self.__armsMaterial

    @armsMaterial.setter
    def armsMaterial(self, value: Arms):
        self.__armsMaterial = lambda: value.value
        self.armsAreTogether = lambda: bool(self.armsMaterial() or self.isFullyMummified() or self.armsBehindBackPose())

    @property
    def armsBehindBackPose(self) -> Callable[[], bool]:
        return self.__armsBehindBackPose

    @armsBehindBackPose.setter
    def armsBehindBackPose(self, value: bool):
        self.__armsBehindBackPose = lambda: value
        self.armsAreTogether = lambda: bool(self.armsMaterial() or self.isFullyMummified() or self.armsBehindBackPose())
    # endregion

    # region Mittens
    @property
    def mittensMaterial(self) -> Callable[[], str]:
        return self.__mittensMaterial

    @mittensMaterial.setter
    def mittensMaterial(self, value: Mittens):
        self.__mittensMaterial = lambda: value.value
    # endregion

    # region Nipples
    @property
    def nippleMaterial(self) -> Callable[[], str]:
        return self.__nippleMaterial

    @nippleMaterial.setter
    def nippleMaterial(self, value: Nipples):
        self.__nippleMaterial = lambda: value.value
    # endregion

    # region Legs
    @property
    def legsMaterial(self) -> Callable[[], str]:
        return self.__legsMaterial

    @legsMaterial.setter
    def legsMaterial(self, value: Legs):
        self.__legsMaterial = lambda: value.value
        self.__legsAreTogether = lambda: bool(self.legsMaterial)
        self.legsWebLikePose = lambda: self.legsMaterial() in ["tape", "web"]

    @property
    def legsAreTogether(self) -> Callable[[], bool]:
        return self.__legsAreTogether

    @legsAreTogether.setter
    def legsAreTogether(self, value: bool):
        self.__legsAreTogether = lambda: value

    @property
    def legsAreInvisible(self) -> Callable[[], bool]:
        return self.__legsAreInvisible

    @legsAreInvisible.setter
    def legsAreInvisible(self, value: bool):
        self.__legsAreInvisible = lambda: value

    @property
    def isGrounded(self) -> Callable[[], bool]:
        return self.__isGrounded

    @isGrounded.setter
    def isGrounded(self, value: bool):
        self.__isGrounded = lambda: value
    # endregion

    # region Crotch
    @property
    def crotchRopeMaterial(self) -> Callable[[], str]:
        return self.__crotchRopeMaterial

    @crotchRopeMaterial.setter
    def crotchRopeMaterial(self, value: CrotchRope):
        self.__crotchRopeMaterial = lambda: value.value
        self.hasCrotchRope = lambda: bool(self.crotchRopeMaterial())
    # endregion

    # region Intimate
    @property
    def intimateMaterial(self) -> Callable[[], str]:
        return self.__intimateMaterial

    @intimateMaterial.setter
    def intimateMaterial(self, value: Intimate):
        self.__intimateMaterial = lambda: value.value

    @property
    def vibeIntensity(self) -> Callable[[], int]:
        return self.__vibeIntensity

    @vibeIntensity.setter
    def vibeIntensity(self, value: int):
        self.__vibeIntensity = lambda: value
    # endregion

    def get_used_properties(self) -> list[str]:
        """
        Returns a list of properties used by this character,
        based on the centralized configuration.
        """
        with open("src/Forbidden_Paradise_Graphics/characters/character_properties.json", "r") as f:
            properties = json.load(f)
        return properties.get(self.__class__.__name__, [])

    def sort_layers(self):
        # Sort layers by index
        self.layers = dict(sorted(self.layers.items()))

        # Get rid of empty layers
        self.layers = {k: v for k, v in self.layers.items() if v}
    
    def modifyLayer(self, layer_index, new_value):
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

        # Base layer
        base_layer = list(self.layers.values())[0]
        base_image = Image.open(base_layer).convert("RGBA")
        # Apply additional layers
        for layer_path in list(self.layers.values())[1:]:
            layer_image = Image.open(layer_path).convert("RGBA")
            base_image.alpha_composite(layer_image)

        return base_image
