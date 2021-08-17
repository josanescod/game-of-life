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
}

window.onload = () => {
    createWorld();//the visual table
    createGenArrays();//current and next generations
    initGenArrays();//set all array locations to 0=dead
}