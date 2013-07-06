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
};

Panel.prototype.setBackground = function (imageUri) {
  return this;
};

Panel.prototype.showActor = function (actorName, imageUri) {
  return this;
};

Panel.prototype.setSpeaker = function (actorName) {
  return this;
};

Panel.prototype.sayText = function (text) {
  return this;
};

Panel.prototype.showChoice = function (text, flagsToSet) {
  return this;
};

Panel.prototype.sayPreviousChoice = function (panelName) {
  return this;
};

Panel.prototype.setPrerequisites = function (/* ... prerequisites ... */) {
  return this;
};