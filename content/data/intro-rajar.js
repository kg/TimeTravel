(function () {
  var script = new Script("intro-rajar");


  script.addPanel()
    .setBackground("rajar-home.png")
    .showActor("rajar", "rajar.png")

    .setSpeaker("rajar")
    .sayText("I can't believe I met someone who's actually seriously interested in time machines.")


  script.addPanel()
    .setSpeaker("rajar")
    .sayText("How did I manage to screw up that date?")


  script.addPanel()
    .reset()
    .setBackground("time-machine.png")


  script.setNextScript("scene-1");
})();