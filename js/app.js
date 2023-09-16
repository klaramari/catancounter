let di = document.querySelector(".ul1")
di.addEventListener("click", () => loadDices());
document.addEventListener('DOMContentLoaded', () => loadDices());

let logo = document.querySelector(".logo")
logo.addEventListener("click", () => loadDices());

function loadDices() {
    document.querySelector(".resultsbutton").style.display = "flex"
    let header = document.querySelector(".headermain")
    header.innerText = "First: Roll your dice."
    let resb = document.querySelector(".resultsbutton")
    resb.innerText = "Show results"
    let dices = document.querySelector(".dices")
    dices.innerHTML=""
    for (var i = 2; i <= 12; i++) {
        let dice = document.createElement('div');
        dice.className = `dice dice${i}`;
        dice.textContent = `${i}`
        dices.appendChild(dice);
        dice.addEventListener("click", function() {
            var number = parseInt(this.textContent);
            rollDice(number);
        });
    };
    let dice = document.createElement('div');
    dice.className = "dice computer"
    dice.innerText = "Roll for me";
    dices.appendChild(dice);
    dice.addEventListener("click", () => rollRandom());
};

let showresults = 0;
let numbers = [];
let reset = document.querySelector(".reset");
reset.addEventListener("click", () => {
    
    //all numbers reset
    numbers = [];
    //results display reset
    showResults();

    //last roll reset
    let lastroll = document.querySelector(".lastroll");
    lastroll.innerText = ``;
    let lastrollnr = document.querySelector(".lastrollnr");
    lastrollnr.innerText = ``;
});


function rollDice(number){
    console.log(number);
    numbers.push(number);
    let lastroll = document.querySelector(".lastroll");
    lastroll.innerText = `Your last roll was `;
    let lastrollnr = document.querySelector(".lastrollnr");
    lastrollnr.innerText = `${number}`;
    showResults();
};

let res = document.querySelector(".resultsbutton");
res.addEventListener("click", () => toggleResults());

function rollRandom(){
    let dice1 = getRandomInt(1,6)
    let dice2 = getRandomInt(1,6)
    rollDice(dice1+dice2);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1) + min); // The maximum is exclusive and the minimum is inclusive
  }


function toggleResults(){
    if (showresults == 0){
        showresults = 1;
        let results = document.querySelector(".results");
        let result = document.createElement("div");
        result.className = `showres`;

        results.appendChild(result);
        document.querySelector(".resultsbutton").innerText ="Hide results"
        showResults();
    }
    else {
        showresults = 0;
        let result = document.querySelector(".showres");

        if (result.parentNode) {
            result.parentNode.removeChild(result);
        }

        document.querySelector(".resultsbutton").innerText ="Show results"
    }

}   


function showResults(){
    let res = document.querySelector(".showres");
    if (res != null){ // only do the following if results shall be shown right now
        res.innerHTML="";
        let times = document.createElement("div");
        times.className =`timesrolled`;
        let t = numbers.length;
        times.textContent = `Dice was rolled ${t} times.`
        res.appendChild(times);
        let histogram = document.createElement("div");
        histogram.className =`histogram`;
        res.appendChild(histogram);
        createHistogram(numbers);
    }
}

function createHistogram(data) {
    const histogramContainer = document.querySelector('.histogram');
    
    // Initialize an object to store the frequency of each number
    const frequencyMap = {};
    
    // Initialize frequencies for all numbers from 2 to 12
    for (let i = 2; i <= 12; i++) {
        frequencyMap[i] = 0;
    }

    // Count the frequency of each number in the data array
    data.forEach(number => {
        if (frequencyMap[number] !== undefined) {
            frequencyMap[number]++;
        }
    });

    let largest = 0;

    for (var i = 2; i <= 12; i++) {
    if (frequencyMap[i] > largest ) {
        largest = frequencyMap[i];
    }
    }


    // Loop through the numbers and create bars for each number
    for (let i = 2; i <= 12; i++) {
        const barContainer = document.createElement('div'); // Create a container for each bar and label
    barContainer.classList.add('bar-container');

    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${frequencyMap[i] * 400/largest}px`; // Adjust the scaling as needed

    // Create the label below the bar
    const barLabel = document.createElement('div');
    barLabel.classList.add('bar-label');
    barLabel.textContent = `${i}`;
    const barLabel2 = document.createElement('div');
    barLabel2.classList.add('bar-label-nr');
    barLabel2.textContent = `${frequencyMap[i]}`;

    // Append the bar and label to the container
    barContainer.appendChild(bar);
    barContainer.appendChild(barLabel);
    barContainer.appendChild(barLabel2);

    histogramContainer.appendChild(barContainer); // Append the container to the histogram
    }
};

function clickButton(){
    let input;
    while (true) { // this loop runs forever    
        input = prompt("How often do you want to roll the virtual dice?");
        input = parseInt(input);
        if (isNaN(input)) {
            alert("That is not a number!");
        } 
        else {
            break;
        }
    }
    console.log(input);
    for(let i=1;i<=input;i++){
     document.querySelector(".computer").click();
    }
    console.log(`I clicked ${input} times.`)
};


// code to show what this is
let exp = document.querySelector(".ul2")
let text1 = `This is a counter for the game of catan.
\r\n Do you know the feeling? You're playing a round of catan, but your numbers are never rolled.
\r\n Be sad no more! With Catan counter, you can prove your fellow players how unlucky you were this round.
\r\n \r\n Get rolling!`
exp.addEventListener("click", () => openExplanation("What is this?", text1));

function openExplanation(heading, text){
    document.querySelector(".resultsbutton").style.display = "none"
    let header = document.querySelector(".headermain")
    header.innerText = heading;
    let dices = document.querySelector(".dices")
    dices.innerHTML=""
    let paragra = document.createElement('div');
        paragra.className = `paragra`;
        paragra.textContent = text;
        dices.appendChild(paragra);
    ;

}


// code to show how to use

let exp2 = document.querySelector(".ul3")
let text2 = `Using catancounter is quite simple: You just log every dice roll you make in the real game by clicking on the number.
\r\n You can also click on the button "roll random" to roll a virtual dice instead. Then, the number rolled is logged automatically.
\r\n \r\n Clicking on show results gives you a histogram of the numbers rolled.


\r\n\r\n More features to come soon! 
`
exp2.addEventListener("click", () => openExplanation("How does this work?", text2));
