

function App()
{	
	//callback function passed in as param is what gets called after the user 
	// touches the screen and unlocks the audio for ios
	this.audioMgr = new AudioManager(this.loadAudio);
	this.audioMgr.init();
	this.audioGtr = new AudioGenerator();
	this.assetMgr = new AssetManager();
	this.triggers = new TriggerManager();

	this.buttons = [];
	
	barTime = 1;	

	this.barTimeTemp = barTime;

	this.eventType = "";
	this.eventType2 = "mouseup";
	("ontouchstart" in window) ? this.eventType = "touchstart" : this.eventType = "click";
	("ontouchstart" in window) ? this.eventType2 = "touchend" : this.eventType = "mouseup";

	console.log(this.eventType2)



	//EVENT LISTENERS (HTML IMAGES)
	this.button1 = document.getElementById("button_bible");
	this.button2 = document.getElementById("button_cross");
	this.button3 = document.getElementById("button_dove");

	
	
}

App.prototype.loadAudio = function()
{
	// adds a sound to a list of sounds to be downloaded
	// app.audioMgr.addSoundToQueue("back", "audio/background.mp3");

	// first param is key to identify a sound, second is URI
	app.audioMgr.addSoundToQueue("a", "audio/A.wav");
	app.audioMgr.addSoundToQueue("b", "audio/B.wav");
	app.audioMgr.addSoundToQueue("c", "audio/C.wav");
	app.audioMgr.addSoundToQueue("d", "audio/D.wav");
	app.audioMgr.addSoundToQueue("e", "audio/E.wav");
	app.audioMgr.addSoundToQueue("f", "audio/F.wav");
	app.audioMgr.addSoundToQueue("g", "audio/G.wav");
	app.audioMgr.addSoundToQueue("clap", "audio/clap.wav");
	
	// downlaods the list of sounds to be downloaded
	// when finished downloading, call the function as param to begin the game
	// from that point on, sounds can be played on ios
	app.audioMgr.downloadQueue(app.loadAssets);
}

App.prototype.loadAssets = function()
{
	// adds an asset to a list of assets to be downloaded

	// first param is key to identify an asset, second is URI
	app.assetMgr.queueDownload("bgr", "images/church.png");
	app.assetMgr.queueDownload("trigger_dove", "images/trigger_dove.png");
	app.assetMgr.queueDownload("trigger_cross", "images/trigger_cross.png");
	app.assetMgr.queueDownload("trigger_bible", "images/trigger_bible.png");
	// app.assetMgr.queueDownload("red", "images/circle_big_red.png");
	// app.assetMgr.queueDownload("trigger", "images/trigger.png");

	app.assetMgr.downloadAll(app.init);
}


App.prototype.init = function() 
{
	if (this != app)
	{
		app.init();
		return 0;
	}
	// regular initialization logic


	this.createCanvas();

	this.triggerY = -20;
	this.buttonY = window.innerHeight * 0.8;

	
	this.triggers.init(this.buttonY - this.triggerY);
	this.triggers.setVelocity(barTime);
	this.triggers.addNotesToQueue(2);

	this.buttons.push(new Button("button_bible"));
	this.buttons.push(new Button("button_cross"));
	this.buttons.push(new Button("button_dove"));

	this.button1.addEventListener(this.eventType, function() { app.checkCollisions(app.buttons[0]) });
	this.button2.addEventListener(this.eventType, function() { app.checkCollisions(app.buttons[1]) });
	this.button3.addEventListener(this.eventType, function() { app.checkCollisions(app.buttons[2]) });
	this.button1.addEventListener(this.eventType2, function() { app.buttons[0].changeImage(false) });
	this.button2.addEventListener(this.eventType2, function() { app.buttons[1].changeImage(false) });
	this.button3.addEventListener(this.eventType2, function() { app.buttons[2].changeImage(false) });


	app.update(Date.now());
};


App.prototype.update = function(prevTime)
{
	var dt = (Date.now() - prevTime) / 1000;

	/////////////////////////////////////////////////////////////////////
	//update stuff here
	this.triggers.setVelocity(barTime);
	this.triggers.update(dt);
	//this.checkCollisions();
	this.draw();
	app.barTimeTemp -= dt;

	if (app.barTimeTemp < 0)
	{
		app.audioMgr.playSound("clap");

		barTime -= dt / 10000;
		app.barTimeTemp = barTime;
	}


	////////////////////////////////////////////////////////////////////


	var prevTime = Date.now();
	window.requestAnimationFrame(function() { app.update(prevTime) });
}

App.prototype.draw = function()
{
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
	this.triggers.draw();
}

App.prototype.createCanvas = function()
{
	canvas = document.createElement("canvas");
	ctx = canvas.getContext("2d");

	document.getElementById("game").appendChild(canvas);
	canvas.style.position = "absolute";
	canvas.style.width = "100%";
	canvas.style.height = "100%";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

App.prototype.checkCollisions = function(button)
{
	console.log("checkCollisions")
	var nearestTrigger = this.findNearestTrigger(button);
	button.changeImage(true);

	if (nearestTrigger != undefined)
	{
		if (this.checkCollision(button, nearestTrigger))
			return;
	}
}

App.prototype.findNearestTrigger = function(button)
{
	var nearest;
	var distance = Number.MAX_VALUE;

	for (var i = 0; i < this.triggers.playing.length; i++)
	{
		var trigger = this.triggers.playing[i];

		console.log(trigger.marked)

		if (trigger.column == button.column && trigger.marked == false)
		{
			console.log("button")
			console.log(button)
			console.log("trigger")
			console.log(trigger)

			var distanceBetween = button.pos.y - trigger.pos.y;

			if (distanceBetween < distance)
			{
				nearest = trigger;
				distance = distanceBetween;
			}
		}
	}


	return nearest;
}

App.prototype.checkCollision = function(button, trigger)
{
	var sumOfRadii = button.radius + trigger.radius;

	var diff = new Vector(button.pos.x - trigger.pos.x,
						  button.pos.y - trigger.pos.y);

	var distance = Math.sqrt(diff.x * diff.x + diff.y * diff.y);

	if (distance < sumOfRadii / 4)
	{
		console.log("green");
		if (trigger.note.canPlay)
		{
			trigger.marked = true;
			trigger.note.play();
			trigger.note.canPlay = false;
		}
		return true;
	}
	else if (distance < sumOfRadii / 3 * 2)
	{
		console.log("yellow");
		if (trigger.note.canPlay)
		{
			trigger.marked = true;
			trigger.note.play();
			trigger.note.canPlay = false;
		}
		return true;
	}
	else if (distance < sumOfRadii)
	{
		console.log("red");
		if (trigger.note.canPlay)
		{
			trigger.marked = true;
			trigger.note.play();
			trigger.note.canPlay = false;
		}
		return true;
	}
	else
	{
		// trigger.marked = true;
		console.log("black");
		trigger.note.canPlay = true;
		return false;
	}
}

randomInt = getRandomInt;
function getRandomInt(min, max) 
{//inclusive min and max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}