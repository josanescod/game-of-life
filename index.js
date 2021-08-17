
const rows = 40;
const cols = 40;

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

const cellClick = () => {
    let location = this.id.split('_');
    let row = Number(location[0]);//Get i
    let col = Number(location[1]);//Get j
    console.log(row, col);
    this.className === 'alive' ? this.setAttribute('class', 'dead') : this.setAttribute('class', 'alive');
}

window.onload = () => {
    createWorld;
}