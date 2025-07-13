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