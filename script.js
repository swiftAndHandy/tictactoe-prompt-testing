let fields = Array(9).fill(null);
let currentSymbol = 'circle';
let gameIsOver = false;
let currentCombination = null;

const crossSVGStatic = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="1" y1="1" x2="23" y2="23" stroke="#FBC700" stroke-width="2"/>
        <line x1="23" y1="1" x2="1" y2="23" stroke="#FBC700" stroke-width="2"/>
    </svg>
`;

const circleSVGStatic = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#38AFDD" stroke-width="2"/>
    </svg>
`;

const crossSVGAnimated = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="1" y1="1" x2="23" y2="23" stroke="#FBC700" stroke-width="2">
            <animate attributeName="x2" from="1" to="23" dur="0.3s" fill="freeze" />
            <animate attributeName="y2" from="1" to="23" dur="0.3s" fill="freeze" />
        </line>
        <line x1="23" y1="1" x2="1" y2="23" stroke="#FBC700" stroke-width="2">
            <animate attributeName="x2" from="23" to="1" dur="0.3s" fill="freeze" />
            <animate attributeName="y2" from="1" to="23" dur="0.3s" fill="freeze" />
        </line>
    </svg>
`;

const circleSVGAnimated = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#38AFDD" stroke-width="2" stroke-dasharray="62.83185307179586" stroke-dashoffset="62.83185307179586">
            <animate attributeName="stroke-dashoffset" from="62.83185307179586" to="0" dur="0.3s" fill="freeze" />
        </circle>
    </svg>
`;

function possibleCombinations() {
    return combinations = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6]  // Diagonal 2
    ];
}

function render() {
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = ''; // Clear existing content

    for (let i = 0; i < fields.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = `cell-${i}`;
        cell.innerHTML = fields[i] === 'cross' ? crossSVGStatic : fields[i] === 'circle' ? circleSVGStatic : '';
        cell.addEventListener('click', () => setSymbol(i)); // Add click event listener
        gameArea.appendChild(cell);
    }
}

function setSymbol(index) {
    if (fields[index] === null) { // Only set symbol if the field is empty
        fields[index] = currentSymbol;
        const cell = document.getElementById(`cell-${index}`);
        cell.innerHTML = currentSymbol === 'circle' ? circleSVGAnimated : crossSVGAnimated;
        currentSymbol = currentSymbol === 'circle' ? 'cross' : 'circle'; // Alternate symbol after successful set
        // setTimeout(render, 300); // Re-render after animation to set static SVGs
    }
}

function isGameFinished() {
    if (!checkWinner() && allFieldsBlocked()) {
        alert('blub');
    }
}

function allFieldsBlocked() {
    let nullCheck
    for (let i = 0; i < fields.length; i++) {
        if (!fields[i]) {
            return false;
        }
    }
    return true;

}

// Function to check for a winner
function checkWinner() {
    const winningCombinations = possibleCombinations();

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            if (!gameIsOver) {
                drawWinningLine(combination);
                setTimeout(() => {

                }, 300);
                gameIsOver = true;
                return true;
            }
        }
    }
    return false;
}

function drawWinningLine(combination) {
    const gameArea = document.getElementById('gameArea');
    const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgLine.setAttribute('width', '100%');
    svgLine.setAttribute('height', '100%');
    svgLine.setAttribute('style', 'position:absolute; top:0; left:0;');

    const offsetX = gameArea.offsetLeft;
    const offsetY = gameArea.offsetTop;

    const startX = offsetX + (combination[0] % 3) * 100 + 50;
    const startY = offsetY + Math.floor(combination[0] / 3) * 100 + 50;
    const endX = offsetX + (combination[2] % 3) * 100 + 50;
    const endY = offsetY + Math.floor(combination[2] / 3) * 100 + 50;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', `${startX}`);
    line.setAttribute('y1', `${startY}`);
    line.setAttribute('x2', `${endX}`);
    line.setAttribute('y2', `${endY}`);
    line.setAttribute('stroke', 'red');
    line.setAttribute('stroke-width', '5');

    svgLine.appendChild(line);
    gameArea.appendChild(svgLine);

    // Event Listener für Größenänderung hinzufügen
    window.addEventListener('resize', updateWinningLine);
}


function updateWinningLine() {
    if (!currentCombination) return;
    const gameArea = document.getElementById('gameArea');
    const svgLine = gameArea.querySelector('svg');
    if (!svgLine) return;

    const gameAreaRect = gameArea.getBoundingClientRect();
    const cellSize = gameAreaRect.width / 3;

    const startX = (currentCombination[0] % 3) * cellSize + cellSize / 2;
    const startY = Math.floor(currentCombination[0] / 3) * cellSize + cellSize / 2;
    const endX = (currentCombination[2] % 3) * cellSize + cellSize / 2;
    const endY = Math.floor(currentCombination[2] / 3) * cellSize + cellSize / 2;

    const line = svgLine.querySelector('line');
    line.setAttribute('x1', `${startX}`);
    line.setAttribute('y1', `${startY}`);
    line.setAttribute('x2', `${endX}`);
    line.setAttribute('y2', `${endY}`);
}

// Function to set the symbol on the clicked cell
function setSymbol(index) {
    if (fields[index] === null) { // Only set symbol if the field is empty
        fields[index] = currentSymbol;
        const cell = document.getElementById(`cell-${index}`);
        cell.innerHTML = currentSymbol === 'circle' ? circleSVGAnimated : crossSVGAnimated;
        currentSymbol = currentSymbol === 'circle' ? 'cross' : 'circle'; // Alternate symbol after successful set
        isGameFinished();
    }
}

function restart() {
    fields = Array(9).fill(null);
    currentSymbol = 'circle';
    gameIsOver = false;
    currentCombination = null;
    render();
}