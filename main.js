window.onload = function () {
  console.log("linked");

  // GLOBAL SCOPE
  let startButton = document.querySelector("#start-button");
  let instructionPage = document.querySelector("#instruction-page");
  let musicOn = document.querySelector("#music-on")
  let timeStart = document.querySelector("#countdown");
  let gamePage = document.querySelector("#landing-bg");
  let gameAssets = document.querySelector("#game-assets-container");
  let endGame = document.querySelector("#ko");
  let replay = document.querySelector("#replay")
  let arrowDiv = document.querySelectorAll(".arrowkey img");
  let player1Char = document.querySelector(".container .item-0");
  let player2Char = document.querySelector(".container .item-1");
  let p1HealthBar = document.querySelector(".player-1 .progress-bar");
  let p2HealthBar = document.querySelector(".player-2 .progress-bar");
  let p1Move = document.querySelectorAll(".player-1move");
  let p2Move = document.querySelectorAll(".player-2move");
  let p1Attack = document.querySelector("#p1-attack")
  let p2Attack = document.querySelector("#p2-attack")

  // SOUNDS
  let koSound = document.querySelector("#ko-sound")
  let instructionSound = document.querySelector("#instruction-bgm")
  let countdownSound = document.querySelector("#countdown-sound")
  let backgroundSound = document.querySelector("#bgm")
  let p1PunchSound = document.querySelector("#p1-punch-sound")
  let p2KickSound = document.querySelector("#p2-kick-sound")
  let enterSound = document.querySelector("#enter-sound")

  // CREATING CLASS FOR BOTH PLAYERS

  class Player {
    name = "";
    health = 100;

    constructor(name, health) {
      this.name = name;
      this.health = health;
    }

    inflictDamage(opponent) {
      if (opponent.health !== 0) {
        opponent.health -= 20;
      } else if (opponent.health === 0) {
        opponent.health = 0;
      }
    }
  }

  let player1 = new Player("Player 1", 100);
  let player2 = new Player("Player 2", 100);

  let arrowArr = ['up', 'down', 'left', 'right'];
  let arrowDivArray = []
 

  let roundNum = 1;

  // Creating empty array for both players' input
  let player1Inputs = [];
  let player2Inputs = [];
  let player1GameClicks = 0;
  let player2GameClicks = 0;
 

  const player1KeyRef = {
    KeyW: "up",
    KeyS: "down",
    KeyA: "left",
    KeyD: "right",
  };

  const player2KeyRef = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  };

 
  // ATTACH EVENT HANDLER

  // Creating an event handler to turn on sound
  musicOn.onclick = (event) => {
    event.preventDefault();
    playInstructionSound()
    }
    

  // When start button is clicked, remove display for instruction and launch game page
  startButton.onclick = (event) => {
    event.preventDefault();
    enterKeySound()
    playCountdownSound()
    instructionSound.pause()
    instructionPage.style.display = "none";

 

     // SETTING 3SEC TIMER AFTER CLICKING "START"
    let sec = 3;
    let time = setInterval(myTimer, 1000);
    function myTimer() {
      timeStart.innerHTML = `Get ready in ${sec}`;
      sec--;
      if (sec === -1) {
        clearInterval(time);
        gamePage.style.display = "block";
        gameAssets.style.display = "block"
        timeStart.innerHTML = "";
        playBackgroundSound()
      }
    }
  };


  // Adding Event Listener to keys input by both players
  window.addEventListener("keydown", keyInput);

    // CREATING RANDOM ARROWS
    createArrow()


  // Creating function to capture inputs by both players
  function keyInput(event) {
    event.preventDefault();
 

    // Player1's Input
    if (
      event.code == "KeyW" ||
      event.code == "KeyS" ||
      event.code == "KeyA" ||
      event.code == "KeyD"
    ) {
      player1Inputs.push(player1KeyRef[event.code]);
      player1GameClicks += 1;
      console.log("gameclicks is", player1GameClicks);
    }
    
 
    
    
    for (let i = 0; i < player1Inputs.length; i++) {
      if (player1Inputs[i] !== arrowDivArray[i]) {
        resetPlayer1();
      } else if (player1Inputs[i] === arrowDivArray[i]) {
        if (player1GameClicks === 8) {
          console.log("P1 complete");
          // alert(`player1 won`)
          nextRound();
          player1.inflictDamage(player2);
          powerAppearP1()
          p1AttackSound()
          p2HealthBar.style.width = `${player2.health}%`;
          // console.log(player1.health)
        } else if (player1GameClicks < 8) {
          // arrowDiv[i].style.border = "5px solid white"
          p1Move[i].style.color = "yellow";
        }
      }
    }

    // Player2's Input
    if (
      event.code == "ArrowUp" ||
      event.code == "ArrowDown" ||
      event.code == "ArrowLeft" ||
      event.code == "ArrowRight"
    ) {
      player2Inputs.push(player2KeyRef[event.code]);
         console.log(player2Inputs)
      player2GameClicks += 1;
      console.log("gameclicks is", player2GameClicks);
    }

    // Validation Check if Key input = Arrow Displayed
    // If key input is not equal to arrow displayed --> reset player's input
    // If all key inputs matches arrow displayed 100% = Player wins & move on to next round

    for (let j = 0; j < player2Inputs.length; j++) {
      if (player2Inputs[j] !== arrowDivArray[j]) {
        resetPlayer2();
      } else if (player2Inputs[j] === arrowDivArray[j]) {
        if (player2GameClicks === 8) {
          // console.log("P2 complete");
          powerAppearP2()
          p2AttackSound()
          nextRound();
          player2.inflictDamage(player1);
          p1HealthBar.style.width = `${player1.health}%`;
          // console.log(player1.health)
          // alert(`player2 won`)
        } else if (player2GameClicks < 8) {
          // arrowDiv[j].style.border = "5px solid yellow"
          p2Move[j].style.color = "yellow";
        }
      }
    }
    checkWin(player1, player2);
  }

  // ..FUNCTIONS FUNCTIONS FUNCTIONS..


  // SETTING & CREATING RANDOW ARROW COMBINATIONS

   // Function to create random index between 0 - 3 
  function randomIndex() {
  let randomArrIndex = Math.floor(Math.random() * arrowArr.length);
    return randomArrIndex
  }

  // Creating Random Arrows into Arrow Arrays
  // Generate New Random Arrows from Original Arrow Arrays
  function createArrow() {
    for (let i = 0; i < 8 ; i++) {
      let r = randomIndex()
      console.log(r)
      if (arrowArr[r] === "up") {
        arrowDiv[i].setAttribute("class", "up");
        arrowDivArray.push("up")
        
      } else if (arrowArr[r] === "down") {
        arrowDiv[i].setAttribute("class", "down");
        arrowDivArray.push("down")
        
      } else if (arrowArr[r] === "left") {
        arrowDiv[i].setAttribute("class", "left");
        arrowDivArray.push("left")
        
      } else if (arrowArr[r] === "right") {
        arrowDiv[i].setAttribute("class", "right");
        arrowDivArray.push("right")
        
      }

    }
    // console.log(arrowDivArray)

  }


  // Reset player's arrows input & gameclicks & calling new random arrows functions
  function nextRound() {
    player1Inputs = [];
    player2Inputs = [];
    player1GameClicks = 0;
    player2GameClicks = 0;
    roundNum += 1;
    p1Attack.style.display = "none"
    p1Attack.style.display = "none"
    arrowDivArray = []
    createArrow();
    for (let i = 0; i < arrowDiv.length; i++) {
      arrowDiv[i].style.border = "none";
      p1Move[i].style.color = "transparent";
      p2Move[i].style.color = "transparent";
    }
  }

  // Resetting player's input/ gameclicks when they make a wrong move
  function resetPlayer1() {
    player1Inputs = [];
    player1GameClicks = 0;
    for (let i = 0; i < arrowDiv.length; i++) {
      arrowDiv[i].style.border = "none";
      p1Move[i].style.color = "transparent";
    }
  }

  function resetPlayer2() {
    player2Inputs = [];
    player2GameClicks = 0;
    for (let i = 0; i < arrowDiv.length; i++) {
      arrowDiv[i].style.border = "none";
      p2Move[i].style.color = "transparent";
    }
  }

  // Check Winning Condition (if health bar = Zero)
  function checkWin(player1, player2) {
    console.log(`this is round ${roundNum}`)
    if (player1.health === 0) {
      endOfGame(player1Char, player2Char);
 
    } else if (player2.health === 0) {
      endOfGame(player2Char, player1Char);

    }
  }

  function endOfGame(character1, character2) {
    window.removeEventListener("keydown", keyInput);
    setTimeout(() => {
      PlayKoSound()
      endGame.style.display = "block";
      replay.style.display = "block";

    }, 400);
    character1.style.animation = "none";
    character1.style.transform = "rotate(90deg)";
    window.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
      enterKeySound()
      document.location.href = ""
      }
    })
  }
    
  function powerAppearP1(){
    p1Attack.style.display= "block"    
    setTimeout(function(){ 
      p1Attack.style.display= "none"    
      }, 500);
  }

  function powerAppearP2(){
    p2Attack.style.display= "block"    
    setTimeout(function(){ 
      p2Attack.style.display= "none"    
      }, 500);
  }

// Functions for Sounds
  function PlayKoSound() {
    koSound.play()
  }

  function enterKeySound() {
    enterSound.play()
  }

  function p1AttackSound() {
    p1PunchSound.play()
  }

  function p2AttackSound() {
    p2KickSound.play()
  }

  function playBackgroundSound() {
  backgroundSound.volume = 0.3
  backgroundSound.play()
  }

  function playInstructionSound() {
    instructionSound.play()
    }

  function playCountdownSound() {
    backgroundSound.volume = 0.01
    countdownSound.play()
      }

  // EXPERIMENTAL CODES

  // Appendix 1
  //   for (let i = 0; i <= arrowArr.length; i++) {
  //     let randomArrIndex = Math.floor(Math.random() * arrowArr.length);
  //       randomArowArr.push(arrowArr[randomArrIndex])
  //       console.log(randomArrowArr)
  //   }
};

