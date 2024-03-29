const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
let gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    100,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width * 0.55
);

gradient.addColorStop(0 / 6, 'red');
gradient.addColorStop(1 / 6, 'orange');
gradient.addColorStop(2 / 6, 'yellow');
gradient.addColorStop(3 / 6, 'green');
gradient.addColorStop(4 / 6, 'blue');
gradient.addColorStop(5 / 6, 'indigo');
// gradient.addColorStop(6 / 6, 'violet');
gradient.addColorStop(7 / 7, 'rgba(0, 0, 175, 0)');

// gradient.addColorStop(0 / 7, 'rgba(0, 0, 0, 1');
// gradient.addColorStop(1 / 7, 'rgba(128, 128, 128, 1');
// gradient.addColorStop(2 / 7, 'rgba(192, 192, 0, 1');
// gradient.addColorStop(3 / 7, 'rgba(67, 67, 214, 1');
// gradient.addColorStop(5 / 7, 'rgba(43, 43, 178, 1)');
// gradient.addColorStop(6 / 7, 'rgba(22, 22, 128, 1)');
// gradient.addColorStop(7 / 7, 'rgba(0, 0, 175, 0)');

class Symbol{
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.canvasHeight = canvasHeight;
        this.text = '';
    };

    draw(context) {
        //      Broken Character Stream
        if (Math.random() < 0.9) {
            this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        }
        else {
            this.text = '';
        };

        // //      Continual Character Stream
        // this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));

        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.y = 0;
        }
        else {
            this.y += 1;
        };
    };
};

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 18;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    };

    #initialize() {
        for (let x = 0; x < this.columns; x++) {
            this.symbols[x] = new Symbol(x, 0, this.fontSize, this.canvasHeight);
        };
    };

    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    };
};

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 18;
const nextFrame = 1000 / fps;
let timer = 0;

//      ANIMATION
const animate = (timeStamp) => {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame) {
        //      Fading Rectangle
        ctx.fillStyle = 'rgba(0, 0, 0, 0.025)';
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //      Characters
        ctx.fontSize = `${effect.fontSize}px monospace`;
        ctx.font = '18px sans-serif';
        ctx.fillStyle = gradient; // '#0aff0a';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
    }
    else {
        timer += deltaTime;
    };
    requestAnimationFrame(animate);
};
animate(0);


//      RESIZE
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);

    gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        100,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.55,
    );
    gradient.addColorStop(0 / 7, 'red');
    gradient.addColorStop(2 / 7, 'orange');
    gradient.addColorStop(3 / 7, 'yellow');
    gradient.addColorStop(4 / 7, 'green');
    gradient.addColorStop(5 / 7, 'blue');
    gradient.addColorStop(6 / 7, 'indigo');
    gradient.addColorStop(7 / 7, 'violet');

    // gradient.addColorStop(0 / 7, 'rgba(64, 64, 64, 1');
    // gradient.addColorStop(2 / 7, 'rgba(128, 128, 128, 1');
    // gradient.addColorStop(3 / 7, 'rgba(192, 192, 192, 1');
    // gradient.addColorStop(4 / 7, 'rgba(255, 255, 255, 1');
    // gradient.addColorStop(5 / 7, 'rgba(0, 0, 175, 0)');
    // gradient.addColorStop(6 / 7, 'rgba(0, 0, 175, 0)');
    // gradient.addColorStop(7 / 7, 'rgba(0, 0, 175, 0)');
});



/*
 アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ
 */



