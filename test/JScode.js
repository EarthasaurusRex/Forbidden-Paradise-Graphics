const disgust = hasAcc1;
		const hasHeartMark = hasAcc2;

		if (this.isArmsBound()) {
			this.modifyLayer(0, 1);
		}
		else {
			this.modifyLayer(0, 0);
		}
		if (disgust) this.modifyLayer(3, 0);

		// heart
		if (hasHeartMark) this.modifyLayer(2, 0);

		if (this._sweatDropType > 0) this.modifyLayer(6, 0);
		if (this._embarrassment > 0) {
			if (!this.isEyesBound() && expressionArray[1] - 1 == 7) {
				this.modifyLayer(7, 1);
			}
			else {
				this.modifyLayer(7, 0);
			}
		}

		if (!this.isMouthBound())
			this.modifyLayer(1, expressionArray[0] - 1);
		else
			this.modifyLayer(1, -1);

		if (!this.isEyesBound())
			this.modifyLayer(4, expressionArray[1] - 1);
		else
			this.modifyLayer(3, -1);

		this.modifyLayer(5, expressionArray[2] - 1);