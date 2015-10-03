window.onload = function () {
  var player;
  MIDI.loadPlugin({
    soundfontUrl: "./soundfont/",
    instrument: "acoustic_grand_piano",
    onprogress: function(state, progress) {
      console.log(state, progress);
    },
    onsuccess: function() {
      var delay = 0; // play one note every quarter second
      var velocity = 127; // how hard the note hits
      // play the note

      MIDI.setVolume(0, 127);
      // MIDI.noteOn(0, note, velocity, delay);
      // MIDI.noteOff(0, note, delay + 0.75);


      var fnPlayKeyboard = function(e) {
        var key = e.keyCode;
        var i = keysPressed.length;
        while(i--) {
          if(keysPressed[i]==key) {
            return false;
          }
        }
        console.log('keydown:' + key);


        keysPressed.push(key);
        var note = start + mapping.indexOf(key);

        MIDI.noteOn(0, keyCodeToMidi(key), velocity, 0);
      }

      var fnRemoveKeyBinding = function(e) {
        var key = e.keyCode;
        console.log('keyup:' + key);

        MIDI.noteOff(0, keyCodeToMidi(key), 0, 0);

        var i = keysPressed.length;
        while(i--) {
          if(keysPressed[i]==e.keyCode) {
            keysPressed.splice(i, 1);
          }
        }
      }

      window.addEventListener('keydown', fnPlayKeyboard);
      window.addEventListener('keyup', fnRemoveKeyBinding);
    }
  });
};

var keyCodeToMidi = function(keyCode) {
  var index = mapping.indexOf(keyCode);
  if(index < 0) {
    return 0;
  }
  return start + index;
};

var keysPressed = [];

var start = 36;

var mapping = [81, 50, 87, 51, 69, 82, 53, 84, 54, 90, 55, 85, 73, 57, 79, 48, 80, 219, 187];



