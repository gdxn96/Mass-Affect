function AudioGenerator()
{
	var lastNote;

	var a, b, c, d, e, f, g;

	a = new Note("a");
	b = new Note("b");
	c = new Note("c");
	d = new Note("d");
	e = new Note("e");
	f = new Note("f");
	g = new Note("g");

	a.setNextNotes([ b, c, e, a]);
	b.setNextNotes([ c, d, f, b]);
	c.setNextNotes([ d, e, g, c]);
	d.setNextNotes([ e, f, a, d]);
	e.setNextNotes([ f, g, b, e]);
	f.setNextNotes([ g, a, c, f]);
	g.setNextNotes([ a, b, d, g]);

	this.cA = new Chord("A", [a, c, e]);
	this.cC = new Chord("C", [c,e,g]);
	this.cE = new Chord("E", [e, g, b]);

	var chords = [this.cA, this.cC, this.cE];


	this.getNewNote = function()
	{
		if (!lastNote)
		{
			lastNote = a.getNextNote();
		}
		else
		{
			lastNote = lastNote.getNextNote();
		}
		//lastNote.printNote();
		return lastNote;
	}

	this.getNewArpeggio = function(numBars, numNotes)
	{
		return chords[getRandomInt(0, 2)].getArpeggio(numBars, numNotes);
	}
}




