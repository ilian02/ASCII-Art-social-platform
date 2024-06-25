
const asciiTable = document.getElementById('ascii-table')
asciiTable.classList.add('bordered')
const asciiSymbols = document.getElementById('symbol-table')
asciiSymbols.classList.add('bordered')

const buttons = [
    document.getElementById('copy-to-clipboard'),
    document.getElementById('save-to-db-button'),
    document.getElementById('clear-table')
]

const frame_buttons = [
    document.getElementById('prev-frame'),
    document.getElementById('next-frame'),

]

const symbols = [
    ["!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", " ", "{", "|", "}", "~"],
    ["─", "│", "┌", "┐", "└", "┘", "├", "┤", "┬", "┴", "┼", "━", "┃", "┏", "┓", "┗", "┛", "┣", "┫", "┳", "┻", "╋", "═", "║", "╔", "╗", "╚", "╝", "╠", "╡", "╢", "█"],
    ["▓", "▒", "░", "▀", "▄", "▌", "▐", "▂", "▃", "▅", "▆", "▇", "▉", "▊", "▋", "▍", "▎", "▏", "▔", "▕", "▲", "▼", "◀", "▶", "◆", "◇", "○", "●", "◎", "◯", "◉", "◌"],
    ["◍", "◊", "◁", "◀", "▷", "▸", "◂", "▪", "▫", "◻", "◼", "◽", "◾", "◿", "*", "♪", "♫", "+", "-", "=", "<", ">", "∕", "∖", "∗", "∘", "∙", "∭", "★", "☆", "☔", "☕"]
]

const frame_counter = document.getElementById('frame-counter')
frame_counter.innerText = "Frame: " + (current_frame + 1)

let width = 40
let height = 25

let frames = [[[]], [[]], [[]], [[]], [[]]]
let current_frame = 0
for(let i = 0; i < 5; i++) {
    current_frame = i
    create_empty_array()
}
current_frame = 0

let symbols_width = 32
let symbols_height = 4

for (let i = 0; i < height; i++) {
    let table_row = document.createElement('tr')
    frames[current_frame][i] = []

    for (let j = 0; j < width; j++) {
        let table_cell = document.createElement('td')
        frames[current_frame][i][j] = ' '
        table_cell.innerText = ' '
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
})

document.addEventListener('DOMContentLoaded', () => {
    const symbolTable = document.getElementById('symbol-table')
    symbolTable.querySelectorAll('td').forEach(cell => {
        cell.addEventListener('click', event => {
            clickedSymbol = event.target
        })
    })
})



function addEventListeners () {
    const asciiTable = document.getElementById('ascii-table')

    let isMouseDown = false

    function handleAction(event) {
        const cell = event.target
            if (clickedSymbol) {
                cell.innerText = clickedSymbol.innerText
                frames[current_frame][cell.parentElement.rowIndex][cell.cellIndex] = clickedSymbol.innerText
            }
    }

    asciiTable.querySelectorAll('td').forEach(cell => {
        cell.addEventListener('mousedown', event => {
            isMouseDown = true
            handleAction(event)
        })

        cell.addEventListener('mouseover', event => {
            if (isMouseDown) {
                handleAction(event)
            }
        })

        document.addEventListener('mouseup', () => {
            isMouseDown = false
        })
    })
}

buttons[0].addEventListener('click', () => {
    let rows = asciiTable.rows
    let tableText = ''

    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].cells
        for (let j = 0; j < cells.length; j++) {
            tableText += (cells[j].innerText == '' ? ' ' : cells[j].innerText) + ' '
        }
        tableText += '\n'
    }
    let tempTextArea = document.createElement('textarea')
    tempTextArea.value = tableText
    document.body.appendChild(tempTextArea)

    tempTextArea.select()
    document.execCommand('copy')

    document.body.removeChild(tempTextArea)

    alert('Table copied to clipboard!')
})

animation_id = null


buttons[1].addEventListener('click', () => {//test!!!!!!!!!!!!!!!
    console.log('save')
    animationData = {}
    animationData['width'] = width
    animationData['height'] = height
    animationData['content'] = []
    for (let i = 0; i < 5; i++) {
        animationData['content'].push(frames[i].flat().join(''))
    }

    fetch('src/php/animationEditor.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(animationData),
    }).then((res) => {
        return res.json()
    }).then(data => {
        if (data['status'] == "success") {
            animation_id = data['animation_id']
        } else if (data.status === "unsuccessful") {
            console.log(data.message)
        } else {
            console.log(data.message)
        }
        
    }).catch((err) => {
        // console.error('Error: ', err)
    })

    // } else {
    //     console.log('udpating')
    //     animationData['animation_id'] = animation_id
    //     fetch('src/php/animationtureEditor.php', {
    //         method: 'UPDATE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(animationData),
    //     }).then((res) => {
    //         return res.json()
    //     }).then(data => {
    //         console.log(data)
    //         if (data['status'] == 'success') {
    //             console.log('updated ' + data['message'])
    //         } else if (data['status'] == "unsuccessful") {
    //             console.log(data['message'])
    //         } else {
    //             console.log(data['message'])
    //         }
            
    //     }).catch((err) => {
    //         // console.error('Error: ', err)
    //     })
    // }

    alert('Animation saved!')
})

buttons[2].addEventListener('click', () => {
    console.log('clear')
    const asciiTable = document.getElementById('ascii-table')

    for (let i = 0; i < height; i++) {
        for (let  j= 0; j < width; j++) {
            asciiTable.rows[i].cells[j].innerText = ' '
            frames[current_frame][i][j] = ' '
        }
    }


})

function load_picture() {
    asciiTable.innerHTML = ''
    for (let i = 0; i < height; i++) {
        let table_row = document.createElement('tr')
    
        for (let j = 0; j < width; j++) {
            let table_cell = document.createElement('td')
            table_cell.innerText = frames[current_frame][i][j]
            table_cell.classList.add('cell')
            table_row.appendChild(table_cell)
    
        }
        asciiTable.appendChild(table_row)
    }

}

frame_buttons[0].addEventListener('click', () => {
    if(current_frame != 0) {
        current_frame -= 1
    }

    frame_counter.innerText = "Frame: " + (current_frame + 1)
    load_picture()
    addEventListeners()
})

frame_buttons[1].addEventListener('click', () => {
    if(current_frame != 4) {
        current_frame += 1
    }

    frame_counter.innerText = "Frame: " + (current_frame + 1)
    load_picture()
    addEventListeners()
})

function create_empty_array() {
    for (let i = 0; i < height; i++) {
        frames[current_frame][i] = []
        for (let j = 0; j < width; j++) {
            frames[current_frame][i][j] = ' '
        }
    }
    
}


//////////////////////////////////////////////////////////////////////////////////
//possibly add if we have time
// const arrows = [
//     [document.getElementById('remove-up'), document.getElementById('add-up')],
//     [document.getElementById('remove-left'), document.getElementById('add-left')],
//     [document.getElementById('remove-right'), document.getElementById('add-right')],
//     [document.getElementById('remove-down'), document.getElementById('add-down')]
// ]

// function resize_table(direction, add) {
//     if (direction == 0) {
//         //console.log("up")
//         if (add) {
//             let table_row = document.createElement('tr')
//             height += 1
//             frames[current_frame].unshift([])

//             for (let i = 0; i < width; i++) {
//                 let table_cell = document.createElement('td')
//                 frames[current_frame][0][i] = ' '
//                 table_cell.innerText = ' '
//                 table_cell.classList.add('cell')
//                 table_row.appendChild(table_cell)
//             }
//             asciiTable.insertBefore(table_row, asciiTable.firstChild)
//         }
//         else {
//             height -= 1
//             frames[current_frame].shift()

//             asciiTable.removeChild(asciiTable.firstElementChild)
//         }
//     }
//     else if (direction == 1) {//left
//         console.log("left")
//         if (add) {
//             width += 1
//             let i = 0
//             asciiTable.querySelectorAll('tr').forEach(row => {
//                 let newCell = document.createElement('td')
//                 newCell.innerText = ' '
//                 row.insertBefore(newCell, row.firstElementChild)
//                 frames[current_frame][i].unshift(' ')
//                 i++
//             })
//         }
//         else {
//             width -= 1
//             let i = 0
//             asciiTable.querySelectorAll('tr').forEach(row => {
//                 row.removeChild(row.firstElementChild)
//                 frames[current_frame][i].shift()
//                 i++
//             })
//         }
//     }
//     else if (direction == 2) {//right
//         console.log("right")
//         if (add) {
//             width += 1
//             let i = 0
//             asciiTable.querySelectorAll('tr').forEach(row => {
//                 let newCell = document.createElement('td')
//                 newCell.innerText = ' '
//                 row.appendChild(newCell)
//                 frames[current_frame][i].push(' ')
//                 i++
//             })
//         }
//         else {
//             width -= 1
//             let i = 0
//             asciiTable.querySelectorAll('tr').forEach(row => {
//                 row.removeChild(row.lastElementChild)
//                 frames[current_frame][i].pop()
//                 i++
//             })
//         }
//     }
//     else if (direction == 3) {//down
//         console.log("down")
//         if (add) {
//             let table_row = document.createElement('tr')
//             height += 1
//             frames[current_frame].push([])

//             for (let i = 0; i < width; i++) {
//                 let table_cell = document.createElement('td')
//                 frames[current_frame][height-1][i] = ' '
//                 table_cell.innerText = ' '
//                 table_cell.classList.add('cell')
//                 table_row.appendChild(table_cell)
//             }
//             asciiTable.appendChild(table_row)
//         }
//         else {
//             height -= 1
//             frames[current_frame].pop()

//             asciiTable.removeChild(asciiTable.lastElementChild)
//         }
//     }
//     addEventListeners()
// }

//event listeners
// for (let i = 0; i < 4; i++) {
//     for(let j = 0; j <= 1; j++) {
//         arrows[i][j].addEventListener('click', () => {
//             console.log('Clicked on cell: ', arrows[i][j].innerText)
//             resize_table(i, j)
//         })
//     }
// }
