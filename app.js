const wordBank = [
    "apple",
    "banana",
    "carrot",
    "dog",
    "elephant",
    "flower",
    "guitar",
    "house",
    "ice cream",
    "jungle",
    "kangaroo",
    "lion",
    "monkey",
    "notebook",
    "octopus",
    "pizza",
    "queen",
    "rainbow",
    "strawberry",
    "tiger",
    "umbrella",
    "violin",
    "watermelon",
    "xylophone",
    "yak",
    "zebra",
    
    
  ];
const startGameModule = document.querySelector(`.startGame`);
const livesLeft = document.querySelector(`.lives`);
const playAgainSound = new Audio(`./Audio/mixkit-arcade-bonus-229.wav`);
const gameOverSound = new Audio(`./Audio/mixkit-fairytale-game-over-1945.wav`);
const gameOver = document.querySelector(`.gameOver`);
const click = new Audio(`./Audio/mixkit-single-key-type-2533.wav`);
const correct = new Audio(`./Audio/mixkit-correct-answer-reward-952.wav`);
const container = document.querySelector(`.randomWord`);
let lives = 8;
let score = 0;
const scoreBoard = document.querySelector(`.score`);
const play = document.querySelector(`#play`);
const playAgain = document.querySelector(`#playAgain`);
let childCount;
const head = document.querySelector(`.head`);
const body = document.querySelector(`.body`);
const rightArm = document.querySelector(`.right-arm`);
const leftArm = document.querySelector(`.left-arm`);
const rightLeg = document.querySelector(`.right-leg`);
const leftLeg = document.querySelector(`.left-leg`);

window.onload = function() {
    startGameModule.classList.add(`youLose`);
    
    console.log(startGameModule)
};


play.addEventListener(`click`, startGame);
  function startGame(){
    playAgainSound.play();
    startGameModule.classList.remove(`youLose`);
  generateRandomWord();
  }


  function generateRandomWord(){
    let randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    for(char of randomWord){
       const box = document.createElement(`div`);
        box.setAttribute(`class`, `box`);
        container.appendChild(box);
        const span = document.createElement(`span`);
        box.appendChild(span);
        span.textContent = char; 
        span.style.opacity = `0`;
        
        // if(char === ``) box.style.backgroundColor = `black`;
    };
    childCount = container.childElementCount;

    
    };

const letters = document.querySelectorAll(`input[type="button"]`);
  letters.forEach((letter)=>{
     letter.addEventListener(`click`, ()=>{
    click.play();
      checkLetter(letter.value);
      letter.style.visibility = `hidden`;
    //   console.log(letter.value);
     })
  })


let guessedLetters = [];
function checkLetter(value) {
    const spans = document.querySelectorAll('.randomWord span');
    spans.forEach((span) => {
      if (value === span.textContent) {
        span.style.opacity = `1`;
        guessedLetters.push(value);
        // console.log(guessedLetters.length)
        
        if(guessedLetters.length === childCount){
            score++;
            lives++;
            scoreBoard.innerText = score;
            container.innerHTML = ``
            guessedLetters = [];
            container.classList.add(`foundWord`)
            correct.play();
            generateRandomWord();
            setTimeout(() => {
                container.classList.remove(`foundWord`)
            }, 1200);
            setTimeout(() => {
                letters.forEach((letter)=>{
                    letter.style.visibility = `visible`;
                })
                
            }, 500);
 }
      } else if (!guessedLetters.includes(span.textContent)) {
        span.style.opacity = `0`;
       
      }
    });

    if(!guessedLetters.includes(value)) {
        lives--;
        livesLeft.innerText = lives;
        if(lives === 7) head.classList.add(`show`);
        if(lives === 6)  body.classList.add(`show`);
        if(lives === 5)  rightArm.classList.add(`show`);
        if(lives === 4)  leftArm.classList.add(`show`);
        if(lives === 3)  rightArm.classList.add(`show`);
        if(lives === 2)  rightLeg.classList.add(`show`);
        if(lives === 1)  leftLeg.classList.add(`show`);
            
        

        if(lives === 0) {
            gameOverSound.play();
            gameOver.classList.add(`youLose`)
            playAgain.addEventListener(`click`, ()=>{
                playAgainSound.play();
                score = 0;
                scoreBoard.innerText = score;
                lives = 8;
                container.innerHTML = ``;
                guessedLetters = [];
                gameOver.classList.remove(`youLose`);
                livesLeft.innerText = lives;
                head.classList.remove(`show`)
                body.classList.remove(`show`)
                rightArm.classList.remove(`show`)
                leftArm.classList.remove(`show`)
                rightLeg.classList.remove(`show`)
                leftLeg.classList.remove(`show`)

                setTimeout(() => {
                    letters.forEach((letter)=>{
                        letter.style.visibility = `visible`;
                    })
                    
                }, 500);

                generateRandomWord();

            })
        };
    }
  };

 
//   console.log(childCount)
