function Note(noteName)
{
	this.time = 0;
	var name = noteName;
	var nextNotes;
	this.canPlay = true;

	this.getName = function()
	{
		return name;
	}

	this.getNextNote = function()
	{
		return nextNotes[getRandomInt(0, 3)];
	}

	this.setNextNotes = function(argNextNotes)
	{
		nextNotes = argNextNotes;
	}

	this.printNote = function()
	{
		console.log(name);
	}

	this.play = function()
	{
		console.log(name)
		app.audioMgr.playSound(name);
	}
}