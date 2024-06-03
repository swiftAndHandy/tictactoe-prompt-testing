let fields = Array(9).fill(null);
let currentSymbol = 'circle';

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
        setTimeout(render, 300); // Re-render after animation to set static SVGs
    }
}