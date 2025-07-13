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