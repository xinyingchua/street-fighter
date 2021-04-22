window.onload = function () {
  console.log("linked");

  // GLOBAL SCOPE
  let startButton = document.querySelector("#start-button");
  let instructionPage = document.querySelector("#instruction-page");
  let gamePage = document.querySelector("#landing-bg");
  let arrowContainer = document.querySelector(".container-arrow");

  let arrowArr = ['up', 'up', 'down', 'down', 'left', 'left', 'right', 'right'];


  // ATTACH EVENT HANDLER
  // When start button is clicked, remove display for instruction and launch game page
  startButton.onclick = (event) => {
    event.preventDefault();
    instructionPage.style.display = "none";
    gamePage.style.display = "block";
  };

  // SETTING & CREATING RANDOW ARROW COMBINATIONS
  // Initially used simple loop but decided to experiment with Fisher-Yates Algorithm instead 
  // Refer to Appendix 1 for experimental codes

  function randomArrowArr(arr) {
    for( let i = arrowArr.length-1 ; i > 0 ;i--){
        let j = Math.floor( Math.random() * (i + 1) ); // getting random index
        [arrowArr[i],arrowArr[j]]=[arrowArr[j],arrowArr[i]]; // swap

    }
}
    randomArrowArr(arrowArr)
    console.log(arrowArr);


     // APPENDING RANDOM ARROW ARRAY INTO ARROW CONTAINER
    for (let i = 0; i < arrowArr.length; i++) {
    let newArrowDiv = document.createElement('div')
        newArrowDiv.setAttribute('class','arrowkey')

        let newArrowImg = document.createElement('img')

            if(arrowArr[i]=== 'up') {
                newArrowImg.setAttribute('class','up')
            }
            else if(arrowArr[i]=== 'down') {
                newArrowImg.setAttribute('class','down')
            }
            else if(arrowArr[i]=== 'left') {
                newArrowImg.setAttribute('class','left')
            }
            else if(arrowArr[i]=== 'right') {
                newArrowImg.setAttribute('class','right')
        }
        newArrowDiv.appendChild(newArrowImg)
        arrowContainer.appendChild(newArrowDiv)


    }
// CREATING ARROW DIVS



};


// Experimented codes

// Appendix 1
//   for (let i = 0; i <= arrowArr.length; i++) {
//     let randomArrIndex = Math.floor(Math.random() * arrowArr.length);
//       randomArrowArr.push(arrowArr[randomArrIndex])
//       console.log(randomArrowArr)
//   }