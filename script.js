let fields = [
    null, 
    null,
    null,
    null,
    'circle',
    'cross',
    null, 
    null, 
    null
]

function render() {
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = ''; // Clear existing content

    for (let i = 0; i < fields.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = `cell-${i}`;
        cell.innerHTML = fields[i] === 'cross' ? 'X' : fields[i] === 'circle' ? 'O' : '';
        gameArea.appendChild(cell);
    }
}