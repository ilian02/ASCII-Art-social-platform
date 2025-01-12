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

const max_frames = 60
let current_frame = 0
const frame_counter = document.getElementById('frame-counter')
frame_counter.innerText = "Frame: " + (current_frame + 1)

let width = 40
let height = 25

let frames = [[[]]]
let frames_count = 1



current_frame = 0

let symbols_width = 32
let symbols_height = 4

const urlParams = new URLSearchParams(window.location.search)
let animation_id_url = urlParams.get('animation_id')

if (animation_id_url) {          // if we need to load picture
    fetch(`src/php/animationEditor.php?animation_id=${animation_id_url}`, {
        method: 'GET',
    }).then((res) => {
        return res.json()
    }).then(data => {
        if (data.status === "success") {
            if (data.logged == true) {
                animation_data = data.animation_data
                load_frames(data.frames)
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
    })
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
    })
}


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


function load_frames(frames_data) {
    frames_count = frames_data.length
    for(let k = 0; k < frames_count; k++) {
        frames[k] = []
        for (let i = 0; i < height; i++) {
            frames[k][i] = []
            for (let j = 0; j < width; j++) {
                frames[k][i][j] = frames_data[k].content[i * width + j]
            }
        }
    }
    console.log(frames)
}

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


buttons[1].addEventListener('click', () => {        
    animationData = {}
    animationData['width'] = width
    animationData['height'] = height
    animationData['content'] = []
    for (let i = 0; i < frames_count; i++) {
        animationData['content'].push(frames[i].flat().join(''))
    }
    //////////////////////////////
    const closePopupBtn = document.getElementById('closePopupBtn');
    const popup = document.getElementById('popup');
    const saveTitleBtn = document.getElementById('saveTitleBtn');
    const titleInput = document.getElementById('titleInput');

    console.log(animationData)

    popup.style.display = 'flex';


    closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        
    });


    saveTitleBtn.addEventListener('click', () => {
        animationData['title'] = titleInput.value;
        console.log('Title:', animationData['title']);
        save_to_db(animationData)
        popup.style.display = 'none';
    });
    


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

function save_to_db (animationData) {

    fetch('src/php/animationEditor.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(animationData),
    }).then((res) => {
        return res.json()
    }).then(data => {
        console.log('save')
        console.log(data)
        if (data['status'] == "success") {
            animation_id = data['animation_id']
            console.log(data['message'])
        } else if (data.status === "unsuccessful") {
            console.log(data.message)
        } else {
            console.log(data.message)
        }
        
    }).catch((err) => {
        // console.error('Error: ', err)
    })
}


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

//prev
frame_buttons[0].addEventListener('click', () => {
    if(current_frame != 0) {
        current_frame -= 1

            
        frame_counter.innerText = "Frame: " + (current_frame + 1)
        load_picture()
        addEventListeners()
    }

})

//next
frame_buttons[1].addEventListener('click', () => {
    if(current_frame != max_frames) {
        current_frame += 1
        if (frames_count <= current_frame) {
            frames_count = current_frame + 1
        }

        if(frames[current_frame] === undefined) {
            frames.push([[]])
            create_empty_array()
        }
            
        frame_counter.innerText = "Frame: " + (current_frame + 1)
        load_picture()
        addEventListeners()
    }

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
