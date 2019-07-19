function Chord(chordName, chordNotes)
{
	var name = chordName;
	var notes = chordNotes;

	this.printChord = function()
	{
		console.log("Chord Name : " + name);
		for (var i = 0; i < notes.length; i++)
		{
			var note = notes[i];
			note.printNote();
			console.log(", ");
		}
		
	}

	this.getArpeggio = function(barAmount, numNotes)
	{
		var steps = barAmount * 2 - 1;
		var barNotes = [];
		var numberNotes = numNotes;

		var times = getTimes(numberNotes, steps);
		console.log(times);
		

		for (var i = 0; i < numberNotes; i++)
		{
			var note = new Note(notes[getRandomInt(0,2)].getName());
			note.time = times[i];
			barNotes.push(note);
		}

		return barNotes;


	}

	function getTimes(numNotes, steps)
	{
		var times = [];

		for (var i = 0; i < numNotes; i++)
		{
			var search = getRandomInt(0, numNotes);
			var occurrences = times.filter(function(val){ return val == search});

			if (occurrences < 1)
			{
				times.push(getRandomInt(0, steps));
			}
			else
			{
				i--;
				continue;
			}
		}

		return times;
	}

	this.play = function()
	{
		for (var i = 0; i < notes.length; i++)
		{
			var note = notes[i];
			note.play();
		}
		
	}
}