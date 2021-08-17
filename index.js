
console.log('loading script...')

const rows = 40;
const cols = 40;

function createWorld() {
    let world = document.querySelector('#world');

    let table = document.createElement('table');
    table.setAttribute('id', 'worldgrid');


    for (let i = 0; i < cols; i++) {
        let tableRow = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('td');
            tableRow.appendChild(cell);
        }
        table.appendChild(tableRow);

    }
    world.appendChild(table);
}

window.onload = () => {
    createWorld();
}