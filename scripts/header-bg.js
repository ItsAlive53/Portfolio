var c;
var ctx;
var mousePos = {
    x: -5000,
    y: -5000
};

var characters = "０１２３４５６７８９ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚあいうえおわをらりるれろたちつてとやゆよさしすせそはひふへほかきくけこなにぬねのまみむめもんアイウエオラリルレロワヲタチツテトサシスセソハヒフヘホカキクケコナニヌネノンマミムメモ";
var characters = characters.split("");

var fontsize = 10;
var cols;
var drops = [];

$(window).resize(() => {
    var cs = getComputedStyle(c);
    c.width = parseInt(cs.getPropertyValue('width'), 10);
    c.height = parseInt(cs.getPropertyValue('height'), 10);
    if (cols < c.width / fontsize) cols = c.width / fontsize;
    for (var i = 0; i < cols; i++)
        if (!(drops[i] > 0))
            drops[i] = Math.floor(Math.random() * 20) - 19;
});

$('document').ready(function() {
    c = document.getElementById('headerCanvas');
    var cs = getComputedStyle(c);
    c.width = parseInt(cs.getPropertyValue('width'), 10);
    c.height = parseInt(cs.getPropertyValue('height'), 10);
    ctx = c.getContext('2d');
    cols = c.width / fontsize;
    for (var i = 0; i < cols; i++) {
        drops[i] = Math.floor(Math.random() * 50) - 49;
    }
    drawRect(0, 0, c.height, c.width, '#000000');
    $('#firstRow').on('mousemove', (evt) => {
        console.log('mouse move event 1');
        mouseMoveFunc(evt);
    });
    setInterval(() => {/*
        drawRect(0, 0, c.height, c.width, '#000000');
        var grd = ctx.createRadialGradient(mousePos.x, mousePos.y, 1, mousePos.x, mousePos.y, 125);
        grd.addColorStop(0, '#ffffff');
        grd.addColorStop(1, '#000000');
        drawCircle(mousePos.x, mousePos.y, 150, grd);*/
        drawNumbers();

        if (Math.random() > 0.99) makeLine();

        var grd = ctx.createLinearGradient(c.width / 2 - 200, 0, c.width / 2 + 200, 0);
        grd.addColorStop(0, "rgba(0,0,0,0)");
        grd.addColorStop(0.15, "rgba(0,0,0,1)");
        grd.addColorStop(0.85, "rgba(0,0,0,1)");
        grd.addColorStop(1, "rgba(0,0,0,0)");

        //drawRect(c.width / 2 - 200, 0, c.height, 400, grd);
    }, 66);
});

function drawNumbers() {
    drawRect(0, 0, c.height, c.width, 'rgba(0,0,0,0.05)');
    ctx.fillStyle = '#0F0';
    ctx.font = fontsize + "px sans-serif";
    ctx.textAlign = "center";
    for (var i = 0; i < drops.length; i++) {
        var text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontsize, drops[i] * fontsize);

        if (drops[i] * fontsize > c.height && Math.random() > 0.975)
            drops[i] = 0;

        drops[i]++;
    }
}

function drawRect(xpos, ypos, h, w, color) {
    var oldFillStyle = ctx.fillStyle;
    ctx.fillStyle = color;
    ctx.fillRect(xpos, ypos, w, h);
    ctx.fillStyle = oldFillStyle;
}

function drawCircle(xpos, ypos, r, color) {
    var oldFillStyle = ctx.fillStyle;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(xpos, ypos, r, 0, Math.PI*2, true);
    ctx.fill();
    ctx.fillStyle = oldFillStyle;
}

function mouseMoveFunc(evt) {
    console.log('mouse move event 2');
    mousePos = calcMousePos(evt);
    console.log(mousePos.x + ', ' + mousePos.y);
}

function makeLine() {
    var xside = 0;
    if (Math.random() > 0.5)
        xside = c.width;
    var yside = 0;
    if (Math.random() > 0.5)
        yside = c.height;

    var startX = Math.floor(Math.random() * c.width);
    ctx.beginPath();
    ctx.moveTo(startX, yside);
    do {
        ctx.lineTo(Math.floor(Math.random() * c.width), Math.floor(Math.random() * c.height));
    } while (Math.random() > 0.5);
    ctx.lineTo(xside, Math.floor(Math.random() * c.height));
    ctx.shadowBlur = 30;
    ctx.shadowColor = '#3334dd';
    ctx.strokeStyle = '#3334dd';
    ctx.stroke();
    ctx.shadowBlur = 0;
}

function calcMousePos(evt) {
    // get mouse x and y position on screen in relation to the canvas
    var rect = c.getBoundingClientRect();
    var mouseX = evt.clientX - rect.left;
    var mouseY = evt.clientY - rect.top;
    return {
        x: mouseX,
        y: mouseY
    };
}