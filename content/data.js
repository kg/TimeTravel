var allScripts = {};


function Script (scriptName) {
  this.name = scriptName;
  this.panels = [];
  this.panelsByName = [];

  allScripts[scriptName] = this;
};

Script.prototype.addPanel = function (panelName) {
  var panel = new Panel(this, panelName);
  this.panels.push(panel);
  if (panelName)
    this.panelsByName[panelName] = panel;
  return panel;
};


function Panel (script, panelName) {
  this.script = script;
  this.name = panelName || null;
  this.commandState = {};
  this.commands = [];
};

// Resets anything that would have otherwise carried over from the last panel
Panel.prototype.reset = function () {
  // FIXME
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
    this.commandState.bubble.text(text);
  });
  return this;
};

// Shows a choice in a speech bubble. 
// You can pass in a flag name to set a flag when the player chooses this.
Panel.prototype.showChoice = function (text, flagsToSet) {
  this.commands.push(function (displayPanel) {
    if (!this.commandState.bubble)
      this.commandState.bubble = displayPanel.addSpeechBubble(this.commandState.speaker);

    this.commandState.bubble.addChoice(text);
    // FIXME: flagsToSet
  });
  return this;
};

// Lists out the names of one or more flags that must be set for this panel to appear
// Put a '!' before the flag name to require it not to be set (like !foo)
Panel.prototype.setPrerequisites = function (/* ... prerequisites ... */) {
  // FIXME
  return this;
};