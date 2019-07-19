function Button(type)
{
	this.type = type;
	this.image = document.getElementById(type);
	this.column;
	this.radius = canvas.width / 12;
	this.pos;
		
	if (type == "button_bible")
	{
		this.column = 0;
		this.pos = new Vector(canvas.width * 0.082, canvas.height * 0.7);
	}	
	else if (type == "button_cross")
	{
		this.column = 1;
		this.pos = new Vector(canvas.width * 0.41667, canvas.height * 0.7);
	}
		
	else if (type == "button_dove")
	{
		this.column = 2;
		this.pos = new Vector(canvas.width * 0.75, canvas.height * 0.7);
	}
}


Button.prototype.changeImage = function(val)
{
	if (val)
	{
		document.getElementById(this.type).style.zIndex = -2;

		if (this.type == "button_bible")
			document.getElementById("hit_bible").style.zIndex = 2;
		else if (this.type == "button_cross")
			document.getElementById("hit_cross").style.zIndex = 2;
		else
			document.getElementById("hit_dove").style.zIndex = 2;
	}
	else
	{
		document.getElementById(this.type).style.zIndex = 2;

		if (this.type == "button_bible")
			document.getElementById("hit_bible").style.zIndex = -2;
		else if (this.type == "button_cross")
			document.getElementById("hit_cross").style.zIndex = -2;
		else
			document.getElementById("hit_dove").style.zIndex = -2;
	}
}