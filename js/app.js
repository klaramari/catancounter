

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
    lastroll.innerText = `Your last roll was ${number}`;
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
    }
}