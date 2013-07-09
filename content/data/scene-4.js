(function () {
  var script = new Script("scene-4");


  script.addPanel()
    .setBackground("background_P3.png")
    .showActor("waiter", "P3_waiter.png")
    .showActor("pair", "P3_normal.png")

    .setSpeaker("waiter")
    .sayText("I would be pleased to bequeath you a selection from our marvelous dessert menu. In the interim, I have affixed an invoice upon your table that enables the settling of accounts.");


  script.addPanel("Cell_06_01")
    .reset()
    .setBackground("background_P2.png")

    .setSpeaker("rajar")
   .showChoice({
key: "R_01",
label: "Offer to take the bill.",
dialogue: "This one's on me.",
 mood: "P2_happy"
})
.showChoice({
key: "R_02",
label: "Ignore the bill.",
dialogue: "Errr.... The curtains are nice, huh?",
default: true,
mood: "P2_normal"
})
.showChoice({
key: "R_03",
label: "Lightly suggest that you split the bill.",
dialogue: "How about we go Dutch on this one?",
  mood: "P2_normal"
})

   ;


  script.addPanel("Cell_06_02")
    .reset()
    .setBackground("background_P1.png")

    .setSpeaker("sofia")
  .showChoice({
key: "S_01",
label: "Ask to split the bill instead.",
dialogue: "That isn't necessary. I made sure to bring enough to cover my part.",
prerequisites: "Cell_06_01=R_01",
default: true,
  mood: "P1_normal"
})
.showChoice({
key: "S_02",
label: "Offer to pay instead.",
dialogue: "I'll tell you what. This one's on me!",
prerequisites: "Cell_06_01=R_01",
  mood: "P1_happy"
})
.showChoice({
key: "S_03",
label: "Accept his offer.",
dialogue: "I guess it's been awhile since I've been treated! I'll take my chances and say... yes!",
prerequisites: "Cell_06_01=R_01",
  mood: "P1_happy"
})
.showChoice({
key: "S_04",
label: "Proudly offer to pay.",
dialogue: "I guess I'm the one taking care of the two of us tonight.",
prerequisites: "Cell_06_01=R_02",
  mood: "P1_normal"
})
.showChoice({
key: "S_05",
label: "Act confused.",
dialogue: "... What do you mean?",
prerequisites: "Cell_06_01=R_02",
default: true,
  mood: "P1_angry"
})

.showChoice({
key: "S_06",
label: "Call Rajar out on his bill avoidance tactic.",
dialogue: "I'm not looking at the curtains, I'm looking at you.",
prerequisites: "Cell_06_01=R_02",
  mood: "P1_angry"
})
.showChoice({
key: "S_07",
label: "Insist that he pay the bill.",
dialogue: "You're the one who brought me here. Shouldn't you have the honors?",
prerequisites: "Cell_06_01=R_03",
default: true,
  mood: "P1_angry"
})
.showChoice({
key: "S_08",
label: "Accept his offer.",
dialogue: "Sure thing. Us time travellers are pretty used to taking care of ourselves, aren't we?",
prerequisites: "Cell_06_01=R_03",
  mood: "P1_normal"
})
.showChoice({
key: "S_09",
label: "Refuse his offer, offer to pay the bill instead.",
dialogue: "Actually, I'd like to pick up the tab myself.",
prerequisites: "Cell_06_01=R_03",
mood: "P1_happy"
})


   ;


  script.addPanel("Cell_06_03")
    .reset()
    .setBackground("background_P2.png")

    .setSpeaker("rajar")
  .showChoice({
key: "R_01",
label: " Insist that you'd like pay.",
dialogue: "It not often that I share my inherited wealth with others, so really, I insist",
prerequisites: "Cell_06_02=S_01",
default: true,
flags: "AWK6",
  mood: "P2_happy"
})

 .showChoice({
key: "R_02",
label: "Agree to split.",
dialogue: "Alright! We split then. I'll use the saved money for my time travel fund!",
prerequisites: "Cell_06_02=S_01",
flags: "!AWK6",
  mood: "P2_happy"
})
.showChoice({
key: "R_03",
label: "Insist that it's wrong for a woman to pay.",
dialogue: "Come on. The lady at the table shouldn't pay.",
prerequisites: "Cell_06_02=S_02",
default: true,
flags: "AWK6",
  mood: "P2_angry"
})
.showChoice({
key: "R_04",
label: "Insist that it's really your pleasure.",
dialogue: "No really, let me have this one! It's my pleasure.",
prerequisites: "Cell_06_02=S_02",
flags: "!AWK6",
  mood: "P2_happy"
})
.showChoice({
key: "R_05",
label: "Agree.",
dialogue: "That seems about right.",
prerequisites: "Cell_06_02=S_03",
default: true,
flags: "AWK6",
  mood: "P2_normal"
})
.showChoice({
key: "R_06",
label: "Tell her she's one to be treated",
dialogue: "It's been a while? Hard to believe that. A woman like you deserves to be treated like this everyday.",
prerequisites: "Cell_06_02=S_03",
flags: "!AWK6",
  mood: "P2_happy"
})

.showChoice({
key: "R_07",
label: "Tell her you've been waiting.",
dialogue: "It's about time you paid the bill, I thought we were going to be here all night.",
prerequisites: "Cell_06_02=S_04",
default: true,
flags: "AWK6",
  mood: "P2_angry"
})
.showChoice({
key: "R_08",
label: "Show her you're pleased.",
dialogue: "Wow, this is actually happening? Alright!",
prerequisites: "Cell_06_02=S_04",
flags: "AWK6",
  mood: "P2_happy"
})
.showChoice({
key: "R_09",
label: "Offer to pick up the bill next time",
dialogue: "Alright, alright. But the next dinner is on me.",
prerequisites: "Cell_06_02=S_04",
flags: "!AWK6",
  mood: "P2_normal"
})

.showChoice({
key: "R_10",
label: "Admit you were kidding.",
dialogue: "Heh, just kidding. Now where's my credit card...",
prerequisites: "Cell_06_02=S_05",
flags: "AWK6",
  mood: "P2_sad"
})
.showChoice({
key: "R_11",
label: "Spell it out for her",
dialogue: "I would have thought such an up-and-coming nobel prize winner can handle figuring how to pay a mere dinner bill.",
prerequisites: "Cell_06_02=S_05",
default: true,
flags: "AWK6",
  mood: "P2_angry"
})
.showChoice({
key: "R_12",
label: "Admit you owe her one.",
dialogue: "Honestly... I think I'm over my budget. I owe you one...",
prerequisites: "Cell_06_02=S_05",
flags: "AWK6",
  mood: "P2_sad"
})
.showChoice({
key: "R_13",
label: "Indicate she should pay for the bill.",
dialogue: "Would you mind?",
prerequisites: "Cell_06_02=S_06",
default: true,
flags: "AWK6",
  mood: "P2_sad"
})
.showChoice({
key: "R_14",
label: "Realize your mistake and pay for the bill",
dialogue: "Ahh, where was my head. Here, let me get that.",
prerequisites: "Cell_06_02=S_06",
flags: "AWK6",
  mood: "P2_sad"
})
.showChoice({
key: "R_15",
label: "Cover your ass with a joke.",
dialogue: "Wait, what? The bill has been sitting on the table all this time? Heh, uh, why didn't you say something? This is on me...",
prerequisites: "Cell_06_02=S_06",
flags: "AWK6",
mood: "P2_sad"
})
.showChoice({
key: "R_16",
label: "Insist she's a modern woman.",
dialogue: "Now wait a minute, I thought the tables have turned in this day and age. Aren't you a modern woman? You can pick this one up.",
prerequisites: "Cell_06_02=S_07",
default: true,
flags: "AWK6",
  mood: "P2_angry"
})
.showChoice({
key: "R_17",
label: "Sheepishly admit you were wrong.",
dialogue: "Ah, you're right... sure I'll take the bill, let me get my money.",
prerequisites: "Cell_06_02=S_07",
flags: "AWK6",
  mood: "P2_sad"
})
.showChoice({
key: "R_18",
label: "Suggest next time you pick up the bill",
dialogue: "Alright we'll take care of ourselves this time. But next time... let me take care of you...",
prerequisites: "Cell_06_02=S_08",
flags: "!AWK6",
  mood: "P2_happy"
})
.showChoice({
key: "R_19",
label: "That was easy.",
dialogue: "Well that was easy.",
prerequisites: "Cell_06_02=S_08",
flags: "!AWK6",
  mood: "P2_normal"
})

.showChoice({
key: "R_20",
label: "Make a joke about cheap dinner",
dialogue: "Hah, with all the money my parents send me, this is like a free dinner for me at half price!",
prerequisites: "Cell_06_02=S_08",
default: true,
flags: "AWK6",
mood : "P2_happy"
})
.showChoice({
key: "R_21",
label: "Accept her offer",
dialogue: "Alrighty then! What a treat.",
prerequisites: "Cell_06_02=S_09",
flags: "!AWK6",
mood: "P2_happy"
})
.showChoice({
key: "R_22",
label: "Let her pay, but the next time it's on you.",
dialogue: "Ok... but next time it's my turn!",
prerequisites: "Cell_06_02=S_09",
flags: "!AWK6",
mood: "P2_happy"
})
.showChoice({
key: "R_23",
label: "Admit you were low on cash",
dialogue: "Phew! It's a good thing we split. I was running low on cash since I haven't received my allowance from my parents' this week.",
prerequisites: "Cell_06_02=S_09",
default:  true,
flags: "AWK6",
mood: "P2_happy"
})


   ;


  script.addPanel("Cell_06_04")
    .setPrerequisites("AWK6")
    .reset()
    .setBackground("background_P3.png")
    .showActor("waiter", "P3_waiter_awkward.png")
    .showActor("pair", "P3_awkward.png")

    .setSpeaker("narrator")
    .sayText("They get up to leave the restaurant in silence.");


  script.magicBranchingOutro();

  
})();