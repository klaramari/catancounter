

document.addEventListener('DOMContentLoaded', function() {
    let dices = document.querySelector(".dices")
 

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

});
let showresults = 0;
let numbers = [];
let reset = document.querySelector(".reset");
reset.addEventListener("click", () => {
    numbers = [];
    showResults();
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