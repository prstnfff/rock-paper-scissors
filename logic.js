
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

function playRound(playerSelection, computerSelection){

    let weaknesses = { 

        'rock' : 'paper',
        'paper': 'scissors',
        'scissors': 'rock'
    }

    if( playerSelection === computerSelection){

        return('tie')

    } else if( weaknesses[playerSelection] === computerSelection){

        return('computer')

    } else {

        return('player')

    }

}

function getPlayerInput(){

    let validInput = false;
    let playerSelection = ''

    while(!validInput){

         playerSelection = prompt("Make your selection: Rock, Paper of Scissors").toLowerCase().trim()

        validInput = ['rock', 'paper', 'scissors'].includes(playerSelection)

        if(!validInput){
            alert("Please select one of rock, paper or scissors")
        }

    }

    return(playerSelection)

}

function summarizeRound(outcome, playerChoice, computerChoice){

    if(outcome === 'tie'){
        console.log(`Tie! Both players choose ${playerChoice}`)
    } else {

        let winnerChoice = (outcome === 'player') ? playerChoice : computerChoice
        let loserChoice  = (outcome === 'player') ? computerChoice : playerChoice

        console.log(`${outcome} wins! ${winnerChoice} beats ${loserChoice}`)

    }

}

function scoreUpdate(computerWins, playerWins){

    console.log(`The score is computer: ${computerWins} - player: ${playerWins}`)

}

function finalScore(computerWins, playerWins){

    console.log("======================\nFINAL SCORE:")

    let winner = '';
    let outcome = '';

    if(computerWins > playerWins){

        console.log(`Computer wins ${computerWins} to ${playerWins}`)

    } else if (playerWins > computerWins){

        console.log(`Player wins ${computerWins} to ${playerWins}`)

    } else {

        console.log(`Its a tie! ${computerWins} to ${playerWins}`)

    }
}

function game(rounds = 5){

    let computerWins = 0
    let playerWins = 0

    for(let i = 0; i < rounds; i++){

        console.log("======================")
        console.log(`ROUND ${i}`)

        let playerChoice = getPlayerInput()
        let computerChoice = getComputerChoice()

        let outcome = playRound(playerChoice, computerChoice)

        if(outcome === 'computer'){
            computerWins++
        } else if (outcome === 'player'){
            playerWins++
        }

        summarizeRound(outcome, playerChoice, computerChoice)
        scoreUpdate(computerWins, playerWins)
    }

    finalScore(computerWins, playerWins)


}
