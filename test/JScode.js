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