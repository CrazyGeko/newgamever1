const skinsContainer = document.getElementById("skinsContainer");
const gameContainer = document.querySelector('.game-container');
const ball = document.getElementById('ball');
const leftPlayer = document.getElementById('leftPlayer');
const rightPlayer = document.getElementById('rightPlayer');
const leftScoreDisplay = document.getElementById('leftScore');
const rightScoreDisplay = document.getElementById('rightScore');
const winnerMessage = document.getElementById('winnerMessage');
const restartButton = document.getElementById('restartButton');

function goFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function showCharacters() {
  skinsContainer.innerHTML = `
    <img src="https://uploads.onecompiler.io/44p8ejdqq/44p8e5tdq/character1.png">
    <img src="https://uploads.onecompiler.io/44p8ejdqq/44p8e5tdq/character2.png">
    <img src="https://uploads.onecompiler.io/44p8ejdqq/44p8e5tdq/character3.png">
    <img src="https://uploads.onecompiler.io/44p8ejdqq/44p8e5tdq/character4.png">
  `;
}

function showBackgrounds() {
  skinsContainer.innerHTML = `
    <h2 style="color:white;">No backgrounds added yet</h2>
  `;
}

function showBalls() {
  skinsContainer.innerHTML = `
    <h2 style="color:white;">No ball skins added yet</h2>
  `;
}

let ballX, ballY, ballSpeedX, ballSpeedY, leftPlayerY, rightPlayerY;
let leftPlayerSpeed = 0;
let rightPlayerSpeed = 0;
let leftScore = 0;
let rightScore = 0;
const maxScore = 5;
const playerSpeed = 6;
const playerHeight = leftPlayer.clientHeight;
let isGameOver = false;
let ballSpeedIncreaseInterval;

  function resetBall() {
    ballX = gameContainer.clientWidth / 2 - ball.clientWidth / 2;
    ballY = gameContainer.clientHeight / 2 - ball.clientHeight / 2;
    ballSpeedX = 4 * (Math.random() < 0.5 ? 1 : -1);
    ballSpeedY = 4 * (Math.random() < 0.5 ? 1 : -1);
  }

  function resetPlayers() {
    leftPlayerY = gameContainer.clientHeight / 2 - leftPlayer.clientHeight / 2;
    rightPlayerY = gameContainer.clientHeight / 2 - leftPlayer.clientHeight / 2;
  }

  function updateScores() {
    leftScoreDisplay.textContent = leftScore;
    rightScoreDisplay.textContent = rightScore;
  }

  function checkWinner() {
    if (leftScore >= maxScore) {
      winnerMessage.textContent = 'Left Player Wins!';
      winnerMessage.style.display = 'block';
      restartButton.style.display = 'block';
      
      isGameOver = true;
      clearInterval(ballSpeedIncreaseInterval);
      return true;
    } else if (rightScore >= maxScore) {
      winnerMessage.textContent = 'Right Player Wins!';
      winnerMessage.style.display = 'block';
      restartButton.style.display = 'block';
      
      isGameOver = true;
      clearInterval(ballSpeedIncreaseInterval);
      return true;
    }
    return false;
  }

  function resetGame() {
    leftScore = 0;
    rightScore = 0;
    updateScores();
    winnerMessage.style.display = 'none';
    restartButton.style.display = 'none';
    isGameOver = false;
    resetBall();
    resetPlayers();
    startBallSpeedIncrease();
    gameLoop();
  }

  function increaseBallSpeed() {
    if (ballSpeedX > 0 ){
      ballSpeedX += 0.2;
    } else {
      ballSpeedX -= 0.2;
    }
    if (ballSpeedY > 0 ){
      ballSpeedY += 0.2;
    } else {
      ballSpeedY -= 0.2;
    }
  }

  function startBallSpeedIncrease() {
    clearInterval(ballSpeedIncreaseInterval);
    ballSpeedIncreaseInterval = setInterval(increaseBallSpeed, 5000);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'w') leftPlayerSpeed = -playerSpeed;
    if (e.key === 's') leftPlayerSpeed = playerSpeed;
    if (e.key === 'ArrowUp') rightPlayerSpeed = -playerSpeed;
    if (e.key === 'ArrowDown') rightPlayerSpeed = playerSpeed;
  });
  
  document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 's') leftPlayerSpeed = 0;
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') rightPlayerSpeed = 0;
  });
  
  restartButton.addEventListener('click', resetGame);
  
  function gameLoop() {
    if (isGameOver) return;
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    if (ballY <= 0 || ballY >= gameContainer.clientHeight - ball.clientHeight) {
      ballSpeedY *= -1;
    }
    
     if (ballX <= leftPlayer.clientWidth && ballY + ball.clientHeight >= leftPlayerY && ballY <= leftPlayerY + leftPlayer.clientHeight) {
      ballSpeedX *= -1;
    }
    
    leftPlayerY += leftPlayerSpeed;
    rightPlayerY += rightPlayerSpeed;
    
    
    if (ballX <= 0) {
      rightScore++;
      if (checkWinner()) return;
      resetBall();
    }
    
    if (ballX + ball.clientWidth >= gameContainer.clientWidth) {
      leftScore++;
      if (checkWinner()) return;
      resetBall();
    }
    
    if (ballX + ball.clientWidth >= gameContainer.clientWidth - rightPlayer.clientWidth && 
    ballY + ball.clientHeight >= rightPlayerY && 
    ballY <= rightPlayerY + playerHeight) {
    ballSpeedX *= -1;
    }
    
    
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

   
    
    if (leftPlayerY < 0) leftPlayerY = 0;
    if (leftPlayerY > gameContainer.clientHeight - playerHeight) leftPlayerY = gameContainer.clientHeight - playerHeight;
    if (rightPlayerY < 0) rightPlayerY = 0;
    if (rightPlayerY > gameContainer.clientHeight - playerHeight) rightPlayerY = gameContainer.clientHeight - playerHeight;
    
    leftPlayer.style.top = `${leftPlayerY}px`;
    rightPlayer.style.top = `${rightPlayerY}px`;    
    updateScores();
    
    requestAnimationFrame(gameLoop);
  }
  
  
  resetGame();
