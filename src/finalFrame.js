function asFinalFrame(frame) {
  frame.pushRoll = function(roll) {
    if (this.isComplete()) {
      throw new RangeError();
    };
    return this.scores.push(roll);
  };

  frame.bonusScore = function(limit) {
    return this.sumTo(Math.min(limit, this.settings.maxBonus));
  };

  frame.isLong = function() {
    return this.isStrike() || this.isSpare();
  };

  frame.limit = function() {
    return this.isLong() ? this.settings.maxRolls : this.settings.normalRolls;
  };

  frame.isComplete = function() {
    return this.scores.length >= this.limit();
  };

  frame.settings = {
    maxScore: 10,
    maxRolls: 3,
    maxBonus: 1,
  };

  return frame;
};
