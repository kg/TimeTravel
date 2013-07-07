function ScriptPlayer (script, gameState) {
  this.script = script;
  this.gameState = gameState;
  this.page = $(".comicpage");
};

ScriptPlayer.prototype.play = function () {
  this.currentPanelIndex = -1;
  this.displayedPanelCount = 0;
  this.previousPanel = null;
  this.page.html("");

  while (this.currentPanelIndex < this.script.panels.length)
    this.nextPanel();
};

ScriptPlayer.prototype.ended = function () {
};

ScriptPlayer.prototype.nextPanel = function () {
  this.currentPanelIndex += 1;

  var panel = this.script.panels[this.currentPanelIndex];
  if (!panel) {
    this.ended();
    return;
  }

  if (!panel.$checkPrerequisites(this.gameState)) {
    return;
  }

  // FIXME: Inherit some state from previous panel - background, etc.
  var displayPanel = 
    (this.previousPanel || $("#panel_template")).clone();
  displayPanel.attr("id", null);
  displayPanel.children(".bubbles").html("");

  var bubbleCount = 0;

  displayPanel.getActor = function (actorName) {
    var existingActor = displayPanel.children(".actors").children(".actor_" + actorName);
    if (existingActor.length < 1) {
      existingActor = $("#actor_template").clone();
      existingActor.attr("id", null);
      existingActor.addClass("actor_" + actorName);
      existingActor.appendTo(displayPanel.children(".actors"));
    }

    return existingActor;
  };

  displayPanel.addSpeechBubble = function (speakerName) {
    bubbleCount += 1;

    var bubble = $("#speechbubble_template").clone();
    bubble.attr("id", null);
    bubble.addClass(speakerName);
    bubble.addClass(bubbleCount == 1 ? "call" : "response");
    bubble.appendTo(displayPanel.children(".bubbles"));

    bubble.addChoice = function (text) {
      var choice = $("#choice_template").clone();
      choice.attr("id", null);
      choice.text(text);
      choice.appendTo(this.children(".choices"));
      return choice;
    };

    return bubble;
  };

  for (var c = panel.commands, l = c.length, i = 0; i < l; i++) {
    c[i].call(panel, displayPanel, this);
  }

  if (
    this.displayedPanelCount && 
    ((this.displayedPanelCount % 2) == 0)
  )
    $(document.createElement("br")).appendTo(this.page); 

  this.displayedPanelCount += 1;
  displayPanel.appendTo(this.page);

  this.previousPanel = displayPanel;

  this.nextPanel();
};