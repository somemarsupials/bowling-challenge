function Frame(id, settings) {
  this.id = id
  this.settings = settings;
  this.scores = []
}

Frame.prototype.sumTo = function(limit) {
  sum = function(a, b) { return a + b; };
  return this.scores.slice(0, limit).reduce(sum, 0);
};

Frame.prototype.basicScore = function() {
  return this.sumTo();
}

Frame.prototype.bonusScore = function(bonus) {
  return this.sumTo(bonus);
}

Frame.prototype.totalScore = function(bonus = 0) {
  return this.basicScore() + this.bonusScore(bonus);
}

Frame.prototype.recurseScore = function(bonus) {
  return this.totalScore(bonus) + 
    (this.next ? this.next.recurseScore(this.bonusRolls()) : 0);
};

Frame.prototype.isStrike = function() {
  return this.scores[0] === this.settings.maxScore;
};

Frame.prototype.isSpare = function() {
  return !this.isStrike() && 
    this.basicScore() === this.settings.maxScore;
};

Frame.prototype.bonusRolls = function() {
  if (this.isStrike())  return this.settings.strike;
  if (this.isSpare())   return this.settings.spare;
  return this.settings.noBonus;
};

Frame.prototype.isAtCapacity = function() {
  return this.scores.length === this.settings.maxRolls;
};

Frame.prototype.isComplete = function() {
  return this.isStrike() || this.isAtCapacity();
};

Frame.prototype.pushRoll = function(roll) {
  return this.isComplete() ? false : this.scores.push(roll);
};

