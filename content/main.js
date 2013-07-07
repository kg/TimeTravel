var gameState = null;

function newGame (playerActorName) {
  gameState = new GameState(playerActorName);
};

function playScript (scriptName) {
  var script = allScripts[scriptName];
  var player = new ScriptPlayer(script, gameState);
  player.play();
};

function init () {
  $("#actor_a").click(function () {
    newGame("a");
    playScript("test");
  });

  $("#actor_b").click(function () {
    newGame("b");
    playScript("test");
  });
};

$().ready(init);