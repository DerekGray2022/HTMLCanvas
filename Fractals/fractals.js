window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // console.log(ctx);

    //#region       CANVAS SETTINGS

    ctx.fillStyle = 'green';
    ctx.lineCap = 'round';
    // ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    // ctx.shadowOffsetX = 10;
    // ctx.shadowOffsetY = 5;
    // ctx.shadowBlur = 10;

    //#endregion



    //#region       EFFECT SETTINGS

    const maxLevel = 4;
    const branches = 2;

    let size = canvas.width < canvas.height ? canvas.width * 0.5 : canvas.height * 0.5;
    let sides = 5;
    let scale = 0.5;
    let spread = 0.5;
    let color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    let lineWidth = Math.floor(Math.random() * 20 + 10);

    //#endregion



    //#region       CONTROLS

    //      Randomise Button
    // const randomiseButton = document.getElementById('randomiseButton');

    // //      Update Slider
    // const updateSlider = () => {
    //     slider_spread.value = spread;
    //     label_spread.innerText = `Spread: ${Number(spread).toFixed(1)}`;
    // };

    // //      Spread Slider
    // const slider_spread = document.getElementById('spread');
    // const label_spread = document.querySelector("[for='spread']");
    // label_spread.innerText = `Spread: ${Number(spread).toFixed(1)}`;
    // slider_spread.addEventListener('change', (e) => {
    //     spread = e.target.value;
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     updateSlider();
    //     drawFractal();
    // });

    //#endregion


    //#region      CREATE BRANCH

    const drawBranch = (level) => {
        if (level > maxLevel) return;
        //      Line 1
        ctx.beginPath()
        ctx.moveTo(0, 0);
        ctx.lineTo(size, 0);
        ctx.stroke();

        for (let x = 0; x < branches; x++) {
            //      Translate +
            ctx.save();
            ctx.translate(size - (size / branches) * x, 0);
            ctx.scale(scale, scale);

            ctx.save();
            ctx.rotate(spread);
            drawBranch(level + 1);
            ctx.restore();
        
            //      Translate -
            ctx.save();
            ctx.rotate(-spread);
            drawBranch(level + 1);
            ctx.restore();

            ctx.restore();
        };
    };

    //#endregion



    //#region       CREATE FRACTAL FROM BRANCH

    const drawFractal = () => {
        ctx.save();

        ctx.lineWidth = lineWidth;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(0.5, 0.5);
        ctx.strokeStyle = color;

        for (let n = 0; n < sides; n++) {
            ctx.rotate((Math.PI * 2) / sides);
            drawBranch(0);
        };
        
        ctx.restore();
    };
    drawFractal();

    //#endregion



    //#region       RANDOMISE

    const randomiseFractal = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sides = Math.floor(Math.random() * 7 + 2);
        scale = Math.random() * 0.2 + 0.4;
        spread = Math.random() * 2.9 + 0.1;
        color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        lineWidth = Math.floor(Math.random() * 20 + 10);
    };

    setInterval(() => {
        randomiseFractal();
        // updateSlider();
        drawFractal();
    }, 1500);

    // randomiseButton.addEventListener('click', () => {
    //     randomiseFractal();
    //     updateSlider();
    //     drawFractal();
    // });

    //#endregion

    //#region       RESIZE

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.scale(spread);
        // scale = Math.random() * 0.2 + 0.4;

        randomiseFractal();
        drawFractal();
    });

    //#endregion

    // updateSlider();
});

//      OUTSIDE 'LOAD' FUNCTION







