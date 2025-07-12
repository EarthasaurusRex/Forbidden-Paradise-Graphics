////////////////////////////////////////////
// Character picture

function Game_CharacterPortrait() {
	this.initialize(...arguments);
}

Game_CharacterPortrait.prototype.initialize = function() {
	this._isPlayer = false;

	this._isVisible = false;
	this._layers = [];
	this._layerBlendModes = [];
	this._sourceFolder = "";
	this._baseX = 160;
	this._baseY = 330;

	this._zoom = new Game_PictureProperty(0);
	this._offsetX = new Game_PictureProperty(0);
	this._offsetY = new Game_PictureProperty(0);
	this._brightness = new Game_PictureProperty(100);
	this._alpha = new Game_PictureProperty(1);

	this._rotation = new Game_PictureProperty(0);
	this._pivotX = new Game_PictureProperty(0);
	this._pivotY = new Game_PictureProperty(0);

	this.resetExpressionClothesAndBindings();
};

Game_CharacterPortrait.prototype.resetExpressionClothesAndBindings = function() {
	this.setExpression("neutral");
	this._armsBinding = "none";
	this._mouthBinding = "none";
	this._legsBinding = "none";
	this._eyesBinding = "none";

	this._mummifiedMaterial = "none";

	this._mittensBinding = "none";

	this._crotchRopeBinding = "none";
	this._collarMaterial = "none";

	this._nippleBinding = "none";
	this._intimateBinding = "none";
	this._vibeIntensity = 0;

	this._clothesRippingLevel = 0;

	this._isGrounded = false;

	this._hasShoes = true;
	this._hasLegWear = true;
	this._hasHeadWear = true;
	this._hasOuter = true;
	this._hasInner = true;
	this._hasBra = true;
	this._hasPanties = true;

	this._hasAcc1 = false;
	this._hasAcc2 = false;
	this._hasAcc3 = false;
	this._hasAcc4 = false;
	this._hasAcc5 = false;

	this._currentGrabber = "none";

	this._embarrassment = 0;
	this._drool = 0;

	this._hasAshen = false;
	this._hasSweat = false;
	this._hasExtraSweat = false;
	this._sweatDropType = 0;
}

Game_CharacterPortrait.prototype.reset = function() {
	this._isPlayer = false;

	this._isVisible = false;
	this._layers = [];
	this._layerBlendModes = [];
	this._sourceFolder = "";
	this._baseX = 160;
	this._baseY = 330;

	this._zoom.resetValue();
	this._offsetX.resetValue();
	this._offsetY.resetValue();
	this._brightness.resetValue();
	this._alpha.resetValue();

	this.resetExpressionClothesAndBindings();
};

////
// clothes

Game_CharacterPortrait.prototype.hasShoes = function() {
	if (this._isPlayer) return $gamePlayer._portraitWearingShoes;
	return this._hasShoes;
}

Game_CharacterPortrait.prototype.hasLegWear = function() {
	if (this._isPlayer) return $gamePlayer._portraitWearingLegWear;
	return this._hasLegWear;
}

Game_CharacterPortrait.prototype.hasHeadwear = function() {
	if (this._isPlayer) return $gamePlayer._portraitWearingHeadwear;
	return this._hasHeadWear;
}

Game_CharacterPortrait.prototype.hasOuter = function() {
	if (this._isPlayer) return $gamePlayer._portraitWearingOuter;
	return this._hasOuter;
}

Game_CharacterPortrait.prototype.hasInner = function() {
	if (this._isPlayer) return $gamePlayer._portraitWearingInner;
	return this._hasInner;
}

Game_CharacterPortrait.prototype.hasBra = function() {
	if (this._isPlayer) return $gamePlayer._portraitWearingBra;
	return this._hasBra;
}

Game_CharacterPortrait.prototype.hasPanties = function() {
	if (this._isPlayer) return $gamePlayer._portraitWearingPanties;
	return this._hasPanties;
}

Game_CharacterPortrait.prototype.hasAcc1 = function() {
	if (this._isPlayer) return $gamePlayer._outfitWearingAcc1;
	return this._hasAcc1;
}

Game_CharacterPortrait.prototype.hasAcc1 = function() {
	if (this._isPlayer) return $gamePlayer._outfitWearingAcc1;
	return this._hasAcc1;
}

Game_CharacterPortrait.prototype.hasAcc2 = function() {
	if (this._isPlayer) return $gamePlayer._outfitWearingAcc2;
	return this._hasAcc2;
}

Game_CharacterPortrait.prototype.hasAcc3 = function() {
	if (this._isPlayer) return $gamePlayer._outfitWearingAcc3;
	return this._hasAcc3;
}

Game_CharacterPortrait.prototype.hasAcc4 = function() {
	if (this._isPlayer) return $gamePlayer._outfitWearingAcc4;
	return this._hasAcc4;
}

Game_CharacterPortrait.prototype.hasAcc5 = function() {
	if (this._isPlayer) return $gamePlayer._outfitWearingAcc5;
	return this._hasAcc5;
}

Game_CharacterPortrait.prototype.isAlter = function() {
	if (this._isPlayer) return $gamePlayer._isAlter;
	return this._isAlter;
}

////
// enemy
Game_CharacterPortrait.prototype.getGrabber = function() {
	if (this._isPlayer) {
		if ($gamePlayer.grabbers[0] == EEnemyGrabTypes['human'])
			return "human";
		else if ($gamePlayer.grabbers[0] == EEnemyGrabTypes['plant'])
			return "plant";
		else if ($gamePlayer.grabbers[0] == EEnemyGrabTypes['sandbag'])
			return "sandbag";
		else if ($storyVars.forest.ca1.isPoleTied)
			return "pole";
		else if ($storyVars.forest.side.cabin && $storyVars.forest.side.cabin.inPlant)
			return "red_plant";
		else if ($gamePlayer.grabbers[0] == EEnemyGrabTypes['caterpillar'])
			return "caterpillar";
		else if (
			$gamePlayer.grabbers[0] == EEnemyGrabTypes['bossPillar']
			|| $storyVars.cave.ca1.caughtByBoss
		)
			return "bossPillar";
		else if ($storyVars.city.ca1.ropeWalking)
			return "rope_walk";
	}
	return this._currentGrabber;
}

////
// binding

Game_CharacterPortrait.prototype.isGrounded = function() {
	if (this._isPlayer) return $gamePlayer.isGrounded;
	return this._isGrounded;
}

Game_CharacterPortrait.prototype.armsBehindBackPose = function() {
	if (this._isPlayer) return CharacterPicture.armsBehindBackPose();

	const armwrappings = ["forced", "web", "tape", "armbinder"];
	return armwrappings.includes(this._armsBinding);
}

Game_CharacterPortrait.prototype.armsAreTogether = function() {
	if (this.mittensMaterial() == "leather_binder") return true;

	if (this._isPlayer) return CharacterPicture.armsAreTogether();
	return this.isArmsBound();
}

Game_CharacterPortrait.prototype.legsWebLikePose = function() {
	if (this._isPlayer) return CharacterPicture.legsWebLikePose();

	const legwrappings = ["forced", "web", "tape"];
	return (legwrappings.includes(this._legsBinding));
}

Game_CharacterPortrait.prototype.legsAreTogether = function() {
	if (this._isPlayer) return CharacterPicture.legsAreTogether();
	return this.isLegsBound();
}

Game_CharacterPortrait.prototype.legsAreInvisible = function() {
	if (this._isPlayer) return CharacterPicture.legsAreInvisible();
	return false;
}

Game_CharacterPortrait.prototype.clothesRippingLevel = function() {
	if (this._isPlayer) return $gamePlayer._clothesRippingLevel;
	return this._clothesRippingLevel;
}

Game_CharacterPortrait.prototype.isArmsBound = function() {
	if (this._isPlayer) return $gamePlayer.handsAreBound();
	return this._armsBinding != "none";
};

Game_CharacterPortrait.prototype.isMouthBound = function() {
	if (this._isPlayer) return $gamePlayer.mouthIsBound();
	return this._mouthBinding != "none";
};

Game_CharacterPortrait.prototype.isEyesBound = function() {
	if (this._isPlayer) return $gamePlayer.eyesAreBound();
	return this._eyesBinding != "none";
};

Game_CharacterPortrait.prototype.isLegsBound = function() {
	if (this._isPlayer) return $gamePlayer.legsAreBound();
	return this._legsBinding != "none";
};

Game_CharacterPortrait.prototype.hasCrotchRope = function() {
	if (this._isPlayer) return $gamePlayer.hasCrotchRope;
	return this._crotchRopeBinding != "none";
};

Game_CharacterPortrait.prototype.isFullyMummified = function() {
	const material = this.mummifiedMaterial();
	if (material == "web") return true;
	if (material == "tape") return true;
	return false;
}

Game_CharacterPortrait.prototype.mummifiedMaterial = function() {
	if (this._isPlayer) return $gamePlayer.mummifiedEquip || "none";
	return this._mummifiedMaterial;
};

Game_CharacterPortrait.prototype.armsMaterial = function() {
	if (this._isPlayer) return $gamePlayer.armsEquip;
	return this._armsBinding;
};

Game_CharacterPortrait.prototype.mouthMaterial = function() {
	if (this._isPlayer) return $gamePlayer.mouthEquip;
	return this._mouthBinding;
};

Game_CharacterPortrait.prototype.eyesMaterial = function() {
	if (this._isPlayer) return $gamePlayer.eyesEquip;
	return this._eyesBinding;
};

Game_CharacterPortrait.prototype.legsMaterial = function() {
	if (this._isPlayer) return $gamePlayer.legsEquip;
	return this._legsBinding;
};

Game_CharacterPortrait.prototype.mittensMaterial = function() {
	if (this._isPlayer) return $gamePlayer.mittensEquip;
	return this._mittensBinding;
};

Game_CharacterPortrait.prototype.crotchRopeMaterial = function() {
	if (this._isPlayer) return $gamePlayer.crotchRopeEquip;
	return this._crotchRopeBinding;
};

Game_CharacterPortrait.prototype.collarMaterial = function() {
	if (this._isPlayer) {
		if ($gamePlayer.isBellCollared) return "bell";
		else if ($gamePlayer.isCollared) return "rune";
		else if ($gamePlayer._collarMaterial) return $gamePlayer._collarMaterial;
	}
	return this._collarMaterial;
};

Game_CharacterPortrait.prototype.nippleMaterial = function() {
	if (this._isPlayer) return $gamePlayer.nippleEquip;
	return this._nippleBinding;
};

Game_CharacterPortrait.prototype.intimateMaterial = function() {
	//if (this._isPlayer) return $gamePlayer.intimateEquip;
	return this._intimateBinding;
};

Game_CharacterPortrait.prototype.vibeIntensity = function() {
	//if (this._isPlayer) return $gamePlayer.vibeIntensity;
	return this._vibeIntensity;
};

Game_CharacterPortrait.prototype.lastBaseOutfit = function() {
	if (this._isPlayer) return $gamePlayer.lastBaseOutfit;
	return this._lastBaseOutfit;
};

////

Game_CharacterPortrait.prototype.setExpression = function(expression) {
	if (this._isPlayer) {
		$gamePlayer.setExpression(expression);
		return;
	}

	if (Array.isArray(expression)) {
		this._currentExpression = expression;
	}
	else {
		if (this.getFolder().startsWith("blanche")) this._currentExpression = CharacterPicture.blancheMEE[expression];
		else if (this.getFolder().startsWith("secunda")) this._currentExpression = CharacterPicture.secundaMEE[expression];
		else if (this.getFolder().startsWith("rinne")) this._currentExpression = CharacterPicture.rinneMEE[expression];
		else if (this.getFolder().startsWith("lily") || this.getFolder().startsWith("noire")) this._currentExpression = CharacterPicture.lilyMEE[expression];
		else this._currentExpression = expression;
	}

	this.updatePortrait();
}

Game_CharacterPortrait.prototype.setVibeIntensity = function(intensity) {
	this._vibeIntensity = intensity;
	this.updatePortrait();
}

Game_CharacterPortrait.prototype.applyBindings = function(part, material) {
	if (part == "arms") this._armsBinding = material;
	else if (part == "legs") this._legsBinding = material;
	else if (part == "mouth") this._mouthBinding = material;
	else if (part == "eyes") this._eyesBinding = material;
	else if (part == "crotch_rope") this._crotchRopeBinding = material;
	else if (part == "nipples") this._nippleBinding = material;
	else if (part == "intimate") this._intimateBinding = material;
	else if (part == "mummified") this._mummifiedMaterial = material;
	this.updatePortrait();
}

Game_CharacterPortrait.prototype.updatePortrait = function() {
	const name = this.getFolder();

	const hasShoes = this.hasShoes();
	const hasLegWear = this.hasLegWear();
	const hasHeadwear = this.hasHeadwear();
	const hasOuter = this.hasOuter();
	const hasInner = this.hasInner();
	const hasBra = this.hasBra();
	const hasPanties = this.hasPanties();

	const hasAcc1 = this.hasAcc1();
	const hasAcc2 = this.hasAcc2();
	const hasAcc3 = this.hasAcc3();
	const hasAcc4 = this.hasAcc4();
	const hasAcc5 = this.hasAcc5();

	const isAlter = this.isAlter();

	const grabberConfig = this.getGrabber();

	if (name == "sandbag")
	{
		if (this._currentExpression == "annoyed") this.modifyLayer(0, 0);
		else if (this._currentExpression == "neutral") this.modifyLayer(0, 1);
		else if (this._currentExpression == "oh") this.modifyLayer(0, 2);
		else if (this._currentExpression == "ouch") this.modifyLayer(0, 3);
		else if (this._currentExpression == "smile") this.modifyLayer(0, 4);
	}
	else if (name == "warden")
	{
		if (this._currentExpression == "warden") this.modifyLayer(0, 0);
		else if (this._currentExpression == "warden_arm") this.modifyLayer(0, 1);
		else if (this._currentExpression == "warden_arm_eyes") this.modifyLayer(0, 2);
		else if (this._currentExpression == "warden_arm_mask") this.modifyLayer(0, 3);
		else if (this._currentExpression == "warden_arm_mask_eyes") this.modifyLayer(0, 4);
		else if (this._currentExpression == "warden_eyes") this.modifyLayer(0, 5);
		else if (this._currentExpression == "warden_mask") this.modifyLayer(0, 6);
		else if (this._currentExpression == "warden_mask_eyes") this.modifyLayer(0, 7);
		else if (this._currentExpression == "warden_hidden") this.modifyLayer(0, 8);
	}
	else if (name == "qt4") {
		this.modifyLayer(0, 0);
	}
	else if (name == "rinne")	{
		this._layers = [
			-1, -1, -1, -1, -1, -1, -1, -1, -1
		]

		const disgust = hasAcc1;
		const faceShadowed = hasAcc2;

		let expressionArray;
		if (!this._isPlayer) {
			if (Array.isArray(this._currentExpression)) expressionArray = this._currentExpression;
			else expressionArray = CharacterPicture.rinneMEE[this._currentExpression];
		}
		else {
			expressionArray = [
				$gamePlayer._portraitCurrentMouth,
				$gamePlayer._portraitCurrentEyes,
				$gamePlayer._portraitCurrentEyebrows
			]
		}

		if (hasHeadwear) {
			this.modifyLayer(0, 1);
			if (faceShadowed) this.modifyLayer(8, 0);
			this.modifyLayer(7, 0);
		}
		else {
			this.modifyLayer(0, 0);
		}
		if (disgust) this.modifyLayer(2, 0);
		if (this._sweatDropType > 0) this.modifyLayer(5, 0);
		if (this._embarrassment > 0) this.modifyLayer(6, 0);

		if (!this.isMouthBound())
			this.modifyLayer(1, expressionArray[0] - 1);
		else
			this.modifyLayer(1, -1);

		if (!this.isEyesBound())
			this.modifyLayer(3, expressionArray[1] - 1);
		else
			this.modifyLayer(3, -1);

		this.modifyLayer(4, expressionArray[2] - 1);
	}
	else if (name == "secunda")	{
		this._layers = [
			0, 0, 1, -1, -1, 0, 1, 0, 0, -1,
			0, -1, -1, -1, -1, -1, 1, 1, 0, 0,
			0, 0, 0, -1, 0, -1, -1, -1, -1, -1,
			-1, -1, 0, -1, -1, -1, -1, -1, -1, -1
		]

		const hasDrool = this._drool > 0;

		// Hair ornaments
		this.modifyLayer(1, (hasHeadwear ? 0 : -1));
		this.modifyLayer(20, (hasHeadwear ? 0 : -1));

		// Hair and back hair for long hair
		if (!hasHeadwear) {
			this.modifyLayer(0, 1);

			if ((this.isArmsBound() && this.armsMaterial() == "cuffs") || $gamePlayer.mittensEquip == "leather_binder"){
				this.modifyLayer(19, 7);
			}
			else if (this.isArmsBound()){
				if (hasOuter) this.modifyLayer(19, 6);
				else if (hasInner) this.modifyLayer(19, 5);
				else this.modifyLayer(19, 4);
			}
			else {
				if (hasOuter) this.modifyLayer(19, 3);
				else if (hasInner) this.modifyLayer(19, 2);
				else this.modifyLayer(19, 1);
			}
		}

		let expressionArray;
		if (!this._isPlayer) {
			if (Array.isArray(this._currentExpression)) expressionArray = this._currentExpression;
			else expressionArray = CharacterPicture.secundaMEE[this._currentExpression];
		}
		else {
			expressionArray = [
				$gamePlayer._portraitCurrentMouth,
				$gamePlayer._portraitCurrentEyes,
				$gamePlayer._portraitCurrentEyebrows
			]
		}

		if (!this.isMouthBound())
			this.modifyLayer(21, expressionArray[0] - 1);
		else
			this.modifyLayer(21, -1);

		if (!this.isEyesBound())
			this.modifyLayer(22, expressionArray[1] - 1);
		else
			this.modifyLayer(22, -1);

		this.modifyLayer(24, expressionArray[2] - 1);

		// Binding layers
		this.modifyLayer(3, -1); // legs
		this.modifyLayer(11, -1); // arms
		this.modifyLayer(23, -1); // eyes
		this.modifyLayer(25, -1); //mouth

		const shoesModifier = hasShoes ? 1 : 0;
		const crotchRopeModifier = this.hasCrotchRope() ? 2 : 0;

		if (this.hasCrotchRope()){
			this.modifyLayer(9, 0);
			this.modifyLayer(5, 1);
		}

		if (this.isLegsBound())
		{
			this.modifyLayer(2, 4 + shoesModifier + crotchRopeModifier);
			this.modifyLayer(3, 0);
			this.modifyLayer(6, 4 + shoesModifier + crotchRopeModifier);
			this.modifyLayer(7, 3);
			this.modifyLayer(8, 2);

			if (this.hasCrotchRope()){
				this.modifyLayer(7, 4);
				this.modifyLayer(8, 3);
			}

			//if (hasOuter) this.modifyLayer(15, 1);
		}
		else
		{
			this.modifyLayer(2, 0 + shoesModifier + crotchRopeModifier);
			this.modifyLayer(6, 0 + shoesModifier + crotchRopeModifier);
			this.modifyLayer(7, 0);
			this.modifyLayer(8, 0);

			if (this.hasCrotchRope()){
				this.modifyLayer(7, 2);
				this.modifyLayer(8, 1);
			}

			//if (hasOuter) this.modifyLayer(15, 0);
		}

		// do stuff like this later:
		// if no skirt: this.modifyLayer(8, -1);

		// Remove tablet
		this.modifyLayer(18, -1);

		if (this.isArmsBound() && this.armsMaterial() == "cuffs") {
			this.modifyLayer(10, 2);
			if (hasBra) this.modifyLayer(14, 0);
			else this.modifyLayer(12, 0);
		}
		else if (this.isArmsBound())
		{
			this.modifyLayer(10, 1);

			if (this.mittensMaterial() == "leather_binder")
				this.modifyLayer(11, 1);
			else
				this.modifyLayer(11, 0);

			if (hasBra) this.modifyLayer(14, 1);
			else this.modifyLayer(12, 1);

			this.modifyLayer(16, (hasOuter ? 3 : 2));
			this.modifyLayer(17, 2);
		}
		else
		{
			this.modifyLayer(10, 0);

			if (hasBra) this.modifyLayer(14, 0);
			else this.modifyLayer(12, 0);

			this.modifyLayer(16, (hasOuter ? 1 : 0));
			this.modifyLayer(17, 1);

			if (hasAcc2) this.modifyLayer(18, 0);
		}

		this.modifyLayer(32, -1);
		if (this.isEyesBound())
		{
			if (this.eyesMaterial() == "leather_blindfold") {
				if(hasHeadwear) this.modifyLayer(32, 1);
				else this.modifyLayer(32, 3);
			}
			else if (this.eyesMaterial() == "cloth") this.modifyLayer(32, 2);
		}
		else
		{
			if(hasAcc1 && this.mouthMaterial() != "ball_strict") this.modifyLayer(32, 0);
		}

		if (this.isMouthBound())
		{
			if (this.mouthMaterial() == "ball") this.modifyLayer(25, 0);
			else if (this.mouthMaterial() == "cloth") this.modifyLayer(25, 1);
			else if (this.mouthMaterial() == "rope") this.modifyLayer(25, 2);
			else if (this.mouthMaterial() == "bit_gag") this.modifyLayer(25, 3);
			else if (this.mouthMaterial() == "ball_strict")
			{
				this.modifyLayer(25, 0);
				if (this.eyesMaterial() == "leather_blindfold") this.modifyLayer(34, 1);
				else if (this.eyesMaterial() != "leather_blindfold") this.modifyLayer(34, 0);
			}
		}

		this.modifyLayer(27, -1);
		this.modifyLayer(28, -1);
		if (this._sweatDropType == 1) this.modifyLayer(27, 0);
		else if (this._sweatDropType == 2) this.modifyLayer(28, 0);
		else if (this._sweatDropType == 3)
		{
			this.modifyLayer(27, 0);
			this.modifyLayer(28, 0);
		}

		this.modifyLayer(30, -1);
		this.modifyLayer(31, -1);
		if (this._embarrassment >= 1) this.modifyLayer(30, (hasHeadwear ? 0 : 1));
		if (this._embarrassment >= 2) this.modifyLayer(31, (hasHeadwear ? 0 : 1));

		// Nipples
		if (this.nippleMaterial() == "nipple_clamps")
			this.modifyLayer(13, 0);


		// Remove coat
		if (!hasOuter)
		{
			this.modifyLayer(17, -1);
			this.modifyLayer(15, -1);
		}

		// Remove legwear
		if (!hasLegWear) this.modifyLayer(6, -1);

		// Remove skirt and shirt
		if (!hasInner)
		{
			this.modifyLayer(7, -1);
			this.modifyLayer(8, -1);
			this.modifyLayer(16, -1);
		}

		// Mittens
		if (this.mittensMaterial() == "leather_binder") {
			this.modifyLayer(10,2);

			if (this.armsMaterial() != "rope") this.modifyLayer(16,4);
		}

		if (hasDrool)
		{
			if(this.mouthMaterial() == "ball") this.modifyLayer(33,0);
			else if(this.mouthMaterial() == "ball_strict") this.modifyLayer(33,0);
			else if(this.mouthMaterial() == "cloth") this.modifyLayer(33,1);
			else if(this.mouthMaterial() == "bit_gag") this.modifyLayer(33,2);
		}

		if(this.collarMaterial() == "bell") this.modifyLayer(29,0);
		else if(this.collarMaterial() == "leash") this.modifyLayer(29,1);

		// Some special event layers
		if (this._specialBoots == "leather") {
			this.modifyLayer(3,1);
		}
		else if (this._specialBoots == "leather_chained") {
			this.modifyLayer(3,2);
		}
		if (this._specialLegwear == "belt") {
			this.modifyLayer(4,4);
		}
		if (this._specialHeadwear == "ribbon") {
			this.modifyLayer(20,1);
		}
		if (this._specialInner == "skirt_only") {
			this.modifyLayer(8,4);
			this.modifyLayer(16,-1);
		}

		// Lily hat for Secunda; only as gameplayer
		if ($gamePlayer._hasLilyCosplayHat) {
			this.modifyLayer(35, 0);
			this.modifyLayer(36, 0);
		}
	}
	else if (name == "secunda_event_1")	{
		this._layers = [
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1
		]

		const hasDrool = this._drool > 0;
		const legsChained = hasAcc1;
		const vibeOn = hasAcc2;

		let expressionArray;
		if (!this._isPlayer) {
			if (Array.isArray(this._currentExpression)) expressionArray = this._currentExpression;
			else expressionArray = CharacterPicture.blancheMEE[this._currentExpression];
		}
		else {
			expressionArray = [
				$gamePlayer._portraitCurrentMouth,
				$gamePlayer._portraitCurrentEyes,
				$gamePlayer._portraitCurrentEyebrows
			]
		}

		// mouth
		if (!this.isMouthBound())
			this.modifyLayer(23, expressionArray[0] - 1);

		// eyes
		if (!this.isEyesBound())
			this.modifyLayer(24, expressionArray[1] - 1);

		// eyebrows
		this.modifyLayer(26, expressionArray[2] - 1);

		// pigtails
		if (hasHeadwear) {
			this.modifyLayer(1, 0);
			this.modifyLayer(21, 0);
		}
		else {
			this.modifyLayer(1, 1);

			if (this.isArmsBound() ||  grabberConfig != "none") this.modifyLayer(21, 2);
			else this.modifyLayer(21, 1);
		}

		// base leg layer
		this.modifyLayer(4, 0);

		// shoes
		if (hasShoes) {
			this.modifyLayer(13, 0);
			this.modifyLayer(14, 0);
		}

		// panties (chastity belt)
		if (hasPanties) {
			if (vibeOn) this.modifyLayer(16, 1);
			else this.modifyLayer(16, 0);
		}

		// upper base
		if (this.isArmsBound() ||  grabberConfig != "none") this.modifyLayer(8, 1);
		else this.modifyLayer(8, 0);
		this.modifyLayer(10, 0);

		// legs chains
		if (legsChained) this.modifyLayer(17, 0);

		// clothes
		if (this.clothesRippingLevel() == 1) {
			this.modifyLayer(18, 1);
			this.modifyLayer(19, 1);
		}
		else {
			this.modifyLayer(18, 0);
			this.modifyLayer(19, 0);
		}

		// arm bindings
		if (this.isArmsBound()) this.modifyLayer(15, 0);

		// Nipples
		if (this.nippleMaterial() == "nipple_clamps") this.modifyLayer(20, 0);

		// blindfolds
		if (this.isEyesBound()) this.modifyLayer(34, 2);

		// gags
		if (this.isMouthBound()) this.modifyLayer(28, 3);

		// sweat
		if (this._sweatDropType == 1) this.modifyLayer(29, 0);
		else if (this._sweatDropType == 2) this.modifyLayer(30, 0);
		else if (this._sweatDropType == 3)
		{
			this.modifyLayer(29, 0);
			this.modifyLayer(30, 0);
		}

		// embarrassment
		if (this._embarrassment >= 1) this.modifyLayer(32, (hasHeadwear ? 0 : 1));
		if (this._embarrassment >= 2) this.modifyLayer(33, (hasHeadwear ? 0 : 1));

		// drool
		if (hasDrool) {
			if(this.mouthMaterial() == "bit_gag") this.modifyLayer(35,2);
		}

		// collar
		if(this.collarMaterial() == "seal") this.modifyLayer(31,0);
		else if(this.collarMaterial() == "prisoner") this.modifyLayer(31,1);
		else if(this.collarMaterial() == "prisoner_chain") this.modifyLayer(31,2);
		else if(this.collarMaterial() == "prisoner_chain_yank") this.modifyLayer(31,3);
	}
	else if (name == "secunda_event_2") {
		this.modifyLayer(0, 0);
	}
	else if (name == "blanche")
	{
		this._layers = [
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1
		]

		const hasDrool = this._drool > 0;

		// Hair ornaments (hat)
		if (hasHeadwear){
			this.modifyLayer(48, 0);
			this.modifyLayer(49, 0);
		}

		if (hasAcc1) this.modifyLayer(16, 0); // necklace
		if (hasAcc2 && grabberConfig == "none" && !this.isArmsBound()) this.modifyLayer(50, 1); // staff

		let expressionArray;
		if (!this._isPlayer) {
			if (Array.isArray(this._currentExpression)) expressionArray = this._currentExpression;
			else expressionArray = CharacterPicture.blancheMEE[this._currentExpression];
		}
		else {
			expressionArray = [
				$gamePlayer._portraitCurrentMouth,
				$gamePlayer._portraitCurrentEyes,
				$gamePlayer._portraitCurrentEyebrows
			]
		}

		// mouth
		if (!this.isMouthBound())
			this.modifyLayer(35, expressionArray[0] - 1);

		// eyes
		if (!this.isEyesBound())
			this.modifyLayer(36, expressionArray[1] - 1);

		// eyebrows
		this.modifyLayer(37, expressionArray[2] - 1);

		const crotchRopeModifier = this.hasCrotchRope() ? 6 : 0;
		const shoesModifier = hasShoes ? 1 : 0;

		// base leg layer
		if (!this.isFullyMummified()) {
			if (this.legsMaterial() == "rope") this.modifyLayer(2, 4 + shoesModifier + crotchRopeModifier);
			else if (this.isLegsBound()) this.modifyLayer(2, 2 + shoesModifier + crotchRopeModifier);
			else this.modifyLayer(2, shoesModifier + crotchRopeModifier);
		}

		// socks
		if (hasLegWear && !this.isFullyMummified()) {
			if (this.isLegsBound()) this.modifyLayer(3, 2 + shoesModifier);
			else this.modifyLayer(3, shoesModifier);
		}

		// shading
		if (hasInner && !this.isFullyMummified()) {
			if (this.clothesRippingLevel() > 0) {/*nothing*/}
			else if (this.isArmsBound()) this.modifyLayer(8, 1);
			else if (this.isLegsBound()) {/*nothing*/}
			else this.modifyLayer(8, 0);
		}

		// panties
		if (hasPanties) {
			if(this.hasCrotchRope()) this.modifyLayer(10, 1);
			else this.modifyLayer(10, 0);
		}

		// upper base
		if (this.armsMaterial() == "rope") this.modifyLayer(5, 2);
		else if (this.isArmsBound() ||  grabberConfig != "none") this.modifyLayer(5, 1);
		else this.modifyLayer(5, 0);

		// clothes, bra, breasts
		if (hasInner && !this.isFullyMummified()) {

			if (this.clothesRippingLevel() > 1) {
				// Legs tie doesn't matter if clothes are ripped this far
				if(this.hasCrotchRope()) {
					if (this.isArmsBound()) {
						if (this.armsMaterial() == "rope") this.modifyLayer(19, 7);
						else if (this.armsMaterial() == "web") this.modifyLayer(19, 12);
						else this.modifyLayer(19, 12); // for hypno
					}
					else {
						this.modifyLayer(19, 6);
					}
				}
				else if (this.isArmsBound()) {
					if (this.armsMaterial() == "rope") this.modifyLayer(19, 5);
					else if (this.armsMaterial() == "web") this.modifyLayer(19, 11);
					else this.modifyLayer(19, 11); // for hypno
				}
				else {
					this.modifyLayer(19, 4);
				}
			}
			else if (this.clothesRippingLevel() == 1) {
				// Legs tie doesn't matter if clothes are ripped this far
				if(this.hasCrotchRope()) {
					// NOTHING HERE YET
					// For ropes should always be ripped 2
				}
				else if (this.isArmsBound()) {
					if (this.armsMaterial() == "rope") this.modifyLayer(19, 3);
					else if (this.armsMaterial() == "web") this.modifyLayer(19, 10);
					else this.modifyLayer(19, 10); // for hypno
				}
				else {
					this.modifyLayer(19, 2);
				}
			}
			else {
				if (this.armsMaterial() == "rope") {
					if (this.legsMaterial() == "rope") {/* should never occur due to ripping */}
					else if (this.legsMaterial() == "web") {/*TODO*/}
					else this.modifyLayer(19, 1);
				}
				else if (this.armsMaterial() == "web") {
					if (this.legsMaterial() == "rope") {/* should never occur due to ripping */}
					else if (this.legsMaterial() == "web") this.modifyLayer(19, 9);
					else this.modifyLayer(19, 8);
				}
				else if (this.isArmsBound()) { // hypno bindings or other
					if (this.legsMaterial() == "rope") {/* should never occur due to ripping */}
					else if (this.legsMaterial() == "web") this.modifyLayer(19, 9);
					else this.modifyLayer(19, 8);
				}
				else {
					this.modifyLayer(19, 0);
				}
			}

			if (hasOuter && !this.isFullyMummified()) {
				if (this.armsMaterial() == "rope") this.modifyLayer(20, 5);
				else if (this.armsMaterial() == "web") {
					if (this.legsMaterial() == "web") this.modifyLayer(20, 2);
					else this.modifyLayer(20, 1);
				}
				else if (this.isArmsBound()) {/*nothing for now*/}
				else this.modifyLayer(20, 0);
			}
		}
		else if (hasBra) {
			if (this.armsMaterial() == "rope") this.modifyLayer(14, 1);
			else this.modifyLayer(14, 0);
		}
		else {
			if (this.armsMaterial() == "rope") this.modifyLayer(12, 1);
			else this.modifyLayer(12, 0);
		}

		// actual bindings
		if (this.armsMaterial() == "rope") this.modifyLayer(11, 0);
		else if (this.armsMaterial() == "web") {
			if (this.mummifiedMaterial() == "web") this.modifyLayer(28, 1);
			else this.modifyLayer(27, 1);
		}

		if (this.legsMaterial() == "rope") this.modifyLayer(25, 3);
		else if (this.legsMaterial() == "web" && !this.isFullyMummified()) this.modifyLayer(25, 1);

		if (this.hasCrotchRope()) this.modifyLayer(15, 0);

		// hair front
		this.modifyLayer(46, 0);

		// blindfolds
		if (this.isEyesBound())
		{
			if (this.eyesMaterial() == "web") this.modifyLayer(44, 0);
			else if (this.eyesMaterial() == "tape") this.modifyLayer(44, 2);
			else if (this.eyesMaterial() == "cloth") this.modifyLayer(44, 4);
		}

		// gags
		if (this.isMouthBound())
		{
			if (this.mouthMaterial() == "web") {
				if (this.mummifiedMaterial() == "web") this.modifyLayer(42,1);
				else this.modifyLayer(42, 0);
			}
			else if (this.mouthMaterial() == "tape") this.modifyLayer(42, 2);
			else if (this.mouthMaterial() == "bit_gag") this.modifyLayer(42, 5);
		}

		// sweat
		if (this._sweatDropType == 1) this.modifyLayer(40, 0);
		else if (this._sweatDropType == 2) this.modifyLayer(41, 0);
		else if (this._sweatDropType == 3)
		{
			this.modifyLayer(40, 0);
			this.modifyLayer(41, 0);
		}

		// embarrassment
		if (this._embarrassment >= 1) this.modifyLayer(38, 0);
		if (this._embarrassment >= 2) this.modifyLayer(39, 0);

		// drool
		if (hasDrool)
		{
			if(this.mouthMaterial() == "bit_gag") this.modifyLayer(43,0);
		}

		// collar
		if(this.collarMaterial() == "bell") this.modifyLayer(45,1);

		// wrapping
		if (grabberConfig == "plant"){
			this.modifyLayer(51,0);
		}
		else if (grabberConfig == "bossPillar") {
			this.modifyLayer(48,-1);
			this.modifyLayer(49,-1);
			this.modifyLayer(50,2);
		}
	}
	else if (name == "blanche_event_1")	{
		this._layers = [
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		]

		const hasDrool = this._drool > 0;
		const legsChained = hasAcc1;

		if (hasAcc2 && grabberConfig == "none" && !this.isArmsBound()) this.modifyLayer(28, 0); // staff

		let expressionArray;
		if (!this._isPlayer) {
			if (Array.isArray(this._currentExpression)) expressionArray = this._currentExpression;
			else expressionArray = CharacterPicture.blancheMEE[this._currentExpression];
		}
		else {
			expressionArray = [
				$gamePlayer._portraitCurrentMouth,
				$gamePlayer._portraitCurrentEyes,
				$gamePlayer._portraitCurrentEyebrows
			]
		}

		// mouth
		if (!this.isMouthBound())
			this.modifyLayer(15, expressionArray[0] - 1);

		// eyes
		if (!this.isEyesBound())
			this.modifyLayer(16, expressionArray[1] - 1);

		// eyebrows
		this.modifyLayer(17, expressionArray[2] - 1);

		// base leg layer
		this.modifyLayer(1, 0);

		// shoes
		if (hasShoes) {
			this.modifyLayer(4, 0);
			this.modifyLayer(5, 0);
		}

		// panties (chastity belt)
		if (hasPanties) {
			this.modifyLayer(6, 0);
		}

		// upper base
		if (this.isArmsBound() ||  grabberConfig != "none") this.modifyLayer(2, 1);
		else this.modifyLayer(2, 0);

		// legs chains
		if (legsChained) this.modifyLayer(7, 0);

		// clothes
		if (this.clothesRippingLevel() == 1) {
			this.modifyLayer(8, 1);
			this.modifyLayer(9, 1);
		}
		else {
			this.modifyLayer(8, 0);
			this.modifyLayer(9, 0);
		}

		// arm bindings
		if (this.isArmsBound()) this.modifyLayer(10, 0);

		// Nipples
		if (this.nippleMaterial() == "nipple_clamps") this.modifyLayer(11, 0);

		// blindfolds
		if (this.isEyesBound()) this.modifyLayer(24, 0);

		// gags
		if (this.isMouthBound()) this.modifyLayer(22, 0);

		// sweat
		if (this._sweatDropType == 1) this.modifyLayer(20, 0);
		else if (this._sweatDropType == 2) this.modifyLayer(21, 0);
		else if (this._sweatDropType == 3)
		{
			this.modifyLayer(20, 0);
			this.modifyLayer(21, 0);
		}

		// embarrassment
		if (this._embarrassment >= 1) this.modifyLayer(18, 0);
		if (this._embarrassment >= 2) this.modifyLayer(19, 0);

		// drool
		if (hasDrool) {
			if(this.mouthMaterial() == "bit_gag") this.modifyLayer(23,0);
		}

		// collar
		if(this.collarMaterial() == "prisoner") this.modifyLayer(26,0);
		else if(this.collarMaterial() == "prisoner_chain") this.modifyLayer(26,1);
		else if(this.collarMaterial() == "prisoner_chain_yank") this.modifyLayer(26,2);
	}
	else if (name == "noire") {
		this._layers = [
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1
		]

		let mouthIndex = $gamePlayer._portraitCurrentMouth;
		let eyesIndex = $gamePlayer._portraitCurrentEyes;
		let eyebrowsIndex = $gamePlayer._portraitCurrentEyebrows;
		let hasFaceShadow = $gamePlayer._portraitHasFaceShadow;
		let hasAshen = this._hasAshen || $gamePlayer._portraitHasAshen;
		let hasSweat = this._hasSweat || $gamePlayer._portraitHasSweat;
		let hasExtraSweat = this._hasExtraSweat || $gamePlayer._portraitHasExtraSweat;
		let hasAnger = $gamePlayer._portraitHasAnger;
		let hasBlush = this._embarrassment > 0 || $gamePlayer.isDistracted;
		let hasExtraBlush = this._embarrassment > 1 || $gamePlayer._portraitHasBlush;
		let hasDrool = $gamePlayer._portraitIsDrooling;

		if (!this._isPlayer) {
			let expressionArray;
			if (Array.isArray(this._currentExpression)) expressionArray = this._currentExpression;
			else expressionArray = CharacterPicture.lilyMEE[this._currentExpression];

			mouthIndex = expressionArray[0];
			eyesIndex = expressionArray[1];
			eyebrowsIndex = expressionArray[2];
			if (expressionArray.length > 2)
				hasFaceShadow = expressionArray[3];
			if (expressionArray.length > 3)
				hasAshen = expressionArray[4];
			if (expressionArray.length > 4)
				hasSweat = expressionArray[5];
			if (expressionArray.length > 5)
				hasExtraSweat = expressionArray[6];
			if (expressionArray.length > 6)
				hasAnger = expressionArray[7];
			if (expressionArray.length > 7)
				hasBlush = (this._embarrassment >= 1) || expressionArray[8];
			hasExtraBlush = (this._embarrassment >= 2);
			hasDrool = this._drool > 0;
		}

		// outfit
		if (this.armsMaterial() != "none")	{
			if (hasInner) this.modifyLayer(1,1);
			else this.modifyLayer(1,3);
		}
		else {
			if (hasInner) this.modifyLayer(1,0);
			else this.modifyLayer(1,2);
		}

		// head
		if (hasAnger) this.modifyLayer(9,0);
		if (!this.isMouthBound()) this.modifyLayer(10,mouthIndex-1);

		if(this.mouthMaterial() == "bit_gag") this.modifyLayer(11,4);

		if (hasDrool) {
			if(this.mouthMaterial() == "bit_gag") this.modifyLayer(12,3);
		}

		this.modifyLayer(13,eyebrowsIndex-1);
		if (!this.isEyesBound()) this.modifyLayer(14,eyesIndex-1);

		if (hasBlush) this.modifyLayer(16,0);
		if (hasFaceShadow) this.modifyLayer(17,0);
		if (hasAshen) this.modifyLayer(18,0);
		if (hasExtraBlush) this.modifyLayer(19,0);
		if (hasSweat) this.modifyLayer(20,0);
		if (hasExtraSweat) this.modifyLayer(21,0);
	}
	else if (name == "lily_urban")
	{
		this._layers = [
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1
		]

		let mouthIndex = $gamePlayer._portraitCurrentMouth;
		let eyesIndex = $gamePlayer._portraitCurrentEyes;
		let eyebrowsIndex = $gamePlayer._portraitCurrentEyebrows;
		let hasFaceShadow = $gamePlayer._portraitHasFaceShadow;
		let hasAshen = this._hasAshen || $gamePlayer._portraitHasAshen;
		let hasSweat = this._hasSweat || $gamePlayer._portraitHasSweat;
		let hasExtraSweat = this._hasExtraSweat || $gamePlayer._portraitHasExtraSweat;
		let hasAnger = $gamePlayer._portraitHasAnger;
		let hasBlush = this._embarrassment > 0 || $gamePlayer.isDistracted;
		let hasExtraBlush = this._embarrassment > 1 || $gamePlayer._portraitHasBlush;
		let hasDrool = $gamePlayer._portraitIsDrooling;

		if (!this._isPlayer)
		{
			let expressionArray;
			if (Array.isArray(this._currentExpression)) expressionArray = this._currentExpression;
			else expressionArray = CharacterPicture.lilyMEE[this._currentExpression];

			mouthIndex = expressionArray[0];
			eyesIndex = expressionArray[1];
			eyebrowsIndex = expressionArray[2];
			if (expressionArray.length > 2)
				hasFaceShadow = expressionArray[3];
			if (expressionArray.length > 3)
				hasAshen = expressionArray[4];
			if (expressionArray.length > 4)
				hasSweat = expressionArray[5];
			if (expressionArray.length > 5)
				hasExtraSweat = expressionArray[6];
			if (expressionArray.length > 6)
				hasAnger = expressionArray[7];
			if (expressionArray.length > 7)
				hasBlush = (this._embarrassment >= 1) || expressionArray[8];
			hasExtraBlush = (this._embarrassment >= 2);
			hasDrool = this._drool > 0;
		}

		// Enemy
		if (grabberConfig == "human")
		{
			this.modifyLayer(0,0);

			if(this.armsMaterial() == "web") {
				this.modifyLayer(42,12);
			}
			else if(this.armsAreTogether())
			{
				if (hasOuter) this.modifyLayer(42,7);
				else if (hasInner) this.modifyLayer(42,6);
				else if (hasBra) this.modifyLayer(42,5);
				else this.modifyLayer(42,4);
			}
			else
			{
				if (hasOuter) this.modifyLayer(42,3);
				else if (hasInner) this.modifyLayer(42,2);
				else if (hasBra) this.modifyLayer(42,1);
				else this.modifyLayer(42,0);
			}
		}
		else if (grabberConfig == "plant")
		{
			this.modifyLayer(42,8);
			this.modifyLayer(43,0);
		}
		else if (grabberConfig == "red_plant")
		{
			this.modifyLayer(42,9);
			this.modifyLayer(43,0);
		}
		else if (grabberConfig == "sandbag"){
			this.modifyLayer(42,10);
		}
		else if (grabberConfig == "pole")
			this.modifyLayer(0,1);
		else if (grabberConfig == "caterpillar")
			this.modifyLayer(0,2);
		else if (grabberConfig == "bossPillar")
			this.modifyLayer(42,11);


		// Legs area
		if (!this.legsAreInvisible())
		{
			if (!this.isGrounded())
			{
				if (this.legsAreTogether())
				{
					// standing, legs tied
					if (this.legsWebLikePose()) this.modifyLayer(1,3);
					else this.modifyLayer(1,1);

					if (this.hasCrotchRope())
					{
						this.modifyLayer(3,0);
						if (hasInner) {
							if (this.isFullyMummified()) {
								// DO NOTHING
							}
							else if (this.armsMaterial() == "web" || this.armsMaterial() == "tape"){
								this.modifyLayer(13,6);
							}
							else this.modifyLayer(13,2);
						}
					}
					else
					{
						if (hasInner) {
							if (this.isFullyMummified()) {
								// DO NOTHING
							}
							else if (this.armsMaterial() == "web" || this.armsMaterial() == "tape") {
								this.modifyLayer(13,5);
							}
							else this.modifyLayer(13,1);
						}
					}
					if (hasLegWear) {
						if (this.legsWebLikePose()) this.modifyLayer(4,3);
						else this.modifyLayer(4,1);
					}
					if (hasShoes) {
						if (this.isFullyMummified()) {
							// DO NOTHING
						}
						else if (this.legsMaterial() == "web") this.modifyLayer(9,3);
						else this.modifyLayer(9,1);

						if (hasLegWear) this.modifyLayer(8,5);
						else this.modifyLayer(8,4);
					}

					if (this.legsMaterial() == "rope") this.modifyLayer(18,0);
					else if (this.legsMaterial() == "vines") this.modifyLayer(18,1);
					else if (this.legsMaterial() == "regen_vines") this.modifyLayer(18,2);
					else if (this.legsMaterial() == "web") this.modifyLayer(18,4);
					else if (this.legsMaterial() == "tape") {
						if (hasShoes) this.modifyLayer(18,6);
						else this.modifyLayer(18,5);
					}
				}
				else
				{
					// standing, legs free
					this.modifyLayer(1,0);
					if (this.hasCrotchRope())
					{
						this.modifyLayer(3,0);
						if (hasInner) {
							if (this.isFullyMummified()) {
								// DO NOTHING
							}
							else if (this.armsMaterial() == "web" || this.armsMaterial() == "tape") {
								this.modifyLayer(13,6);
							}
							else this.modifyLayer(13,2);
						}
					}
					else
					{
						if (hasInner)
						{
							// Take care, different skirt if wearing outer and arms are bound
							if (this.isFullyMummified()) {
								// DO NOTHING
							}
							else if (this.armsMaterial() == "web" || this.armsMaterial() == "tape") {
								this.modifyLayer(13,5);
							}
							else if (this.armsAreTogether() && hasOuter) this.modifyLayer(13,1);
							else this.modifyLayer(13,0);
						}
					}
					if (hasLegWear) this.modifyLayer(4,0);
					if (hasShoes)
					{
						if (hasLegWear) this.modifyLayer(8,1);
						else this.modifyLayer(8,0);

						this.modifyLayer(9,0);
					}
				}

				if (this.hasCrotchRope())
				{
					if(hasPanties) this.modifyLayer(7,1);
				}
				else
				{
					if(hasPanties) this.modifyLayer(7,0);
				}

				if (this.isFullyMummified()) {
					// DO NOTHING
				}
				else if (this.crotchRopeMaterial() == "rope") this.modifyLayer(14,0);
				else if (this.crotchRopeMaterial() == "vines") this.modifyLayer(14,1);
				else if (this.crotchRopeMaterial() == "regen_vines") this.modifyLayer(14,2);
			}
			else if (!this.legsAreTogether())
			{
				// trip 1
				this.modifyLayer(1,2);
				if (hasLegWear) this.modifyLayer(4,2);
				if (hasShoes)
				{
					if (hasLegWear) this.modifyLayer(8,3);
					else this.modifyLayer(8,2);

					this.modifyLayer(9,2);
				}

				if (this.hasCrotchRope())
				{
					this.modifyLayer(3,0);
					if(hasPanties) this.modifyLayer(7,3);
					if(hasInner)
					{
						this.modifyLayer(12,1);
						if (this.isFullyMummified()) {
							// DO NOTHING
						}
						else if (this.armsMaterial() == "web" || this.armsMaterial() == "tape") {
							this.modifyLayer(13,8);
						}
						else this.modifyLayer(13,4);
					}
				}
				else
				{
					if(hasPanties) this.modifyLayer(7,2);
					if(hasInner)
					{
						this.modifyLayer(12,0);
						if (this.isFullyMummified()) {
							// DO NOTHING
						}
						else if (this.armsMaterial() == "web" || this.armsMaterial() == "tape") {
							this.modifyLayer(13,7);
						}
						else this.modifyLayer(13,3);
					}
				}

				if (this.isFullyMummified()) {
					// DO NOTHING
				}
				else if (this.crotchRopeMaterial() == "rope") this.modifyLayer(14,0);
				else if (this.crotchRopeMaterial() == "vines") this.modifyLayer(14,1);
				else if (this.crotchRopeMaterial() == "regen_vines") this.modifyLayer(14,2);
			}
			else
			{
				// trip 2

				this.modifyLayer(21,0);
				if(hasPanties) this.modifyLayer(22,0);
				if(hasLegWear) this.modifyLayer(24,0);

				if(hasShoes)
				{
					if (this.isFullyMummified()) {
						// DO NOTHING
					}
					else if (this.legsMaterial() == "web") {
						this.modifyLayer(26,-1);
						this.modifyLayer(27,1);
					}
					else {
						if(hasLegWear) this.modifyLayer(26,1);
						else this.modifyLayer(26,0);

						if (this.legsMaterial() == "tape") {
							this.modifyLayer(27,2);
						}
						else {
							this.modifyLayer(27,0);
						}
					}
				}

				if (this.isFullyMummified()) {
					// DO NOTHING
				}
				else if (this.crotchRopeMaterial() == "rope") this.modifyLayer(23,0);
				else if (this.crotchRopeMaterial() == "vines") this.modifyLayer(23,1);
				else if (this.crotchRopeMaterial() == "regen_vines") this.modifyLayer(23,2);

				if (this.legsMaterial() == "rope") this.modifyLayer(25,0);
				else if (this.legsMaterial() == "vines") this.modifyLayer(25,1);
				else if (this.legsMaterial() == "regen_vines") this.modifyLayer(25,2);
				else if (this.legsMaterial() == "web") {
					this.modifyLayer(21,1);
					if(hasLegWear) this.modifyLayer(24,1);
					if(this.mummifiedMaterial() == "web") this.modifyLayer(25,4);
					else this.modifyLayer(25,3);
				}
				else if (this.legsMaterial() == "tape") {
					this.modifyLayer(21,1);
					if(hasLegWear) this.modifyLayer(24,1);
					if(this.mummifiedMaterial() == "tape") this.modifyLayer(25,6);
					else this.modifyLayer(25,5);
				}

				if (this.isFullyMummified()) {
					this.modifyLayer(13,-1);
				}
				if(hasInner) {
					if (this.isFullyMummified()) {
						// DO NOTHING
					}
					else if (this.armsMaterial() == "web" || this.armsMaterial() == "tape") this.modifyLayer(13,9);
					else this.modifyLayer(13,3);
				}
			}
		}

		// Arms area
		if (this.armsAreTogether())
		{
			// Bound arms
			if (this.armsBehindBackPose()) {

				if(hasBra) this.modifyLayer(2,3);
				else this.modifyLayer(2,2);

				this.modifyLayer(6,-1);
			}
			else {
				this.modifyLayer(2,1);
				if(hasBra) this.modifyLayer(6,1);
			}

			if(hasInner){
				if (this.mummifiedMaterial() == "tape") this.modifyLayer(11,-1);
				else if (this.mummifiedMaterial() == "web") this.modifyLayer(11,4);
				else if (this.armsMaterial() == "web") this.modifyLayer(11,3);
				else if (this.armsMaterial() == "tape") this.modifyLayer(11,5);
				else if (this.mittensMaterial() != "leather_binder") this.modifyLayer(11,1);
				else this.modifyLayer(11,2);
			}

			if(hasOuter)
			{
				if (this.mummifiedMaterial() == "web") {
					this.modifyLayer(17,5);
				}
				else if (this.mummifiedMaterial() == "tape") {
					this.modifyLayer(17,-1);
				}
				else if (this.armsMaterial() == "web" || this.armsMaterial() == "tape") {
					if(hasInner) this.modifyLayer(15,14);
					else if(hasPanties) this.modifyLayer(15,13);
					else this.modifyLayer(15,12);

					if (this.armsMaterial() == "web") {
						if(this.isGrounded()) this.modifyLayer(17,3);
						else  this.modifyLayer(17,4);
					}
					else if (this.armsMaterial() == "tape") {
						if(this.isGrounded()) this.modifyLayer(17,7);
						else  this.modifyLayer(17,6);
					}
				}
				else {
					if(hasInner) this.modifyLayer(15,1);
					else if(hasBra && hasPanties) this.modifyLayer(15,9);

					if(this.isGrounded())
					{
						if(hasInner) this.modifyLayer(15,2);
						else if(hasBra && hasPanties) this.modifyLayer(15,10);
						this.modifyLayer(17,2);
					}
					else  this.modifyLayer(17,1);
				}
			}

			if (this.mummifiedMaterial() == "web" && !this.legsAreInvisible()) {
				if (this.isGrounded()) {
					if(hasBra) this.modifyLayer(19,7);
					else this.modifyLayer(19,6);
				}
				else {
					if(hasBra) this.modifyLayer(19,9);
					else this.modifyLayer(19,8);
				}
			}
			else if (this.mummifiedMaterial() == "tape" && !this.legsAreInvisible()) {
				if (this.isGrounded()) this.modifyLayer(19,11);
				else this.modifyLayer(19,10);
			}
			else if (this.armsMaterial() == "rope") this.modifyLayer(19,0);
			else if (this.armsMaterial() == "vines") this.modifyLayer(19,1);
			else if (this.armsMaterial() == "regen_vines") this.modifyLayer(19,2);
			else if (this.armsMaterial() == "web") {
				if(hasBra) this.modifyLayer(19,5);
				else this.modifyLayer(19,4);
			}
			else if (this.armsMaterial() == "tape") {
				if(hasOuter) this.modifyLayer(19,14);
				else if(hasInner) this.modifyLayer(19,13);
				else if(hasBra) this.modifyLayer(19,14);
				else this.modifyLayer(19,12);
			}

			if (this.mittensMaterial() == "leather_binder") this.modifyLayer(10,0);
		}
		else
		{
			// Free arms
			this.modifyLayer(2,0);
			if(hasBra) this.modifyLayer(6,0);
			if(hasInner) this.modifyLayer(11,0);

			if(hasOuter)
			{
				if(hasInner) this.modifyLayer(15,0);
				else if(hasBra && hasPanties) this.modifyLayer(15,8);

				if(this.isGrounded())
				{
					if(hasInner) this.modifyLayer(15,0); //TODO: missing 3 here
					else if(hasBra && hasPanties) this.modifyLayer(15,11);
				}

				this.modifyLayer(17,0);
			}
		}

		// Nipples
		if (this.nippleMaterial() == "nipple_clamps")
			this.modifyLayer(20, 0);

		// Special part that needs to be drawn if wearing outer, arms tied, and no skirt
		if(hasOuter && !hasInner && this.armsAreTogether() && !this.isGrounded()) {
			if (this.isFullyMummified()) {
				// do nothing
			}
			else if (this.armsMaterial() == "web" || this.armsMaterial() == "tape")this.modifyLayer(16,1);
			else this.modifyLayer(16,0);
		}

		// neck
		if(this.collarMaterial() == "bell") this.modifyLayer(28,0);
		else if(this.collarMaterial() == "rune") this.modifyLayer(28,1);

		// head
		if (hasAnger) this.modifyLayer(29,0);
		if (!this.isMouthBound()) this.modifyLayer(30,mouthIndex-1);

		if(this.mouthMaterial() == "rope") this.modifyLayer(31,0);
		else if(this.mouthMaterial() == "ball_big") this.modifyLayer(31,1);
		else if(this.mouthMaterial() == "ball") this.modifyLayer(31,2);
		else if(this.mouthMaterial() == "ball_strict")
		{
			this.modifyLayer(31,2);

			if (this.eyesMaterial() == "leather_blindfold") this.modifyLayer(44,1);
			else this.modifyLayer(44,0);
		}
		else if(this.mouthMaterial() == "cloth") this.modifyLayer(31,3);
		else if(this.mouthMaterial() == "bit_gag") this.modifyLayer(31,4);
		else if(this.mouthMaterial() == "web") {
			if (this.mummifiedMaterial() == "web") this.modifyLayer(31,6);
			else this.modifyLayer(31,5);
		}
		else if(this.mouthMaterial() == "tape") {
			if (this.mummifiedMaterial() == "tape") this.modifyLayer(31,8);
			else this.modifyLayer(31,7);
		}

		if (hasDrool)
		{
			if(this.mouthMaterial() == "ball_big") this.modifyLayer(32,0);
			else if(this.mouthMaterial() == "ball") this.modifyLayer(32,1);
			else if(this.mouthMaterial() == "ball_strict") this.modifyLayer(32,1);
			else if(this.mouthMaterial() == "cloth") this.modifyLayer(32,2);
			else if(this.mouthMaterial() == "bit_gag") this.modifyLayer(32,3);
		}

		this.modifyLayer(33,eyebrowsIndex-1);
		if (!this.isEyesBound()) this.modifyLayer(34,eyesIndex-1);

		if(this.eyesMaterial() == "cloth") this.modifyLayer(35,0);
		else if(this.eyesMaterial() == "rope") this.modifyLayer(35,1);
		else if(this.eyesMaterial() == "leather_blindfold") this.modifyLayer(35,2);
		else if(this.eyesMaterial() == "web") this.modifyLayer(35,3);

		if (hasBlush) this.modifyLayer(36,0);
		if (hasFaceShadow) this.modifyLayer(37,0);
		if (hasAshen) this.modifyLayer(38,0);
		if (hasExtraBlush) this.modifyLayer(39,0);
		if (hasSweat) this.modifyLayer(40,0);
		if (hasExtraSweat) this.modifyLayer(41,0);

		if (hasHeadwear && grabberConfig != "sandbag")
		{
			this.modifyLayer(45,0);
			this.modifyLayer(46,0);
		}

		// Hide outer when grabbed by plant
		if (grabberConfig == "plant")
			this.modifyLayer(17,-1);

		// Vibe
		if (this.intimateMaterial() == "bullet_vibe"){
			if (this.vibeIntensity() == 0) this.modifyLayer(5,0);
			else if (this.vibeIntensity() > 0) this.modifyLayer(5,1);
		}

	}
	else if (name == "lily_bandit")
	{
		this._layers = [
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1
		]

		let mouthIndex = $gamePlayer._portraitCurrentMouth;
		let eyesIndex = $gamePlayer._portraitCurrentEyes;
		let eyebrowsIndex = $gamePlayer._portraitCurrentEyebrows;
		let hasFaceShadow = $gamePlayer._portraitHasFaceShadow;
		let hasAshen = this._hasAshen ||  $gamePlayer._portraitHasAshen;
		let hasSweat = this._hasSweat || $gamePlayer._portraitHasSweat;
		let hasExtraSweat = this._hasExtraSweat || $gamePlayer._portraitHasExtraSweat;
		let hasAnger = $gamePlayer._portraitHasAnger;
		let hasBlush = this._embarrassment > 0 || $gamePlayer.isDistracted;
		let hasExtraBlush = this._embarrassment > 1 || $gamePlayer._portraitHasBlush;
		let hasDrool = $gamePlayer._portraitIsDrooling;

		if (!this._isPlayer)
		{
			let expressionArray;
			if (Array.isArray(this._currentExpression)) expressionArray = this._currentExpression;
			else expressionArray = CharacterPicture.lilyMEE[this._currentExpression];

			mouthIndex = expressionArray[0];
			eyesIndex = expressionArray[1];
			eyebrowsIndex = expressionArray[2];
			if (expressionArray.length > 2)
				hasFaceShadow = expressionArray[3];
			if (expressionArray.length > 3)
				hasAshen = expressionArray[4];
			if (expressionArray.length > 4)
				hasSweat = expressionArray[5];
			if (expressionArray.length > 5)
				hasExtraSweat = expressionArray[6];
			if (expressionArray.length > 6)
				hasAnger = expressionArray[7];
			if (expressionArray.length > 7)
				hasBlush = (this._embarrassment >= 1) || expressionArray[8];
			hasExtraBlush = (this._embarrassment >= 2);
			hasDrool = this._drool > 0;
		}

		// Enemy
		if (grabberConfig == "human")
		{
			this.modifyLayer(0,0);

			if(this.armsMaterial() == "web") {
				this.modifyLayer(42,0);
			}
			else if(this.armsAreTogether())
			{
				if (hasInner) this.modifyLayer(42,3);
				else this.modifyLayer(42,2);
			}
			else
			{
				if (hasInner) this.modifyLayer(42,1);
				else this.modifyLayer(42,0);
			}
		}
		else if (grabberConfig == "plant")
		{
			this.modifyLayer(42,4);
			this.modifyLayer(43,0);
		}
		else if (grabberConfig == "red_plant")
		{
			this.modifyLayer(42,5);
			this.modifyLayer(43,0);
		}
		else if (grabberConfig == "sandbag"){
			this.modifyLayer(42,6);
		}
		else if (grabberConfig == "pole")
			this.modifyLayer(0,1);
		else if (grabberConfig == "caterpillar")
			this.modifyLayer(0,2);
		else if (grabberConfig == "bossPillar")
			this.modifyLayer(42,7);

		// Accessory 5. Only used in certain escapes.
		if ($storyVars.cave.ca1.isActive){
			if (hasAcc5 && !this.isGrounded()) this.modifyLayer(1,0);
		}


		// Legs area
		if (!this.legsAreInvisible())
		{
			if (!this.isGrounded())
			{
				if (this.legsAreTogether())
				{
					// standing, legs tied
					if (this.legsWebLikePose()) this.modifyLayer(2,3);
					else this.modifyLayer(2,1);

					if(hasPanties)
					{
						if(hasLegWear) this.modifyLayer(7,3);
						else this.modifyLayer(7,1);
					}
					if(hasLegWear) {
						if (this.legsMaterial() == "web") this.modifyLayer(9,3);
						else if (this.legsMaterial() == "tape") this.modifyLayer(9,4);
						else this.modifyLayer(9,1);
					}

					if(hasShoes)
					{
						if (this.isFullyMummified()) {
							this.modifyLayer(13,-1);
						}
						else if (this.legsMaterial() == "web") {
							this.modifyLayer(13,3);
						}
						else if (this.legsMaterial() == "tape") {
							this.modifyLayer(13,4);
						}
						else {
							if(hasLegWear) this.modifyLayer(12,1);
							else this.modifyLayer(12,0);
							this.modifyLayer(13,1);
						}
					}

					if(hasAcc3 && !this.hasCrotchRope())
					{
						if(hasLegWear) this.modifyLayer(10,5);
						else if(hasPanties) this.modifyLayer(10,4);
						else this.modifyLayer(10,3);
						this.modifyLayer(16,1);
					}

					if (this.isFullyMummified()) {
						// NOTHING - mummification layer is on arms layer
					}
					else if (this.legsMaterial() == "rope") {
						if(hasShoes) this.modifyLayer(20,1);
						else this.modifyLayer(20,0);
					}
					else if (this.legsMaterial() == "vines") {
						if(hasShoes) this.modifyLayer(20,3);
						else this.modifyLayer(20,2);
					}
					else if (this.legsMaterial() == "regen_vines") {
						if(hasShoes) this.modifyLayer(20,5);
						else this.modifyLayer(20,4);
					}
					else if (this.legsMaterial() == "web") {
						if(hasShoes) this.modifyLayer(20,6);
						else this.modifyLayer(20,7);
					}
					else if (this.legsMaterial() == "tape") {
						if(hasShoes) this.modifyLayer(20,8);
						else this.modifyLayer(20,9);
					}

					if (this.hasCrotchRope())
					{
						if(hasLegWear) this.modifyLayer(15,1);
						else if(hasPanties) this.modifyLayer(15,2);
						else this.modifyLayer(15,0);
					}

					if (this.isFullyMummified()) {
						// DO NOTHING
					}
					else if (this.crotchRopeMaterial() == "rope") this.modifyLayer(17,1);
					else if (this.crotchRopeMaterial() == "vines") this.modifyLayer(17,3);
					else if (this.crotchRopeMaterial() == "regen_vines") this.modifyLayer(17,5);
				}
				else
				{
					// standing, legs free
					this.modifyLayer(2,0);

					if(hasAcc3 && !this.hasCrotchRope())
					{
						if(hasLegWear) this.modifyLayer(10,2);
						else if(hasPanties) this.modifyLayer(10,1);
						else this.modifyLayer(10,0);
						this.modifyLayer(16,0);
					}

					if(hasPanties)
					{
						if(hasLegWear) this.modifyLayer(7,2);
						else this.modifyLayer(7,0);
					}
					if(hasLegWear) this.modifyLayer(9,0);
					if(hasShoes)
					{
						if(hasLegWear) this.modifyLayer(11,1);
						else this.modifyLayer(11,0);
						this.modifyLayer(13,0);
					}

					if (this.hasCrotchRope())
					{
						if(hasLegWear) this.modifyLayer(15,4);
						else if(hasPanties) this.modifyLayer(15,5);
						else this.modifyLayer(15,3);
					}

					if (this.isFullyMummified()) {
						// DO NOTHING
					}
					else if (this.crotchRopeMaterial() == "rope") this.modifyLayer(17,0);
					else if (this.crotchRopeMaterial() == "vines") this.modifyLayer(17,2);
					else if (this.crotchRopeMaterial() == "regen_vines") this.modifyLayer(17,4);
				}
			}
			else if (!this.legsAreTogether())
			{
				// trip 1
				this.modifyLayer(2,2);

				if(hasAcc3 && !this.hasCrotchRope())
				{
					if(hasLegWear) this.modifyLayer(10,8);
					else if(hasPanties) this.modifyLayer(10,7);
					else this.modifyLayer(10,6);
					this.modifyLayer(16,2);
				}

				if(hasPanties)
				{
					if(hasLegWear) this.modifyLayer(7,3);
					else this.modifyLayer(7,1);
				}
				if(hasLegWear) this.modifyLayer(9,2);

				if(hasShoes) {
					this.modifyLayer(13,2);
				}

				if (this.hasCrotchRope())
				{
					if(hasLegWear) this.modifyLayer(15,1);
					else if(hasPanties) this.modifyLayer(15,2);
					else this.modifyLayer(15,0);
				}

				if (this.isFullyMummified()) {
					// DO NOTHING
				}
				else if (this.crotchRopeMaterial() == "rope") this.modifyLayer(17,1);
				else if (this.crotchRopeMaterial() == "vines") this.modifyLayer(17,3);
				else if (this.crotchRopeMaterial() == "regen_vines") this.modifyLayer(17,5);
			}
			else
			{
				// trip 2
				this.modifyLayer(22,0);
				if(hasLegWear) this.modifyLayer(23,0);

				if(hasShoes)
				{
					if (this.legsMaterial() != "web") {
						if(hasLegWear) this.modifyLayer(24,1);
						else this.modifyLayer(24,0);
					}

					if (this.isFullyMummified()) {
						this.modifyLayer(26,-1);
					}
					else if (this.legsMaterial() == "web") this.modifyLayer(26,1);
					else this.modifyLayer(26,0);
				}

				if (this.isFullyMummified()) {
					// DO NOTHING
				}
				else if (this.crotchRopeMaterial() == "rope") this.modifyLayer(25,0);
				else if (this.crotchRopeMaterial() == "vines") this.modifyLayer(25,1);
				else if (this.crotchRopeMaterial() == "regen_vines") this.modifyLayer(25,2);

				if (this.legsMaterial() == "rope") {
					if(hasShoes) this.modifyLayer(27,1);
					else this.modifyLayer(27,0);
				}
				else if (this.legsMaterial() == "vines") {
					if(hasShoes) this.modifyLayer(27,3);
					else this.modifyLayer(27,2);
				}
				else if (this.legsMaterial() == "regen_vines") {
					if(hasShoes) this.modifyLayer(27,5);
					else this.modifyLayer(27,4);
				}
				else if (this.legsMaterial() == "web") {
					this.modifyLayer(22,1);
					if(hasLegWear) this.modifyLayer(23,1);
					if(this.mummifiedMaterial() == "web") this.modifyLayer(27,8);
					else if(hasShoes) this.modifyLayer(27,7);
					else this.modifyLayer(27,6);
				}
				else if (this.legsMaterial() == "tape") {
					this.modifyLayer(22,1);
					if(hasLegWear) this.modifyLayer(23,1);
					if(this.mummifiedMaterial() == "tape") this.modifyLayer(27,11);
					else if(hasShoes) this.modifyLayer(27,10);
					else this.modifyLayer(27,9);
				}
			}
		}

		// Arms area
		if (this.armsAreTogether())
		{
			// Bound arms
			if (this.armsBehindBackPose()) this.modifyLayer(3,2);
			else this.modifyLayer(3,1);

			if(hasAcc1) {
				if (this.armsBehindBackPose()) this.modifyLayer(4,2);
				else this.modifyLayer(4,1);
			}
			if(hasAcc2 && !this.armsBehindBackPose()) this.modifyLayer(5,1);

			if(hasBra) {
				if(this.armsMaterial() == "tape") this.modifyLayer(14,2);
				else if(this.armsMaterial() != "web") this.modifyLayer(14,1);
			}
			if(hasInner) {
				if (this.mummifiedMaterial() == "tape") this.modifyLayer(19,-1);
				else if (this.mummifiedMaterial() == "web") this.modifyLayer(19,3);
				else if (this.armsMaterial() == "tape") this.modifyLayer(19,4);
				else if (this.armsMaterial() == "web") this.modifyLayer(19,2);
				else this.modifyLayer(19,1);
			}

			if (this.mummifiedMaterial() == "web" && !this.legsAreInvisible()) {
				if (this.isGrounded()) this.modifyLayer(21,4);
				else this.modifyLayer(21,5);
			}
			else if (this.mummifiedMaterial() == "tape" && !this.legsAreInvisible()) {
				if (this.isGrounded()) this.modifyLayer(21,6);
				else this.modifyLayer(21,7);
			}
			else if (this.armsMaterial() == "rope") this.modifyLayer(21,0);
			else if (this.armsMaterial() == "vines") this.modifyLayer(21,1);
			else if (this.armsMaterial() == "regen_vines") this.modifyLayer(21,2);
			else if (this.armsMaterial() == "web") this.modifyLayer(21,3);
			else if (this.armsMaterial() == "tape") {
				if(hasBra || hasInner) this.modifyLayer(21,9);
				else this.modifyLayer(21,8);
			}
		}
		else
		{
			// Free arms
			this.modifyLayer(3,0);
			if(hasAcc1) this.modifyLayer(4,0);
			if(hasAcc2) this.modifyLayer(5,0);

			if(hasBra) this.modifyLayer(14,0);
			if(hasInner)
			{
				this.modifyLayer(18,0);
				this.modifyLayer(19,0);
			}
		}

		// neck
		if(this.collarMaterial() == "bell") this.modifyLayer(28,0);
		else if(this.collarMaterial() == "rune") this.modifyLayer(28,1);
		else if(hasAcc4) this.modifyLayer(8,0);

		// head
		if (hasAnger) this.modifyLayer(29,0);
		if (!this.isMouthBound()) this.modifyLayer(30,mouthIndex-1);

		if(this.mouthMaterial() == "rope") this.modifyLayer(31,0);
		else if(this.mouthMaterial() == "ball_big") this.modifyLayer(31,1);
		else if(this.mouthMaterial() == "ball") this.modifyLayer(31,2);
		else if(this.mouthMaterial() == "ball_strict")
		{
			this.modifyLayer(31,2);
			if(this.eyesMaterial() == "leather_blindfold") this.modifyLayer(45,1);
			else this.modifyLayer(45,0);
		}
		else if(this.mouthMaterial() == "cloth") this.modifyLayer(31,3);
		else if(this.mouthMaterial() == "web") {
			if (this.mummifiedMaterial() == "web") this.modifyLayer(31,5);
			else this.modifyLayer(31,4);
		}
		else if(this.mouthMaterial() == "tape") {
			if (this.mummifiedMaterial() == "tape") this.modifyLayer(31,7);
			else this.modifyLayer(31,6);
		}

		if (hasDrool)
		{
			if(this.mouthMaterial() == "ball_big") this.modifyLayer(32,0);
			else if(this.mouthMaterial() == "ball") this.modifyLayer(32,1);
			else if(this.mouthMaterial() == "ball_strict") this.modifyLayer(32,1);
			else if(this.mouthMaterial() == "cloth") this.modifyLayer(32,2);
		}

		this.modifyLayer(33,eyebrowsIndex-1);
		if (!this.isEyesBound()) this.modifyLayer(34,eyesIndex-1);

		if(this.eyesMaterial() == "cloth") this.modifyLayer(35,0);
		else if(this.eyesMaterial() == "rope") this.modifyLayer(35,1);
		else if(this.eyesMaterial() == "web") this.modifyLayer(35,2);
		else if(this.eyesMaterial() == "leather_blindfold") this.modifyLayer(35,3);

		if (hasBlush) this.modifyLayer(36,0);
		if (hasFaceShadow) this.modifyLayer(37,0);
		if (hasAshen) this.modifyLayer(38,0);
		if (hasExtraBlush) this.modifyLayer(39,0);
		if (hasSweat) this.modifyLayer(40,0);
		if (hasExtraSweat) this.modifyLayer(41,0);

		if (hasHeadwear && grabberConfig != "sandbag")
		{
			this.modifyLayer(44,0);
		}

	}
	else if (name == "lily_sports")	{
		this._layers = [
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1
		]

		let mouthIndex = $gamePlayer._portraitCurrentMouth;
		let eyesIndex = $gamePlayer._portraitCurrentEyes;
		let eyebrowsIndex = $gamePlayer._portraitCurrentEyebrows;
		let hasFaceShadow = $gamePlayer._portraitHasFaceShadow;
		let hasAshen = this._hasAshen ||  $gamePlayer._portraitHasAshen;
		let hasSweat = this._hasSweat || $gamePlayer._portraitHasSweat;
		let hasExtraSweat = this._hasExtraSweat || $gamePlayer._portraitHasExtraSweat;
		let hasAnger = $gamePlayer._portraitHasAnger;
		let hasBlush = this._embarrassment > 0 || $gamePlayer.isDistracted;
		let hasExtraBlush = this._embarrassment > 1 || $gamePlayer._portraitHasBlush;
		let hasDrool = $gamePlayer._portraitIsDrooling;

		if (!this._isPlayer)
		{
			let expressionArray;
			if (Array.isArray(this._currentExpression)) expressionArray = this._currentExpression;
			else expressionArray = CharacterPicture.lilyMEE[this._currentExpression];

			mouthIndex = expressionArray[0];
			eyesIndex = expressionArray[1];
			eyebrowsIndex = expressionArray[2];
			if (expressionArray.length > 2)
				hasFaceShadow = expressionArray[3];
			if (expressionArray.length > 3)
				hasAshen = expressionArray[4];
			if (expressionArray.length > 4)
				hasSweat = expressionArray[5];
			if (expressionArray.length > 5)
				hasExtraSweat = expressionArray[6];
			if (expressionArray.length > 6)
				hasAnger = expressionArray[7];
			if (expressionArray.length > 7)
				hasBlush = (this._embarrassment >= 1) || expressionArray[8];
			hasExtraBlush = (this._embarrassment >= 2);
			hasDrool = this._drool > 0;
		}

		// Enemy
		if (grabberConfig == "human"){
			this.modifyLayer(0,0);

			if(this.armsMaterial() == "web") {
				this.modifyLayer(42,4);
			}
			else if(this.armsAreTogether()) this.modifyLayer(42,1);
			else this.modifyLayer(42,0);
		}
		else if (grabberConfig == "plant"){
			this.modifyLayer(42,2);
		}
		else if (grabberConfig == "sandbag"){
			this.modifyLayer(42,3);
		}
		else if (grabberConfig == "pole"){
			this.modifyLayer(0,1);
		}
		else if (grabberConfig == "caterpillar")
			this.modifyLayer(0,2);
		else if (grabberConfig == "bossPillar")
			this.modifyLayer(42,5);

		// Legs area
		if (!this.legsAreInvisible())
		{
			if (!this.isGrounded())
			{
				if (this.legsAreTogether())
				{
					// standing, legs tied
					if (this.legsWebLikePose()) this.modifyLayer(1,3);
					else this.modifyLayer(1,1);

					if (hasLegWear) this.modifyLayer(4,1);

					if (this.isFullyMummified()) {
						// DO NOTHING
					}
					else if (hasShoes){
						if (hasLegWear) this.modifyLayer(8,3);
						else this.modifyLayer(8,2);

						this.modifyLayer(9,1);
					}

					if (this.isFullyMummified()) {
						// NOTHING - mummification layer is on arms layer
					}
					else if (this.legsMaterial() == "rope") this.modifyLayer(18,0);
					else if (this.legsMaterial() == "vines") this.modifyLayer(18,1);
					else if (this.legsMaterial() == "regen_vines") this.modifyLayer(18,2);
					else if (this.legsMaterial() == "web") this.modifyLayer(18,3);
					else if (this.legsMaterial() == "tape") this.modifyLayer(18,4);
				}
				else
				{
					// standing, legs free
					this.modifyLayer(1,0);
					if (hasLegWear) this.modifyLayer(4,0);
					if (hasShoes){
						if (hasLegWear) this.modifyLayer(8,1);
						else this.modifyLayer(8,0);

						this.modifyLayer(9,0);
					}
				}

				if (this.hasCrotchRope()) {
					this.modifyLayer(3,0);
					if(hasPanties) this.modifyLayer(7,1);
					if (hasInner) this.modifyLayer(13,1);
				}
				else {
					if(hasPanties) this.modifyLayer(7,0);
					if (hasInner) this.modifyLayer(13,0);
				}

				if (this.isFullyMummified()) {
					// DO NOTHING
				}
				else if (this.crotchRopeMaterial() == "rope") this.modifyLayer(14,0);
				else if (this.crotchRopeMaterial() == "vines") this.modifyLayer(14,1);
				else if (this.crotchRopeMaterial() == "regen_vines") this.modifyLayer(14,2);
			}
			else if (!this.legsAreTogether())
			{
				// trip 1
				this.modifyLayer(1,2);
				if (hasLegWear) this.modifyLayer(4,2);
				if (hasShoes)
				{
					if (hasLegWear) this.modifyLayer(8,5);
					else this.modifyLayer(8,4);

					this.modifyLayer(9,2);
				}

				if (this.hasCrotchRope())
				{
					this.modifyLayer(3,0);
					if(hasPanties) this.modifyLayer(7,3);
					if(hasInner)
					{
						this.modifyLayer(13,3);
					}
				}
				else
				{
					if(hasPanties) this.modifyLayer(7,2);
					if(hasInner)
					{
						this.modifyLayer(13,2);
					}
				}


				if (this.isFullyMummified()) {
					// DO NOTHING
				}
				else if (this.crotchRopeMaterial() == "rope") this.modifyLayer(14,0);
				else if (this.crotchRopeMaterial() == "vines") this.modifyLayer(14,1);
				else if (this.crotchRopeMaterial() == "regen_vines") this.modifyLayer(14,2);
			}
			else
			{
				// trip 2

				this.modifyLayer(21,0);

				if(hasPanties) this.modifyLayer(22,0);
				if(hasInner) this.modifyLayer(22,1);
				if(hasLegWear) this.modifyLayer(24,0);

				if(hasShoes)
				{
					if(hasLegWear) this.modifyLayer(25,1);
					else this.modifyLayer(25,0);

					if (this.isFullyMummified()) this.modifyLayer(26,-1);
					else this.modifyLayer(26,0);
				}

				if (this.isFullyMummified()) {
					// DO NOTHING
				}
				else if (this.crotchRopeMaterial() == "rope") this.modifyLayer(23,0);
				else if (this.crotchRopeMaterial() == "vines") this.modifyLayer(23,1);
				else if (this.crotchRopeMaterial() == "regen_vines") this.modifyLayer(23,2);

				if (this.legsMaterial() == "rope") this.modifyLayer(27,0);
				else if (this.legsMaterial() == "vines") this.modifyLayer(27,1);
				else if (this.legsMaterial() == "regen_vines") this.modifyLayer(27,2);
				else if (this.legsMaterial() == "web") {
					this.modifyLayer(21,1);
					if(this.mummifiedMaterial() == "web") this.modifyLayer(27,4);
					else this.modifyLayer(27,3);
				}
				else if (this.legsMaterial() == "tape") {
					this.modifyLayer(21,1);
					if(this.mummifiedMaterial() == "tape") this.modifyLayer(27,6);
					else this.modifyLayer(27,5);
				}
			}
		}

		// Arms area
		if (this.armsAreTogether())
		{
			// Bound arms
			if (this.armsBehindBackPose()) this.modifyLayer(2,2);
			else this.modifyLayer(2,1);

			if(hasBra) {
				if (this.mummifiedMaterial() == "web") this.modifyLayer(6,3);
				else if (this.armsBehindBackPose()) this.modifyLayer(6,2);
				else this.modifyLayer(6,1);
			}
			if(hasInner) {
				if (this.mummifiedMaterial() == "web") this.modifyLayer(11,3);
				else if (this.armsBehindBackPose()) this.modifyLayer(11,2);
				else this.modifyLayer(11,1);
			}
			if(hasAcc1 && !this.armsBehindBackPose()) this.modifyLayer(17,1);

			if (this.mummifiedMaterial() == "web" && !this.legsAreInvisible()) {
				if (this.isGrounded()) this.modifyLayer(19,6);
				else this.modifyLayer(19,7);
			}
			else if (this.mummifiedMaterial() == "tape" && !this.legsAreInvisible()) {
				if (this.isGrounded()) this.modifyLayer(19,8);
				else this.modifyLayer(19,9);
			}
			else if (this.armsMaterial() == "rope") this.modifyLayer(19,0);
			else if (this.armsMaterial() == "vines") this.modifyLayer(19,1);
			else if (this.armsMaterial() == "regen_vines") this.modifyLayer(19,2);
			else if (this.armsMaterial() == "web") {
				if(hasInner) this.modifyLayer(19,5);
				else if(hasBra) this.modifyLayer(19,4);
				else this.modifyLayer(19,3);
			}
			else if (this.armsMaterial() == "tape") {
				if(hasInner) this.modifyLayer(19,12);
				else if(hasBra) this.modifyLayer(19,11);
				else this.modifyLayer(19,10);
			}
		}
		else
		{
			// Free arms
			this.modifyLayer(2,0);
			if(hasBra) this.modifyLayer(6,0);
			if(hasInner) this.modifyLayer(11,0);
			if(hasAcc1) this.modifyLayer(17,0);
		}

		// neck
		if(this.collarMaterial() == "bell") this.modifyLayer(28,0);
		else if(this.collarMaterial() == "rune") this.modifyLayer(28,1);

		// head
		if (hasAnger) this.modifyLayer(29,0);
		if (!this.isMouthBound()) this.modifyLayer(30,mouthIndex-1);

		if(this.mouthMaterial() == "rope") this.modifyLayer(31,0);
		else if(this.mouthMaterial() == "ball_big") this.modifyLayer(31,1);
		else if(this.mouthMaterial() == "ball") this.modifyLayer(31,2);
		else if(this.mouthMaterial() == "ball_strict")
		{
			this.modifyLayer(31,2);

			if (this.eyesMaterial() == "leather_blindfold") this.modifyLayer(44,1);
			else this.modifyLayer(44,0);
		}
		else if(this.mouthMaterial() == "cloth") this.modifyLayer(31,3);
		else if(this.mouthMaterial() == "web") {
			if (this.mummifiedMaterial() == "web") this.modifyLayer(31,5);
			else this.modifyLayer(31,4);
		}
		else if(this.mouthMaterial() == "tape") {
			if (this.mummifiedMaterial() == "tape") this.modifyLayer(31,7);
			else this.modifyLayer(31,6);
		}

		if (hasDrool)
		{
			if(this.mouthMaterial() == "ball_big") this.modifyLayer(32,0);
			else if(this.mouthMaterial() == "ball") this.modifyLayer(32,1);
			else if(this.mouthMaterial() == "ball_strict") this.modifyLayer(32,1);
			else if(this.mouthMaterial() == "cloth") this.modifyLayer(32,2);
		}

		this.modifyLayer(33,eyebrowsIndex-1);
		if (!this.isEyesBound()) this.modifyLayer(34,eyesIndex-1);

		if(this.eyesMaterial() == "cloth") this.modifyLayer(35,0);
		else if(this.eyesMaterial() == "rope") this.modifyLayer(35,1);
		else if(this.eyesMaterial() == "web") this.modifyLayer(35,2);
		else if(this.eyesMaterial() == "leather_blindfold") this.modifyLayer(35,3);

		if (hasBlush) this.modifyLayer(36,0);
		if (hasFaceShadow) this.modifyLayer(37,0);
		if (hasAshen) this.modifyLayer(38,0);
		if (hasExtraBlush) this.modifyLayer(39,0);
		if (hasSweat) this.modifyLayer(40,0);
		if (hasExtraSweat) this.modifyLayer(41,0);

		if (hasHeadwear && grabberConfig != "sandbag")
		{
			this.modifyLayer(45,0);
			this.modifyLayer(46,0);
		}

	}
	else if (name == "lily_bunny") {
		this._layers = [
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1
		]

		let mouthIndex = $gamePlayer._portraitCurrentMouth;
		let eyesIndex = $gamePlayer._portraitCurrentEyes;
		let eyebrowsIndex = $gamePlayer._portraitCurrentEyebrows;
		let hasFaceShadow = $gamePlayer._portraitHasFaceShadow;
		let hasAshen = this._hasAshen ||  $gamePlayer._portraitHasAshen;
		let hasSweat = this._hasSweat || $gamePlayer._portraitHasSweat;
		let hasExtraSweat = this._hasExtraSweat || $gamePlayer._portraitHasExtraSweat;
		let hasAnger = $gamePlayer._portraitHasAnger;
		let hasBlush = this._embarrassment > 0 || $gamePlayer.isDistracted;
		let hasExtraBlush = this._embarrassment > 1 || $gamePlayer._portraitHasBlush;
		let hasDrool = $gamePlayer._portraitIsDrooling;

		if (!this._isPlayer)
		{
			let expressionArray;
			if (Array.isArray(this._currentExpression)) expressionArray = this._currentExpression;
			else expressionArray = CharacterPicture.lilyMEE[this._currentExpression];

			mouthIndex = expressionArray[0];
			eyesIndex = expressionArray[1];
			eyebrowsIndex = expressionArray[2];
			if (expressionArray.length > 2)
				hasFaceShadow = expressionArray[3];
			if (expressionArray.length > 3)
				hasAshen = expressionArray[4];
			if (expressionArray.length > 4)
				hasSweat = expressionArray[5];
			if (expressionArray.length > 5)
				hasExtraSweat = expressionArray[6];
			if (expressionArray.length > 6)
				hasAnger = expressionArray[7];
			if (expressionArray.length > 7)
				hasBlush = (this._embarrassment >= 1) || expressionArray[8];
			hasExtraBlush = (this._embarrassment >= 2);
			hasDrool = this._drool > 0;
		}

		// Enemy
		if (grabberConfig == "human"){
			this.modifyLayer(0,0);

			if(this.armsBehindBackPose()) {
				this.modifyLayer(45,3);
			}
			else if(this.armsAreTogether()) this.modifyLayer(45,2);
			else if (hasAcc1) this.modifyLayer(45,1);
			else this.modifyLayer(45,0);
		}
		else if (grabberConfig == "plant"){
			this.modifyLayer(45,5);
		}
		else if (grabberConfig == "sandbag"){
			this.modifyLayer(45,4);
		}
		else if (grabberConfig == "pole"){
			this.modifyLayer(0,1);
		}
		else if (grabberConfig == "caterpillar")
			this.modifyLayer(0,2);
		else if (grabberConfig == "bossPillar")
			this.modifyLayer(45,7);
		else if (grabberConfig == "rope_walk"){
			this.modifyLayer(0,3);
			this.modifyLayer(45,6);
		}

		let isTrip1 = undefined;

		// Legs area
		if (!this.legsAreInvisible()) {
			if (!this.isGrounded()) {
				if (this.legsAreTogether())	{
					// standing, legs tied
					if (this.legsWebLikePose()) this.modifyLayer(1,3);
					else this.modifyLayer(1,1);

					if (hasLegWear) {
						if (this.legsWebLikePose()) {
							if (hasAcc3) this.modifyLayer(7,7);
							else this.modifyLayer(7,6);
							this.modifyLayer(8,3);
						}
						else {
							if (hasAcc3) this.modifyLayer(7,3);
							else this.modifyLayer(7,2);
							this.modifyLayer(8,1);
						}
					}

					if (this.isFullyMummified()) {
						// DO NOTHING
					}
					else if (hasShoes){
						this.modifyLayer(13,1);
					}

					if (this.isFullyMummified()) {
						// NOTHING - mummification layer is on arms layer
					}
					else if (this.legsMaterial() == "rope") this.modifyLayer(18,0);
					else if (this.legsMaterial() == "vines") this.modifyLayer(18,1);
					else if (this.legsMaterial() == "regen_vines") this.modifyLayer(18,6);
					else if (this.legsMaterial() == "web") this.modifyLayer(18,2);
					else if (this.legsMaterial() == "tape") this.modifyLayer(18,5);
				}
				else {
					// standing, legs free
					this.modifyLayer(1,0);
					if (hasLegWear) {
						if (hasAcc3) this.modifyLayer(7,1);
						else this.modifyLayer(7,0);
						this.modifyLayer(8,0);
					}
					if (hasShoes){
						this.modifyLayer(13,0);
					}
				}

				if (this.hasCrotchRope()) {
					if (hasInner) this.modifyLayer(12,2);
					else if (hasPanties) this.modifyLayer(12,1);
					else this.modifyLayer(12,0);
				}
				if (hasPanties) this.modifyLayer(5,0);

				if (this.isFullyMummified()) {
					// DO NOTHING
				}
				else if (this.crotchRopeMaterial() == "rope") this.modifyLayer(19,0);
				else if (this.crotchRopeMaterial() == "vines") this.modifyLayer(19,1);
				else if (this.crotchRopeMaterial() == "regen_vines") this.modifyLayer(19,2);
			}
			else if (!this.legsAreTogether()) {
				// trip 1
				isTrip1 = true;

				if (hasShoes) {
					this.modifyLayer(1,4);
					this.modifyLayer(13,2);
					if (hasLegWear) {
						if (hasAcc3) this.modifyLayer(7,9);
						else this.modifyLayer(7,8);
					}
				}
				else {
					this.modifyLayer(1,2);
					if (hasLegWear) {
						if (hasAcc3) this.modifyLayer(7,5);
						else this.modifyLayer(7,4);
						this.modifyLayer(8,2);
					}
				}

				if (this.hasCrotchRope()) {
					if (hasInner) this.modifyLayer(12,5);
					else if (hasPanties) this.modifyLayer(12,4);
					else this.modifyLayer(12,3);
				}
				if (hasPanties) this.modifyLayer(5,3);

				if (this.isFullyMummified()) {
					// DO NOTHING
				}
				else if (this.crotchRopeMaterial() == "rope") this.modifyLayer(19,0);
				else if (this.crotchRopeMaterial() == "vines") this.modifyLayer(19,1);
				else if (this.crotchRopeMaterial() == "regen_vines") this.modifyLayer(19,2);
			}
			else {
				// trip 2

				this.modifyLayer(22,0);

				if(hasPanties) this.modifyLayer(23,0);
				if(hasInner) this.modifyLayer(26,0);
				if(hasLegWear) {
					if (hasAcc3) this.modifyLayer(24,1);
					else this.modifyLayer(24,0);
					this.modifyLayer(25,0);
				}

				if(hasShoes) {
					if (this.isFullyMummified()) this.modifyLayer(28,-1);
					else this.modifyLayer(28,0);
				}

				if (this.isFullyMummified()) {
					// DO NOTHING
				}
				else if (this.crotchRopeMaterial() == "rope") this.modifyLayer(27,0);
				else if (this.crotchRopeMaterial() == "vines") this.modifyLayer(27,1);
				else if (this.crotchRopeMaterial() == "regen_vines") this.modifyLayer(27,2);

				if (this.legsMaterial() == "rope") this.modifyLayer(29,0);
				else if (this.legsMaterial() == "vines") this.modifyLayer(29,1);
				else if (this.legsMaterial() == "regen_vines") this.modifyLayer(29,4);
				else if (this.legsMaterial() == "web") {
					this.modifyLayer(22,1);
					if(this.mummifiedMaterial() == "web") this.modifyLayer(29,3);
					else this.modifyLayer(29,2);
				}
				else if (this.legsMaterial() == "tape") {
					this.modifyLayer(22,1);
					if(this.mummifiedMaterial() == "tape") this.modifyLayer(29,6);
					else this.modifyLayer(29,5);
				}
			}
		}

		const trip1Mod = (isTrip1 ? 1 : 0);

		const upperBodyMod = (this.eyesMaterial() == "tape_hood" ? 3 : 0);

		// Arms area
		if (this.armsAreTogether())	{
			// Bound arms
			if(this.armsBehindBackPose()) this.modifyLayer(2,2+upperBodyMod);
			else this.modifyLayer(2,1+upperBodyMod);

			if(hasBra) {
				if (this.isFullyMummified()) this.modifyLayer(10,-1);
				else if (this.armsBehindBackPose()) this.modifyLayer(10,2);
				else this.modifyLayer(10,1);
			}
			if(hasInner) {
				if (this.isFullyMummified()) this.modifyLayer(11,-1);
				else if (this.armsBehindBackPose()) {
					this.modifyLayer(11,4 + trip1Mod);
					if (hasLegWear) this.modifyLayer(9,3);
				}
				else {
					if (hasLegWear) this.modifyLayer(9,1);
					this.modifyLayer(11,2 + trip1Mod);
				}
			}

			if (this.mummifiedMaterial() == "web" && !this.legsAreInvisible()) {
				if (this.isGrounded()) this.modifyLayer(17,7);
				else this.modifyLayer(17,6);
			}
			else if (this.mummifiedMaterial() == "tape" && !this.legsAreInvisible()) {
				if (this.isGrounded()) this.modifyLayer(17,9);
				else this.modifyLayer(17,8);
			}
			else if (this.armsMaterial() == "rope") this.modifyLayer(17,0);
			else if (this.armsMaterial() == "vines") this.modifyLayer(17,1);
			else if (this.armsMaterial() == "regen_vines") this.modifyLayer(17,10);
			else if (this.armsMaterial() == "web") {
				this.modifyLayer(17,2);
			}
			else if (this.armsMaterial() == "tape") {
				if (hasInner) this.modifyLayer(17,4);
				else if (hasBra) this.modifyLayer(17,4);
				else this.modifyLayer(17,5);
			}
			else if (this.armsMaterial() == "partial_tape_mummy") {
				this.modifyLayer(17,9);
			}
		}
		else {
			// Free arms
			this.modifyLayer(2,0+upperBodyMod);
			if(hasBra) this.modifyLayer(10,0);
			if(hasInner) {
				if (hasLegWear) this.modifyLayer(9,0);
				this.modifyLayer(11,0 + trip1Mod);
			}
			if(hasAcc1) this.modifyLayer(14,0);
		}

		// neck
		if(this.collarMaterial() == "bell") this.modifyLayer(31,2);
		else if(this.collarMaterial() == "rune") {
			if (this.isFullyMummified()) this.modifyLayer(31,4);
			else this.modifyLayer(31,3);
		}
		else if(hasAcc2) {
			if(this.armsAreTogether()) this.modifyLayer(31,1);
			else this.modifyLayer(31,0);
		}

		// head
		if (hasAnger) this.modifyLayer(32,0);
		if (!this.isMouthBound()) this.modifyLayer(33,mouthIndex-1);

		if(this.mouthMaterial() == "rope") this.modifyLayer(34,0);
		else if(this.mouthMaterial() == "ball_big") this.modifyLayer(34,1);
		else if(this.mouthMaterial() == "ball") this.modifyLayer(34,2);
		else if(this.mouthMaterial() == "ball_strict")
		{
			this.modifyLayer(34,2);

			if (this.eyesMaterial() == "leather_blindfold") this.modifyLayer(47,1);
			else this.modifyLayer(47,0);
		}
		else if(this.mouthMaterial() == "cloth") this.modifyLayer(34,3);
		else if(this.mouthMaterial() == "ball_cloth") this.modifyLayer(34,6);
		else if(this.mouthMaterial() == "ball_tape") this.modifyLayer(34,7);
		else if(this.mouthMaterial() == "ball_tape_cloth") this.modifyLayer(34,8);
		else if(this.mouthMaterial() == "web") {
			if (this.mummifiedMaterial() == "web") this.modifyLayer(34,5);
			else this.modifyLayer(34,4);
		}
		else if(this.mouthMaterial() == "tape") {
			if (this.mummifiedMaterial() == "tape") this.modifyLayer(34,10);
			else this.modifyLayer(34,9);
		}
		else if(this.mouthMaterial() == "cloth_tape") this.modifyLayer(34,11);

		if (hasDrool) {
			if(this.mouthMaterial() == "ball_big") this.modifyLayer(35,0);
			else if(this.mouthMaterial() == "ball") this.modifyLayer(35,1);
			else if(this.mouthMaterial() == "ball_strict") this.modifyLayer(35,1);
			else if(this.mouthMaterial() == "cloth") this.modifyLayer(35,2);
		}

		if(this.eyesMaterial() != "tape_hood")
			this.modifyLayer(36,eyebrowsIndex-1);
		if (!this.isEyesBound())
			this.modifyLayer(37,eyesIndex-1);

		if(this.eyesMaterial() == "cloth") this.modifyLayer(38,0);
		else if(this.eyesMaterial() == "rope") this.modifyLayer(38,1);
		else if(this.eyesMaterial() == "web") this.modifyLayer(38,2);
		else if(this.eyesMaterial() == "tape_hood") this.modifyLayer(38,3);
		else if(this.eyesMaterial() == "leather_blindfold") this.modifyLayer(38,4);

		if (hasBlush) this.modifyLayer(39,0);
		if (hasFaceShadow) this.modifyLayer(40,0);
		if (hasAshen) this.modifyLayer(41,0);
		if (hasExtraBlush) this.modifyLayer(42,0);
		if (hasSweat) this.modifyLayer(43,0);
		if (hasExtraSweat) this.modifyLayer(44,0);

		if (hasHeadwear && grabberConfig != "sandbag") {
			this.modifyLayer(48,0);
			if(this.eyesMaterial() == "tape_hood") this.modifyLayer(48,1);
		}

		// Set this back to -1. Do not use this layer as it does not seem to actually fix the aliasing problem.
		this.modifyLayer(8,-1);
	}
	else if (name == "lily_event_1") {
		this._layers = [
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1,
		]

		let mouthIndex = $gamePlayer._portraitCurrentMouth;
		let eyesIndex = $gamePlayer._portraitCurrentEyes;
		let eyebrowsIndex = $gamePlayer._portraitCurrentEyebrows;
		let hasFaceShadow = $gamePlayer._portraitHasFaceShadow;
		let hasAshen = this._hasAshen ||  $gamePlayer._portraitHasAshen;
		let hasSweat = this._hasSweat || $gamePlayer._portraitHasSweat;
		let hasExtraSweat = this._hasExtraSweat || $gamePlayer._portraitHasExtraSweat;
		let hasAnger = $gamePlayer._portraitHasAnger;
		let hasBlush = this._embarrassment > 0 || $gamePlayer.isDistracted;
		let hasExtraBlush = this._embarrassment > 1 || $gamePlayer._portraitHasBlush;
		let hasDrool = $gamePlayer._portraitIsDrooling;

		if (!this._isPlayer)
		{
			let expressionArray;
			if (Array.isArray(this._currentExpression)) expressionArray = this._currentExpression;
			else expressionArray = CharacterPicture.lilyMEE[this._currentExpression];

			mouthIndex = expressionArray[0];
			eyesIndex = expressionArray[1] + (isAlter ? 30 : 0);
			eyebrowsIndex = expressionArray[2] + (isAlter ? 30 : 0);
			if (expressionArray.length > 2)
				hasFaceShadow = expressionArray[3];
			if (expressionArray.length > 3)
				hasAshen = expressionArray[4];
			if (expressionArray.length > 4)
				hasSweat = expressionArray[5];
			if (expressionArray.length > 5)
				hasExtraSweat = expressionArray[6];
			if (expressionArray.length > 6)
				hasAnger = expressionArray[7];
			if (expressionArray.length > 7)
				hasBlush = (this._embarrassment >= 1) || expressionArray[8];
			hasExtraBlush = (this._embarrassment >= 2);
			hasDrool = this._drool > 0;
		}

		const isCat = hasAcc2;
		const baseOutfit = this.lastBaseOutfit();

		// Enemy
		if (grabberConfig == "human"){
			this.modifyLayer(0,0);

			if(this.armsAreTogether())
			{
				if (hasOuter) this.modifyLayer(32,7);
				else if (hasInner) this.modifyLayer(32,6);
				else if (hasBra) this.modifyLayer(32,5);
				else this.modifyLayer(32,4);
			}
			else
			{
				if (hasOuter) this.modifyLayer(32,3);
				else if (hasInner) this.modifyLayer(32,2);
				else if (hasBra) this.modifyLayer(32,1);
				else this.modifyLayer(32,0);
			}
		}


		// Tripped
		if (this.isGrounded()) {
			this.modifyLayer(13,1);
			if (isCat) this.modifyLayer(1,3);
		}
		else {
			this.modifyLayer(3,0); // leg belt

			if (isCat) this.modifyLayer(1,4);
			else {
				// Legs area
				if (hasShoes) this.modifyLayer(1,1); // leg base with boots
				else this.modifyLayer(1,0);

				// Has legs chains
				if (hasAcc1)
					this.modifyLayer(1,2);
			}
		}

		// Arms
		if (this.armsAreTogether()){
			this.modifyLayer(4,1); // arms bound
			if (this.mittensMaterial() == "leather_binder")
				this.modifyLayer(5,0); // arms mittened
		}
		else {
			this.modifyLayer(4,0); // arms visible
		}

		this.modifyLayer(6,0); // harness

		// Hair
		if (isAlter)
			this.modifyLayer(7,1);
		else {
			if (baseOutfit) {
				const idToIndex = {
					"lily_urban": 0,
					"lily_bandit": 2,
					"lily_bunny": 3,
					"lily_sports": 4,
				}[baseOutfit];
				this.modifyLayer(7,idToIndex);
			}
			else this.modifyLayer(7,0);
		}


		// Nipples
		if (this.nippleMaterial() == "nipple_clamps")
			this.modifyLayer(8, 0);

		// Inner
		if (hasInner) {
			if (this.armsAreTogether()) this.modifyLayer(9,1);
			else this.modifyLayer(9,0);
		}

		// Outer
		if (hasOuter) {
			if (this.armsAreTogether()) {
				if (hasInner) this.modifyLayer(11,2);
				else this.modifyLayer(11,0);
			}
			else this.modifyLayer(11,1);

			if (hasInner) {
				if (this.armsAreTogether()) this.modifyLayer(10,2);
				else this.modifyLayer(10,1);
			}
			else this.modifyLayer(10,0);
		}

		// face
		if (!this.isMouthBound()) this.modifyLayer(15,mouthIndex-1);

		if(this.mouthMaterial() == "ball_big" || this.mouthMaterial() == "ball_strict") {
			this.modifyLayer(16,0);
			if (this.eyesMaterial() == "leather_blindfold") this.modifyLayer(29,1);
		}
		else if(this.mouthMaterial() == "ball") {
			this.modifyLayer(16,1);
		}
		else if(this.mouthMaterial() == "mouth_mask") {
			this.modifyLayer(28,0);
		}

		if (hasDrool)
		{
			if(this.mouthMaterial() == "ball_big" || this.mouthMaterial() == "ball_strict") {
				this.modifyLayer(17,0);
			}
			else if(this.mouthMaterial() == "ball") {
				this.modifyLayer(17,1);
			}
		}

		this.modifyLayer(18,eyebrowsIndex-1);
		if (!this.isEyesBound()) this.modifyLayer(19,eyesIndex-1);

		if(this.eyesMaterial() == "leather_blindfold") this.modifyLayer(27,0);

		if (hasBlush) this.modifyLayer(21,0);
		if (hasFaceShadow) this.modifyLayer(22,0);
		if (hasAshen) this.modifyLayer(23,0);
		if (hasExtraBlush) this.modifyLayer(24,0);
		if (hasSweat) this.modifyLayer(25,0);
		if (hasExtraSweat) this.modifyLayer(26,0);

		// neck
		if(this.collarMaterial() == "bell") this.modifyLayer(30,0);
		else if(isAlter) this.modifyLayer(30,1);

		// headwear
		if (hasHeadwear) {
			if (isCat) this.modifyLayer(34,1);
			else  this.modifyLayer(34,0);
		}
	}
	else if (name == "lily_event_2") {
		this._layers = [
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		]

		let mouthIndex = $gamePlayer._portraitCurrentMouth;
		let eyesIndex = $gamePlayer._portraitCurrentEyes;
		let eyebrowsIndex = $gamePlayer._portraitCurrentEyebrows;
		let hasFaceShadow = $gamePlayer._portraitHasFaceShadow;
		let hasAshen = this._hasAshen ||  $gamePlayer._portraitHasAshen;
		let hasSweat = this._hasSweat || $gamePlayer._portraitHasSweat;
		let hasExtraSweat = this._hasExtraSweat || $gamePlayer._portraitHasExtraSweat;
		let hasAnger = $gamePlayer._portraitHasAnger;
		let hasBlush = this._embarrassment > 0 || $gamePlayer.isDistracted;
		let hasExtraBlush = this._embarrassment > 1 || $gamePlayer._portraitHasBlush;
		let hasDrool = $gamePlayer._portraitIsDrooling;

		if (!this._isPlayer)
		{
			let expressionArray;
			if (Array.isArray(this._currentExpression)) expressionArray = this._currentExpression;
			else expressionArray = CharacterPicture.lilyMEE[this._currentExpression];

			mouthIndex = expressionArray[0];
			eyesIndex = expressionArray[1] + (isAlter ? 30 : 0);
			eyebrowsIndex = expressionArray[2] + (isAlter ? 30 : 0);
			if (expressionArray.length > 2)
				hasFaceShadow = expressionArray[3];
			if (expressionArray.length > 3)
				hasAshen = expressionArray[4];
			if (expressionArray.length > 4)
				hasSweat = expressionArray[5];
			if (expressionArray.length > 5)
				hasExtraSweat = expressionArray[6];
			if (expressionArray.length > 6)
				hasAnger = expressionArray[7];
			if (expressionArray.length > 7)
				hasBlush = (this._embarrassment >= 1) || expressionArray[8];
			hasExtraBlush = (this._embarrassment >= 2);
			hasDrool = this._drool > 0;
		}

		const legsPose = (hasAcc1 ? 1 : 0);
		const hasDecorativeLegCollars = hasLegWear;
		const wearingBelt = hasPanties;
		const legsChained = hasAcc2;

		const fullShirt = hasOuter;
		const noRipping = hasInner;
		const hasShirt = hasBra;

		if (legsPose == 0) {
			// legs base
			this.modifyLayer(1,0);

			// shoes
			if (hasShoes) {
				this.modifyLayer(2,0);
				this.modifyLayer(3,0);
			}

			// belt
			if (wearingBelt) this.modifyLayer(4,0);

			// leg bindings
			if (hasDecorativeLegCollars) this.modifyLayer(5,0);
			if (legsChained) this.modifyLayer(5,1);
		}
		else if (legsPose == 1) {
			// legs base
			this.modifyLayer(1,1);

			// shoes
			if (hasShoes) {
				this.modifyLayer(2,1);
				this.modifyLayer(3,1);
			}

			// belt
			if (wearingBelt) this.modifyLayer(4,2);

			// leg bindings
			if (hasDecorativeLegCollars) this.modifyLayer(5,2);
			if (legsChained) this.modifyLayer(5,3);
		}

		// Arms
		let armsPose = 0;
		if (this.armsAreTogether() || this.armsBehindBackPose()){
			armsPose = 1; // arms behind back
		}
		else {
			armsPose = 0; // arms free
		}

		const shirtState = (noRipping ? 0 : 2) + (fullShirt ? 0 : 1);

		this.modifyLayer(8,armsPose); // arms pose

		if (hasShirt){
			if (fullShirt) {
				this.modifyLayer(10, 0); // shirt shade
				if (!noRipping) this.modifyLayer(11, 0); // shirt shade
			}
			else {
				this.modifyLayer(10, 1); // shirt shade
				if (!noRipping) this.modifyLayer(11, 1); // shirt shade
			}
			this.modifyLayer(12,armsPose + shirtState * 3); // shirt
		}

		// arm bindings
		if (this.armsAreTogether()) {
			if (this.armsMaterial() == "metal_cuffs") this.modifyLayer(15,0);
		}

		// Nipples
		if (this.nippleMaterial() == "nipple_clamps")
			this.modifyLayer(17, 0);

		// face
		if (!this.isMouthBound()) this.modifyLayer(24,mouthIndex-1);

		if(this.mouthMaterial() == "cloth") this.modifyLayer(25,0);
		if (hasDrool)
		{
			if(this.mouthMaterial() == "cloth") this.modifyLayer(26,0);
		}

		this.modifyLayer(27,eyebrowsIndex-1);
		if (!this.isEyesBound()) this.modifyLayer(28,eyesIndex-1);

		if(this.eyesMaterial() == "cloth") this.modifyLayer(29,0);

		if (hasBlush) this.modifyLayer(31,0);
		if (hasFaceShadow) this.modifyLayer(32,0);
		if (hasAshen) this.modifyLayer(33,0);
		if (hasExtraBlush) this.modifyLayer(34,0);
		if (hasSweat) this.modifyLayer(35,0);
		if (hasExtraSweat) this.modifyLayer(36,0);

		// neck
		if(this.collarMaterial() == "rune") this.modifyLayer(39,0);
	}
	else if (name == "lily_event_3") {
		this._layers = [
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1,
		]

		let mouthIndex = $gamePlayer._portraitCurrentMouth;
		let eyesIndex = $gamePlayer._portraitCurrentEyes;
		let eyebrowsIndex = $gamePlayer._portraitCurrentEyebrows;
		let hasFaceShadow = $gamePlayer._portraitHasFaceShadow;
		let hasAshen = this._hasAshen ||  $gamePlayer._portraitHasAshen;
		let hasSweat = this._hasSweat || $gamePlayer._portraitHasSweat;
		let hasExtraSweat = this._hasExtraSweat || $gamePlayer._portraitHasExtraSweat;
		let hasAnger = $gamePlayer._portraitHasAnger;
		let hasBlush = this._embarrassment > 0 || $gamePlayer.isDistracted;
		let hasExtraBlush = this._embarrassment > 1 || $gamePlayer._portraitHasBlush;
		let hasDrool = $gamePlayer._portraitIsDrooling;

		if (!this._isPlayer)
		{
			let expressionArray;
			if (Array.isArray(this._currentExpression)) expressionArray = this._currentExpression;
			else expressionArray = CharacterPicture.lilyMEE[this._currentExpression];

			mouthIndex = expressionArray[0];
			eyesIndex = expressionArray[1] + (isAlter ? 60 : 0);
			eyebrowsIndex = expressionArray[2] + (isAlter ? 60 : 0);
			if (expressionArray.length > 2)
				hasFaceShadow = expressionArray[3];
			if (expressionArray.length > 3)
				hasAshen = expressionArray[4];
			if (expressionArray.length > 4)
				hasSweat = expressionArray[5];
			if (expressionArray.length > 5)
				hasExtraSweat = expressionArray[6];
			if (expressionArray.length > 6)
				hasAnger = expressionArray[7];
			if (expressionArray.length > 7)
				hasBlush = (this._embarrassment >= 1) || expressionArray[8];
			hasExtraBlush = (this._embarrassment >= 2);
			hasDrool = this._drool > 0;
		}

		const upsideDown = $gamePlayer._isUpsideDown || false;
		const cocoonType = (
			$storyVars.cave.ca2.cocoonType === undefined ? -1 : $storyVars.cave.ca2.cocoonType
		); // 0: partial | 1: full, translucent | 2: full, head translucent | 3: full
		const stuckToGround = hasShoes;
		const hasWristWebbing = hasAcc1;
		const hasFeetWebbing = hasLegWear || hasShoes;
		const hasMittens = (this.mittensMaterial() == "web");
		const coveringBreasts = (!this.armsAreTogether() && !this.armsBehindBackPose());

		const kneesBound = (hasAcc3 ? 1 : 0);

		// cocoon background
		if (cocoonType > 0) this.modifyLayer(0,0);

		// legs base
		if (!this.legsAreInvisible()) {
			if (hasFeetWebbing) {
				if (this.legsAreTogether()) this.modifyLayer(1,5);
				else if (kneesBound) this.modifyLayer(1,3);
				else this.modifyLayer(1,4);
			}
			else {
				if (this.legsAreTogether()) this.modifyLayer(1,2);
				else if (kneesBound) this.modifyLayer(1,0);
				else this.modifyLayer(1,1);
			}
		}

		// upper base
		if (this.armsBehindBackPose() || cocoonType == 0) {
			if (upsideDown) {
				if (this.eyesMaterial() == "web") this.modifyLayer(2,6);
				else this.modifyLayer(2,5);
			}
			else this.modifyLayer(2,3);
		}
		else if (this.armsAreTogether() || cocoonType > 0) {
			if (hasMittens) this.modifyLayer(9,2);
			this.modifyLayer(2,2);
		}
		else if (coveringBreasts) {
			if (hasWristWebbing) this.modifyLayer(8,1);

			if (hasMittens) {
				this.modifyLayer(2,4);
				this.modifyLayer(9,1);
			}
			else this.modifyLayer(2,1);
		}
		else {
			if (hasWristWebbing) this.modifyLayer(8,0);
			if (hasMittens) this.modifyLayer(9,0);
			this.modifyLayer(2,0);
		}

		// mummified material
		if (this.mummifiedMaterial() == "web" && cocoonType != 0) this.modifyLayer(3,0);

		// ground trap
		if (stuckToGround) this.modifyLayer(4,0);

		// legs bound
		if (this.legsMaterial() == "web" && cocoonType != 0) {
			this.modifyLayer(5,0);
			this.modifyLayer(6,0);

			if (upsideDown) this.modifyLayer(7,0);
		}
		else if (kneesBound) {
			this.modifyLayer(5,1);
		}

		// Nipples
		if (this.nippleMaterial() == "caterpillars") this.modifyLayer(11,0);


		// head
		if (!this.isMouthBound()) this.modifyLayer(20,mouthIndex-1);
		if (this.mouthMaterial() == "web_cleave") {
			this.modifyLayer(25,0);
		}
		else if (this.mouthMaterial() == "web") {
			if (upsideDown) this.modifyLayer(25,2);
			else this.modifyLayer(25,1);
		}

		this.modifyLayer(22,eyebrowsIndex-1);
		if (!this.isEyesBound()) {
			if (upsideDown) this.modifyLayer(21, 30 + eyesIndex - 1);
			else this.modifyLayer(21,eyesIndex-1);
		}
		if (this.eyesMaterial() == "web") {
			if (upsideDown) this.modifyLayer(26,2);
			else this.modifyLayer(26,0);
		}

		if (hasAnger) this.modifyLayer(34,0);
		if (hasBlush) this.modifyLayer(27,0);
		if (hasFaceShadow) this.modifyLayer(28,0);
		if (hasAshen) this.modifyLayer(29,0);
		if (hasExtraBlush) this.modifyLayer(30,0);
		if (hasSweat) {
			if (upsideDown) this.modifyLayer(31,1);
			else this.modifyLayer(31,0);
		}
		if (hasExtraSweat) {
			if (upsideDown) this.modifyLayer(32,1);
			else this.modifyLayer(32,0);
		}

		// neck
		if (this.collarMaterial() == "rune") {
			if (this.mummifiedMaterial() == "web") this.modifyLayer(33,1);
			else this.modifyLayer(33,0);
		}

		// cocoon
		if (cocoonType === 0) {
			this.modifyLayer(37,0);
		}
		else if (cocoonType > 0) {
			this.modifyLayer(40,cocoonType-1);
		}
	}
};



Game_CharacterPortrait.prototype.getLayer = function(layerIndex) {
	const empty = "img/pictures/transparent_image.png";
	if (layerIndex >= this._layers.length) return empty;

	if (this._sourceFolder == "") return empty;

	const layerValue = this._layers[layerIndex];
	if (layerValue == -1) return empty;

	return "img/pictures/characters/" + this._sourceFolder + "/" + layerIndex + "_" + layerValue + ".png";
};

Game_CharacterPortrait.prototype.getFolder = function() {
	return this._sourceFolder;
};

Game_CharacterPortrait.prototype.preLoadAllCurrent = function() {
	for (let i = 0; i < this._layers.length; i++)
		ImageManager.loadBitmapFromUrl(this.getLayer(i));
};
