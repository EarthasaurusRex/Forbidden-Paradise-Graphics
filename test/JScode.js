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