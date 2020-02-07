// Image by <a href="https://pixabay.com/users/blickpixel-52945/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=568200">Michael Schwarzenberger</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=568200">Pixabay</a>

// Initialize variables 
const form = document.querySelector('#startButton')
const displayCards = document.querySelector('cards');
const startButton = document.querySelector('button');
// localStorage.getItem

// Function to shuffle
// source: https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/
let shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;
    
    // While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};

// initialization of the cards
let cards = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p"];
let cardImgs =["AC","AD","AH","AS","KC","KD","KH","KS","AC","AD","AH","AS","KC","KD","KH","KS"];
// variable to track total tries
let totalTries = 0;
// variable to track selected cards
let selectedCards = 0;
// variable for total cards
const totalCards = cards.length;
// variable to track total revealed cards
let revealedCards = 0;
let previousCard = {'imgName': '', 'clickedElement':''};



// function to set matched cards as Matched
function setMatch(clickedElement) {
    clickedElement.classList.toggle('matched');
}

// function to hide an unmatched card
function hideUnmatchedCard(prevClickedElement,clickedElement) {
    prevClickedElement.classList.toggle('hide');
    prevClickedElement.setAttribute('src', 'img/playingCardImg.jpg');
    clickedElement.classList.toggle('hide');
    clickedElement.setAttribute('src', 'img/playingCardImg.jpg');
}
// function to check if game is Over
function checkEnd() {
    if(revealedCards==totalCards) {
        console.log('You Win');
        if(totalTries<localStorage.getItem('lowestScore') || localStorage.getItem('lowestScore')==0) {
            localStorage.setItem('lowestScore', totalTries);
            console.log('new lowest score');
            console.log(localStorage.getItem('lowestScore'));
        }
    }
}
// function to check if the both cards match
function checkMatch(imgName,clickedElement) {
    if(imgName === previousCard.imgName) {
       setMatch(previousCard.clickedElement);
       setMatch(clickedElement);
       revealedCards +=2;
    } else {
        setTimeout(function() {
            hideUnmatchedCard(previousCard.clickedElement,clickedElement)
            previousCard= {};
        }, 2000)

    }
}
// function to checkTries
function checkTries(imgName, clickedElement) {
    if (selectedCards===1) {
        previousCard.imgName = imgName;
        previousCard.clickedElement = clickedElement
    } else {
        checkMatch(imgName,clickedElement);
        selectedCards=0;
    }   
}

function play(e) {
    totalTries++;
    const clickedElement = e.target;
    const id = clickedElement.id;
    // Check if player already selected 2 cards
    //TBD 

    // check if player clicked the same card
     if(selectedCards==1 && id == previousCard.clickedElement.id) {
        console.log('same card')
    }
    // check to avoid error if player clicks between cards
      else if(id!="") {
            const clickedCard = document.querySelector(`#${id}`);
            if(clickedElement.classList.contains('hide')) {
                let imgIndex = cards.indexOf(id);
                let imgName = cardImgs[imgIndex];
                let imgUrl = `img/${imgName}.jpg`;
                clickedElement.setAttribute('src',imgUrl);
                clickedElement.classList.toggle('hide');
                selectedCards++;
                checkTries(imgName, clickedElement);
                checkEnd();
            } 
        }  
}



// Event Listener to respond to game start
form.addEventListener('submit', function(e) {
    e.preventDefault();
    document.querySelector('cards').classList.toggle('start')
    startButton.disabled = true;
})

// Event Listener to respond to game start
form.addEventListener('input', function(e) {
    e.preventDefault();
    console.log(e.target);
    document.querySelector('cards').classList.toggle('start')
    startButton.disabled = true;
})

// Event Listener to respond to card click event
displayCards.addEventListener('click', function(e) {
    if(document.querySelector('cards').classList.contains('start')) {
        alert('Press start to play')
        } else {
            play(e);
        }
})

// Randomize the cards
// cards = shuffle(cards)