function TriggerManager()
{
	this.queue = [];
	this.playing = [];
	this.notes = [];

	this.velocity;
	this.targetY = 400;
	this.distance;

	this.delay = this.targetY / this.velocity;
}

TriggerManager.prototype.init = function(distance)
{
	this.distance = distance;
}


TriggerManager.prototype.addNotesToQueue = function(bars)
{
	var newNotes = app.audioGtr.getNewArpeggio(10, 5);

	for (var i = 0; i < newNotes.length; i++)
	{
		newNotes[i].time += 5;
		this.notes.push(newNotes[i]);
	}

	this.notes = newNotes;

	console.log(this.notes)

	for (var i = 0; i < this.notes.length; i++)
	{
		var column = getRandomInt(1, 3);

		if (column === 1)
		{
			type = "bible";
		}
		else if (column === 2)
		{
			type = "cross";
		}
		else 
		{
			type = "dove";
		}

		var time = this.notes[i].time / 4 * barTime;

		var trigger = new NoteTrigger(type, this.notes[i]);
		trigger.init(time, this.velocity);

		this.queue.push(trigger);
	}
}

TriggerManager.prototype.update = function(dt)
{
	if (this.queue.length == 0)
	{
		this.addNotesToQueue(2);
		
	}
	for (var i = this.queue.length - 1; i >= 0; i--)
	{
		var trigger = this.queue[i];
		trigger.time += dt;

		//If trigger is ready to move...
		if (trigger.time >= trigger.timeToStart)
		{
			this.playing.push(trigger);		//Move
			this.queue.splice(i, 1);		//Remove from queue
			console.log("move to playing")
		}
	}

	//Update moving triggers
	for (var i = this.playing.length - 1; i >= 0; i--)
	{
		if (this.playing[i].update(dt) == true)		//True when movement finished
		{
			this.playing.splice(i, 1);
		}
	}
}

TriggerManager.prototype.draw = function()
{
	for (var i = 0; i < this.playing.length; i++)
	{
		this.playing[i].draw();
	}
}

TriggerManager.prototype.setVelocity = function(barTime)
{
	this.velocity = this.distance / barTime / 4;	//4 bars
}