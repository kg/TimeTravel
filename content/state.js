function GameState (playerActorName) {
  this.playerActorName = playerActorName;
  this.choices = Object.create(null);
};

GameState.prototype.getChoice = function (choiceId) {
  var choice = this.choices[choiceId];
  if (!choice)
    return null;

  return choice;
};

GameState.prototype.setChoice = function (choice) {
  this.choices[choiceId] = choice;
};