title = "Hyakumonogatari Kaidankai";

description = `
[Tap] to end story
`;

characters = [
// l: black, r: red, g: green, b: blue, y: yellow, 
// p: purple, c: cyan, L: light_black, R: light_red, 
// G: light_green, B: light_blue, Y: light_yellow, P: light_purple, 
// C: light_cyan
`
  LLL 
  Lyy
  ryy
  rrg
  rgg
  b b
`,
`
      
  C C 
 CyyCC
  yyy
  RRR
 pppRp
`
,
`
 rrr  
rYYYr 
rBYBr 
rBBB  
rG G  
 G y
`
];

// -TYPE-STUFF-----------------------------------------

// -GLOBAL-CONSTANTS-----------------------------------
const G = {
	// Screen Size
	WIDTH: 200,
	HEIGHT: 200,
};

/**
 * @type { Color[] }
 */
const peepColors = ["green", "blue", "cyan"];

/**
 * @typedef {{
 * pos: Vector
 * }} Sprite
 */

/**
 * @type { Sprite[] }
 */
let candles;

/**
 * @type { Sprite[] }
 */
 let peeps = [];
// ----------------------------------------------------

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
	isShowingScore: false,
	theme: "dark",
	seed: 71
};

let state; // keeps track of current game state

let story; // array to hold story text
let narration; // array to hold narration text
let dialogue;
let peep1and3;
let peep2and3;
let story2;
let peep3;
let peep1and2;
let story3;
let snuff;
let ending1;
let ending2;
let count; // used to display and shift the current text
let waitin;
let walkin;

let sec;   // timer for first story
let sec2;  // timer for person 1 & 3 dialogue
let sec3;  // timer for person 2 & 3 dialogue
let sec4;  // timer for person 3 dialogue
let sec5;  // timer for person 1 & 1 dialogue
let sec6;  // timer for snuff candle
let time;  // general timer
let pause; // boolean for pausing game

// ----------------------------------------------------

function update() {
	if (!ticks) {
		// init counters and timers
		count = 0;
		sec = 0;
		sec2 = 0;
		sec3 = 0;
		sec4 = 0;
		sec5 = 0;
		sec6 = 0;
		time = 0;
		waitin = 0;

		pause = false;

		state = "narration"; // HCNAGE LATER

		// Add character positions into peeps array
		peeps[0] = {pos: vec(G.WIDTH/2 - 8, G.HEIGHT/2 + 50)};
		peeps[1] = {pos: vec(G.WIDTH/2, G.HEIGHT/2 + 50)};
		peeps[2] = {pos: vec(G.WIDTH/2 + 8, G.HEIGHT/2 + 50)};

		// -NARRATION------------------------------------------
		narration = [];

		// 0
		narration[0] = "There`s a game your supposed";
		narration[1] = "to play in the dead of night.";
		narration[2] = "You light one hundred candles";
		narration[3] = "and leave them in a room. You";
		narration[4] = "tell a horror story and go";
		narration[5] = "to snuff a candle.";
		narration[6] = ""

		// 7
		narration[7] = "The game ends when one hundred";
		narration[8] = "stories are told.";
		narration[9] = "";
		narration[10] = "";
		narration[11] = "";
		narration[12] = "";
		narration[13] = "";

		// 14
		narration[14] = "Or there's no one left to tell";
		narration[15] = "them...";
		narration[16] = "";
		narration[17] = "";
		narration[18] = "";
		narration[19] = "";
		narration[20] = "";

		// -DIALOGUE-------------------------------------------
		dialogue = [];

		// Green
		dialogue[0] = "...So who’s up to tell the next";
		dialogue[1] = "story?";
		dialogue[2] = "";
		dialogue[3] = "";
		dialogue[4] = "";
		dialogue[5] = "";
		dialogue[6] = ""

		// Blue
		dialogue[7] = "That would be me.";
		dialogue[8] = "";
		dialogue[9] = "";
		dialogue[10] = "";
		dialogue[11] = "";
		dialogue[12] = "";
		dialogue[13] = "";

		// Cyan
		dialogue[14] = "We should just skip your turn";
		dialogue[15] = "and have me go. Your stories";
		dialogue[16] = "aren’t scary at all.";
		dialogue[17] = "";
		dialogue[18] = ""
		dialogue[19] = "";
		dialogue[20] = "";

		// Blue
		dialogue[21] = "Oh, and I suppose that nonsense";
		dialogue[22] = "you read online is the hight";
		dialogue[23] = "of horror.";
		dialogue[24] = "";
		dialogue[25] = "";
		dialogue[26] = "";
		dialogue[27] = "";

		// Green
		dialogue[28] = "Calm down guys. We`re almost";
		dialogue[29] = "at the end of the game. Now go";
		dialogue[30] = "on and tell your story.";
		dialogue[31] = "";
		dialogue[32] = "";
		dialogue[33] = "";
		dialogue[34] = "";
		
		// -STORY-1--------------------------------------------
		story = [];
		story[0] = "This is a story of bitters";
		story[1] = "and sweets and boxes and bags";
		story[2] = "and the business of adults";
		story[3] = "and the play of children.";
		story[4] = "This is the story of William";
		story[5] = "Hardaker, 1858.";
		story[6] = ""

		story[7] = "William Hardaker made a living";
		story[8] = "selling bags of sweets to the";
		story[9] = "children of Bradford.The";
		story[10] = "children loved him, and everyday";
		story[11] = "the streets were filled with";
		story[12] = "cries for Humbug Billy and his";
		story[13] = "peppermint humbugs.";

		story[14] = "How their faces were filled";
		story[15] = "with joy and candy and laughs";
		story[16] = "and screams.But those Humbugs";
		story[17] = "had to come from somewhere.";
		story[18] = "Somewhere with many ingredients."
		story[19] = "It was the day before All";
		story[20] = "Hallow`s Eve.";

		story[21] = "A new batch was bought to be";
		story[22] = "sold to the kids.Money from";
		story[23] = "small hands in exchange for the";
		story[24] = "man`s confections.Halloween,";
		story[25] = "afterall, is the perfect time";
		story[26] = "for humbugs.Then the sickness";
		story[27] = "came.";

		story[28] = "First one, then ten, then 100,";
		story[29] = "until more 200 fell ill.";
		story[30] = "Everyone loved Billy`s sweets.";
		story[31] = "Everyone ate Billy`s sweets";
		story[32] = "But Billy didn`t make his";
		story[33] = "sweets.";
		story[34] = "";

		story[35] = "If he did, he would have seen";
		story[36] = "how arsenic had been mistaken";
		story[37] = "for filler daff.Five pounds of";
		story[38] = "poisoned candy were given that";
		story[39] = "day. 21 were dead.";
		story[40] = "";
		story[41] = "";


		story[42] = "Humbug Billy now lives on as"
		story[43] = "a legend.The one that tells";
		story[44] = "you to always check your candy"
		story[45] = "on Halloween.";
		story[46] = "";
		story[47] = "";
		story[48] = "";

		// -PEEP1AND3------------------------------------------
		peep1and3 = [];
		peep1and3[0] = "Boy do they know how to drag a";
		peep1and3[1] = "story out. If they took any";
		peep1and3[2] = "longer I would have just";
		peep1and3[3] = "fallen asleep!";
		peep1and3[4] = "";
		peep1and3[5] = "";
		peep1and3[6] = ""

		// color("blue");
		peep1and3[7] = "Be quiet, or we`ll skip your";
		peep1and3[8] = "turn.";
		peep1and3[9] = "";
		peep1and3[10] = "";
		peep1and3[11] = "";
		peep1and3[12] = "";
		peep1and3[13] = "";

		// -PEEP2AND3------------------------------------------
		peep2and3 = [];
		peep2and3[0] = "Only two more stories left.";
		peep2and3[1] = "";
		peep2and3[2] = "";
		peep2and3[3] = "";
		peep2and3[4] = "";
		peep2and3[5] = "";
		peep2and3[6] = ""

		peep2and3[7] = "Well it's my turn to go, so";
		peep2and3[8] = "everyone listen up!";
		peep2and3[9] = "";
		peep2and3[10] = "";
		peep2and3[11] = "";
		peep2and3[12] = "";
		peep2and3[13] = "";

		// -STORY-2--------------------------------------------
		story2 = [];
		story2[0] = "6, 13, 8, 7, 8, 11...";
		story2[1] = "Do these numbers mean anything";
		story2[2] = "to you? Maybe you`ve heard";
		story2[3] = "them on the radio, one quiet";
		story2[4] = "night.Video killed the radio";
		story2[5] = "star,but radio is undead,kid.";
		story2[6] = "They won`t let it die."

		story2[7] = "There`s something beyond the";
		story2[8] = "music, beyond the talking heads,";
		story2[9] = "beyond the car commercials and";
		story2[10] = "jingles.There`s the numbers.";
		story2[11] = "Dozens of stations. All of them";
		story2[12] = "playing an endlessly repeating";
		story2[13] = "string of numbers.";

		story2[14] = "6, 13, 8, 7, 8, 11...";
		story2[15] = "";
		story2[16] = "What are they here for?";
		story2[17] = "Are they a relic of wartime?";
		story2[18] = "Like so many bunkers and"
		story2[19] = "collections of canned food?";
		story2[20] = "";

		story2[21] = "Are they used by today`s";
		story2[22] = "agencies? Giving agents all";
		story2[23] = "the information we can look";
		story2[24] = "at but can`t decode?";
		story2[25] = "";
		story2[26] = "";
		story2[27] = "";

		story2[28] = "These voices are alive, kid.";
		story2[29] = "No lips part to say the numbers.";
		story2[30] = "It`s a machine, always going";
		story2[31] = "6, 13, 8, 7, 8, 11...";
		story2[32] = "";
		story2[33] = "";
		story2[34] = "";

		story2[35] = "These machines keep going.";
		story2[36] = "They`ll keep going long after";
		story2[37] = "the end. Who knows, maybe the";
		story2[38] = "end`s what the numbers are";
		story2[39] = "about?";
		story2[40] = "";
		story2[41] = "";

		// -PEEP3----------------------------------------------
		peep3 = [];
		peep3[0] = "Don't wait up for me!"
		peep3[1] = "";
		peep3[2] = ""
		peep3[3] = "";
		peep3[4] = "";
		peep3[5] = "";
		peep3[6] = "";

		// -PEEP1AND2------------------------------------------
		peep1and2 = [];
		peep1and2[0] = "What are they doing?";
		peep1and2[1] = "";
		peep1and2[2] = "";
		peep1and2[3] = "";
		peep1and2[4] = "";
		peep1and2[5] = "";
		peep1and2[6] = ""

		peep1and2[7] = "Do you think they need help";
		peep1and2[8] = "with something?";
		peep1and2[9] = "";
		peep1and2[10] = "";
		peep1and2[11] = "";
		peep1and2[12] = "";
		peep1and2[13] = "";

		peep1and2[14] = "Knowing them, it`s probably";
		peep1and2[15] = "a joke to freak us out.Come";
		peep1and2[16] = "on, it`s your turn, so you";
		peep1and2[17] = "might as well finish the game.";
		peep1and2[18] = "";
		peep1and2[19] = "";
		peep1and2[20] = "";

		peep1and2[21] = "Okay...";
		peep1and2[22] = "";
		peep1and2[23] = "";
		peep1and2[24] = "";
		peep1and2[25] = "";
		peep1and2[26] = "";
		peep1and2[27] = "";

		story3 = [];
		story3[0] = "There are things that live in";
		story3[1] = "the hills of California.";
		story3[2] = "They`ve been here longer than";
		story3[3] = "anyone here.";
		story3[4] = "";
		story3[5] = "";
		story3[6] = ""

		story3[7] = "They`ve been here longer than";
		story3[8] = "people.";
		story3[9] = "";
		story3[10] = "";
		story3[11] = "";
		story3[12] = "";
		story3[13] = "";

		story3[14] = "People have whispered about";
		story3[15] = "them since the Spanish first";
		story3[16] = "came here.Those who watch us";
		story3[17] = "from the mountain ranges.Those";
		story3[18] = "cloaked in shadow.The Dark";
		story3[19] = "Watchers.";
		story3[20] = "";

		story3[21] = "Never look at them. You`re not";
		story3[22] = "supposed to.They watch us, not";
		story3[23] = "the other way around.If you see";
		story3[24] = "them, keep walking.Don`t stare.";
		story3[25] = "Don`t say anything.They can";
		story3[26] = "tell when you talk about them.";
		story3[27] = "";

		story3[28] = "They look over the mountains";
		story3[29] = "and all that walks through";
		story3[30] = "them.";
		story3[31] = "";
		story3[32] = "";
		story3[33] = "";
		story3[34] = "";

		story3[35] = "Nobody has ever seen them close.";
		story3[36] = "";
		story3[37] = "Nobody has ever heard them speak.";
		story3[38] = "";
		story3[39] = "Nobody is supposed to know them.";
		story3[40] = "";
		story3[41] = "";

		story3[42] = "But who says they only look"
		story3[43] = "over the mountains?";
		story3[44] = ""
		story3[45] = "Maybe they`re always watching.";
		story3[46] = "";
		story3[47] = "";
		story3[48] = "";

		// -SNUFF----------------------------------------------
		snuff[0] = "They`re still not back...";
		snuff[1] = "";
		snuff[2] = "";
		snuff[3] = "";
		snuff[4] = "";
		snuff[5] = "";
		snuff[6] = ""

		snuff[7] = "They`re just being an idiot.";
		snuff[8] = "Just go on and snuff your";
		snuff[9] = "candle.";
		snuff[10] = "";
		snuff[11] = "";
		snuff[12] = "";
		snuff[13] = "";

		// -ENDING-1-------------------------------------------
		ending1 = [];
		ending1[0] = "Couldn't handle any more";
		ending1[1] = "stories?";
		ending1[2] = "";
		ending1[3] = "";
		ending1[4] = "";
		ending1[5] = "";
		ending1[6] = ""

		ending1[7] = "There’s still 2 candles left...";
		ending1[8] = "";
		ending1[9] = "";
		ending1[10] = "";
		ending1[11] = "";
		ending1[12] = "";
		ending1[13] = "";

		ending1[14] = "But it`s alright.You can leave";
		ending1[15] = "knowing.";
		ending1[16] = "";
		ending1[17] = "";
		ending1[18] = "";
		ending1[19] = "";
		ending1[20] = "";

		ending1[21] = "You never finished the game.";
		ending1[22] = "";
		ending1[23] = "";
		ending1[24] = "";
		ending1[25] = "";
		ending1[26] = "";
		ending1[27] = "";

		// -ENDING-2-------------------------------------------
		ending2 = [];
		ending2[0] = "2 candles left, and 1";
		ending2[1] = "player down.";
		ending2[2] = "";
		ending2[3] = "";
		ending2[4] = "";
		ending2[5] = "";
		ending2[6] = ""

		ending2[7] = "Was it a trick or have";
		ending2[8] = "they.";
		ending2[9] = "";
		ending2[10] = "";
		ending2[11] = "";
		ending2[12] = "";
		ending2[13] = "";

		ending2[14] = "Become an unknown";
		ending2[15] = "entity`s treat?";
		ending2[16] = "";
		ending2[17] = "";
		ending2[18] = "";
		ending2[19] = "";
		ending2[20] = "";

		ending2[21] = "Suppose you’ll never";
		ending2[22] = "find out...";
		ending2[23] = "";
		ending2[24] = "";
		ending2[25] = "";
		ending2[26] = "";
		ending2[27] = "";

	}
	// -END-OF-INIT-----------------------------------

	switch(state){
		// -START-STATE----------------------------------------
		case "start":
			let index = 0;
			peeps.forEach((p) => {
				color(peepColors[index]);
				char("a", p.pos);
				index++;
			});
			if(input.isJustPressed){
				state = "story";
			}
			break;
		
		// -NARRATION------------------------------------------
		case "narration":
			// text("narration", G.WIDTH/2, 190);
			color("black");
			// Timer - 60 ticks --> 1 second
			if(sec%60 == 0){
				time++;
			}
			// CHANGE BACK LATER
			if(sec == 600){ // If change is x (60 * 10 seconds) amount of seconds, then switch text
				count += 7;
				sec = 0;
			} else{ // Otherwise display the current text
				if(count < 15){
					// text(time.toString(), 4, 4);
					text(narration[count], 12, G.WIDTH/3 + 5);
					text(narration[count + 1], 12, G.WIDTH/3 + 13);
					text(narration[count + 2], 12, G.WIDTH/3 + 21);
					text(narration[count + 3], 12, G.WIDTH/3 + 29);
					text(narration[count + 4], 12, G.WIDTH/3 + 37);
					text(narration[count + 5], 12, G.WIDTH/3 + 45);
					text(narration[count + 6], 12, G.WIDTH/3 + 53);
					console.log("count: " + count)
				} else {
					console.log("count: " + count)
					count = 0; // CHANGE LATER
					state = "dialogue";
				}
			}

			if(input.isJustPressed){
				state = ending1;
			}

			// Pausing Stuff
			if(pause == false){
				sec++;
			} else{
				text("paused", G.WIDTH/2, 10);
			}

			break;
		
		// -DIALOGUE-------------------------------------------
		case "dialogue":
			let dia = 0;
			// text("dialogue", G.WIDTH/2, 190);
			peeps.forEach((p) => {
				color(peepColors[dia]);
				char("a", p.pos);
				dia++;
			});	
			color("black");
			// Timer - 60 ticks --> 1 second
			if(sec%60 == 0){
				time++;
			}
			// CHANGE BACK LATER
			if(sec == 300){ // If change is x (60 * 10 seconds) amount of seconds, then switch text
				count += 7;
				sec = 0;
			} else{ // Otherwise display the current text
				if(count < 29){
					if(count == 0 || count == 28){
						color("green");
					}
					else if(count == 7 || count == 21){
						color("blue")
					} else{
						color("cyan");
					}
					// text(time.toString(), 4, 4);
					text(dialogue[count], 12, G.WIDTH/3 + 5);
					text(dialogue[count + 1], 12, G.WIDTH/3 + 13);
					text(dialogue[count + 2], 12, G.WIDTH/3 + 21);
					text(dialogue[count + 3], 12, G.WIDTH/3 + 29);
					text(dialogue[count + 4], 12, G.WIDTH/3 + 37);
					text(dialogue[count + 5], 12, G.WIDTH/3 + 45);
					text(dialogue[count + 6], 12, G.WIDTH/3 + 53);
					console.log("dialogue count: " + count)
				} else {
					count = 0; // CHANGE LATER
					color("black");
					state = "story";
				}
			}

			// Debugging Pausing
			if(input.isJustPressed){
				state = ending1;
			}

			// Pausing Stuff
			if(pause == false){
				sec++;
			} else{
				text("paused", G.WIDTH/2, 10);
			}

			break;
		
		// -STORY----------------------------------------------
		case "story":
			let x = 0;
			// text("story", G.WIDTH/2, 190);
			peeps.forEach((p) => {
				color(peepColors[x]);
				char("a", p.pos);
				x++;
			});	
			color("blue");
			// Timer - 60 ticks --> 1 second
			if(sec%60 == 0){
				time++;
			}
			// CHANGE BACK LATER
			if(sec == 600){ // If change is x (60 * 10 seconds) amount of seconds, then switch text
				count += 7;
				sec = 0;
			} else{ // Otherwise display the current text
				if(count < 43){
					// text(time.toString(), 4, 4);
					text(story[count], 12, G.WIDTH/3 + 5);
					text(story[count + 1], 12, G.WIDTH/3 + 13);
					text(story[count + 2], 12, G.WIDTH/3 + 21);
					text(story[count + 3], 12, G.WIDTH/3 + 29);
					text(story[count + 4], 12, G.WIDTH/3 + 37);
					text(story[count + 5], 12, G.WIDTH/3 + 45);
					text(story[count + 6], 12, G.WIDTH/3 + 53);
				} else {
					console.log("count: " + count)
					count = 0;
					walkin = 0;
					state = "peep2WalkOut";
				}
			}

			// Debugging Pausing
			if(input.isJustPressed){
				state = "ending1";
			}

			// Pausing Stuff
			if(pause == false){
				sec++;
			} else{
				text("paused", G.WIDTH/2, 10);
			}

			break;


		// -PEEP2WALKOUT---------------------------------------
		case "peep2WalkOut":
			// text("peep2Walkout", G.WIDTH/2, 190);
			let j = 0;
			walkin++;
			peeps.forEach((p) => {
				if(j === 1) {
					p.pos.x += 0.5;
				}

				color(peepColors[j]);
				char("a", p.pos);

				if(j === 1 && p.pos.x > G.WIDTH + 6) {
					state = "peep1and3Dialogue";
					
				}
			j++;
			
			});

			break;
	
		// -PEEP1AND3DIALOGUE---------------------------------
		case "peep1and3Dialogue":
			// text("peep1and3Dialogue", G.WIDTH/2, 190);
			let k = 0;
			peeps.forEach((p) => {
				if(k !== 1) {
					color(peepColors[k]);
					char("a", p.pos);
				}
				k++;
			});

			color("black");
			// Timer - 60 ticks --> 1 second
			if(sec%60 == 0){
				time++;
			}
			// CHANGE BACK LATER
			if(sec == 180){ // If change is x (60 * 10 seconds) amount of seconds, then switch text
				count += 7;
				sec = 0;
			} else{ // Otherwise display the current text
				if(count < 8){
					if(count == 0){
						color("cyan");
					} else{
						color("green");
					}
					text(time.toString(), 4, 4);
					text(peep1and3[count], 12, G.WIDTH/3 + 5);
					text(peep1and3[count + 1], 12, G.WIDTH/3 + 13);
					text(peep1and3[count + 2], 12, G.WIDTH/3 + 21);
					text(peep1and3[count + 3], 12, G.WIDTH/3 + 29);
					text(peep1and3[count + 4], 12, G.WIDTH/3 + 37);
					text(peep1and3[count + 5], 12, G.WIDTH/3 + 45);
					text(peep1and3[count + 6], 12, G.WIDTH/3 + 53);
				} else {
					count = 0; // CHANGE LATER
					color("black");
					state = "peep2WalkIn";
				}
			}

			// Debugging Pausing
			if(input.isJustPressed){
				state = ending1;
			}

			// Pausing Stuff
			if(pause == false){
				sec++;
			} else{
				text("paused", G.WIDTH/2, 10);
			}
			break;
		
		// -PEEP2WALKIN----------------------------------------
		case "peep2WalkIn":
			// text("peep2WalkIn", G.WIDTH/2, 190);
			let l = 0;
			peeps.forEach((p) => {
				if(l === 1) {
					p.pos.x -= 0.5;
				}

				color(peepColors[l]);
				char("a", p.pos);

				if(l === 1 && p.pos.x == (G.WIDTH/2)) {
					state = "peep2and3Dialogue";
				}
				l++;
			});
			break;
		
		// -PEEP2AND3DIALOGUE---------------------------------
		case "peep2and3Dialogue":
			// text("peep2and3Dialogue", G.WIDTH/2, 190);
			let m = 0;
			peeps.forEach((p) => {
				color(peepColors[m]);
				char("a", p.pos);
				m++;
			});

			color("black");
			// Timer - 60 ticks --> 1 second
			if(sec%60 == 0){
				time++;
			}
			// CHANGE BACK LATER
			if(sec == 180){ // If change is x (60 * 10 seconds) amount of seconds, then switch text
				count += 7;
				sec = 0;
			} else{ // Otherwise display the current text
				console.log("count: " + count)
				if(count < 8){
					if(count == 0){
						color("blue");
					} else{
						color("cyan");
					}
					// text(time.toString(), 4, 4);
					text(peep2and3[count], 12, G.WIDTH/3 + 5);
					text(peep2and3[count + 1], 12, G.WIDTH/3 + 13);
					text(peep2and3[count + 2], 12, G.WIDTH/3 + 21);
					text(peep2and3[count + 3], 12, G.WIDTH/3 + 29);
					text(peep2and3[count + 4], 12, G.WIDTH/3 + 37);
					text(peep2and3[count + 5], 12, G.WIDTH/3 + 45);
					text(peep2and3[count + 6], 12, G.WIDTH/3 + 53);
				} else {
					count = 0; // CHANGE LATER
					color("black");
					state = "story2";
				}
			}

			// Debugging Pausing
			if(input.isJustPressed){
			}

			// Pausing Stuff
			if(pause == false){
				sec++;
			} else{
				text("paused", G.WIDTH/2, 10);
			}
			break;
		
		// -STORY2---------------------------------------------
		case "story2":
			let n = 0;
			// text("story2", G.WIDTH/2, 190);
			peeps.forEach((p) => {
				color(peepColors[n]);
				char("a", p.pos);
				n++;
			});	
			color("cyan");
			// Timer - 60 ticks --> 1 second
			if(sec%60 == 0){
				time++;
			}
			// CHANGE BACK LATER
			if(sec == 600){ // If change is x (60 * 10 seconds) amount of seconds, then switch text
				count += 7;
				sec = 0;
			} else{ // Otherwise display the current text
				if(count < 36){
					// text(time.toString(), 4, 4);
					text(story2[count], 12, G.WIDTH/3 + 5);
					text(story2[count + 1], 12, G.WIDTH/3 + 13);
					text(story2[count + 2], 12, G.WIDTH/3 + 21);
					text(story2[count + 3], 12, G.WIDTH/3 + 29);
					text(story2[count + 4], 12, G.WIDTH/3 + 37);
					text(story2[count + 5], 12, G.WIDTH/3 + 45);
					text(story2[count + 6], 12, G.WIDTH/3 + 53);
				} else {
					count = 0;
					color("black");
					state = "peep3Dialogue";
				}
			}

			// Debugging Pausing
			if(input.isJustPressed){
				state = ending1;
			}

			// Pausing Stuff
			if(pause == false){
				sec++;
			} else{
				text("paused", G.WIDTH/2, 10);
			}

			break;
		
		// -PEEP3DIALOGUE--------------------------------------
		case "peep3Dialogue":
			// text("peep3Dialogue", G.WIDTH/2, 190);
			let o = 0;
			peeps.forEach((p) => {
					color(peepColors[o]);
					char("a", p.pos);
				o++;
			});
			color("cyan");
			// Timer - 60 ticks --> 1 second
			if(sec%60 == 0){
				time++;
			}
			// CHANGE BACK LATER
			if(sec == 120){ // If change is x (60 * 10 seconds) amount of seconds, then switch text
				count += 7;
				sec = 0;
			} else{ // Otherwise display the current text
				if(count < 7){
					// text(time.toString(), 4, 4);
					text(peep3[count], 12, G.WIDTH/3 + 5);
					text(peep3[count + 1], 12, G.WIDTH/3 + 13);
					text(peep3[count + 2], 12, G.WIDTH/3 + 21);
					text(peep3[count + 3], 12, G.WIDTH/3 + 29);
					text(peep3[count + 4], 12, G.WIDTH/3 + 37);
					text(peep3[count + 5], 12, G.WIDTH/3 + 45);
					text(peep3[count + 6], 12, G.WIDTH/3 + 53);
				} else {
					count = 0; // CHANGE LATER
					color("black");
					state = "peep3WalkOut";
				}
			}

			// Debugging Pausing
			if(input.isJustPressed){
				state = ending1;
			}

			// Pausing Stuff
			if(pause == false){
				sec++;
			} else{
				text("paused", G.WIDTH/2, 10);
			}
			break;
		
		// -PEEP3WALKOUT---------------------------------------
		case "peep3WalkOut":
			// text("peep3Walkout", G.WIDTH/2, 190);
			let q = 0;
			peeps.forEach((p) => {
				if(q === 2) {
					p.pos.x += 0.5;
				}

				color(peepColors[q]);
				char("a", p.pos);

				if(q === 2 && p.pos.x > G.WIDTH + 6) {
					waitin++;
				}
				q++;
			});
			if(waitin == 600){
				state = "peep1and2Dialogue"
			}
			break;

		// -PEEP1AND2DIALOGUE---------------------------------
		case "peep1and2Dialogue":
			// text("peep1and2Dialogue", G.WIDTH/2, 190);
			let r = 0;
			peeps.forEach((p) => {
				if(r !== 2) {
					color(peepColors[r]);
					char("a", p.pos);
				}
				r++;
			});
			// Timer - 60 ticks --> 1 second
			if(sec%60 == 0){
				time++;
			}
			// CHANGE BACK LATER
			if(sec == 300){ // If change is x (60 * 10 seconds) amount of seconds, then switch text
				count += 7;
				sec = 0;
			} else{ // Otherwise display the current text
				if(count < 22){
					if(count == 0 || count == 14){
						color("blue");
					} else{
						color("green");
					}
					text(time.toString(), 4, 4);
					text(peep1and2[count], 12, G.WIDTH/3 + 5);
					text(peep1and2[count + 1], 12, G.WIDTH/3 + 13);
					text(peep1and2[count + 2], 12, G.WIDTH/3 + 21);
					text(peep1and2[count + 3], 12, G.WIDTH/3 + 29);
					text(peep1and2[count + 4], 12, G.WIDTH/3 + 37);
					text(peep1and2[count + 5], 12, G.WIDTH/3 + 45);
					text(peep1and2[count + 6], 12, G.WIDTH/3 + 53);
				} else {
					count = 0; // CHANGE LATER
					color("black");
					state = "story3";
				}
			}

			// Debugging Pausing
			if(input.isJustPressed){
				state = ending2;
			}

			// Pausing Stuff
			if(pause == false){
				sec++;
			} else{
				text("paused", G.WIDTH/2, 10);
			}
			break;

		// -STORY3---------------------------------------------
		case "story3":
			let s = 0;
			// text("story3", G.WIDTH/2, 190);
			peeps.forEach((p) => {
				color(peepColors[s]);
				char("a", p.pos);
				s++;
			});	
			color("green");
			// Timer - 60 ticks --> 1 second
			if(sec%60 == 0){
				time++;
			}
			// CHANGE BACK LATER
			if(sec == 600){ // If change is x (60 * 10 seconds) amount of seconds, then switch text
				count += 7;
				sec = 0;
			} else{ // Otherwise display the current text
				if(count < 43){
					// text(time.toString(), 4, 4);
					text(story3[count], 12, G.WIDTH/3 + 5);
					text(story3[count + 1], 12, G.WIDTH/3 + 13);
					text(story3[count + 2], 12, G.WIDTH/3 + 21);
					text(story3[count + 3], 12, G.WIDTH/3 + 29);
					text(story3[count + 4], 12, G.WIDTH/3 + 37);
					text(story3[count + 5], 12, G.WIDTH/3 + 45);
					text(story3[count + 6], 12, G.WIDTH/3 + 53);
				} else {
					color("black");
					state = "snuffCandle";
				}
			}

			// Debugging Pausing
			if(input.isJustPressed){
				state = ending2;
			}

			// Pausing Stuff
			if(pause == false){
				sec++;
			} else{
				text("paused", G.WIDTH/2, 10);
			}

			break;
		
		// -SNUFFCANDLE----------------------------------------
		case "snuffCandle":
			// text("SnuffCandle", G.WIDTH/2, 190);
			let t = 0;
			peeps.forEach((p) => {
				if(t !== 2) {
					color(peepColors[t]);
					char("a", p.pos);
				}
				t++;
			});
			// Timer - 60 ticks --> 1 second
			if(sec%60 == 0){
				time++;
			}
			if(sec == 180){ // If change is x (60 * 10 seconds) amount of seconds, then switch text
				count += 7;
				sec = 0;
			} else{ // Otherwise display the current text
				if(count < 22){
					// text(time.toString(), 4, 4);
					text(snuff[count], 12, G.WIDTH/3 + 5);
					text(snuff[count + 1], 12, G.WIDTH/3 + 13);
					text(snuff[count + 2], 12, G.WIDTH/3 + 21);
					text(snuff[count + 3], 12, G.WIDTH/3 + 29);
					text(snuff[count + 4], 12, G.WIDTH/3 + 37);
					text(snuff[count + 5], 12, G.WIDTH/3 + 45);
					text(snuff[count + 6], 12, G.WIDTH/3 + 53);
				} else {
					color("black");
					state = "peep1WalkOut";
				}
			}

			// Debugging Pausing
			if(input.isJustPressed){
				state = ending2;
			}

			// Pausing Stuff
			if(pause == false){
				sec++;
			} else{
				text("paused", G.WIDTH/2, 10);
			}
			break;
		
		// -PEEP1WALKOUT---------------------------------------	
		case "peep1WalkOut":
			// text("peep1Walkout", G.WIDTH/2, 190);
			let u = 0;
			peeps.forEach((p) => {
				if(u === 0) {
					p.pos.x += 0.5;
				}

				color(peepColors[u]);
				char("a", p.pos);

				if(u === 0 && p.pos.x > G.WIDTH + 6) {
					state = "ending3";
				}
				u++;
			});

			break;

		// ----------------------------------------------------	
		case "ending1":
			text("this is ending 1", G.WIDTH/2, 190);
			color("black");
			// Timer - 60 ticks --> 1 second
			if(sec%60 == 0){
				time++;
			}
			// CHANGE BACK LATER
			if(sec == 180){ // If change is x (60 * 10 seconds) amount of seconds, then switch text
				count += 7;
				sec = 0;
			} else{ // Otherwise display the current text
				if(count < 22){
					// text(time.toString(), 4, 4);
					text(ending1[count], 12, G.WIDTH/3 + 5);
					text(ending1[count + 1], 12, G.WIDTH/3 + 13);
					text(ending1[count + 2], 12, G.WIDTH/3 + 21);
					text(ending1[count + 3], 12, G.WIDTH/3 + 29);
					text(ending1[count + 4], 12, G.WIDTH/3 + 37);
					text(ending1[count + 5], 12, G.WIDTH/3 + 45);
					text(ending1[count + 6], 12, G.WIDTH/3 + 53);
				} else {
					color("black");
					end();
				}
			}

			// Debugging Pausing
			if(input.isJustPressed){
			}

			// Pausing Stuff
			if(pause == false){
				sec++;
			} else{
				text("paused", G.WIDTH/2, 10);
			}
			break;
		
		case "ending2":
			text("this is ending 2", G.WIDTH/2, 190);
			color("black");
			// Timer - 60 ticks --> 1 second
			if(sec%60 == 0){
				time++;
			}
			if(sec == 180){ // If change is x (60 * 10 seconds) amount of seconds, then switch text
				count += 7;
				sec = 0;
			} else{ // Otherwise display the current text
				if(count < 22){
					// text(time.toString(), 4, 4);
					text(ending1[count], 12, G.WIDTH/3 + 5);
					text(ending1[count + 1], 12, G.WIDTH/3 + 13);
					text(ending1[count + 2], 12, G.WIDTH/3 + 21);
					text(ending1[count + 3], 12, G.WIDTH/3 + 29);
					text(ending1[count + 4], 12, G.WIDTH/3 + 37);
					text(ending1[count + 5], 12, G.WIDTH/3 + 45);
					text(ending1[count + 6], 12, G.WIDTH/3 + 53);
				} else {
					color("black");
					end();
				}
			}

			// Pausing Stuff
			if(pause == false){
				sec++;
			} else{
				text("paused", G.WIDTH/2, 10);
			}
			break;

		case "ending3":
			text("this is ending 3", G.WIDTH/2, 190);
			break;
		
		default: 
		text("End of game states :)", 12, G.WIDTH/3 + 5);
	}
}
// -END-OF-UPDATE-------------------------------------

//http://localhost:4000/?SpriteAnimation