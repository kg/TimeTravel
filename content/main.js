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