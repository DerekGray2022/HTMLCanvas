const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const particlesArray = [];
let hue = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//      Mouse Manipulation
const mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('click', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;

    for (let n = 0; n < 50; n++) {
        particlesArray.push(new Particle());
    };
    // drawCircle();
});

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;

    for (let n = 0; n < 5; n++) {
        particlesArray.push(new Particle());
    };
    // drawCircle();
});



//      Particle Class
class Particle {
    constructor() {
        //      Position
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;

        //      Array of colors
        // const colors = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'];
        // const colorPickNum = Math.floor(Math.random() * 6);
        // this.color = colors[colorPickNum];

        //      Randomly Picked colors
        // const red = Math.floor(Math.random() * 255);
        // const green = Math.floor(Math.random() * 255);
        // const blue = Math.floor(Math.random() * 255);
        // const alpha = Math.random().toFixed(1);
        // const rgba = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        // this.color = rgba;

        //      Scroll Through Spectrum HSL
        this.color = `hsl(${hue}, 100%, 50%)`;

        //  Monochrome
        // this.color = 'white';

        this.size = Math.floor(Math.random() * 10 + 1);
        this.speedX = (Math.random() * 3 - 1);
        this.speedY = (Math.random() * 3 - 1);
        while (this.speedX === 0 && this.speedY === 0) {
            this.speedX = (Math.random() * 3 - 1);
            this.speedY = (Math.random() * 3 - 1);
        };
    };

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.05;
    };
    draw() {
        // ctx.fillStyle = hslcolor;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
};

//      Initialise
// const init = () => {
//     for (let n = 0; n < 100; n++) {
//         particlesArray.push(new Particle());
//     };
// };
// init();

//      Handle Particles
const handleParticles = () => {
  for (let n = 0; n < particlesArray.length; n++) {
      particlesArray[n].update();
      particlesArray[n].draw();

      for (let x = n; x < particlesArray.length; x++) {
          const dx = particlesArray[n].x - particlesArray[x].x;
          const dy = particlesArray[n].y - particlesArray[x].y;

          const distance = Math.sqrt(dx ** 2 + dy ** 2);

          if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = particlesArray[n].color;
              ctx.lineWidth = particlesArray[n].size / 10;
              ctx.moveTo(particlesArray[n].x, particlesArray[n].y);
              ctx.lineTo(particlesArray[x].x, particlesArray[x].y);
              ctx.stroke();
          };
      };

      if (particlesArray[n].size < 0.3) {
          particlesArray.splice(n, 1);
          n--;
      };
    };
};

//  Animation Loop
const animate = (e) =>  {
    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    // ctx.fillRect(
    //     0,
    //     0,
    //     window.innerWidth,
    //     window.innerHeight
    // );
    handleParticles();
    hue+= 5;
    requestAnimationFrame(animate);
};
animate();

//      RESIZE
window.addEventListener('resize', () => {
    //      Resize Canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //      Redraw Circle
ctx.fillStyle = 'blue';
ctx.beginPath();
    ctx.arc(
        130,
        100,
        50,
        0,
        Math.PI * 2
    );
ctx.fill();
});


