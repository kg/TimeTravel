var gameState = null;
var seenIntros = Object.create(null);

function changeFavicon (src) {
  var link = document.createElement('link'),
  oldLink = document.getElementById('dynamic-favicon');
  link.id = 'dynamic-favicon';
  link.rel = 'shortcut icon';
  link.href = src;
  
  var head = document.getElementsByTagName("head")[0];

  if (oldLink) {
    head.removeChild(oldLink);
  }

  head.appendChild(link);
}

function resetGame (evt) {
  evt.preventDefault();

  var viewport = $(".viewport");
  var previousHeight = (viewport.get()[0]).offsetHeight;
  viewport.css("min-height", previousHeight + "px");
  newGame(gameState.playerActorName);
};

function resetViewport () {
  $(".viewport").html("");

  if (gameState)
    gameState.scriptPlayerInstances = Object.create(null);
};

function showIntro () {
  seenIntros[gameState.playerActorName] = true;
  $("#" + gameState.playerActorName + "_intro").css("display", "block");
  $(".introcontainer").fadeIn(250);
  $(".actorchoice").fadeOut(250);
  $(".turndisplay").fadeOut(250);
  $("html").css("overflow", "hidden");
  $(".introcontainer").get()[0].scrollTop = 0;
};

function closeIntro (evt) {
  evt.preventDefault();

  $(".introcontainer").fadeOut(250);

  window.setTimeout(function () {
    $(".introimage img").css("display", "none");
    $("html").css("overflow", "auto");
    playScript("intro-" + gameState.playerActorName);
  }, 250);
};

function beginTurn (evt) {
  $("#buttons").css("display", "none");
  $("html").css("overflow", "hidden");
  if (evt)
    evt.preventDefault();

  window.location.hash = "#" + gameState.playerActorName;
  changeFavicon("icons/" + gameState.playerActorName + ".png");

  resetViewport();
  if (!seenIntros[gameState.playerActorName])
    showIntro();
  else {
    $("html").css("overflow", "auto");
    playScript("intro-" + gameState.playerActorName);
  }
};

function updateTurnDisplay () {
  var buttonTexts = [
    "Oh boy! I can't wait.",
    "How exciting!",
    "Let's do this!",
    "Onward.",
    "Step aside, spacetime!",
    "Gonna click some hyperlinks!"
  ];

  var buttonText = buttonTexts[
    Math.floor(Math.random() * buttonTexts.length)
  ];

  $("#beginTurn").text(buttonText);

  var cappedName = gameState.playerActorName[0].toUpperCase() + gameState.playerActorName.substr(1);
  $("#playerName").text(cappedName);
};

function endTurn (evt) {
  evt.preventDefault();

  if (gameState.playerActorName === "rajar") {
    gameState.playerActorName = "sofia";
  } else {
    gameState.playerActorName = "rajar";
  }

  updateTurnDisplay();

  $("#buttons").css("display", "none");
  $("html").css("overflow", "hidden");
  $(".turndisplay").fadeIn(500);
};

function chooseActor (evt) {
  evt.preventDefault();

  window.location.hash = "";
  $(".actorchoice").fadeIn(500);
  resetViewport();
};

function newGame (playerActorName) {
  resetViewport();

  window.location.hash = "#" + playerActorName;
  gameState = new GameState(playerActorName);

  updateTurnDisplay();
  $(".actorchoice").fadeOut(250);
};

function $makeWrappedListener (listener, notification) {
  return function WrappedEventListener () {
    notification();

    return listener.apply(this, arguments);
  };
};

registerOneShotEventListener = function (element, eventName, capture, listener) {
  var registered = true;
  var unregister, wrappedListener;

  unregister = function () {
    if (registered) {
      registered = false;
      element.removeEventListener(eventName, wrappedListener, capture);

      wrappedListener = null;
      element = null;
    }
  };

  wrappedListener = $makeWrappedListener(listener, unregister);
  listener = null;

  element.addEventListener(eventName, wrappedListener, capture);

  return {
    eventName: eventName,
    unregister: unregister
  }
};

function loadGlobalScript (uri, onComplete) {
  var anchor = document.createElement("a");
  anchor.href = uri;
  var absoluteUri = anchor.href;

  var done = false;

  var body = document.getElementsByTagName("body")[0];

  var scriptTag = document.createElement("script");

  registerOneShotEventListener(
    scriptTag, "load", true, 
    function ScriptTag_Load (e) {
      if (done)
        return;

      done = true;
      onComplete(scriptTag, null);
    }
  ); 
  registerOneShotEventListener(
    scriptTag, "error", true, 
    function ScriptTag_Error (e) {
      if (done)
        return;

      done = true;
      onComplete(null, e);
    }
  );

  scriptTag.type = "text/javascript";
  scriptTag.src = absoluteUri;

  try {
    body.appendChild(scriptTag);
  } catch (exc) {
    done = true;
    onComplete(null, exc);
  }
};

function playScript (scriptName) {
  var scriptUri = "data/" + scriptName + ".js";

  var script = allScripts[scriptName];

  function playTheScript () {
    var player = gameState.scriptPlayerInstances[scriptName];
    if (!player)
      player = gameState.scriptPlayerInstances[scriptName] = new ScriptPlayer(script, gameState);
    else
      player.reset();

    player.play();
    $(".actorchoice").fadeOut(500);
    $(".turndisplay").fadeOut(500);
  };

  if (!script) {
    $(".loading").fadeIn(250);

    loadGlobalScript(scriptUri, function (elt, error) {
      $(".loading").fadeOut(250);

      script = allScripts[scriptName];
      if (error || !script) {
        alert("Failed to load script '" + scriptName + "': " + error);
      } else {
        playTheScript();
      }
    });
  } else {
    playTheScript();
  }
};

function init () {
  $(".loading").fadeOut(250);

  $("#reset").click(resetGame);
  $("#chooseActor").click(chooseActor);
  $("#endTurn").click(endTurn);
  $("#beginTurn").click(beginTurn);
  $("#closeIntro").click(closeIntro);

  $("#actor_rajar").click(function () {
    newGame("rajar");
  });

  $("#actor_sofia").click(function () {
    newGame("sofia");
  });

  $("#joke").click(function () {
    window.location = "http://html5zombo.com/";
  });

  if (window.location.hash.trim().length > 1) {
    newGame(window.location.hash.substr(1));
  }
};

$().ready(init);