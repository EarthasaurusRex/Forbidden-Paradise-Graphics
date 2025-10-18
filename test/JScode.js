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
					else if (this.legsMaterial() == "glow") {
						if(hasShoes) {
							this.modifyLayer(20,11);
							this.modifyLayer(1,2,true);
						}
						else {
							this.modifyLayer(20,10);
							this.modifyLayer(1,0,true);
						}
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
					else if (this.crotchRopeMaterial() == "glow") {
						this.modifyLayer(17,6);
						this.modifyLayer(2,0,true);
					}
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
					else if (this.crotchRopeMaterial() == "glow") {
						this.modifyLayer(17,7);
						this.modifyLayer(2,2,true);
					}
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
				else if (this.crotchRopeMaterial() == "glow") {
					this.modifyLayer(17,6);
					this.modifyLayer(2,0,true);
				}
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
				else if (this.crotchRopeMaterial() == "glow") {
					this.modifyLayer(25,3);
					this.modifyLayer(2,1,true);
				}

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
				else if (this.legsMaterial() == "glow") {
					if(hasShoes) {
						this.modifyLayer(27,13);
						this.modifyLayer(1,3,true);
					}
					else {
						this.modifyLayer(27,12);
						this.modifyLayer(1,1,true);
					}
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
			else if (this.armsMaterial() == "glow") {
				this.modifyLayer(21,10);
				this.modifyLayer(0,0,true);
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