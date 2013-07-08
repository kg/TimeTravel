(function () {
  var script = new Script("intro-sofia");


  script.addPanel()
    .setBackground("sofia-home.png")
    .setSize(1010, 900)


  script.addPanel()
    .reset()
    .setBackground("time-machine.png")


  script.setNextScript("scene-1");
})();