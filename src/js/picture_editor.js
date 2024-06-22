
const asciiTable = document.getElementById('ascii-table')
asciiTable.classList.add('bordered')
const asciiSymbols = document.getElementById('symbol-table')
asciiSymbols.classList.add('bordered')
const arrows = [
    [document.getElementById('remove-up'), document.getElementById('add-up')],
    [document.getElementById('remove-left'), document.getElementById('add-left')],
    [document.getElementById('remove-right'), document.getElementById('add-right')],
    [document.getElementById('remove-down'), document.getElementById('add-down')]
]

let width = 40
let height = 25

let symbols_width = 32
let symbols_height = 4

let cells_data = [[]]

const symbols = [
    ["!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "", "{", "|", "}", "~"],
    ["─", "│", "┌", "┐", "└", "┘", "├", "┤", "┬", "┴", "┼", "━", "┃", "┏", "┓", "┗", "┛", "┣", "┫", "┳", "┻", "╋", "═", "║", "╔", "╗", "╚", "╝", "╠", "╡", "╢", "█"],
    ["▓", "▒", "░", "▀", "▄", "▌", "▐", "▂", "▃", "▅", "▆", "▇", "▉", "▊", "▋", "▍", "▎", "▏", "▔", "▕", "▲", "▼", "◀", "▶", "◆", "◇", "○", "●", "◎", "◯", "◉", "◌"],
    ["◍", "◊", "◁", "◀", "▷", "▸", "◂", "▪", "▫", "◻", "◼", "◽", "◾", "◿", "*", "♪", "♫", "+", "-", "=", "<", ">", "∕", "∖", "∗", "∘", "∙", "∭", "★", "☆", "☔", "☕"]
];

function resize_table(direction, add) {
    if (direction == 0) {
        //console.log("up")
        if (add) {
            let table_row = document.createElement('tr')
            height += 1;
            cells_data.unshift([])

            for (let i = 0; i < width; i++) {
                let table_cell = document.createElement('td')
                cells_data[0][i] = ''
                table_cell.innerText = ''
                table_cell.classList.add('cell')
                table_row.appendChild(table_cell)
            }
            asciiTable.insertBefore(table_row, asciiTable.firstChild)
        }
        else {
            height -= 1;
            cells_data.shift()

            asciiTable.removeChild(asciiTable.firstElementChild)
        }
    }
    else if (direction == 1) {//left
        console.log("left")
        if (add) {

        }
        else {

        }
    }
    else if (direction == 2) {//right
        console.log("right")
        if (add) {

        }
        else {

        }
    }
    else if (direction == 3) {//down
        console.log("down")
        if (add) {
            let table_row = document.createElement('tr')
            height += 1;
            cells_data.push([])

            for (let i = 0; i < width; i++) {
                let table_cell = document.createElement('td')
                cells_data[0][i] = ''
                table_cell.innerText = ''
                table_cell.classList.add('cell')
                table_row.appendChild(table_cell)
            }
            asciiTable.appendChild(table_row)
        }
        else {
            height -= 1;
            cells_data.pop()

            asciiTable.removeChild(asciiTable.lastElementChild)
        }
    }
    addEventListeners()
}

for (let i = 0; i < height; i++) {
    let table_row = document.createElement('tr')
    cells_data[i] = []

    for (let j = 0; j < width; j++) {
        let table_cell = document.createElement('td')
        cells_data[i][j] = ''
        table_cell.innerText = ''
        table_cell.classList.add('cell')
        table_row.appendChild(table_cell)

    }
    asciiTable.appendChild(table_row)
}

for (let i = 0; i < symbols_height; i++) {
    let table_row = document.createElement('tr')

    for (let j = 0; j < symbols_width; j++) {
        let table_cell = document.createElement('td')
        table_cell.innerText = symbols[i][j]
        table_cell.classList.add('cell')
        table_row.appendChild(table_cell)
    }
    asciiSymbols.appendChild(table_row)
}

let clickedCell
let clickedSymbol


document.addEventListener('DOMContentLoaded', () => {

    addEventListeners()
});


document.addEventListener('DOMContentLoaded', () => {
    const symbolTable = document.getElementById('symbol-table');
    // Add click event listener to each cell in the Symbol table
    symbolTable.querySelectorAll('td').forEach(cell => {
        cell.addEventListener('click', event => {
            clickedSymbol = event.target;
            //console.log('Symbol Table cell clicked:', clickedSymbol.innerText);
            // Perform additional actions here, e.g., change cell content or style
        });
    });
});


for (let i = 0; i < 4; i++) {
    for(let j = 0; j <= 1; j++) {
        arrows[i][j].addEventListener('click', () => {
            console.log('Clicked on cell: ', arrows[i][j].innerText);
            resize_table(i, j)
        });
    }
}

// up_arrows[0].addEventListener('click', function(event) {
//     console.log('Clicked on cell: ', up_arrows[0].innerText);
//     resize_table(0, true)
// });

// up_arrows[1].addEventListener('click', function(event) {
//     console.log('Clicked on cell: ', up_arrows[1].innerText);
//     resize_table(0, false)
// });

function addEventListeners () {
    const asciiTable = document.getElementById('ascii-table');

    let isMouseDown = false;

    function handleAction(event) {
        const cell = event.target;
        //console.log('ASCII Table cell clicked:', cell.innerText);
            if (clickedSymbol) {
                cell.innerText = clickedSymbol.innerText
            }
    }

    asciiTable.querySelectorAll('td').forEach(cell => {
        cell.addEventListener('mousedown', event => {
            isMouseDown = true
            handleAction(event)
        });

        cell.addEventListener('mouseover', event => {
            if (isMouseDown) {
                handleAction(event)
            }
        });

        document.addEventListener('mouseup', () => {
            isMouseDown = false;
        });
    });
}