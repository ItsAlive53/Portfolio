var c;
var ctx;
var mousePos = {
    x: -5000,
    y: -5000
};

$(window).resize(() => {
    var cs = getComputedStyle(c);
    c.width = parseInt(cs.getPropertyValue('width'), 10);
    c.height = parseInt(cs.getPropertyValue('height'), 10);
});

$('document').ready(function() {
    c = document.getElementById('headerCanvas');
    var cs = getComputedStyle(c);
    c.width = parseInt(cs.getPropertyValue('width'), 10);
    c.height = parseInt(cs.getPropertyValue('height'), 10);
    ctx = c.getContext('2d');
    drawRect(0, 0, c.height, c.width, '#000000');
    $('#firstRow').on('mousemove', (evt) => {
        console.log('mouse move event 1');
        mouseMoveFunc(evt);
    });
    setInterval(() => {
        drawRect(0, 0, c.height, c.width, '#000000');
        var grd = ctx.createRadialGradient(mousePos.x, mousePos.y, 1, mousePos.x, mousePos.y, 125);
        grd.addColorStop(0, '#ffffff');
        grd.addColorStop(1, '#000000');
        drawCircle(mousePos.x, mousePos.y, 150, grd);
    }, 1000/30);
});

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