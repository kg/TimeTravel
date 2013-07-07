(function () {
  var script = new Script("scene-2");


  script.addPanel()
    .setPrerequisites("!AWK1")
    .setBackground("background_P3.png")
    .showActor("waiter", "P3_waiter.png")
    .showActor("pair", "P3_normal.png")

    .setSpeaker("waiter")
    .sayText("Would gentleman and madame perchance be inclined to sate their thirsts with a sophisticated libation?");


  script.addPanel()
    .setPrerequisites("AWK1")
    .setBackground("background_P3.png")
    .showActor("waiter", "P3_waiter.png")
    .showActor("pair", "P3_awkward.png")

    .setSpeaker("waiter")
    .sayText("Would gentleman and madame perchance be inclined to sate their thirsts with a sophisticated libation?");


  script.addPanel("Cell_02_02")
    .reset()
    .setBackground("background_P1.png")

    .setSpeaker("sofia")
    .showChoice({
      prerequisites: "AWK1",
      key: "S_01",
      label: "I need a drink...",
      dialogue: "I'll have a glass of red wine.",
      mood: "P1_normal",
      default: true
    })
    .showChoice({
      prerequisites: "!AWK1",
      key: "S_02",
      label: "Red wine sounds nice.",
      dialogue: "Let's get a bottle of red wine.",
      mood: "P1_happy",
      default: true,
    })
    .showChoice({
      key: "S_03",
      label: "Ask what he wants.",
      dialogue: "What do you feel like getting?",
      mood: "P1_normal"
    });


  script.addPanel("Cell_02_03")
    .reset()
    .setBackground("background_P2.png")

    .setSpeaker("rajar")
    .showChoice({
      prerequisites: "Cell_02_02=S_01",
      key: "R_01",
      label: "Me too.",
      dialogue: "I'll have one too.",
      mood: "P2_happy",
      flags: "!AWK2"
    })
    .showChoice({
      prerequisites: "Cell_02_02=S_01",
      key: "R_02",
      label: "That's surprising.",
      dialogue: "Oh... you don't want a bottle then, huh?",
      default: true,
      mood: "P2_angry",
      flags: "AWK2"
    })
    .showChoice({
      prerequisites: "Cell_02_02=S_02",
      key: "R_03",
      label: "No, I just want a glass of wine.",
      dialogue: "Oh... you don't want a bottle then, huh?",
      default: true,
      mood: "P2_normal",
      flags: "AWK2"
    })
    .showChoice({
      prerequisites: "Cell_02_02=S_02",
      key: "R_04",
      label: "Okay.",
      dialogue: "Sure, that sounds great.",
      default: true,
      mood: "P2_happy",
      flags: "!AWK2"
    })
    .showChoice({
      prerequisites: "Cell_02_02=S_03",
      key: "R_05",
      label: "Suggest a bottle of wine.",
      dialogue: "Let's get a bottle of red wine.",
      default: true,
      mood: "P2_happy",
      flags: "AWK2"
    })
    .showChoice({
      prerequisites: "Cell_02_02=S_03",
      key: "R_06",
      label: "A glass of wine.",
      dialogue: "I'll just have a glass of red wine.",
      mood: "P2_normal",
      default: true
    });


  script.addPanel("Cell_02_04")
    .reset()
    .setBackground("background_P1.png")

    .setSpeaker("sofia")
    .showChoice({
      prerequisites: "Cell_02_03=R_05",
      key: "S_01",
      label: "Sure.",
      dialogue: "Great idea! Then we can taste lots of different wines.",
      mood: "P1_happy",
      flags: "!AWK2"
    })
    .showChoice({
      prerequisites: "Cell_02_03=R_05",
      key: "S_02",
      label: "No.",
      dialogue: "Nah... I only want a glass.",
      flags: "AWK2",
      mood: "P1_sad",
      default: true
    })
    .showChoice({
      prerequisites: "Cell_02_03=R_06",
      key: "S_03",
      label: "Yes.",
      dialogue: "Sure, sounds great.",
      flags: "!AWK2",
      mood: "P1_happy"
    })
    .showChoice({
      prerequisites: "Cell_02_03=R_06",
      key: "S_04",
      label: "Why, I never!",
      dialogue: "Oh. Ok... I wanted a bottle. Oh well.",
      flags: "AWK2",
      mood: "P1_angry",
      default: true
    })


  script.addPanel("Cell_02_05")
    .setPrerequisites("AWK2")
    .reset()
    .setBackground("background_P3.png")
    .showActor("waiter", "P3_waiter_awkward.png")
    .showActor("pair", "P3_awkward.png")

    .setSpeaker("narrator")
    .sayText("The silence is thick enough to cut with a very, very sharp knife.");


})();