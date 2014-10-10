
var context = new AudioContext(),
    notes = {},
    keyCodes = { 65: 1, 87: 2, 83: 3, 69: 4, 68: 5, 70: 6, 84: 7, 71: 8, 89: 9, 72: 10, 85: 11, 74: 12 };

function getFrequency(note){
    console.log(note);
    note = parseInt(note, 10);

    // MAGIC!!! this formula get's the correct frequency based on the semitone number
    // If you don't get this, go learn  some music theory basics :)
    return Math.pow(2, (note) / 12) * 440;
}

function playNote(frequency){
    var oscillator = context.createOscillator();
    oscillator.connect(context.destination);
    oscillator.type = 1; // Square wave
    oscillator.frequency.value = frequency || 1400;
    oscillator.noteOn(0);
    return oscillator;
}
function stopNote(keyCode){
    notes[keyCode].noteOff(0);
    notes[keyCode] = null;
}

document.addEventListener('keydown', function(event){
    var key = event.keyCode;
    if (keyCodes[key]){

        // we've mapped that key, go play something!
        notes[keyCodes[key]] = notes[keyCodes[key]] || playNote(getFrequency(keyCodes[key]));
        document.querySelector('[data-note="'+keyCodes[key]+'"]').classList.add('pressed');

    }
});

document.addEventListener('keyup', function(event){
    var key = event.keyCode;
    if (keyCodes[key]){
        stopNote(keyCodes[key]);
        document.querySelector('[data-note="'+keyCodes[key]+'"]').classList.remove('pressed');

    }
});


document.querySelector('[data-instrument="piano"]').addEventListener('mousedown', function(event){
    var note = event.target.dataset.note;
    notes[note] = notes[note] || playNote(getFrequency(note));
});

document.querySelector('[data-instrument="piano"]').addEventListener('mouseup', function(event){
    stopNote(event.target.dataset.note);
});