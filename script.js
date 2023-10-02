const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6]           // diagonal
];
function initGame() {
    currentPlayer = 'X';
    gameGrid = ['', '', '', '', '', '', '', '', ''];
    boxes.forEach(box => {
        box.innerHTML = '';
        box.style.pointerEvents = 'auto';
        box.classList.remove('win');
    });
    newGameBtn.classList.remove('active');
    gameInfo.innerHTML = `Player ${currentPlayer}'s turn`;
    boxes.forEach((box, index) => {
        box.addEventListener('click', function () {
            if (!box.innerHTML) {
                box.innerHTML = currentPlayer;
                box.style.pointerEvents = 'none';
                gameGrid[index] = currentPlayer;
                if (!checkWinner() && !checkEnd()) {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    gameInfo.innerHTML = `Player ${currentPlayer}'s turn`;
                }

            }
        });
    });
}

initGame();

function checkWinner() {
    let foundWinner = false;

    winningPositions.forEach(position => {
        if (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]] && gameGrid[position[0]] !== '') {
            
            boxes.forEach(box => {
                box.style.pointerEvents = 'none';
            });

            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');

            newGameBtn.classList.add('active');
            
            gameInfo.innerHTML = `Player ${currentPlayer}'s wins`;

            foundWinner = true;
        }
    });

    return foundWinner;
}

function checkEnd() {
    let foundDraw = false;

    if (gameGrid.every(box => box !== '')) {

        
        boxes.forEach(box => {
            box.style.pointerEvents = 'none';
        });
        
        gameInfo.innerHTML = `It's a draw`;

        newGameBtn.classList.add('active');
        foundDraw =  true;
    }
    return foundDraw;
}

newGameBtn.addEventListener('click', function () {
    initGame();
});
