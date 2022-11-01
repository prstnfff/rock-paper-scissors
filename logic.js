let playerChoiceButtons = document.querySelectorAll(".playerchoice")
console.log(playerChoiceButtons)

playerChoiceButtons.forEach( x => {

    let choice = x.classList[1]

    x.addEventListener('click', event => {
        playRound(choice)
    })
})

let playByPlay = document.querySelector('.play-by-play-text')
let playerScore = document.querySelector('.players-score')
let computerScore = document.querySelector('.computers-score')

let playerScoreBox = document.querySelector('.player-score-box')
let computerScoreBox = document.querySelector('.computer-score-box')

let gameRound = 1;

let computerWins = 0;
let playerWins = 0;

let scoreToWinInput = document.querySelector('.winning-score')
let scoreToWin      = 5

function getRandomInteger(upperBound = 10) {
    return(Math.floor( (Math.random() * upperBound) + 1))
}

function getComputerChoice(){
    let randNum = getRandomInteger(3)

    let choiceLookup = { 1 : 'rock',
                         2 : 'paper',
                         3 : 'scissors'}

    return(choiceLookup[randNum])
}

function playRound(playerSelection){

    computerSelection = getComputerChoice()

    let weaknesses = { 

        'rock' : 'paper',
        'paper': 'scissors',
        'scissors': 'rock'
    }

    if( playerSelection === computerSelection){

        outcome = 'tie'

    } else if( weaknesses[playerSelection] === computerSelection){

        outcome = 'computer'
        computerWins++

    } else {

        outcome = 'player'
        playerWins++

    }

    summarizeRound(outcome, playerSelection, computerSelection)
    scoreUpdate(computerWins, playerWins)

    if(playerWins == scoreToWin || computerWins == scoreToWin){
        announceWinner()
        return('')
    }
    
    gameRound += 1
}

function summarizeRound(outcome, playerChoice, computerChoice){


    let content = '';

    if(outcome === 'tie'){
        content =  `Tie! Both players choose ${playerChoice}</p>`
    } else {

        let winnerChoice = (outcome === 'player') ? playerChoice : computerChoice
        let loserChoice  = (outcome === 'player') ? computerChoice : playerChoice

        content = `${outcome} wins! ${winnerChoice} beats ${loserChoice}</p>`

    }

    playByPlay.insertAdjacentHTML('afterBegin', `<p>Round ${gameRound}: ${content}`)

}

function scoreUpdate(computerWins, playerWins){

    playerScore.textContent =  playerWins
    computerScore.textContent = computerWins

}

function reset(){

    computerWins = 0;
    playerWins = 0;
    scoreUpdate(0, 0)

    enableButtons()

    computerScoreBox.removeAttribute('style', 'background-color:goldenrod')
    playerScoreBox.removeAttribute('style', 'background-color:goldenrod')

    playByPlay.textContent = ''

    gameRound = 1

}

document.querySelector('.reset').addEventListener('click', event => {
    reset()
})

scoreToWinInput.addEventListener('change', event => {
    scoreToWin = scoreToWinInput.value
    reset()
})

function disableButtons(){
    document.querySelectorAll('.playerchoice').forEach( btn => {
        btn.setAttribute('disabled', '')
    })
}

function enableButtons(){
    document.querySelectorAll('.playerchoice').forEach( btn => {
        btn.removeAttribute('disabled')
    })
}

function announceWinner(){

    let winner = ''
    let winnerScore = 0
    let loserScore = 0

    if(computerWins == scoreToWin){
        winner = 'Computer'
        winnerScore = computerWins
        loserScore = playerWins
        computerScoreBox.setAttribute('style', 'background-color:goldenrod')

    }
    else if (playerWins == scoreToWin){
        winner = 'Player'
        winnerScore = playerWins
        loserScore = computerWins
        playerScoreBox.setAttribute('style', 'background-color:goldenrod')
    }

    
    playByPlay.insertAdjacentHTML('afterBegin', `<p>GAME OVER: ${winner} Wins! After ${gameRound} rounds, ${winner} wins ${winnerScore} to ${loserScore}`)
    disableButtons()
    
}