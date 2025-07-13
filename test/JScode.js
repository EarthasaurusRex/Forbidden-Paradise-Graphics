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