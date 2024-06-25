
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

const buttons = [
    document.getElementById('copy-to-clipboard'),
    document.getElementById('save-to-db-button'),
    document.getElementById('clear-table')
]

const symbols = [
    ["!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", " ", "{", "|", "}", "~"],
    ["─", "│", "┌", "┐", "└", "┘", "├", "┤", "┬", "┴", "┼", "━", "┃", "┏", "┓", "┗", "┛", "┣", "┫", "┳", "┻", "╋", "═", "║", "╔", "╗", "╚", "╝", "╠", "╡", "╢", "█"],
    ["▓", "▒", "░", "▀", "▄", "▌", "▐", "▂", "▃", "▅", "▆", "▇", "▉", "▊", "▋", "▍", "▎", "▏", "▔", "▕", "▲", "▼", "◀", "▶", "◆", "◇", "○", "●", "◎", "◯", "◉", "◌"],
    ["◍", "◊", "◁", "◀", "▷", "▸", "◂", "▪", "▫", "◻", "◼", "◽", "◾", "◿", "*", "♪", "♫", "+", "-", "=", "<", ">", "∕", "∖", "∗", "∘", "∙", "∭", "★", "☆", "☔", "☕"]
];

let width = 40
let height = 25
let cells_data = [[]]

let symbols_width = 32
let symbols_height = 4

const urlParams = new URLSearchParams(window.location.search);
let pic_id = urlParams.get('pic_id')

if (pic_id) {          // if we need to load picture
    fetch(`src/php/pictureEditor.php?pic_id=${pic_id}`, {
        method: 'GET',
    }).then((res) => {
        return res.json()
    }).then(data => {
        if (data.status === "success") {
            if (data.logged == true) {
                pic_to_load = data.pic_data.content
                width = data.pic_data.width
                height = data.pic_data.height

                fill_table(pic_to_load)
                load_picture()
                addEventListeners()

            } else {
                console.log("error")
            }
        } else if (data.status === "unsuccessful") {
            if (data['logged'] == false) {
                location = 'login.html'
            }
            
        } else {
            console.log('how are we here')
        }
        
    }).catch((err) => {
        // console.error('Error: ', err)
    });
} 
else {
    fetch('src/php/pictureEditor.php', {
        method: 'GET',
    }).then((res) => {
        return res.json()
    }).then(data => {
        if (data.status === "success") {
            if (data.logged == true) {
                console.log('User is logged in')
            } else {
                console.log("error")
            }
        } else if (data.status === "unsuccessful") {
            if (data['logged'] == false) {
                location = 'login.html'
            }
            
        } else {
            console.log('how are we here')
        }
        
    }).catch((err) => {
        // console.error('Error: ', err)
    });
    
}

//create the empty table
for (let i = 0; i < height; i++) {
    let table_row = document.createElement('tr')
    cells_data[i] = []

    for (let j = 0; j < width; j++) {
        let table_cell = document.createElement('td')
        cells_data[i][j] = ' '
        table_cell.innerText = ' '
        table_cell.classList.add('cell')
        table_row.appendChild(table_cell)

    }
    asciiTable.appendChild(table_row)
}

//create table with avalibale symbols
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

//adding event listeners to each cell after loading
document.addEventListener('DOMContentLoaded', () => {
    addEventListeners()
});

//add click event listener to each cell in the symbol table
document.addEventListener('DOMContentLoaded', () => {
    const symbolTable = document.getElementById('symbol-table');
    
    symbolTable.querySelectorAll('td').forEach(cell => {
        cell.addEventListener('click', event => {
            clickedSymbol = event.target;
        });
    });
});

//adding event listneres on click for each resize_arrow
for (let i = 0; i < 4; i++) {
    for(let j = 0; j <= 1; j++) {
        arrows[i][j].addEventListener('click', () => {
            console.log('Clicked on cell: ', arrows[i][j].innerText);
            resize_table(i, j)
        });
    }
}

//adding mousedown event listeners for each cell of the drawing table
function addEventListeners () {
    const asciiTable = document.getElementById('ascii-table');

    let isMouseDown = false;

    function handleAction(event) {
        const cell = event.target;
        //console.log('ASCII Table cell clicked:', cell.innerText);
            if (clickedSymbol) {
                cell.innerText = clickedSymbol.innerText
                cells_data[cell.parentElement.rowIndex][cell.cellIndex] = clickedSymbol.innerText
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

//event listener for copy button
buttons[0].addEventListener('click', () => {
    let rows = asciiTable.rows;
    let tableText = '';

    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].cells;
        for (let j = 0; j < cells.length; j++) {
            tableText += (cells[j].innerText == '' ? ' ' : cells[j].innerText) + ' ';
        }
        tableText += '\n';
    }
    let tempTextArea = document.createElement('textarea');
    tempTextArea.value = tableText;
    document.body.appendChild(tempTextArea);

    tempTextArea.select();
    document.execCommand('copy') //deprecated but its the only way to copy I know
    document.body.removeChild(tempTextArea);

    alert('Table copied to clipboard!');

})


//saving picture to the DB
buttons[1].addEventListener('click', () => {
    picData = {}
    picData['width'] = width
    picData['height'] = height
    picData['content'] =  cells_data.flat().join('')()

    //sending post request to the server to save the picture
    if (pic_id == null) {
        fetch('src/php/pictureEditor.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(picData),
        }).then((res) => {
            return res.json()
        }).then(data => {
            if (data['status'] == "success") {
                pic_id = data['pic_id']
            } else if (data.status === "unsuccessful") {
                console.log(data.message)
            } else {
                console.log(data.message)
            }
            
        }).catch((err) => {
            // console.error('Error: ', err)
        });

    } 
    else {
        console.log('udpating')
        picData['pic_id'] = pic_id
        fetch('src/php/pictureEditor.php', {
            method: 'UPDATE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(picData),
        }).then((res) => {
            return res.json()
        }).then(data => {
            console.log(data)
            if (data['status'] == 'success') {
                console.log('updated ' + data['message'])
            } else if (data['status'] == "unsuccessful") {
                console.log(data['message'])
            } else {
                console.log(data['message'])
            }
            
        }).catch((err) => {
            // console.error('Error: ', err)
        });
    }

    alert('Picture saved!');
})

//clears drawing table
buttons[2].addEventListener('click', () => {
    const asciiTable = document.getElementById('ascii-table')

    for (let i = 0; i < height; i++) {
        for (let  j= 0; j < width; j++) {
            asciiTable.rows[i].cells[j].innerText = ' '
            cells_data[i][j] = ' '
        }
    }


})

//resizes table on press of arrow key
function resize_table(direction, add) {
    if (direction == 0) {
        if (add) {
            let table_row = document.createElement('tr')
            height += 1;
            cells_data.unshift([])

            for (let i = 0; i < width; i++) {
                let table_cell = document.createElement('td')
                cells_data[0][i] = ' '
                table_cell.innerText = ' '
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
            width += 1
            let i = 0
            asciiTable.querySelectorAll('tr').forEach(row => {
                let newCell = document.createElement('td')
                newCell.innerText = ' '
                row.insertBefore(newCell, row.firstElementChild)
                cells_data[i].unshift(' ')
                i++
            })
        }
        else {
            width -= 1
            let i = 0
            asciiTable.querySelectorAll('tr').forEach(row => {
                row.removeChild(row.firstElementChild)
                cells_data[i].shift()
                i++
            })
        }
    }
    else if (direction == 2) {//right
        console.log("right")
        if (add) {
            width += 1
            let i = 0
            asciiTable.querySelectorAll('tr').forEach(row => {
                let newCell = document.createElement('td')
                newCell.innerText = ' '
                row.appendChild(newCell)
                cells_data[i].push(' ')
                i++
            })
        }
        else {
            width -= 1
            let i = 0
            asciiTable.querySelectorAll('tr').forEach(row => {
                row.removeChild(row.lastElementChild)
                cells_data[i].pop()
                i++
            })
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
                cells_data[0][i] = ' '
                table_cell.innerText = ' '
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

function load_picture() {

    asciiTable.innerHTML = ''
    for (let i = 0; i < height; i++) {
        let table_row = document.createElement('tr')
    
        for (let j = 0; j < width; j++) {
            let table_cell = document.createElement('td')
            table_cell.innerText = cells_data[i][j]
            table_cell.classList.add('cell')
            table_row.appendChild(table_cell)
    
        }
        asciiTable.appendChild(table_row)
    }

}

function fill_table(content) {
    let index = 0

    for (let i = 0; i < height; i++) {
        cells_data[i] = []
        for (let j = 0; j < width; j++) {
            cells_data[i][j] = content[index]
            index++   
        }
    }
    console.log('ended')
}
