function GameState (playerActorName) {
  this.playerActorName = playerActorName;
  this.choices = Object.create(null);
  this.defaultChoices = Object.create(null);
  this.scriptPlayerInstances = Object.create(null);

  this.flagSets = Object.create(null);
};

// includeDefaults is true by default
GameState.prototype.getChoice = function (choiceName, includeDefaults) {
  var choice = this.choices[choiceName];
  if (!choice && (includeDefaults !== false))
    choice = this.defaultChoices[choiceName];
  if (!choice)
    choice = null;

  return choice;
};

GameState.prototype.setDefaultChoice = function (choiceName, value) {
  this.defaultChoices[choiceName] = value;

  console.log("defaultChoices=" + JSON.stringify(this.defaultChoices));
};

GameState.prototype.clearChoice = function (choiceName) {
  delete this.choices[choiceName];

  console.log("choices=" + JSON.stringify(this.choices));
};

GameState.prototype.setChoice = function (choiceName, value) {
  this.choices[choiceName] = value;

  console.log("choices=" + JSON.stringify(this.choices));
};

GameState.prototype.getFlag = function (flagName) {
  var flag = null;

  for (var k in this.flagSets) {
    var flagSet = this.flagSets[k];
    var newFlag = flagSet[flagName];

    if (typeof (newFlag) !== "undefined")
      flag = newFlag;
  }

  console.log("getFlag(" + flagName + ")=" + flag);

  return flag;
};

GameState.prototype.clearFlagSet = function (flagSetKey) {
  delete this.flagSets[flagSetKey];

  console.log("flagSets=" + JSON.stringify(this.flagSets));
};

GameState.prototype.setFlags = function (flagSetKey, list, mode) {
  if (typeof (list) === "string")
    list = [list];
  if (!list || !list.length)
    return;

  var flagSet = this.flagSets[flagSetKey];
  if (!flagSet)
    flagSet = this.flagSets[flagSetKey] = Object.create(null);

  for (var l = list.length, i = 0; i < l; i++) {
    var value = true;
    var flagName = list[i];

    if (flagName.indexOf("!") === 0) {
      value = false;
      flagName = flagName.substr(1);
    }

    flagSet[flagName] = value;
  }

  console.log("flagSets=" + JSON.stringify(this.flagSets));
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