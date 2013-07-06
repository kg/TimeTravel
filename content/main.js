function playScript (scriptName) {
  var script = allScripts[scriptName];
  var player = new ScriptPlayer(script);
  player.play();
};

function init () {
  playScript("test");
};

$().ready(init);