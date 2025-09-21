import { useState } from 'react'
import './App.css'

const padBank = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3'
  }
];  

function DrumMachine() {
  const [display, setDisplay] = useState(String.fromCharCode(160));

  const playSound = (keyTrigger, id) => {
    const audio = document.getElementById(keyTrigger);
    audio.currentTime = 0;
    audio.play();
    setDisplay(id);
  };

  const handleKeyPress = (event) => {
    const pad = padBank.find(p => p.keyCode === event.keyCode);
    if (pad) {
      playSound(pad.keyTrigger, pad.id);
    }
  };

  return (
    <div id="drum-machine" className="drum-machine" tabIndex="0" onKeyDown={handleKeyPress}>
      <div id="display" className="display">{display}</div>
      <div className="pad-bank">
        {padBank.map(pad => (
          <button 
            key={pad.id} 
            className="drum-pad" 
            id={pad.id} 
            onClick={() => playSound(pad.keyTrigger, pad.id)}
          >
            {pad.keyTrigger}
            <audio className="clip" id={pad.keyTrigger} src={pad.url}></audio>
          </button>
        ))}
      </div>
    </div>
  );
}

export default DrumMachine;
