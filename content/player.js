NextPanelDelay = 10;
NextScriptDelay = 500;

function ScriptPlayer (script, gameState) {
  this.script = script;
  this.gameState = gameState;

  this.page = $("#page_template").clone();
  this.page.attr("id", null);
  this.page.appendTo($(".viewport"));
};

ScriptPlayer.prototype.play = function () {
  this.currentPanelIndex = -1;
  this.displayedPanelCount = 0;
  this.previousPanel = null;
  this.page.html("");

  window.setTimeout(this.nextPanel.bind(this), NextPanelDelay);
};

ScriptPlayer.prototype.playNextScript = function () {
  // FIXME: Do something if there is no next script
  if (this.nextScript)
    playScript(this.nextScript);
};

ScriptPlayer.prototype.ended = function () {
  window.setTimeout(this.playNextScript.bind(this), NextScriptDelay);
};

ScriptPlayer.prototype.nextPanel = function () {
  this.currentPanelIndex += 1;

  var panel = this.script.panels[this.currentPanelIndex];
  if (!panel) {
    this.ended();
    return;
  }

  if (!panel.$checkPrerequisites(this.gameState)) {
    this.nextPanel();
    return;
  }

  if (panel.isReset)
    this.previousPanel = null;

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

  window.setTimeout(this.nextPanel.bind(this), NextPanelDelay);
};