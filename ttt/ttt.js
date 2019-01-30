const wdim = 600;
const sqr = wdim/3;
const buffer = 20;
const grid = 5;
const piece = 10;
const wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]];

var board = [0, 0, 0, 
            0, 0, 0, 
            0, 0, 0];

var turn = 2;
var won = 0;
var pressing = 0;
            
function setup() {
    createCanvas(wdim, wdim);
}

function draw() {
    stroke(255);
    strokeWeight(grid);
    background(0);
    
    // Draw grid
    for(var i = 1; i < 3; i++){
        line(0, sqr*i, wdim, sqr*i);
    }
    for(var i = 1; i < 3; i++){
        line(sqr*i, 0, sqr*i, wdim);
    }
    
    // Turn array into board display with pieces
    strokeWeight(piece);
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            var cpiece = board[3*i+j];
            if(cpiece == 1){
                x(sqr * j + buffer, sqr * i + buffer, sqr-(buffer*2));
            }
            if(cpiece == 2){
                o(sqr * j + buffer, sqr * i + buffer, (sqr-(buffer*2)));
            }
        }
    }
    
    
    
    // Creating pieces
    var mx = mouseX;
    var my = mouseY;
    
    if(!mouseIsPressed){
        pressing = 0;
    }
    if(won == 0 && mouseIsPressed && pressing == 0){
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                if(mx > sqr * i && mx < sqr * (i+1) && my > sqr * j && my < sqr * (j+1) && board[j * 3 + i] == 0){
                    board[j * 3 + i] = turn;
                    turn = 3 - turn;
                    pressing = 1;
                }
            }
        }
    }
    
    // Detect if board is in a winning state
    for(var i = 0; i < 8; i++){
        if(board[wins[i][0]] == board[wins[i][1]] && board[wins[i][1]] == board[wins[i][2]] && board[wins[i][0]] != 0){
            won = 1;
            if(i >= 0 && i <= 2){
                line(buffer, sqr * i + sqr/2, wdim - buffer, sqr * i + sqr/2);
            }
            if(i >= 3 && i <= 5){
                line(sqr * (i-3) + sqr/2, buffer, sqr * (i-3) + sqr/2, wdim - buffer);
            }
            if(i == 6){
                line(buffer, buffer, wdim - buffer, wdim - buffer);
            }
            if(i == 7){
                line(buffer, wdim - buffer, wdim - buffer, buffer);
            }
            if(board[wins[i][0]] == 1){
                dtxt(wdim/2 - sqr, wdim - sqr/2, sqr * 2, sqr/2, "X has won.");
            }
            if(board[wins[i][0]] == 2){
                dtxt(wdim/2 - sqr, wdim - sqr/2, sqr * 2, sqr/2, "O has won.");
            }
        }
    }
    
    // Ties
    var count = 0;
    for(var i = 0; i < 9; i++){
        if(board[i] != 0){
            count++;
        }
    }
    if(count == 9 && won == 0){
        dtxt(wdim/2 - sqr, wdim - sqr/2, sqr * 2, sqr/2, "It's a tie.");
    }
}

function x(x, y, size){
    fill(255);
    line(x, y, x+size, y+size);
    line(x+size, y, x, y+size);
}

function o(x, y, r){
    noFill();
    ellipse(x+(r/2), y+(r/2), r);
}

function dtxt(x, y, xsize, ysize, message){
    noStroke();
    fill(255);
    rect(x, y, xsize, ysize);
    textAlign(CENTER);
    textFont("Ubuntu");
    textSize(24);
    fill(0);
    text(message, x+xsize/2, y+ysize/2);
    if(mouseIsPressed && pressing == 0){
        board = [0, 0, 0, 
                0, 0, 0, 
                0, 0, 0];

        turn = 2;
        won = 0;
        pressing = 1;
    }
}
