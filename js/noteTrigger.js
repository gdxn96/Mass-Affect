function NoteTrigger(type, note)
{
	this.type = type;
	this.column;
	this.note = note;
	this.marked = false;
	this.image;

	this.w = canvas.width / 6 * 0.857;	
	this.h = canvas.width / 6 * 0.857;
	this.radius = canvas.width / 12;	

	this.pos;
	this.velocity;

	this.time = 0;
	this.timeToStart;

	this.distance = canvas.height * 0.71125;

	this.targetY = 400;	//hard coded for testing
}


NoteTrigger.prototype.init = function(time, velocity)
{
	if (this.type == "bible")
		this.column = 0;
	else if (this.type == "cross")
		this.column = 1;
	else if (this.type == "dove")
		this.column = 2;

	this.pos = new Vector(canvas.width * 0.095 + (this.column * canvas.width * 0.334), -this.radius);
	// this.velocity = velocity;
	this.velocity = this.distance / barTime / 4;

	this.image = app.assetMgr.getAsset("trigger_" + this.type);

	this.timeToStart = time;
}


NoteTrigger.prototype.update = function(dt)
{
	this.pos.y += (this.velocity * dt);

	if (this.pos.y >= window.innerHeight)
		return true;
	else
		return false;
}


NoteTrigger.prototype.draw = function()
{
	ctx.drawImage(this.image, this.pos.x, this.pos.y, this.w, this.h);
}