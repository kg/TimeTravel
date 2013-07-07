(function () {
  var script = new Script("scene-2");


  script.addPanel("Cell_02_01")
    .setBackground("background_P3.png")
    .showActor("waiter", "waiter.png")

    .setSpeaker("waiter")
    .sayText("Would gentleman and madame perhance be inclined to sate their thirsts with a sophisticated libation?") 


  script.addPanel("Cell_02_02")
    .reset()
    .setBackground("background_P1.png")
    .setActorMood("sofia", "sofia_P1_normal.png")

    .setSpeaker("sofia")
    .showChoice({
      prerequisites: "AWK1",
      key: "S_01",
      label: "I need a drink...",
      dialogue: "I'll have a glass of red wine.",
      default: true
    })
    .showChoice({
      prerequisites: "!AWK1",
      key: "S_02",
      label: "Red wine sounds nice.",
      dialogue: "Let's get a bottle of red wine.",
      default: true,
    })
    .showChoice({
      key: "S_03",
      label: "Ask what he wants.",
      dialogue: "What do you feel like getting?"
    })


})();