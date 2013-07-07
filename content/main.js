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
  newGame("b");
  playScript("test");
};

$().ready(init);