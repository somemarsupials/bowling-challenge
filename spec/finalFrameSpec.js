describe('FinalFrame', function() {
  var frame;

  beforeEach(function() {
    frame = asFinalFrame(new Frame());
  });

  describe('#pushRoll', function() {
    describe('when complete', function() {
      beforeEach(function() {
        spyOn(frame, 'isComplete').and.returnValue(true);
      });

      it('throws error', function() {
        expect(function() { frame.pushRoll(5) }).toThrow(RangeError())
      });
    });

    describe('when incomplete', function() {
      beforeEach(function() {
        spyOn(frame, 'isComplete').and.returnValue(false);
        frame.pushRoll(5);
      });

      it('appends roll to score', function() {
        expect(frame.scores).toContain(5);
      });
    });
  });

  describe('#bonusScore', function() {
    beforeEach(function() {
      frame.scores = [1, 2, 3, 4];
      frame.settings.maxBonus = 2;
    });

    describe('when score is greater than limit', function() {
      it('returns limited bonus', function() {
        expect(frame.bonusScore(5)).toEqual(3);
      });
    });

    describe('when score is within limit', function() {
      it('returns limited bonus', function() {
        expect(frame.bonusScore(1)).toEqual(1);
      });
    });
  });

  describe('#isLong', function() {
    describe('when strike', function() {
      beforeEach(function() {
        spyOn(frame, 'isStrike').and.returnValue(true);
      });

      it('returns true', function() {
        expect(frame.isLong()).toBe(true);
      });
    });

    describe('when spare', function() {
      beforeEach(function() {
        spyOn(frame, 'isSpare').and.returnValue(true);
      });

      it('returns true', function() {
        expect(frame.isLong()).toBe(true);
      });
    });
    
    describe('when otherwise', function() {
      it('returns false', function() {
        expect(frame.isLong()).toBe(false);
      });
    });
  });

  describe('#limit', function() {
    beforeEach(function() {
      frame.settings.maxRolls = 3;
      frame.settings.normalRolls = 2;
    });

    describe('when long frame', function() {
      beforeEach(function() {
        spyOn(frame, 'isLong').and.returnValue(true)
      });

      it('returns 3', function() {
        expect(frame.limit()).toEqual(3)
      });
    });

    describe('when short frame', function() {
      beforeEach(function() {
        spyOn(frame, 'isLong').and.returnValue(false)
      });

      it('returns 2', function() {
        expect(frame.limit()).toEqual(2)
      });
    });
  });

  describe('#isComplete', function() {
    beforeEach(function() {
      spyOn(frame, 'limit').and.returnValue(2);
    });

    describe('when complete', function() {
      beforeEach(function() {
        frame.scores = [1, 2]
      });

      it('returns true', function() {
        expect(frame.isComplete()).toBe(true);
      });
    });
    
    describe('when incomplete', function() {
      beforeEach(function() {
        frame.scores = [1]
      });

      it('returns false', function() {
        expect(frame.isComplete()).toBe(false);
      });
    });
  });
});
