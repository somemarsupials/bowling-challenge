describe('Game', function() {
  var game;

  beforeEach(function() {
    frame = jasmine.createSpy('frame');
    frameClass = jasmine.createSpy('frameClass').and.callFake(frame);
    game = new Game();
  });

  describe('#new', function() {
    it('has frame object', function() {
      expect(game.first).toEqual(frame);
    });
  });

  describe('#last', function() {
    it('calls frame #last method', function() {
    });
  });

  describe('#newFrame', function() {
  });

  describe('#score', function() {
  });

  describe('#pairs', function() {
  });
});
