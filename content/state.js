function GameState (playerActorName) {
  this.playerActorName = playerActorName;
  this.choices = Object.create(null);
  this.flags = Object.create(null);
};

GameState.prototype.getChoice = function (choiceName) {
  var choice = this.choices[choiceName];
  if (!choice)
    return null;

  return choice;
};

GameState.prototype.setChoice = function (choiceName, value) {
  this.choices[choiceName] = value;
};

GameState.prototype.getFlag = function (flagName) {
  return (this.flags[flagName] === true);
};

GameState.prototype.setFlag = function (flagName) {
  this.flags[flagName] = true;
};