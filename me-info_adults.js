//ME-INFO
//Replication of Ramscar, Dye, & Klein (2013)

// --------------- HELPER FUNCTIONS ----------------
// show slide function
function showSlide(id) {
	$(".slide").hide(); //jquery - all elements with class of slide - hide
	$("#" + id).show(); //jquery - element with given id - show
}

//Handles audio; indexes into the sprite to play the prompt associated with a critical word
playPrompt = function(word) {
	audioSprite.removeEventListener('timeupdate', handler);
	audioSprite.currentTime = spriteData[word].start;
	audioSprite.play();

	handler = function() {
		if (this.currentTime >= spriteData[word].start + spriteData[word].length) {
			this.pause();
		}
	};
	audioSprite.addEventListener('timeupdate', handler, false);
}

//PRELOAD ALL IMAGES
var allimages = ["bread", "chair", "cup", "flower", "lion",
	"Novel1", "Novel2", "Novel3", "Novel4", "Novel5", "Novel6",
	"Novel7", "Novel8", "Novel9", "shoe", "sweater", "tomato", "truck"
];
//for critical trials and fillers
var images = new Array();
for (i = 0; i < allimages.length; i++) {
	images[i] = new Image();
	images[i].src = "imgs/" + allimages[i] + ".jpg";
};
// //for dot game
// //not needed for adults
// var dots = ["dot_1", "dot_2", "dot_3", "dot_4", "dot_5", "x", "dot_smiley"];
// for (i = 0; i < dots.length; i++) {
// 	images[i] = new Image();
// 	images[i].src = "dots/" + dots[i] + ".jpg";
// }

// --------------- PARAMETERS ----------------

//counter keeps track of the trial you are on
var counter = 0;

//total number of trials
var numTrials = 3;

//number of images & words
var numImgs = 9;
var numWords = 7;

//an array of all the novel words used in the study; used for look-up purposes in pic1type, pic2type, and trialtype
var novelWords = ["modi", "dax", "pifo", "dofa", "toma", "fep", "wug", "kreeb"];

//******for handling sound; see helper function playPrompt(word)
var audioSprite = $("#sound_player")[0];
var handler;

allImgs = range(1, numImgs);
allImgs = shuffle(allImgs);

allWords = range(1, numWords);
allWords = shuffle(allWords);

allImgs = allImgs.map(function(elem) {
	return 'Novel' + elem;
});
//$(allImgs.map(function(elem){return 'stimuli/images/'+elem+'.jpg';})).preload();


//List of images to use
var trialImgs = [
	allImgs.slice(0, 3),
	allImgs.slice(3, 6),
	allImgs.slice(6, 9)
]; // 3 Images for each trial
trialOrder = shuffle([1, 2, 3]);

//List of words to use
var trialWords = [
	allWords.slice(0, 2),
	allWords.slice(2, 4),
	allWords.slice(4, 7)
]; // The trial with three words is the "ME" trial
trialWords = trialOrder.map(function(elem) {
	return trialWords.slice(elem - 1, elem);
});

// --------------- EXPERIMENT ----------------------------------------
showSlide("instructions");

//Disable start button in turk until HIT is accepted
if (turk.previewMode == true) {
	$("#startButton").attr("disabled", "disabled");
}

//Start button is disabled until all images are preloaded.  
$("#pleaseWait").html("Please wait while the experiment loads...");
$(window).load(function() {
	document.getElementById("startButton").disabled = false;
	$("#pleaseWait").html("");
})

var experiment = {
	//practiceTrials: practiceTrial_order,
	//trials: trial_order,
	completed: [],
	data: [],
	//gender: [],
	//age: "",
	//nativeLanguage: "",
	//comments: "",

	//TRAINING GOES HERE FOR IPAD VERSION

	//TODO: Practice trials.  Do we want/need these for adults?

	train: function() {
		$("#instructions").hide();
		document.body.style.background = "black";

		//returns the list of words to use in this trial
		var wordList = trialWords;


		//returns the list of images to use in this trial
		var imageArray = trialImgs[counter];

		//src for each object
		var objectA = "imgs/" + imageArray[0] + ".jpg";
		var objectB = "imgs/" + imageArray[1] + ".jpg";
		var objectC = "imgs/" + imageArray[2] + ".jpg";

		//build table in html.  
		var objects_html = "";
		objects_html += '<table align = "center" cellpadding="30"><tr></tr><tr>';
		objects_html += '<td align="center"><img class="pic" id= "leftPic"/></td>';
		objects_html += '<td align="center"><img class="pic" id= "rightPic"/></td>';
		objects_html += '</tr></table>';
		$("#objects").html(objects_html);

		//show objects A & B and play word 1
		//TODO: FIgure out counterbalancing?  Right now everything is randomized
		//order that pictures will be presented in
		var picOrderAB = shuffle(["objectA", "objectB"]);

		//set names based on object that will be shown
		$("#leftPic").attr("name", picOrderAB[0]);
		$("#rightPic").attr("name", picOrderAB[1]);

		//show images
		$("[name='objectA']").attr("src", objectA);
		$("[name='objectB']").attr("src", objectB);


		$("#stage").fadeIn();

		//TODO: add sound.  Play word 1.  label twice per pair
		//playPrompt(wordList[0]);

		//fade out
		setTimeout(function() {
			$("#stage").fadeOut();


			setTimeout(function() {
				//show objects B & C and play word 2
				//order that pictures will be presented in
				var picOrderBC = shuffle(["objectB", "objectC"]);

				//set names based on object that will be shown
				$("#leftPic").attr("name", picOrderBC[0]);
				$("#rightPic").attr("name", picOrderBC[1]);

				//show images
				$("[name='objectB']").attr("src", objectB);
				$("[name='objectC']").attr("src", objectC);


				$("#stage").fadeIn();

				//TODO: add sound.  Play word 2.  label twice per pair
				//playPrompt(wordList[1]);

				//fade out and go to test
				setTimeout(function() {
					$("#stage").fadeOut();
					experiment.test();

				}, 3000); //do we want this to last for a fixed amount of time, or have it end after the sound files are finished?
			}, 1000);
		}, 3000); //do we want this to last for a fixed amount of time, or have it end after the sound files are finished?
	},

	test: function() {
		$("#stage").hide();
		document.body.style.background = "black";

		//returns the list of words to use in this trial
		var wordList = trialWords;

		//returns the list of images to use in this trial
		var imageArray = trialImgs[counter];

		//src for each object
		var objectA = "imgs/" + imageArray[0] + ".jpg";
		var objectB = "imgs/" + imageArray[1] + ".jpg";
		var objectC = "imgs/" + imageArray[2] + ".jpg";

		//build table in html.  
		var objects_html = "";
		objects_html += '<table align = "center" cellpadding="30"><tr></tr><tr>';
		objects_html += '<td align="center"><img class="pic" id= "leftPic"/></td>';
		objects_html += '<td align="center"><img class="pic" id= "centerPic"/></td>';
		objects_html += '<td align="center"><img class="pic" id= "rightPic"/></td>';
		objects_html += '</tr></table>';
		$("#objects").html(objects_html);


		//order that pictures will be presented in
		var picOrderABC = shuffle(["objectA", "objectB", "objectC"]);

		//set names based on object that will be shown
		$("#leftPic").attr("name", picOrderABC[0]);
		$("#centerPic").attr("name", picOrderABC[1]);
		$("#rightPic").attr("name", picOrderABC[2]);

		//show all three images
		$("[name='objectA']").attr("src", objectA);
		$("[name='objectB']").attr("src", objectB);
		$("[name='objectC']").attr("src", objectC);

		$("#stage").fadeIn();

		//TODO: Do we want reaction time?
		//var startTime = (new Date()).getTime();

		//TODO: Add sound
		//Either label 1, label 2, or label 3, depending on the trial.
		//If they hear label 1, we expect adults to select object A
		//If they hear label 2, we expect adults to select object C
		//If they hear a novel label (label 3), we expect adults to select object B

		//playPrompt(wordList[0]);

		$(".pic").on("click", function() {

			var selectedPic = this.name
			alert(selectedPic)

			//TODO: Do we want reaction time?
			// endTime = (new Date()).getTime()

			//data collection
			var data = {
				//TODO: get info about trial type/what label they heard
				objectA: imageArray[0],
				objectB: imageArray[1],
				objectC: imageArray[2],
				response: selectedPic,
				order: counter
				//rt: endTime - startTime
			}

			experiment.data.push(data)

			counter++

			setTimeout(function() {
				if (counter == numTrials) {
					experiment.end();
				} else {
					experiment.train();
				}
			}, 1000);

		});

	},

	//TODO: Do we want to collect demographic info?

	end: function() {

		showSlide("finished");

		setTimeout(function() {
			turk.submit(experiment);
		}, 1000);
	}
}