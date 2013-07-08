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

  if (panelName) {
    if (this.panelsByName[panelName])
      throw new Error("There is already a panel named '" + panelName + "'");

    this.panelsByName[panelName] = panel;
  }

  return panel;
};

Script.prototype.setNextScript = function (scriptName) {
  this.nextScript = scriptName;
};


function Panel (script, panelName) {
  this.script = script;
  this.name = panelName || null;
  this.commandState = {};
  this.choices = {};
  this.preCommands = [];
  this.commands = [];
  this.prerequisites = [];
  this.isReset = false;
  this.hasSize = false;
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

// Sets the mood of a given named actor.
// Put the image in actors/ and name it (actorName)_(mood).png
Panel.prototype.setActorMood = function (actorName, mood) {
  this.commands.push(function (displayPanel) {
    displayPanel.setActorMood(actorName, mood);
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

Panel.prototype.setFlags = function (/* ... flags ... */) {
  var flags = Array.prototype.slice.call(arguments);
  this.commands.push(function (displayPanel, player) {
    player.gameState.setFlags(flags);
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

// Shows a choice in a speech bubble. 
// dict: {
//   [default: true],
//   [prerequisites: (string | array[string])] -- prerequisites to show this choice
//   key: string,
//   label: string,
//   dialogue: string,
//   [flags: (string | array[string])], -- sets one or more flags when this is chosen
//   [mood: imageUri] -- sets mood of speaker
// }
// You can pass in a flag name to set a flag when the player chooses this.
Panel.prototype.showChoice = function (dict) {
  this.choices[dict.key] = dict;

  this.preCommands.push(function (displayPanel, player) {
    if (!player.gameState.check(dict.prerequisites))
      return;

    var isMakingChoice = this.commandState.speaker === player.gameState.playerActorName;

    if (dict.default) {
      player.gameState.setDefaultChoice(this.name, dict.key);
      player.gameState.setDefaultFlags(dict.flags);
    }
    
    var existingChoiceKey = player.gameState.getChoice(this.name, false);
    var existingChoice = null;

    if (existingChoiceKey)
      existingChoice = this.choices[existingChoiceKey] || null;

    if (existingChoice && !player.gameState.check(existingChoice.prerequisites)) {
      delete player.gameState.choices[existingChoiceKey];
    }
  });

  this.commands.push(function (displayPanel, player) {
    if (!player.gameState.check(dict.prerequisites))
      return;

    if (!this.commandState.bubble)
      this.commandState.bubble = displayPanel.addSpeechBubble(this.commandState.speaker);

    var isMakingChoice = this.commandState.speaker === player.gameState.playerActorName;
    var existingChoiceKey = player.gameState.getChoice(this.name, !isMakingChoice);
    var existingChoice = null;

    if (existingChoiceKey)
      existingChoice = this.choices[existingChoiceKey] || null;

    if (!isMakingChoice) {
      if (existingChoiceKey && (existingChoiceKey !== dict.key))
        return;

      this.commandState.bubble.children(".text").text(dict.dialogue);

      if (dict.mood)
        displayPanel.setActorMood(this.commandState.speaker, dict.mood);
    } else {
      var choice = this.commandState.bubble.addChoice(dict.label);

      if (dict.default) {
        var textElt = this.commandState.bubble.children(".text");

        if (!existingChoiceKey) {
          textElt.text(dict.dialogue);

          if (dict.mood)
            displayPanel.setActorMood(this.commandState.speaker, dict.mood);
        } else {
          textElt.text(existingChoice.dialogue);

          if (existingChoice.mood)
            displayPanel.setActorMood(this.commandState.speaker, existingChoice.mood);
        }

        if (!existingChoiceKey || true) {
          textElt.addClass("showchoices");
          textElt.click(makeShowChoicesHandler(this.commandState.bubble));
        }
      }

      if (existingChoiceKey == dict.key) {
        choice.addClass("selected");
      }
      
      choice.click(makeChoiceHandler(player, this.name, dict.key, dict.flags));
    }
  });
  return this;
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

Panel.prototype.setSize = function (width, height) {
  this.hasSize = true;

  this.commands.push(function (displayPanel, player) {
    displayPanel.css("width", width + "px");
    displayPanel.css("height", height + "px");
  });

  return this;  
};  


Panel.prototype.$checkPrerequisites = function (gameState) {
  return gameState.check(this.prerequisites);
};

function makeChoiceHandler (player, panelName, choiceKey, flagsToSet) {
  return function () {
    player.gameState.setChoice(panelName, choiceKey);

    if (flagsToSet)
      player.gameState.setFlags(flagsToSet);

    player.play();
  };
};

function makeShowChoicesHandler (bubble) {
  return function () {
    bubble.children(".text").css("display", "none");
    bubble.children(".choices").css("display", "block");
  };
};