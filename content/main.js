function createPanel (page, index) {
  var panel = $("#panel_template").clone();
  panel.attr("id", "panel" + index);
  panel.appendTo(page);
  return panel;
};

function speechBubble_addChoice (text) {
  var choice = $("#choice_template").clone();
  choice.attr("id", null);
  choice.text(text);
  choice.appendTo(this);
  return this;
};

function createSpeechBubble (panel, speaker, isResponse) {
  var bubble = $("#speechbubble_template").clone();
  bubble.attr("id", null);
  bubble.addClass(speaker);
  bubble.addClass(isResponse ? "response" : "call");
  bubble.appendTo(panel);

  bubble.addChoice = speechBubble_addChoice;

  return bubble;
};

function reflowPage () {
};

/*
  <div class="panel" id="panel1">
    <div class="speechbubble a call">
      So here I was, stranded in the grand canyon without a saddle for my horse...
    </div>
    <div class="speechbubble b response">
      <li class="choice" id="choice1">Do you ride horses often?</li>
      <li class="choice" id="choice2">Why not ride bareback?</li>
      <li class="choice selected" id="choice3">It must have been a long climb out of the canyon...</li>
    </div>
  </div>
  <div class="panel" id="panel2">
    <div class="speechbubble b call">
      It must have been a long climb out of the canyon...
    </div>
    <div class="speechbubble a response">
      It was nearly sunset by the time I dragged that feisty mare up the slopes and found my way back to the visitor center.
    </div>
  </div>
*/

function makeTestComic () {
  var page = $(".comicpage");
  var panel1 = createPanel(page, 1);
  var panel2 = createPanel(page, 2);
  var panel3 = createPanel(page, 3);

  createSpeechBubble(panel1, "a", false)
    .text("So here I was, stranded in the grand canyon without a saddle for my horse...");
  createSpeechBubble(panel1, "b", true)
    .addChoice("Do you ride horses often?")
    .addChoice("Why not ride bareback?")
    .addChoice("It must have been a long climb out of the canyon...");

  createSpeechBubble(panel2, "b", false)
    .text("It must have been a long climb out of the canyon...");
  createSpeechBubble(panel2, "a", true)
    .text("It was nearly sunset by the time I dragged that feisty mare up the slopes and found my way back to the visitor center.");

  reflowPage(page);
};

function init () {
  makeTestComic();
};

$().ready(init);