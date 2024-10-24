export default function sketch(p5) {
  let amplitude1;
  let amplitude2;
  let circles = []; // Array to store the circles
  let squares = []; // Array to store the squares

  // Circle class to handle individual circles
  class Circle {
    constructor(x, y, targetRadius, lifespan, amplitude) {
      this.x = x;
      this.y = y;
      this.initialRadius = 0; // Start radius at 0
      this.targetRadius = targetRadius; // Final radius based on amplitude
      this.radius = 0; // Start radius
      this.lifespan = lifespan; // Lifespan of the circle
      this.growTime = 30; // Number of frames to grow to the full radius (0.5 seconds at 60 fps)
      this.fadeTime = 100; // Frames for fading out and expanding after reaching full radius
      this.age = 0; // Track the circle's age

      // Color mapped to amplitude (violet for 0, red for 400)
      this.strokeColor = this.mapAmplitudeToColor(amplitude);
    }

    // Map amplitude to color (violet to red)
    mapAmplitudeToColor(amplitude) {
      let r = p5.map(amplitude, 0, 400, 255, 138); // Red component from violet to red
      let g = p5.map(amplitude, 0, 400, 255, 43);    // Green component from violet to red
      let b = p5.map(amplitude, 0, 400, 0, 226);   // Blue component from violet to red
      return p5.color(r, g, b); // Return the mapped color
    }

    // Update circle properties (expand radius and decrease lifespan)
    update() {
      this.age++; // Increment age

      // Expand the radius over the first 30 frames to the target radius
      if (this.age <= this.growTime) {
        this.radius = p5.map(this.age, 0, this.growTime, 0, this.targetRadius);
      } 
      // After reaching full radius, keep expanding and start fading
      else {
        this.radius += 1; // Keep expanding slowly after reaching full radius
        this.lifespan -= 1; // Decrease lifespan as it fades out
      }
    }

    // Display the circle with transparency based on lifespan
    display() {
      let alpha = p5.map(this.lifespan, 0, this.fadeTime, 0, 255); // Fade out over 100 frames
      let fadedStrokeColor = p5.color(
        p5.red(this.strokeColor),
        p5.green(this.strokeColor),
        p5.blue(this.strokeColor),
        alpha // Set the alpha for fading effect
      );

      p5.stroke(fadedStrokeColor); // Stroke with mapped color and fading alpha
      p5.noFill();
      p5.ellipse(this.x, this.y, this.radius * 2, this.radius * 2); // Draw expanding ellipse
    }

    // Check if the circle has faded out
    isDead() {
      return this.lifespan <= 0;
    }
  }

  // Square class to handle individual squares
  class Square {
    constructor(x, y, targetSize, lifespan, amplitude) {
      this.x = x;
      this.y = y;
      this.targetSize = targetSize; // Final size based on amplitude
      this.size = 0; // Start size
      this.lifespan = lifespan; // Lifespan of the square
      this.growTime = 30; // Number of frames to grow to the full size (0.5 seconds at 60 fps)
      this.fadeTime = 100; // Frames for fading out and expanding after reaching full size
      this.age = 0; // Track the square's age

      // Color mapped to amplitude (violet for 0, red for 400)
      this.strokeColor = this.mapAmplitudeToColor(amplitude);
    }

    // Map amplitude to color (violet to red)
    mapAmplitudeToColor(amplitude) {
      let r = p5.map(amplitude, 0, 400, 11, 252); // Red component from violet to red
      let g = p5.map(amplitude, 0, 400, 252, 3);    // Green component from violet to red
      let b = p5.map(amplitude, 0, 400, 3, 210);   // Blue component from violet to red
      return p5.color(r, g, b); // Return the mapped color
    }

    // Update square properties (expand size and decrease lifespan)
    update() {
      this.age++; // Increment age

      // Expand the size over the first 30 frames to the target size
      if (this.age <= this.growTime) {
        this.size = p5.map(this.age, 0, this.growTime, 0, this.targetSize);
      } 
      // After reaching full size, keep expanding and start fading
      else {
        this.size += 1; // Keep expanding slowly after reaching full size
        this.lifespan -= 1; // Decrease lifespan as it fades out
      }
    }

    // Display the square with transparency based on lifespan
    display() {
      let alpha = p5.map(this.lifespan, 0, this.fadeTime, 0, 255); // Fade out over 100 frames
      let fadedStrokeColor = p5.color(
        p5.red(this.strokeColor),
        p5.green(this.strokeColor),
        p5.blue(this.strokeColor),
        alpha // Set the alpha for fading effect
      );

      p5.stroke(fadedStrokeColor); // Stroke with mapped color and fading alpha
      p5.noFill();
      p5.rectMode(p5.CENTER);
      p5.rect(this.x, this.y, this.size, this.size); // Draw expanding square
    }

    // Check if the square has faded out
    isDead() {
      return this.lifespan <= 0;
    }
  }

  p5.setup = function() {
    p5.createCanvas(600, 600);
  }

  p5.draw = function() {
    p5.background(255);

    // Create a new circle based on amplitude1 reading
    if (amplitude1 !== undefined) {
      let targetRadius = p5.map(amplitude1, 0, 400, 0, 600); // Map amplitude1 to target radius
      circles.push(new Circle(300, 300, targetRadius, 100, amplitude1)); // Lifespan of 100 frames
    }

    // Create a new square based on amplitude2 reading
    if (amplitude2 > 70) {
      let targetSize = p5.map(amplitude2, 0, 400, 0, 600); // Map amplitude2 to target size
      squares.push(new Square(300, 300, targetSize, 100, amplitude2)); // Lifespan of 100 frames
    }

    // Update and display all circles
    for (let i = circles.length - 1; i >= 0; i--) {
      circles[i].update();
      circles[i].display();

      // Remove the circle if its lifespan is over
      if (circles[i].isDead()) {
        circles.splice(i, 1); // Remove dead circle from array
      }
    }

    // Update and display all squares
    for (let i = squares.length - 1; i >= 0; i--) {
      squares[i].update();
      squares[i].display();

      // Remove the square if its lifespan is over
      if (squares[i].isDead()) {
        squares.splice(i, 1); // Remove dead square from array
      }
    }

    // This special function receives data from App.jsx withTracker
    p5.updateWithProps = (props) => {
      if (props.amplitude1 !== undefined) {
        console.log("p5 received new amplitude1:", props.amplitude1);
        amplitude1 = props.amplitude1;
      }
      if (props.amplitude2 !== undefined) {
        console.log("p5 received new amplitude2:", props.amplitude2);
        amplitude2 = props.amplitude2;
      }
    };
  }
}