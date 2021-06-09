let wX = 500, wY = 500;
let grid = [];
let run = false;
let dx = [-1, -1, -1, 0, 0, 1, 1, 1];
let dy = [1, 0, -1, 1, -1, -1, 0, 1];

const DIM = 600;
const SQSZ = 12;
const ARSZ = 1000;

function setup(){
    for(let i = 0; i < ARSZ; i++){
        let cur = [];
        for(let j = 0; j < ARSZ; j++){
            cur.push(false);
        }
        grid.push(cur);
    }
    createCanvas(DIM, DIM);
}

function draw(){
    background(255);
    for(let i = 0; i < DIM/SQSZ; i++){
        for(let j = 0; j < DIM/SQSZ; j++){
            if(grid[wX+i][wY+j]){
                fill(0);
            }else{
                noFill();
            }
            rect(i*SQSZ, j*SQSZ, SQSZ);
        }
    }
    if(run && frameCount % 5 == 0){
        let updx = [];
        let updy = [];
        for(let i = 1; i < ARSZ-1; i++){
            for(let j = 1; j < ARSZ-1; j++){
                let cnt = 0;
                for(let k = 0; k < 8; k++){
                    let nx = i + dx[k];
                    let ny = j + dy[k];
                    if(grid[nx][ny]) cnt++;
                }
                if(grid[i][j] && (cnt < 2 || cnt > 3)){
                    updx.push(i);
                    updy.push(j);
                }
                if(!grid[i][j] && cnt == 3){
                    updx.push(i);
                    updy.push(j);
                }
            }
        }
        for(let i = 0; i < updx.length; i++){
            grid[updx[i]][updy[i]] = !grid[updx[i]][updy[i]];
        }
    }
}

function mousePressed(){
    let px = mouseX;
    let py = mouseY;
    let sqx = Math.floor(px/SQSZ);
    let sqy = Math.floor(py/SQSZ);
    grid[wX+sqx][wY+sqy] = !grid[wX+sqx][wY+sqy];
}
