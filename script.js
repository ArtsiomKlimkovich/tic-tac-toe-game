$(document).ready(function() {
    let board;
    let currentPlayer;
    let mode;

    $('#two-players').click(() => {
        mode = '2players';
        init();
        $('.cell').css('cursor', 'pointer');
    });

    $('#vs-computer').click(() => {
        mode = 'computer';
        init();
        $('.cell').css('cursor', 'pointer');
    });

    function init() {
        board = Array(9).fill(null);
        currentPlayer = 'X';
        $('.cell').removeClass('x o').text('');
        $('.cell').off('click').on('click', handleCellClick);
        $('.status').text('');
    }

    function handleCellClick() {
        const index = $(this).data('index');
        if (board[index] || checkWinner()) return;

        board[index] = currentPlayer;
        $(this).addClass(currentPlayer.toLowerCase());

        if (checkWinner()) {
            $('.status').text(`${currentPlayer} wins!`);
            return;
        }
        
        if (board.every(cell => cell)) {
            $('.status').text("It's a draw!");
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (mode === 'computer' && currentPlayer === 'O') {
            computerMove();
        }
    }

    function computerMove() {
        let availableCells = board.map((cell, index) => cell === null ? index : null).filter(cell => cell !== null);
        if (availableCells.length > 0) {
            const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
            board[randomIndex] = currentPlayer;
            $(`.cell[data-index=${randomIndex}]`).addClass(currentPlayer.toLowerCase());
            if (checkWinner()) {
                $('.status').text(`${currentPlayer} wins!`);
                return;
            }
            currentPlayer = 'X';
        }
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winningCombinations.some(combination => {
            if (board[combination[0]] && 
                board[combination[0]] === board[combination[1]] && 
                board[combination[0]] === board[combination[2]]) {
                return true;
            }
            return false;
        });
    }
});