
const asciiTable = document.getElementById('ascii-table')
asciiTable.classList.add('bordered')
const asciiSymbols = document.getElementById('symbol-table')
asciiSymbols.classList.add('bordered')

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
    // Get the ASCII table
    const asciiTable = document.getElementById('ascii-table');
    
    let isMouseDown = false;

    function handleAction(event) {
        const cell = event.target;
        //console.log('ASCII Table cell clicked:', cell.innerText);
            if (clickedSymbol) {
                cell.innerText = clickedSymbol.innerText
            }
    }

    // Add click event listener to each cell in the ASCII table
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
