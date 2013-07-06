var script = new Script("test")


script.addPanel("favourite-color")
  .setBackground("chinese-restaurant.png")
  .showActor("a", "roger.png")
  .showActor("b", "sofia.png")

  .setSpeaker("a")
  .sayText("What's your favourite color?")

  .setSpeaker("b")
  .showChoice(
    "Green"
  );
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

  .setSpeaker("b")
  .sayPreviousChoice("favourite-color")

  .setSpeaker("a")
  .sayText("BLACK IS NOT A COLOR");


script.addPanel()
  .setPrerequisites("!notacolor")

  .showActor("a", "roger-happy.png")

  .setSpeaker("b")
  .sayPreviousChoice("favourite-color")

  .setSpeaker("a")
  .sayText("Me too! That is the best color. The one you picked.");