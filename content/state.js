function GameState (playerActorName) {
  this.playerActorName = playerActorName;
  this.choices = Object.create(null);
  this.defaultChoices = Object.create(null);
  this.flags = Object.create(null);
  this.defaultFlags = Object.create(null);
  this.scriptPlayerInstances = Object.create(null);
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

GameState.prototype.setChoice = function (choiceName, value) {
  this.choices[choiceName] = value;

  console.log("choices=" + JSON.stringify(this.choices));
};

GameState.prototype.getFlag = function (flagName) {
  var flag = this.flags[flagName];
  if (typeof (flag) === "undefined")
    flag = this.defaultFlags[flagName];
  if (typeof (flag) === "undefined")
    flag = null;

  console.log("getFlag(" + flagName + ")=" + flag);

  return flag;
};

GameState.prototype.setFlag = function (flagName, state) {
  this.flags[flagName] = !!state;

  console.log("flags=" + JSON.stringify(this.flags));
};

GameState.prototype.setDefaultFlag = function (flagName, state) {
  this.defaultFlags[flagName] = state;

  console.log("defaultFlags=" + JSON.stringify(this.defaultFlags));
};

GameState.prototype.setDefaultFlags = function (list) {
  this.setFlags(list, true);
};

GameState.prototype.setFlags = function (list, isDefault) {
  if (typeof (list) === "string")
    list = [list];
  if (!list || !list.length)
    return;

  for (var l = list.length, i = 0; i < l; i++) {
    var value = true;
    var flagName = list[i];

    if (flagName.indexOf("!") === 0) {
      value = false;
      flagName = flagName.substr(1);
    }

    if (isDefault === true)
      this.setDefaultFlag(flagName, value);
    else
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