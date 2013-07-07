function GameState (playerActorName) {
  this.playerActorName = playerActorName;
  this.choices = Object.create(null);
  this.defaults = Object.create(null);
  this.flags = Object.create(null);
};

GameState.prototype.getChoice = function (choiceName) {
  var choice = this.choices[choiceName];
  if (!choice)
    choice = this.defaults[choiceName];
  if (!choice)
    choice = null;

  console.log("getChoice(" + choiceName + ")=" + choice);

  return choice;
};

GameState.prototype.setDefault = function (choiceName, value) {
  this.defaults[choiceName] = value;

  console.log("defaults=" + JSON.stringify(this.defaults));
};

GameState.prototype.setChoice = function (choiceName, value) {
  this.choices[choiceName] = value;

  console.log("choices=" + JSON.stringify(this.choices));
};

GameState.prototype.getFlag = function (flagName) {
  return (this.flags[flagName] === true);
};

GameState.prototype.setFlag = function (flagName, state) {
  this.flags[flagName] = !!state;

  console.log("flags=" + JSON.stringify(this.flags));
};

GameState.prototype.setFlags = function (list) {
  if (typeof (list) === "string")
    list = [list];

  for (var l = list.length, i = 0; i < l; i++) {
    var value = true;
    var flagName = list[i];

    if (flagName.indexOf("!") === 0) {
      value = false;
      flagName = flagName.substr(1);
    }

    this.setFlag(flagName, value);
  }
};

GameState.prototype.check = function (list) {
  if (!list)
    return true;

  if (typeof (list) === "string")
    list = [list];

  if (list.length < 1)
    return true;

  for (var i = 0; i < list.length; i++) {
    var expected = true;
    var prereq = list[i];
    if (prereq.indexOf("!") === 0) {
      expected = false;
      prereq = prereq.substr(1);
    }

    var equals = prereq.indexOf("=");
    if (equals >= 0) {
      var parts = prereq.split("=");
      var key = parts[0].trim();
      var value = parts[1].trim();

      if (this.getChoice(key) !== value)
        return false;
    } else {
      var found = this.getFlag(prereq);
      if (found !== expected)
        return false;
    }
  }

  return true;
};