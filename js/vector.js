function Vector(x, y)
{
	this.x = x;
	this.y = y;
	this.len;

	this.updateLength();
}



// Mathematical Operations
Vector.prototype.add = function(v)
{
	return new Vector(this.x + v.x, this.y + v.y);
}

Vector.prototype.subtract = function(v)
{
	return new Vector(this.x - v.x, this.y - v.y);
}

Vector.prototype.multiply = function(v)
{
	return new Vector(this.x * v.x, this.y * v.y);
}

Vector.prototype.divide = function(v)
{
	return new Vector(this.x / v.x, this.y / v.y);
}



// Transformation Operations
Vector.prototype.updateLength = function()
{
	this.len = Math.sqrt((this.x * this.x) + (this.y * this.y));
}



// Vector Operations
Vector.prototype.distance = function(v)
{
	var diff = new Vector(v.x - this.x, v.y - this.y);

	return Math.sqrt((diff.x * diff.x) + (diff.y * diff.y));
}

Vector.prototype.dotProduct = function(v)
{
	return (this.x * v.x) + (this.y * v.y);
}

Vector.prototype.normalize = function()
{
	return new Vector(this.x / this.len, this.y / this.len);
}

Vector.prototype.perpendicular = function()
{
	return new Vector(-this.y, this.x);
}