const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();

function TicTacToeGame() {
  const board = new Board;
  const humanPlayer = new HumanPlayer();
  const computerPlayer = new ComputerPlayer();
  let turn = 0;

  this.start = function() {
    const config = {childList: true};
    const observer = new MutationObserver(() => taketurn());
    console.log("hello", board.positions)
    board.postions.forEach(elm => observer.observe(elm, config));
    takeTurn();
  }

  function takeTurn() {
    if (board.checkForWinner()) {
      return;
    }
    if (turn % 2 === 0) {
      humanPlayer.takeTurn();
    } else {
      computerPlayer.takeTurn();
    }
    turn++;
  }
}

function Board() {
  this.positions = Array.from(document.querySelectorAll('.col'));
  console.log(this.positions);

  this.checkForWinner = function() {
    let winner = false;
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ];

    const positions = this.positions;

    winningCombinations.forEach((winningCombo) => {
      const pos0InnerText = positions[winningCombo[0]].innerText;
      const pos1InnerText = positions[winningCombo[1]].innerText;
      const pos2InnerText = positions[winningCombo[2]].innerText;
      const isWinningCombo = pos0InnerText != '' &&
        pos0InnerText === pos1InnerText &&
        pos1InnerText === pos2InnerText;

        if (isWinningCombo) {
          winner = true;
          winningCombo.forEach((index) => {
            positions[index].className += ' winner';
          })
        }
    });
    return winner;
  };

}

function HumanPlayer(board) {
  this.takeTurn = function() {
    board.positions.forEach(elem => elem.addEventListner('click', handleTurnTaken));
  }

  function handleTurnTaken(event) {
    event.target.innerText = 'X';
    board.positions.forEach(elem => elem.removeEventListner('click', handleTurnTaken));
  }

}

function ComputerPlayer(board) {

  this.takeTurn = function() {
    const availablePositions = board.positions.filter((pos) => pos.innerText === '');
    console.log(availablePositions);
    const move = Math.floor(Math.random() * availablePositions.length);
    availablePositions[move].innerText = 'O';
  }
}