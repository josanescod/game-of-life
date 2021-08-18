const rows = 40;
const cols = 40;

let currentGen = [rows];
let nextGen = [rows];

const createGenArrays = () => {
    for (let i = 0; i < rows; i++) {
        currentGen[i] = new Array(cols);
        nextGen[i] = new Array(cols);
    }
    console.log('createGenArrays');
}

const initGenArrays = () => {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            currentGen[i][j] = 0;
            nextGen[i][j] = 0;
        }
    }
    console.log('initGenArrays');
}

const createWorld = () => {
    let world = document.querySelector('#world');
    let table = document.createElement('table');
    table.setAttribute('id', 'worldgrid');
    for (let i = 0; i < cols; i++) {
        let tableRow = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('td');
            cell.setAttribute('id', i + '_' + j);
            cell.setAttribute('class', 'dead');
            cell.addEventListener('click', cellClick);
            tableRow.appendChild(cell);
        }
        table.appendChild(tableRow);
    }
    world.appendChild(table);
}

function cellClick() {
    let location = this.id.split('_');
    let row = Number(location[0]);//Get i
    let col = Number(location[1]);//Get j
    this.className === 'alive'
        ? (
            this.setAttribute('class', 'dead'),
            currentGen[row][col] = 0,
            console.log(row, col, currentGen[row][col]))
        : (
            this.setAttribute('class', 'alive'),
            currentGen[row][col] = 1,
            console.log(row, col, currentGen[row][col]))

    console.log('number of neighbors: ', getNeighborCount(row, col));
}


function getNeighborCount(row, col) {
    let count = 0;
    let numberRow = Number(row);
    let numberCol = Number(col);

    //make sure we are not at the first row
    if (numberRow - 1 >= 0) {
        //check top neighbor
        if (currentGen[numberRow - 1][numberCol] == 1) count++;
    }

    //make sure we are not in the first cell
    //upper left corner
    if (numberRow - 1 >= 0 && numberCol - 1 >= 0) {
        //check upper left neighbor
        if (currentGen[numberRow - 1][numberCol - 1] == 1) count++;
    }

    //make sure we are not on the first row last column
    //upper right corner
    if (numberRow - 1 >= 0 && numberCol + 1 < cols) {
        //check upper right neighbor
        if (currentGen[numberRow - 1][numberCol + 1] == 1) count++;
    }

    //make sure we are not on the first column
    if (numberCol - 1 >= 0) {
        //check left neighbor
        if (currentGen[numberRow][numberCol - 1] == 1) count++;
    }

    //make sure we are not on the last column
    if (numberCol + 1 < cols) {
        //check right neighbor
        if (currentGen[numberRow][numberCol + 1] == 1) count++;
    }

    //make sure we are not on the bottom left corner
    if (numberRow + 1 < rows && numberCol - 1 >= 0) {
        //check bottom left neighbor
        if (currentGen[numberRow + 1][numberCol - 1] == 1) count++;
    }

    //make sure we are not on the bottom right
    if (numberRow + 1 < rows && numberCol + 1 < cols) {
        //check bottom right neighbor
        if (currentGen[numberRow + 1][numberCol + 1] == 1) count++;
    }

    //make sure we are not on the last row
    if (numberRow + 1 < rows) {
        //check bottom neighbor
        if (currentGen[numberRow + 1][numberCol] == 1) count++;
    }

    return count;
}
window.onload = () => {
    createWorld();//the visual table
    createGenArrays();//current and next generations
    initGenArrays();//set all array locations to 0=dead
}