const rulesGol = [
    {
        id: 'li1',
        text: 'Any live cell with fewer than two live neighbors dies, as if by underpopulation.'
    },

    {
        id: 'li2',
        text: 'Any live cell with two or three live neighbors lives on to the next generation.'

    },
    {
        id: 'li3',
        text: 'Any live cell with more than three live neighbors dies, as if by overpopulation.',
    }

    , {
        id: 'li4',
        text: 'Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.'

    }


]
export { rulesGol };