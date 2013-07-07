(function () {
  var script = new Script("scene-1");


  script.addPanel("Cell_01_01")
    .setBackground("background_P1.png")
//    .showActor("rajar", "rajar.png")
//    .showActor("sofia", "sofia.png")

    .setSpeaker("rajar")
    .showChoice({
      key: "R_01",
      label: "Ask about meeting at convention",
      dialogue: "It was great meeting you at the Dr Who Convention. Did you enjoy it?"
    })
    .showChoice({
      key: "R_02",
      label: "Ask about the restaurant",
      dialogue: "Have you been here before?",
      default: true
    });


  script.addPanel("Cell_01_02")
    .setSpeaker("sofia")
    .showChoice({
      prerequisites: "Cell_01_01=R_01",
      key: "S_01",
      label: "Yes",
      dialogue: "Yeah, it was great."
    })
    .showChoice({
      prerequisites: "Cell_01_01=R_01",
      key: "S_02",
      label: "No",
      dialogue: "Not really, I saw my ex trying to pick up someone else.",
      default: true,
      flags: "AWK1"
    })
    .showChoice({
      prerequisites: "Cell_01_01=R_02",
      key: "S_03",
      label: "Yes",
      dialogue: "Yeah, it's good."
    })
    .showChoice({
      prerequisites: "Cell_01_01=R_02",
      key: "S_04",
      label: "Yes, but...",
      dialogue: "Yeah, I used to come here with my ex all the time.",
      default: true,
      flags: "AWK1"
    });


})();