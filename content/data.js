var allScripts = {};


function Script (scriptName) {
  if (allScripts[scriptName])
    throw new Error("There is already a script named '" + scriptName + "'");
  
  this.name = scriptName;
  this.panels = [];
  this.panelsByName = [];
  this.nextScript = null;

  allScripts[scriptName] = this;
};

Script.prototype.addPanel = function (panelName) {
  var panel = new Panel(this, panelName);
  this.panels.push(panel);
  if (panelName)
    this.panelsByName[panelName] = panel;
  return panel;
};

Script.prototype.setNextScript = function (scriptName) {
  this.nextScript = scriptName;
};


function Panel (script, panelName) {
  this.script = script;
  this.name = panelName || null;
  this.commandState = {};
  this.commands = [];
  this.prerequisites = [];
  this.isReset = false;
};

// Resets anything that would have otherwise carried over from the last panel
Panel.prototype.reset = function () {
  this.isReset = true;
  return this;
};

// Changes the background
// Put the image in backgrounds/
Panel.prototype.setBackground = function (imageUri) {
  this.commands.push(function (displayPanel) {
    displayPanel.css("background-image", "url(backgrounds/" + imageUri + ")");
  });
  return this;
};

// Shows an actor named actorName and gives them the specified image
// Put the image in actors/
Panel.prototype.showActor = function (actorName, imageUri) {
  this.commands.push(function (displayPanel) {
    displayPanel.getActor(actorName)
      .attr("src", "actors/" + imageUri);
  });
  return this;
};

// Sets the actor as speaking any text/choices that follow
Panel.prototype.setSpeaker = function (actorName) {
  this.commands.push(function (displayPanel) {
    this.commandState.bubble = null;
    this.commandState.speaker = actorName;
  });
  return this;
};

// Says some text in a speech bubble
Panel.prototype.sayText = function (text) {
  this.commands.push(function (displayPanel) {
    this.commandState.bubble = displayPanel.addSpeechBubble(this.commandState.speaker);
    this.commandState.bubble.children(".text").text(text);
  });
  return this;
};

Panel.prototype.showDefaultChoice = function (text, flagsToSet) {
  return this.$showChoice(text, true, flagsToSet);
};

// Shows a choice in a speech bubble. 
// You can pass in a flag name to set a flag when the player chooses this.
Panel.prototype.showChoice = function (text, flagsToSet) {
  return this.$showChoice(text, false, flagsToSet);
};

// Lists out the names of one or more flags that must be set for this panel to appear
// Put a '!' before the flag name to require it not to be set (like !foo)
Panel.prototype.setPrerequisites = function (/* ... prerequisites ... */) {
  this.prerequisites = Array.prototype.slice.call(arguments);
  return this;
};

// Lets you set a CSS class on the panel so you can do things like rearrange bubbles via CSS.
Panel.prototype.setClass = function (className) {
  this.commands.push(function (displayPanel, player) {
    displayPanel.addClass(className);
  });
  return this;  
};


Panel.prototype.$showChoice = function (text, isDefault, flagsToSet) {
  this.commands.push(function (displayPanel, player) {
    if (!this.commandState.bubble)
      this.commandState.bubble = displayPanel.addSpeechBubble(this.commandState.speaker);

    var existingChoice = player.gameState.getChoice(this.name);
    if (this.commandState.speaker !== player.gameState.playerActorName) {
      if (!isDefault && (existingChoice !== text))
        return;

      this.commandState.bubble.children(".text").text(text);
    } else {
      var choice = this.commandState.bubble.addChoice(text);

      if (isDefault) {
        var textElt = this.commandState.bubble.children(".text");
        textElt.text(existingChoice || text);

        if (!existingChoice) {
          textElt.addClass("showchoices");
          textElt.click(makeShowChoicesHandler(this.commandState.bubble));
        } else {
        }
      }

      if (existingChoice === text) {
        choice.addClass("selected");
      } else if (existingChoice) {
        choice.addClass("disabled");
      } else {
        choice.click(makeChoiceHandler(player, this.name, text, flagsToSet));
      }
    }
  });
  return this;
};

Panel.prototype.$checkPrerequisites = function (gameState) {
  for (var i = 0; i < this.prerequisites.length; i++) {
    var expected = true;
    var prereq = this.prerequisites[i];
    if (prereq.indexOf("!") === 0) {
      expected = false;
      prereq = prereq.substr(1);
    }

    var equals = prereq.indexOf("=");
    if (equals >= 0) {
      var parts = prereq.split("=");
      var key = parts[0].trim();
      var value = parts[1].trim();

      if (gameState.getChoice(key) !== value)
        return false;
    } else {
      var found = gameState.getFlag(prereq);
      if (found !== expected)
        return false;
    }
  }

  return true;
};

function makeChoiceHandler (player, choiceName, choice, flagsToSet) {
  return function () {
    player.gameState.setChoice(choiceName, choice);

    if (flagsToSet) {
      if (typeof (flagsToSet) === "string") {
        player.gameState.setFlag(flagsToSet);
      } else {
        for (var l = flagsToSet.length, i = 0; i < l; i++)
          player.gameState.setFlag(flagsToSet[i]);
      }
    }

    player.play();
  };
};

function makeShowChoicesHandler (bubble) {
  return function () {
    bubble.children(".text").css("display", "none");
    bubble.children(".choices").css("display", "block");
  };
};