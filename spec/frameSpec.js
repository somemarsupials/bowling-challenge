describe('Frame', function() {
  var frame;
  var child;
  var array;
  var settings = { 
    maxScore: 10, 
    strike: 2, 
    spare: 1, 
    noBonus: 0,
    maxRolls: 4,
  };

  beforeEach(function() {
    frame = new Frame(5, settings);
    child = new Frame(6);
    array = [1, 2, 3, 4];
  });

  describe('#new', function() {
    it('has scores array', function() {
      expect(frame.scores).toEqual([]);
    });

    it('has round ID', function() {
      expect(frame.id).toEqual(5);
    });
  });

  describe('#sumTo', function() {
    beforeEach(function() {
      frame.scores = array;
    });

    describe('with no limit', function() {
      it('sums entire array', function() {
        expect(frame.sumTo()).toEqual(10);
      });
    });

    describe('with limit', function() {
      it('sums subset of array', function() {
        expect(frame.sumTo(3)).toEqual(6);
      });
    });
  });

  describe('#basicScore', function() {
    beforeEach(function() {
      frame.scores = array;
    });

    it('sums score array', function() {
      expect(frame.basicScore()).toEqual(10);
    });
  });

  describe('#bonusScore', function() {
    beforeEach(function() {
      frame.scores = array;
    });

    it('sums subset of score array', function() {
      expect(frame.bonusScore(3)).toEqual(6);
    });
  });

  describe('#totalScore', function() {
    beforeEach(function() {
      frame.scores = array;
    });

    it('gets basic and bonus score', function() {
      expect(frame.totalScore(3)).toEqual(16);
    });
  });

  describe('#isStrike', function() {
    describe('when is a strike', function() {
      beforeEach(function() {
        frame.scores = [10];
      });

      it('returns true', function() {
        expect(frame.isStrike()).toBe(true)
      });
    });

    describe('when not a strike', function() {
      beforeEach(function() {
        frame.scores = [9, 1];
      });

      it('returns false', function() {
        expect(frame.isStrike()).toBe(false)
      });
    });
  });

  describe('#isSpare', function() {
    describe('when is a spare', function() {
      beforeEach(function() {
        frame.scores = [9, 1];
      });

      it('returns true', function() {
        expect(frame.isSpare()).toBe(true)
      });
    });

    describe('when not a spare', function() {
      beforeEach(function() {
        frame.scores = [8, 1];
      });

      it('returns false', function() {
        expect(frame.isSpare()).toBe(false)
      });
    });

    describe('when a strike', function() {
      beforeEach(function() {
        frame.scores = [10];
      });

      it('returns false', function() {
        expect(frame.isSpare()).toBe(false)
      });
    });
  });

  describe('#bonusRolls', function() {
    describe('when a strike', function() {
      beforeEach(function() {
        spyOn(frame, 'isStrike').and.returnValue(true);
      });

      it('returns 2', function() {
        expect(frame.bonusRolls()).toEqual(2);
      });
    });

    describe('when a spare', function() {
      beforeEach(function() {
        spyOn(frame, 'isSpare').and.returnValue(true);
      });

      it('returns 1', function() {
        expect(frame.bonusRolls()).toEqual(1);
      });
    });

    describe('when no bonus', function() {
      it('returns 0', function() {
        expect(frame.bonusRolls()).toEqual(0);
      });
    });
  });

  describe('#recurseScore', function() {
    beforeEach(function() {
      spyOn(frame, 'totalScore').and.returnValue(10);
    });

    describe('when next frame is undefined', function() {
      it('returns 10', function() {
        expect(frame.recurseScore()).toEqual(10);
      });
    });

    describe('when next frame exists', function() {
      var score;

      beforeEach(function() {
        frame.next = child;
        spyOn(child, 'recurseScore').and.returnValue(10);
        spyOn(frame, 'bonusRolls').and.returnValue(3);
        score = frame.recurseScore();
      });

      it('returns score and next frame #recurseScore', function() {
        expect(score).toEqual(20);
      });

      it('passes bonus to child', function() {
        expect(child.recurseScore).toHaveBeenCalledWith(3);
      });
    });
  });

  describe('#isAtCapacity', function() {
    describe('when has maximum rolls', function() {
      beforeEach(function() {
        frame.scores = array;
      });

      it('returns true', function() {
        expect(frame.isAtCapacity()).toBe(true);
      });
    });

    describe('when below maximum rolls', function() {
      it('returns false', function() {
        expect(frame.isAtCapacity()).toBe(false);
      });
    });
  });

  describe('#isComplete', function() {
    describe('when incomplete', function() {
      it('returns false', function() {
        expect(frame.isComplete()).toBe(false);
      });
    });

    describe('when at capacity', function() {
      beforeEach(function() {
        spyOn(frame, 'isAtCapacity').and.returnValue(true);
      });

      it('returns true', function() {
        expect(frame.isComplete()).toBe(true);
      });
    });

    describe('when a strike', function() {
      beforeEach(function() {
        spyOn(frame, 'isStrike').and.returnValue(true);
      });

      it('returns true', function() {
        expect(frame.isComplete()).toBe(true);
      });
    });
  });
  
  describe('#pushRoll', function() {
    describe('when complete', function() {
      beforeEach(function() {
        spyOn(frame, 'isComplete').and.returnValue(true);
      });

      it('returns false', function() {
        expect(frame.pushRoll(5)).toBe(false);
      });

      it('does not change scores', function() {
        frame.pushRoll(5);
        expect(frame.scores).toEqual([]);
      });
    });

    describe('when incomplete', function() {
      beforeEach(function() {
        spyOn(frame, 'isComplete').and.returnValue(false);
      });

      it('returns true', function() {
        expect(frame.pushRoll(5)).toBeTruthy();
      });

      it('adds score to rolls', function() {
        frame.pushRoll(5);
        expect(frame.scores).toEqual([5]);
      });
    });
  });
});
