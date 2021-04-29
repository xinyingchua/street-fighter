window.onload = function () {
  console.log("linked");

  // GLOBAL SCOPE
  let startButton = document.querySelector("#start-button");
  let instructionPage = document.querySelector("#instruction-page");
  let timeStart = document.querySelector("#countdown");
  let gamePage = document.querySelector("#landing-bg");
  let gameAssets = document.querySelector("#game-assets-container");
  let endGame = document.querySelector("#ko");
  let arrowDiv = document.querySelectorAll(".arrowkey img");
  let player1Char = document.querySelector(".container .item-0");
  let player2Char = document.querySelector(".container .item-1");
  let p1HealthBar = document.querySelector(".player-1 .progress-bar");
  let p2HealthBar = document.querySelector(".player-2 .progress-bar");
  let p1Move = document.querySelectorAll(".player-1move");
  let p2Move = document.querySelectorAll(".player-2move");

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

  let arrowArr = ["up", "up", "down", "down", "left", "left", "right", "right"];
  //   let arrowArr = ['up', 'down', 'left', 'right'];

  // function to create random integer within that range ==> index between 0 - 3 

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

  // When start button is clicked, remove display for instruction and launch game page
  startButton.onclick = (event) => {
    event.preventDefault();
    instructionPage.style.display = "none";

     // SETTING 3SEC TIMER AFTER CLICING "START"
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
      }
    }
  };

  // Adding Event Listener to keys input by both players
  window.addEventListener("keydown", keyInput);

  // Create Arrows in game
  createArrow();

  // Creating function to capture inputs by both players
  function keyInput(event) {
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
      if (player1Inputs[i] !== arrowArr[i]) {
        resetPlayer1();
      } else if (player1Inputs[i] === arrowArr[i]) {
        if (player1GameClicks === 8) {
          console.log("P1 complete");
          // alert(`player1 won`)
          nextRound();
          player1.inflictDamage(player2);
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
      //    console.log(player2Inputs)
      player2GameClicks += 1;
      console.log("gameclicks is", player2GameClicks);
    }

    // Validation Check if Key input = Arrow Displayed
    // If key input is not equal to arrow displayed --> reset player's input
    // If all key inputs matches arrow displayed 100% = Player wins & move on to next round

    for (let j = 0; j < player2Inputs.length; j++) {
      if (player2Inputs[j] !== arrowArr[j]) {
        resetPlayer2();
      } else if (player2Inputs[j] === arrowArr[j]) {
        if (player2GameClicks === 8) {
          console.log("P2 complete");
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
  // Initially used simple loop but decided to experiment with Fisher-Yates Algorithm instead
  // Refer to Appendix 1 for experimental codes
  function randomArrowArr(arr) {
    for (let i = arrowArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // getting random index
      [arrowArr[i], arrowArr[j]] = [arrowArr[j], arrowArr[i]]; // swap
    }
  }

  // RANDOMDIZING ARROW ARRAY INTO ARROW CONTAINER
  // Generate New Random Arrows from Original Arrow Arrays

  function createArrow() {
    randomArrowArr(arrowArr);

    const arrowElements = document.querySelectorAll(".arrowkey img");

    for (let i = 0; i < arrowElements.length; i++) {
      if (arrowArr[i] === "up") {
        arrowElements[i].setAttribute("class", "up");
      } else if (arrowArr[i] === "down") {
        arrowElements[i].setAttribute("class", "down");
      } else if (arrowArr[i] === "left") {
        arrowElements[i].setAttribute("class", "left");
      } else if (arrowArr[i] === "right") {
        arrowElements[i].setAttribute("class", "right");
      }
    }
  }

  // Reset player's arrows input & gameclicks & calling new random arrows functions
  function nextRound() {
    player1Inputs = [];
    player2Inputs = [];
    player1GameClicks = 0;
    player2GameClicks = 0;
    roundNum += 1;
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
    if (player1.health === 0) {
      endOfGame(player1Char, player2Char);
      // alert("Player 2 wins!")
    } else if (player2.health === 0) {
      endOfGame(player2Char, player1Char);
      // alert("Player 1 wins!")
    }
  }

  function endOfGame(character1, character2) {
    window.removeEventListener("keydown", keyInput);
    setTimeout(() => {
      endGame.style.display = "block";
    }, 800);
    character1.style.animation = "none";
    character1.style.transform = "rotate(90deg)";
    // character2.style.animation = "shake 0.5s"
  }

  // CODES NOT WORKING

  // function checkWinConditions2(input, gameClicks){
  //     for(let j = 0; j<input.length; j++) {

  //         if(input[j] !== arrowArr[j]) {
  //             // resetPlayer();
  //             input = [];
  //             gameClicks = 0
  //             for (let i =0; i<arrowDiv.length; i++) {
  //             arrowDiv[i].style.border ="none"
  //             }
  // }
  //         else if(input[j] === arrowArr[j]) {

  //             if(gameClicks === 8) {
  //             console.log("P2 complete")
  //             nextRound();

  //             }
  //             else if(gameClicks < 8) {
  //                 arrowDiv[j].style.border = "10px solid yellow"

  //             }
  //         }

  // }
  // }

 

  // EXPERIMENTAL CODES

  // Appendix 1
  //   for (let i = 0; i <= arrowArr.length; i++) {
  //     let randomArrIndex = Math.floor(Math.random() * arrowArr.length);
  //       randomArrowArr.push(arrowArr[randomArrIndex])
  //       console.log(randomArrowArr)
  //   }
};

// -- TO BE EXPERIMENTED TO STREAMLINE --//

// function randomIndex(arr) {
//         let randomI = Math.floor( Math.random() * arr.length )
//         return randomI
//     }
// }

// -- TO BE EXPERIMENTED TO STREAMLINE --//

// function createArrow() {
// randomIndex(arrowArr)

//     for (let i = 0; i < 8; i++) {
//             if(arrowArr[randomI] === 'up') {
//                 arrowDiv[i].setAttribute('class','up')
//             }
//             else if(arrowArr[randomI]=== 'down') {
//                 arrowDiv[i].setAttribute('class','down')
//             }
//             else if(arrowArr[randomI]=== 'left') {
//                 arrowDiv[i].setAttribute('class','left')
//             }
//             else if(arrowArr[randomI]=== 'right') {
//                 arrowDiv[i].setAttribute('class','right')
//         }
//     }
// }
