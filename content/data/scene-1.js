(function () {
  var script = new Script("scene-1");


  script.addPanel("Cell_01_01")
    .setBackground("background_P2.png")

    .setSpeaker("rajar")
    .showChoice({
      key: "R_01",
      label: "Ask about meeting at convention",
      dialogue: "It was great meeting you at the Doctor Who Convention. Did you enjoy it?",
      mood: "P2_happy"
    })
    .showChoice({
      key: "R_02",
      label: "Ask about the restaurant",
      dialogue: "Have you been here before?",
      mood: "P2_normal",
      default: true
    });


  script.addPanel("Cell_01_02")
    .reset()
    .setBackground("background_P1.png")

    .setSpeaker("sofia")
    .showChoice({
      prerequisites: "Cell_01_01=R_01",
      key: "S_01",
      label: "Yes",
      mood: "P1_happy",
      dialogue: "Yeah, it was great."
    })
    .showChoice({
      prerequisites: "Cell_01_01=R_01",
      key: "S_02",
      label: "No",
      dialogue: "Not really, I saw my ex trying to pick up someone else.",
      default: true,
      mood: "P1_sad",
      flags: "AWK1"
    })
    .showChoice({
      prerequisites: "Cell_01_01=R_02",
      key: "S_03",
      label: "Yes",
      mood: "P1_normal",
      dialogue: "Yeah, it's good."
    })
    .showChoice({
      prerequisites: "Cell_01_01=R_02",
      key: "S_04",
      label: "Yes, but...",
      dialogue: "Yeah, I used to come here with my ex all the time.",
      default: true,
      mood: "P1_normal",
      flags: "AWK1"
    });


  script.addPanel("Cell_01_03")
    .setSpeaker("sofia")
    .showChoice({
      prerequisites: "Cell_01_02=S_01",
      key: "S_01",
      label: "Loved the panel",
      dialogue: "I loved Prof. Tom Baker's panel!",
      mood: "P1_happy",
      flags: "!AWK1"
    })
    .showChoice({
      prerequisites: "Cell_01_02=S_01",
      key: "S_02",
      label: "Awesome",
      dialogue: "It was so awesome! I helped my ex give his talk.",
      default: true,
      mood: "P1_happy",
      flags: "AWK1"
    })
    .showChoice({
      prerequisites: "Cell_01_02=S_03",
      key: "S_03",
      label: "The service",
      dialogue: "The service is awesome.",
      mood: "P1_happy",
      flags: "!AWK1"
    })
    .showChoice({
      prerequisites: "Cell_01_02=S_03",
      key: "S_04",
      label: "Ambiance",
      dialogue: "My ex really liked the ambiance.",
      default: true,
      mood: "P1_normal",
      flags: "AWK1"
    });


  script.addPanel("Cell_01_04")
    .setPrerequisites("AWK1")
    .reset()
    .setBackground("background_P3.png")
    .showActor("pair", "P3_awkward.png")

    .setSpeaker("narrator")
    .sayText("The mood has gotten awkward...");


  script.setNextScript("scene-2");
})();