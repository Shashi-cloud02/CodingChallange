/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
let moleCount = 0;
let cordQueue = [];
let matrix = [];

console.error("\nOriginal Data:")
for (let i = 0; i < 16; i++) {
    const line = readline();
    console.error(line)
    matrix.push(line)

    for(let k=0; k<line.length ; k++) {
        if(line[k]=='+' || line[k]=='|' || line[k]=='-') {
            cordQueue.push([k,i])
        }
    }
}

// Write an answer using console.log()
// To debug: console.error('Debug messages...');
console.error("\nBoundary:")
let boundaryMat=[];
for(let y=0; y<16; y++){
    let line = [];
    for (let x=0; x<16; x++){
        let filled = false;
        for(let k=0; k <cordQueue.length; k++){
            if(x==cordQueue[k][0] && y==cordQueue[k][1])
            {
                line.push('1')
                filled = true;
            }
        } 
        if(!filled)
            line.push('0')
    }
    boundaryMat.push(line);
    console.error(line.join(''))
}

// Boundary Fill
const boundary_fill = (pos_x, pos_y) =>
{  
    if(pos_x > 15 || pos_y > 15 || pos_x < 0 || pos_y < 0) {
        return;
    }
    let current_char = boundaryMat[pos_x][pos_y];  //get the color of the current pixel position
    if( current_char != '1' ) // if pixel not already filled or part of the boundary then
    {    
        boundaryMat[pos_x][pos_y]='1';  //change the color for this pixel to the desired fill_color
        boundary_fill(pos_x + 1, pos_y);  // perform same function for the east pixel
        boundary_fill(pos_x - 1, pos_y);  // perform same function for the west pixel
        boundary_fill(pos_x, pos_y + 1);  // perform same function for the north pixel
        boundary_fill(pos_x, pos_y - 1);  // perform same function for the south pixel
    }
}

boundary_fill(8,0)
boundary_fill(8,15)

console.error("\nSegmenting Data inside boundary:")
for (let x=0; x < 16; x++) {
    let line = [];
    for(let y=0; y<16 ; y++ ){
        if(boundaryMat[x][y] == '0') {
            line.push(matrix[x][y])
            if(matrix[x][y]=='o') {
                moleCount+=1
            }
        }
        else 
            line.push(boundaryMat[x][y])
    }
    
    console.error(line.join(''))
}

console.log(moleCount);
