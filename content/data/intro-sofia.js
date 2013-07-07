(function () {
  var script = new Script("intro-sofia");


  script.addPanel()
    .setBackground("sofia-home.png")
    .showActor("sofia", "sofia.png")

    .setSpeaker("sofia")
    .sayText("That didn't go so well. But when will I meet another person who's interested in time travel?")


  script.addPanel()
    .reset()
    .setBackground("time-machine.png")


})();