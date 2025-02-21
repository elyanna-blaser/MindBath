//import p5 from 'p5';
//import 'p5/lib/addons/p5.sound.js';

export default function sketch(p5) {
  let mySound;

  p5.preload = function() {
    soundFormats('mp3', 'ogg');
    mySound = loadSound('../assets/doorbell-1.mp3');
  }
  
  p5.setup = function () {
    let cnv = p5.createCanvas(100, 100);
    p5.mousePressed(canvasPressed);
    p5.background(220);
    p5.text('tap here to play', 10, 20);
  }
  
  function canvasPressed() {
    // playing a sound file on a user gesture
    // is equivalent to `userStartAudio()`
    mySound.play();
  }
}