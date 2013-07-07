(function () {
  var script = new Script("scene-3");

// Shows a choice in a speech bubble. 
// dict: {
//   [default: true],
//   [prerequisites: (string | array[string])] -- prerequisites to show this choice
//   key: string,
//   label: string,
//   dialogue: string,
//   [flags: (string | array[string])], -- sets one or more flags when this is chosen
//   [mood: imageUri] -- sets mood of speaker
// }
// You can pass in a flag name to set a flag when the player chooses this.


  script.addPanel("Cell_03_01")
    .reset()
    .setBackground("background_P1.png")
    .setActorMood("sofia", "sofia_P1_normal.png")

    .setSpeaker("sofia")
    .showChoice({
      key: "S_01",
      label: "Discuss Hot Tub Time Machine.",
      dialogue: "You said at the Dr. Who conference you liked \"Hot Tub Time Machine\"...",
      mood: "P1_normal"
    })
    .showChoice({
      key: "S_02",
      label: "Discuss Back to the Future.",
      dialogue: "I'm curious... what do you think about \"Back to the Future\"?",
      mood: "P1_happy",
      default: true,
    })
    .showChoice({
      key: "S_03",
      label: "Discuss Bill & Ted's Excellent Adventure.",
      dialogue: "What do you think of \"Bill & Ted's Excellent Adventure\"?"
    });


  script.addPanel("Cell_03_02")
    .reset()
    .setBackground("background_P2.png")
    .setActorMood("rajar", "rajar_P2_normal.png")

    .setSpeaker("rajar")
    .showChoice({
key: "R_01",
label: "Discuss technical imperfections.",
dialogue: "For sure. But, the use of a single can of \"Chernobly\" energy drink in \"Hot Tub Time Machine\" would not be sufficient to take them back 20 years. They would have needed at least 5.4 cans, don't you think?",
prerequisites: "Cell_03_01=S_01",
      mood: "P2_normal"
})
.showChoice({
key: "R_02",
label: "Discuss awesomeness of basic premise.",
dialogue: "Of course! From start to finish, it's brilliant. I mean, a hot tub... that's a time machine! What's not to like? Don't you agree?",
prerequisites: "Cell_03_01=S_01",
default: true,
      mood: "P2_happy"
})

.showChoice({
key: "R_03",
label: "Say it's better than Back to the Future.",
dialogue: "It's definitely been an inspiration for me. I can't believe you find anything of use in \"Back to the Future\".",
prerequisites: "Cell_03_01=S_01",
default: true,
      mood: "P2_normal"
})

.showChoice({
key: "R_04",
label: "Ask about the 88mph limit.",
dialogue: "Is the 88 mph speed limit for car based time travel really a thing?",
prerequisites: "Cell_03_01=S_02",
      mood: "P2_ normal"
})


.showChoice({
key: "R_05",
label: "Ask about possibility of failure.",
dialogue: "Aren't you worried about your car failing to jump and crashing into a wall at high speed? Or that there's a wall in the future, or the past? Seems dangerous.",
prerequisites: "Cell_03_01=S_02",
      mood: "P2_sad"
})

   .showChoice({
key: "R_06",
label: "Discuss difficulties of drinking and driving.",
dialogue: "All that driving, does that mean you can't just sit and relax with a beer while you're jumping?",
prerequisites: "Cell_03_01=S_02",
default: true,
      mood: "P2_normal"
})

.showChoice({
key: "R_07",
label: "Compare it to Dr Who.",
dialogue: "I love watching Dr. Who, but if we consider the time machine, \"Bill & Ted's Excellent Adventure\" seems entirely more plausible.",
prerequisites: "Cell_03_01=S_03",
default: true,
      mood: "P2_normal"
})

.showChoice({
key: "R_08",
label: "Say booth time travel is flawed.",
dialogue: "I believe that booth-based time travel is inherently flawed due to the use of a coin return slot. I mean, that system is so prone to failure!",
prerequisites: "Cell_03_01=S_03",
      mood: "P2_normal"
})

;


  script.addPanel("Cell_03_03")
    .reset()
    .setBackground("background_P1.png")
    .setActorMood("sofia", "sofia_P1_normal.png")

    .setSpeaker("sofia")

.showChoice({
key: "S_01",
label: "Say everything implausible.",
dialogue: "The entire premise is implausible. You're wasting your time.",
prerequisites: "Cell_03_02=R_01",
default: true,
flags: "AWK3",
      mood: "P1_angry"
})

.showChoice({
key: "S_02",
label: "Agree and...",
dialogue: "I hadn't considered that! It's like if the flying train in \"Back to the Future\" having VTOL capabilities. As if!",
prerequisites: "Cell_03_02=R_01",
      mood: "P1_happy"
})

.showChoice({
key: "S_03",
label: "Disagree.",
dialogue: "No, it is nooooot!",
prerequisites: "Cell_03_02=R_02",
default: true,
flags: "AWK3",
      mood: "P1_angry"
})

.showChoice({
key: "S_04",
label: "Say feel the same about Back to the Future.",
dialogue: "That's so funny, I feel the same about \"Back to the Future\"!!",
prerequisites: "Cell_03_02=R_02",
      mood: "P1_happy"
})

.showChoice({
key: "S_05",
label: "Agree to disagree.",
dialogue: "Let's just agree to disagree, then...",
prerequisites: "Cell_03_02=R_03",
flags: "!AWK3",
      mood: "P1_normal"
})

.showChoice({
key: "S_06",
label: "Ask if trying to pick a fight",
dialogue: "Are you trying to pick a fight or something? You know, I love \"Back to the Future.\" Show more respect!",
prerequisites: "Cell_03_02=R_03",
default: true,
flags: "AWK3",
      mood: "P1_angry"
})

.showChoice({
key: "S_07",
label: "Ask if he really cares.",
dialogue: "Do you actually really care? I thought you only believed in closed loop time machines based on Professor Jacuzzi's quantum entanglement theory.",
prerequisites: "Cell_03_02=R_04",
default: true,
flags: "AWK3",
      mood: "P1_normal"
})

.showChoice({
key: "S_08",
label: "Explain details.",
dialogue: "According to my calculations, the world moves so fast these days that you would need to reach 91 mph now.",
prerequisites: "Cell_03_02=R_04",
      mood: "P1_normal"
})

.showChoice({
key: "S_09",
label: "Say how amazing Dr Brown was.",
dialogue: "Dr. Brown's calculations were amazingly precise in his time. He paved the way for others like myself to follow.",
prerequisites: "Cell_03_02=R_04",
      mood: "P1_happy"
})

.showChoice({
key: "S_10",
label: "Disparage people who don't do calculations.",
dialogue: "Well, if you don't take the time to do the calculations and just go around jumping and driving everywhere, then sure, it's a bit dangerous. But only an idiot would do that.",
prerequisites: "Cell_03_02=R_05",
default: true,
flags: "AWK3",
      mood: "P1_sad"
})

.showChoice({
key: "S_11",
label: "Say you're always careful.",
dialogue: "It's a risk, sure. But I'm always careful to do the calculations first. Measure twice, jump once as they say!",
prerequisites: "Cell_03_02=R_05",
flags: "!AWK3",
      mood: "P1_happy"
})

.showChoice({
key: "S_12",
label: "Say alcohol and time travel don't mix.",
dialogue: "Anyone who mixes alcohol and time travel doesn't deserve to have a working time machine anyway. Time travel is serious business and not to be used for frivolous tasks.",
prerequisites: "Cell_03_02=R_06",
flags: "AWK3",
      mood: "P1_angry"
})

.showChoice({
key: "S_13",
label: "Comment on hot tub bubbles and the Time Mile Club.",
dialogue: "I guess if the Time Mile Club actually existed, then those bubbles might be mighty handy for hiding... umm... nudity. If you get what I mean...",
prerequisites: "Cell_03_02=R_06",
default: true,
flags: "AWK3",
      mood: "P1_normal"
})


.showChoice({
key: "S_14",
label: "Say Dr Who more plausible than \"Hot Tub Time Machine\"",
dialogue: "Well, at least Dr. Who is more plausible than a hot tub time machine. I mean, who honestly believes that would work? Talk about a joke!",
prerequisites: "Cell_03_02=R_07",
default: true,
flags: "AWK3",
      mood: "P1_happy"
})

.showChoice({
key: "S_15",
label: "Ask why Dr Who doesn't ever change his gender.",
dialogue: "What I don't get in Dr. Who is why he never regenerates as a woman. I wish that someone would do something about the obvious gender imbalance in the time travellers industry. It's a disgrace!",
prerequisites: "Cell_03_02=R_07",
default: true,
flags: "AWK3",
      mood: "P1_sad"
})

.showChoice({
key: "S_16",
label: "Say hot tubs are prone to failure as well.",
dialogue: "What about hot tubs? What if you spring a leak? How are you going to get that fixed? And you can't even go into the future! What a lame time machine.",
prerequisites: "Cell_03_02=R_08",
default: true,
flags: "AWK3",
      mood: "P1_sad"
})

.showChoice({
key: "S_17",
label: "Start technical discussion.",
dialogue: "Every time machine has flaws. Finding radioactive fuel in a prehistoric jungle's no picnic... I mean, I would imagine. Anyway, it's about choosing the machine that's right for you. How did you decide on hot tubs?",
prerequisites: "Cell_03_02=R_08",
flags: ["DISCUSS", "!AWK3"],
      mood: "P1_happy"
})


   ;


  script.addPanel("Cell_03_04")
    .reset()
    .setBackground("background_P2.png")
    .setActorMood("rajar", "rajar_P2_normal.png")

    .setSpeaker("rajar")
.showChoice({
key: "R_01",
label: "Say Back to the Future had more errors.",
dialogue: "I find it hard to believe that Marty's parents don't remember his pivotal role in bringing them together all those years ago? \"Back to the Future\" clearly has a lot more faults.",
prerequisites: "Cell_03_03=S_02",
default: true,
flags: "AWK3",
      mood: "P2_normal"
})

.showChoice({
key: "R_02",
label: "Laugh about Hollywood",
dialogue: "They can never get it right in Hollywood! They need to do more research.",
prerequisites: "Cell_03_03=S_02",
flags: "!AWK3",
      mood: "P2_happy"
})

.showChoice({
key: "R_03",
label: "You can't compare the two movies.",
dialogue: "\"Back to the Future\" isn't even half as good as \"Hot Tub Time Machine!\"",
prerequisites: "Cell_03_03=S_04",
flags: "AWK3",
      mood: "P2_angry"
})

.showChoice({
key: "R_04",
label: "Back to the Future is implausible.",
dialogue: "\"Back to the Future\" is way more implausible than \"Hot Tub Time Machine!\"",
prerequisites: "Cell_03_03=S_04",
default: true,
flags: "AWK3",
      mood: "P2_angry"
})

.showChoice({
key: "R_05",
label: "Ask what the world is coming to.",
dialogue: "Fascinating. It's crazy how few people stop to really live in the moment.",
prerequisites: "Cell_03_03=S_08",
flags: "!AWK3",
      mood: "P2_happy"
})

.showChoice({
key: "R_06",
label: "Be disbelieving",
dialogue: "That doesn't sound right... people going fast shouldn't change your calculations. Sounds like you're hiding behind theoretical calculations.",
prerequisites: "Cell_03_03=S_08",
default: true,
flags: "AWK3",
      mood: "P2_normal"
})

.showChoice({
key: "R_07",
label: "Question number of papers Dr Brown wrote.",
dialogue: "I don't remember seeing any papers published by Dr. Brown in the \"Qualified Users and Negotiators of Time Travel Universal Ministry Gazette\".",
prerequisites: "Cell_03_03=S_09",
flags: "AWK3",
      mood: "P2_normal"
})

.showChoice({
key: "R_08",
label: "Question Dr Brown's fictionality.",
dialogue: "Wasn't he fictional? You don't actually believe he existed, do you? Haha.",
prerequisites: "Cell_03_03=S_09",
default: true,
flags: "AWK3",
      mood: "P2_happy"
})

.showChoice({
key: "R_09",
label: "Question whether Dr Who can control his regenerative powers.",
dialogue: "Do you think he can control those regenerative powers enough to make such a change?",
prerequisites: "Cell_03_03=S_15",
      mood: "P2_normal"
})

.showChoice({
key: "R_10",
label: "Agree, because you want choice for dating",
dialogue: "Yeah, you're the only girl I've ever met at a conference that wasn't a time-booth babe. It's like there's a woman-drought for us hetero-males. The choices are so slim!",
prerequisites: "Cell_03_03=S_15",
default: true,
flags: "AWK3",
      mood: "P2_normal"
})

.showChoice({
key: "R_11",
label: "Agree and talk about solutions.",
dialogue: "I agree, it's terrible. Someone needs to use their time machine to convince women not to give up on their time travel studies. There's got to be a way to solve this.",
prerequisites: "Cell_03_03=S_15",
flags: "!AWK3",
      mood: "P2_sad"
})
;

 script.addPanel("Cell_03_05")
    .reset()
    .setBackground("background_P1.png")
    .setActorMood("sofia", "sofia_P1_normal.png")

    .setSpeaker("sofia")

.showChoice({
key: "S_01",
label: "I could work it out with some maths.",
dialogue: "I'm sure if I bothered I could sit down and do the calculations to work out how to control that. It's not hard to do... if you're not stupid that is.",
prerequisites: "Cell_03_04=R_09",
default: true,
flags: "AWK3",
      mood: "P1_normal"
})

.showChoice({
key: "S_02",
label: "Start a technical discussion",
dialogue: "I'm sure it's possible. Sure, he's a Time Lord, but after reading Rassilon‘s paper in its original Gallifreyan I believe it supports the process for humans as well. It's just a matter of...",
prerequisites: "Cell_03_04=R_09",
flags: ["DISCUSS", "!AWK3"],
      mood: "P1_happy"
})
;

script.addPanel("Cell_03_06")
    .setPrerequisites("AWK3")
    .reset()
    .setBackground("background_P3.png")
    .showActor("waiter", "P3_waiter_awkward.png")
    .showActor("pair", "P3_awkward.png")

    .setSpeaker("narrator")
    .sayText("Nothing happens for some time and there is little rejoicing.");

script.addPanel("Cell_03_07")
    .setPrerequisites("DISCUSS")
    .reset()
    .setBackground("background_P3.png")
    //TODO:  SHOULD BE DEEP IN DISCUSSION .showActor("pair", "P3_awkward.png")
    .showActor("pair", "P3_normal.png")

    .setSpeaker("narrator")
    .sayText("They sink deep into a technical discussion and barely notice time passing.");


;

})();