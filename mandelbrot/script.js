let detail = 100;

let pixelate = 64;

let w = 1280;
let h = 760;

let startx = 0;
let endx = w;
let starty = 0;
let endy = h;

let bstartx = 0;
let bendx = w;
let bstarty = 0;
let bendy = h;

let tempstartx = -1;
let tempstarty = -1;

let fc = 0;

let mandCanv;

class limComp{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    add(other){
        this.x += other.x;
        this.y += other.y;
    }
    sqr(){
        let nx = Math.pow(this.x, 2) - Math.pow(this.y, 2);
        let ny = this.x * this.y * 2;
        this.x = nx;
        this.y = ny;
    }
    abs(){
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
}

function calcM(x, y){
    let z = new limComp(0, 0);
    let n = 0;
    let c = new limComp(map(x, 0, width, map(startx, 0, w, -2, 1), map(endx, 0, w, -2, 1)), map(y, 0, height, map(starty, 0, h, -1, 1), map(endy, 0, h, -1, 1)));
    while(z.abs() <= 2 && n < detail){
        z.sqr()
        z.add(c);
        n++;
    }
    if(n == detail) return n;
    return n + 1 - Math.log(Math.log2(z.abs()));
}

function setup(){
    let cnv = createCanvas(w, h, P2D);
    cnv.mousePressed(startzoom);
    cnv.mouseReleased(endzoom);
    mandCanv = createGraphics(w, h);
    mandCanv.noStroke();
    colorMode(HSB, 255);
}

function draw(){
    noStroke();
    background(255);
    if((fc * pixelate) >= height && pixelate > 1){
        pixelate /= 4;
        fc = 0;
    }
    for(let i = 0; i < width; i += pixelate){
        /*if(frameCount >= height){
            finished = true;
            break;
        }*/
        let j = (fc * pixelate) % height;
        let val;
        val = calcM(i, j);
        let mandval = color(map(val, 0, detail, 0, 255), 180, 250);
        if(hue(mandval) == 0){
            mandval = color(0, 0, 0);
        }
        mandCanv.fill(mandval);
        mandCanv.rect(i, j, pixelate, pixelate);
    }
    image(mandCanv, 0, 0);
    fill(255);
    textSize(16);
    text("Location: " + map((startx + endx) / 2, 0, w, -2, 1) + "+" + map((starty + endy) / 2, 0, h, -1, 1) + "i", 50, 50);
    text("Zoom: " + (endx - startx) / w, 50, 70);
    text("Detail: " + detail, 50, 90);
    stroke(255);
    noFill();
    if(mouseIsPressed && tempstartx != -1){
        let sx = Math.min(map(tempstartx, startx, endx, 0, w), mouseX);
        let sy = Math.min(map(tempstarty, starty, endy, 0, h), mouseY);
        let ex = Math.max(map(tempstartx, startx, endx, 0, w), mouseX);
        let ey = Math.max(map(tempstarty, starty, endy, 0, h), mouseY);
        rect(sx, sy, ex - sx, (ex - sx) * (height / width));
    }
    fc++;
}

function startzoom(){
    tempstartx = map(mouseX, 0, w, startx, endx);
    tempstarty = map(mouseY, 0, h, starty, endy);
    print(tempstartx);
}

function endzoom(){
    if(tempstartx == -1) return;
    let sx = Math.min(tempstartx, map(mouseX, 0, w, startx, endx));
    let sy = Math.min(tempstarty, map(mouseY, 0, h, starty, endy));
    let ex = Math.max(tempstartx, map(mouseX, 0, w, startx, endx));
    let ey = Math.max(tempstarty, map(mouseY, 0, h, starty, endy));
    bstartx = startx;
    bstarty = starty;
    bendx = endx;
    bendy = endy;
    startx = sx;
    starty = sy;
    endx = ex;
    endy = sy + (ex - sx) * (height / width);
    tempstartx = -1;
    tempstarty = -1;
    detail = Math.floor((Math.log(1 / ((endx - startx) / w)) + 1) * 100);
    fc = 0;
    pixelate = 64;
}

function saveSet(){
    saveCanvas(mandCanv, "mandelbrot_" + map((startx + endx) / 2, 0, w, -2, 1) + "+" + map((starty + endy) / 2, 0, h, -1, 1) + "i_" + (endx - startx) / w + "_" + detail, "png");
}

function back(){
    startx = bstartx;
    starty = bstarty;
    endx = bendx;
    endy = bendy;
    detail = Math.floor((Math.log(1 / ((endx - startx) / w)) + 1) * 100);
    fc = 0;
    pixelate = 64;
}

function reset(){
    detail = 100;
    pixelate = 64;
    w = 1280;
    h = 760;
    startx = 0;
    endx = w;
    starty = 0;
    endy = h;
    tempstartx = -1;
    tempstarty = -1;
    fc = 0;
}
