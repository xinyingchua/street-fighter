window.onload = function () {
  console.log("linked");

  // GLOBAL SCOPE
  let startButton = document.querySelector("#start-button");
  let instructionPage = document.querySelector("#instruction-page");
  let gamePage = document.querySelector("#landing-bg");
  let arrowContainer = document.querySelector(".container-arrow");

let arrowArr = ['up', 'up', 'down', 'down', 'left', 'left', 'right', 'right'];
//   let arrowArr = ['up', 'down', 'left', 'right'];

let roundNum = 1;

// Creating empty array for both players' input
let player1Inputs = []
let player2Inputs = []
let player1gameClicks = 0
let player2gameClicks = 0

const player1KeyRef = {
    KeyW: 'up',
    KeyS: 'down',
    KeyA: 'left',
    KeyD: 'right'
}

const player2KeyRef = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right'
}


  // ATTACH EVENT HANDLER

  // When start button is clicked, remove display for instruction and launch game page
  startButton.onclick = (event) => {
    event.preventDefault();
    instructionPage.style.display = "none";
    gamePage.style.display = "block";
  };

   // Adding Event Listener to keys input by both players
   window.addEventListener('keydown', keyInput);
   
 
  
   // Create Arrows in game
  createArrow();


  // Creating function to capture inputs by both players
  function keyInput(event) {

    // Player1's Input
       if (event.code == "KeyW" || event.code == "KeyS" || event.code == "KeyA" || event.code == "KeyD" ) {
           player1Inputs.push(player1KeyRef[event.code])
           player1gameClicks += 1
           console.log('gameclicks is', player1gameClicks)
           highlightMove(player1Inputs)
       }

    // Validation Check if Key input = Arrow Displayed
       if(player1gameClicks === 8) {
            for(let i = 0; i<player1Inputs.length; i++) {
                if(player1Inputs[i] === arrowArr[i]){
                    console.log("p1 complete")
                    nextRound();
                }

            }
        }

    // Player2's Input
       if (event.code == "ArrowUp" || event.code == "ArrowDown" || event.code == "ArrowLeft" || event.code == "ArrowRight" ) {
           player2Inputs.push(player2KeyRef[event.code])
        //    console.log(player2Inputs)
            player2gameClicks += 1
           console.log('gameclicks is', player2gameClicks)
           


       }
       if(player2gameClicks === 8) {
        for(let i = 0; i<player2Inputs.length; i++) {
            if(player2Inputs[i] === arrowArr[i]){
                console.log("P2 complete")
                nextRound();

            }

        }
    }
   }

// ..FUNCTIONS FUNCTIONS FUNCTIONS..

// SETTING & CREATING RANDOW ARROW COMBINATIONS
    // Initially used simple loop but decided to experiment with Fisher-Yates Algorithm instead 
  // Refer to Appendix 1 for experimental codes
function randomArrowArr(arr) {
    for( let i = arrowArr.length-1 ; i > 0 ;i--){
        let j = Math.floor( Math.random() * (i + 1) ); // getting random index
        [arrowArr[i],arrowArr[j]]=[arrowArr[j],arrowArr[i]]; // swap
    }
}

// RANDOMDIZING ARROW ARRAY INTO ARROW CONTAINER
// Generate New Random Arrows from Original Arrow Arrays

function createArrow() {
    randomArrowArr(arrowArr)

    const arrowElements = document.querySelectorAll('.arrowkey img')

    for (let i = 0; i < arrowElements.length; i++) {
            if(arrowArr[i]=== 'up') {
                arrowElements[i].setAttribute('class','up')
            }
            else if(arrowArr[i]=== 'down') {
                arrowElements[i].setAttribute('class','down')
            }
            else if(arrowArr[i]=== 'left') {
                arrowElements[i].setAttribute('class','left')
            }
            else if(arrowArr[i]=== 'right') {
                arrowElements[i].setAttribute('class','right')
        }
    }
}

// Reset player's arrows input & gameclicks & calling new random arrows functions
function nextRound() {
    player1Inputs = [];
    player2Inputs = [];
    player1gameClicks =0
    player2gameClicks = 0
    gameClicks = 0;
    createArrow()
}

// Validation key inputs validation 

// function highlightMove(arr) {
//         for(let i = 0; i<arr.length; i++) {
//             if(arr[i] === arrowArr[i]){
//                 arrowArr[i].style.border = "10px solid green"

// }
//         }
//     }


// };


// EXPERIMENTAL CODES

// Appendix 1
//   for (let i = 0; i <= arrowArr.length; i++) {
//     let randomArrIndex = Math.floor(Math.random() * arrowArr.length);
//       randomArrowArr.push(arrowArr[randomArrIndex])
//       console.log(randomArrowArr)
//   }
}