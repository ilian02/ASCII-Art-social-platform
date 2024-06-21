
const asciiTable = document.getElementById('ascii-table')
asciiTable.classList.add('bordered')

let width = 40
let height = 25

let cells_data = [[]]

for (let i = 0; i < height; i++) {
    let table_row = document.createElement('tr')
    cells_data[i] = []

    for (let j = 0; j < width; j++) {
        let table_cell = document.createElement('td')
        cells_data[i][j] = '.'
        table_cell.innerText='.'
        table_cell.classList.add('cell')
        table_row.appendChild(table_cell)

    }
    asciiTable.appendChild(table_row)
}


