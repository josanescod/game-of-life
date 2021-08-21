const rows = 40;
const cols = 40;

let currentGen = [rows];
let nextGen = [rows];

let started = false; //Set true when use clicks start
let timer; //To control evolutions
let evolutionSpeed = 300 //time in ms between generations
let generation = 1;
let spanGen = document.querySelector('#generation');
let showInfo = false;

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
    //set buttons
    let test = document.querySelector('#test');
    test.addEventListener('click', evolve);
    let startStop = document.querySelector('#startStop');
    startStop.addEventListener('click', startStopGol);
    let reset = document.querySelector('#reset');
    reset.addEventListener('click', resetWorld);
    let info = document.querySelector('#info');
    info.addEventListener('click', information);


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

function createNextGen() {
    for (row in currentGen) {
        for (col in currentGen[row]) {
            let neighbors = getNeighborCount(row, col);
            //Check the rules
            //If alive
            if (currentGen[row][col] == 1) {
                if (neighbors < 2) {
                    nextGen[row][col] = 0;
                } else if (neighbors == 2 || neighbors == 3) {
                    nextGen[row][col] = 1;
                } else if (neighbors > 3) {
                    nextGen[row][col] = 0;
                }

            } else if (currentGen[row][col] == 0) {
                //If Dead or empty
                if (neighbors == 3) {
                    //Propagate the species
                    nextGen[row][col] = 1; //Birth
                }
            }
        }
    }
    console.log('createNextGen');
}

function updateCurrentGen() {
    for (row in currentGen) {
        for (col in currentGen[row]) {
            //Update the current generation with the results of createNextGen function
            currentGen[row][col] = nextGen[row][col];
            //Set nextGen back to empty
            nextGen[row][col] = 0;
        }
    }
    console.log('updateCurrentGen');
}

function updateWorld() {
    let cell = '';
    for (row in currentGen) {
        for (col in currentGen[row]) {
            cell = document.getElementById(row + '_' + col);
            if (currentGen[row][col] == 0) {
                cell.setAttribute('class', 'dead');
            } else {
                cell.setAttribute('class', 'alive');
            }
        }
    }
    console.log('updateWorld');
}

function evolve() {
    generation++;
    createNextGen();//Apply the rules
    updateCurrentGen();//Set current values from new generation
    updateWorld();//Update the world view index.html
    if (started) {
        timer = setTimeout(evolve, evolutionSpeed);
    }
    spanGen.innerHTML = generation;
    console.log('generation: ', generation);
}

function startStopGol() {
    let startStop = document.querySelector('#startStop');
    let test = document.querySelector('#test');
    let reset = document.querySelector('#reset');
    if (!started) {
        started = true;
        startStop.value = 'STOP';
        enableDisableButton(test);
        enableDisableButton(reset);
        evolve();
    } else {
        started = false;
        startStop.value = 'START';
        enableDisableButton(test);
        enableDisableButton(reset);
        clearTimeout(timer);
    }
    console.log('startStopGol');
}

function enableDisableButton(button) {
    if (button.disabled == false) {
        button.disabled = true;
        button.style.backgroundColor = 'grey';
        button.style.color = 'rgba(255, 255, 255, 0.5)';
    } else {
        button.style.backgroundColor = '#47B896';
        button.style.color = '#FFFFFF';
        button.disabled = false;

    }
}

function resetWorld() {
    console.log('reset');
    generation = 1;
    spanGen.innerHTML = generation;
    let table = document.querySelector('table');
    table.remove();
    createWorld();//the visual table
    createGenArrays();//current and next generations
    initGenArrays()
}


function information() {
    if (showInfo === false) {
        showInfo = true;
        createDataboard();
        enableDisableButton(info);
        let closeButton = document.querySelector('.closebutton');
        closeButton.addEventListener('click', function () {
            console.log('closing databoard')
            let databoard = document.querySelector('#databoard');
            databoard.remove();
            showInfo = false;
            enableDisableButton(info);

        })
        console.log('info');
    }
}

function createDataboard() {
    let table = document.querySelector('table');
    tableWidth = table.getBoundingClientRect().width + 'px';
    let divdb = document.createElement('div')
    divdb.setAttribute('id', 'databoard');
    divdb.style.width = tableWidth;

    let pdb1 = document.createElement('p')
    pdb1.setAttribute('class', 'closebutton');
    pdb1.innerHTML = '[X]';

    let brdb = document.createElement('br');
    let ul = document.createElement('ul');
    let li1 = document.createElement('li');
    li1.innerHTML = 'Any live cell with fewer than two live neighbours dies, as if by underpopulation.'
    let li2 = document.createElement('li');
    li2.innerHTML = 'Any live cell with two or three live neighbours lives on to the next generation.'
    let li3 = document.createElement('li');
    li3.innerHTML = 'Any live cell with more than three live neighbours dies, as if by overpopulation.'
    let li4 = document.createElement('li');
    li4.innerHTML = 'Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.';
    let ulElements = [li1, li2, li3, li4];
    ulElements.map(element => ul.appendChild(element));
    let wikianch = document.createElement('a');
    wikianch.setAttribute('href', 'https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life');
    wikianch.innerHTML = "Game of Life"
    let pdb5 = document.createElement('p');
    pdb5.style.paddingLeft = '40px';
    pdb5.innerHTML = 'Source: ';
    pdb5.appendChild(wikianch)
    let h6db = document.createElement('h6');
    h6db.setAttribute('id', 'year');
    let elements = [pdb1, brdb, ul, pdb5, h6db];
    elements.map(element => divdb.appendChild(element));
    let panel = document.querySelector('.panel');
    panel.insertAdjacentElement('beforebegin', divdb);
    printYear();

}

function printYear() {
    let date = new Date();
    let year = date.getFullYear();
    let htmlYear = document.querySelector('#year');
    htmlYear.innerHTML = `${year}`;

}
window.onload = () => {
    createWorld();//the visual table
    createGenArrays();//current and next generations
    initGenArrays();//set all array locations to 0=dead

}