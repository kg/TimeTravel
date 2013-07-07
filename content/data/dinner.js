(function () {
  var script = new Script("test")


  script.addPanel()
    .setBackground("chinese-restaurant.png")
    .showActor("a", "roger.png")
    .showActor("b", "sofia.png")

    .setSpeaker("a")
    .sayText("What's your favourite color?")


  script.addPanel("favourite-color")
    .setSpeaker("b")
    .showDefaultChoice(
      "Green"
    )
    .showChoice(
      "Red"
    )
    .showChoice(
      "Black",
      "notacolor"
    );


  script.addPanel()
    .setPrerequisites("notacolor")

    .showActor("a", "roger-upset.png")

    .setSpeaker("a")
    .sayText("BLACK IS NOT A COLOR");


  script.addPanel()
    .setPrerequisites("!notacolor")

    .showActor("a", "roger-happy.png")

    .setSpeaker("a")
    .sayText("Me too! That is the best color. The one you picked.");


  script.addPanel()
    .setBackground("creepy-spacetime-void.png")
    .showActor("a", "sofia.png")
    .showActor("b", "thedoctor.png")

    .setSpeaker("b")
    .sayText("YOUR INCESSANT MEDDLING WITH SPACETIME HAS LEFT US TRAPPED WITHIN A FORMLESS VOID FROM WHICH THERE IS NO ESCAPE")


  script.addPanel()
    .setSpeaker("a")
    .sayText("oops");

})();