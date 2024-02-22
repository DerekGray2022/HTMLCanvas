const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
// console.log(ctx);

//      SET-UP
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//      GLOBAL CANVAS SETTINGS
ctx.lineWidth = 5;
ctx.clearRect(0, 0, canvas.width, canvas.height);
// const lineCap = ['butt', 'round', 'square'];

// //      Canvas Shadows
// ctx.shadowOffsetX = 1;
// ctx.shadowOffsetY = 1;
// ctx.shadowColor = 'white';

// //     Linear Gradient
// const gradientLin = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
// gradientLin.addColorStop('0.2', 'hsl(40, 100%, 50%)');
// gradientLin.addColorStop('0.3', 'hsl(80, 100%, 50%)');
// gradientLin.addColorStop('0.4', 'hsl(120, 100%, 50%)');
// gradientLin.addColorStop('0.5', 'hsl(160, 100%, 50%)');
// gradientLin.addColorStop('0.6', 'hsl(200, 100%, 50%)');
// gradientLin.addColorStop('0.7', 'hsl(240, 100%, 50%)');
// gradientLin.addColorStop('0.8', 'hsl(280, 100%, 50%)');
// gradientLin.addColorStop('0.9', 'hsl(320, 100%, 50%)');
// ctx.strokeStyle = gradientLin;

// //      Radial Gradient
// const gradientRad = ctx.createRadialGradient(
//     canvas.width / 2,
//     canvas.height / 2,
//     30,
//     canvas.width / 2,
//     canvas.height / 2,
//     200
// );
// gradientRad.addColorStop('0.2', 'hsl(40, 100%, 50%)');
// gradientRad.addColorStop('0.3', 'hsl(80, 100%, 50%)');
// gradientRad.addColorStop('0.4', 'hsl(120, 100%, 50%)');
// gradientRad.addColorStop('0.5', 'hsl(160, 100%, 50%)');
// gradientRad.addColorStop('0.6', 'hsl(200, 100%, 50%)');
// gradientRad.addColorStop('0.7', 'hsl(240, 100%, 50%)');
// gradientRad.addColorStop('0.8', 'hsl(280, 100%, 50%)');
// gradientRad.addColorStop('0.9', 'hsl(320, 100%, 50%)');
// gradientRad.addColorStop('1', 'hsl(360, 100%, 50%)');
// ctx.strokeStyle = gradientRad;


//      Cavas Pattern
const patternImage = document.getElementById('patternImage');
const pattern01 = ctx.createPattern(patternImage, 'no-repeat');
ctx.strokeStyle = pattern01;


//#region       LINE FUNCTION

class  Line {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = Math.floor(Math.random() * this.canvas.width);
        this.y = Math.floor(Math.random() * this.canvas.height);
        this.history = [{ x: this.x, y: this.y }];
        this.lineWidth = Math.floor(Math.random() * 5 + 1);
        this.hue = Math.floor(Math.random() * 360);
        this.maxLength = Math.floor(Math.random() * 150 + 10);
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = 5;
        this.lifeSpan = this.maxLength * 3;
        this.breakPoint = this.lifeSpan * 0.75;
        this.timer = 0;
        this.angle = 0;
        this.va = Math.random() * 0.5 - 0.25;
        this.curve = 1;
        this.vc = Math.random() * 0.4 - 0.2;
        // this.randNum = Math.floor(Math.random() * 3);
    };

    draw(context) {
        // context.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
        context.lineWidth = this.lineWidth;
        // context.lineCap = lineCap[this.randNum];
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y);

        //      Draw the 3 Lines
        for (let n = 1; n < this.history.length; n++) {
            context.lineTo(this.history[n].x, this.history[n].y);
        };

        context.stroke();
    };

    update() {
        this.timer++;
        this.angle += this.va;
        this.curve += this.vc;

        if (this.timer < this.lifeSpan) {
            if (this.timer > this.breakPoint) {
                this.va *= -1.02;
            };
            //      Build a 3-Line Array
            this.x += Math.sin(this.angle) * this.curve;
            this.y += Math.cos(this.angle) * this.curve;
            this.history.push({ x: this.x, y: this.y });
            if (this.history.length >= this.maxLength) {
                this.history.shift();
            };
        }
        else if (this.history.length <= 1) {
            this.reset();
        }
        else {
            this.history.shift();
        };
    };

    reset(){
        this.x = Math.floor(Math.random() * this.canvas.width);
        this.y = Math.floor(Math.random() * this.canvas.height);
        this.history = [{ x: this.x, y: this.y }];
        this.timer = 0;
        this.curve = 0.025;
        this.vc = 0.1;
        // this.va = Math.random() * 0.5 - 0.25;
    };
};

//      Line Array
const linesArray = [];
const numberOfLines = 200;

for (let x = 0; x < numberOfLines; x++) {
    linesArray.push(new Line(canvas));
};

//#endregion




//      Animate
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //  Draw Line
    linesArray.forEach(line => {
        line.draw(ctx);
        line.update();
    });

    requestAnimationFrame(animate);
};
animate();


 



