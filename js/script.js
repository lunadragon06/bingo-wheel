const bingoWheel = document.querySelector(".number");
const currentNumber = document.getElementById("number_display");
const b = document.querySelector(".number_b");
const i = document.querySelector(".number_i");
const n = document.querySelector(".number_n");
const g = document.querySelector(".number_g");
const o = document.querySelector(".number_o");

/* Bingospill - styling */
function defaultWheel() {
    bingoWheel.style.background = "rgb(255 166 0 / 50%)";
    bingoWheel.style.border = "25px solid rgb(242 116 5 / 75%)";
    currentNumber.style.color = "#7a0202";
}
  
defaultWheel();

/* BINGOSPILL - variabler */
let allNumbers = [...Array(75).keys()].map((x) => ++x);
let numberOrders = document.getElementById("previousNumbers");
let selectedNumbers = [];
const shuffle = document.getElementById("shuffle"); 
const restartGame = document.getElementById("restart");

// forhåndsvis trekte tall
const add = (number, value) => {
    selectedNumbers.push(value);
    currentNumber.innerHTML = value;
    console.log(selectedNumbers);
    previousNumbers();

    let numWithoutLetter = value;
  console.log(numWithoutLetter);  
  // skal erstatte nummer-verier i string inni ID-feltet i HTML'en for hvert bingotall  
  numWithoutLetter = numWithoutLetter.replace("B", "");
  numWithoutLetter = numWithoutLetter.replace("I", "");
  numWithoutLetter = numWithoutLetter.replace("N", "");
  numWithoutLetter = numWithoutLetter.replace("G", "");
  numWithoutLetter = numWithoutLetter.replace("O", "");
  // for å sjekke om tallene har blitt gjort om til string 
  console.log(numWithoutLetter);

  // endre design/stil på bingokulene for tall som er blitt trekt 
  let highlightNumber = document.getElementById(numWithoutLetter);
  highlightNumber.classList.add("drawn");
  highlightNumber.style.transform = "scale(1.2)";
}

// forhåndsvis hele bingobrett før- og etter talltrekk 
for(let num = 1; num < 76; num++) {
    if(num <= 15) {
      b.innerHTML += `<div class="bingo_number" id=${num}>B${num}</div>`; 
    }
    if(num >= 16 && num <= 30) {
      i.innerHTML += `<div class="bingo_number" id=${num}>I${num}</div>`; 
    }
    if(num >= 31 && num <= 45) {
      n.innerHTML += `<div class="bingo_number" id=${num}>N${num}</div>`; 
    }
    if(num >= 46 && num <= 60) {
      g.innerHTML += `<div class="bingo_number" id=${num}>G${num}</div>`; 
    } 
    if(num >= 61 && num <= 75) {
      o.innerHTML += `<div class="bingo_number" id=${num}>O${num}</div>`; 
    } 
  } 

// genererer tilfeldige tall som ikke gjentar seg, og som kommer i hele tall  
const getRandom = (min = 1, max = 75) =>
Math.floor(Math.random() * (max - min)) + min;

function sortNumber() {
  let numberTable = getRandom(0, allNumbers.length);
  let value = allNumbers[numberTable];
  allNumbers.splice(numberTable, 1);

  // tallvisninger inni sirkelen under talltrekking (ut ifra nåværende trekte tall)
  switch (true) {
    case value <= 15:
      add(b, `B${value}`); 
      break;
    case value <= 30:
      add(i, `I${value}`); 
      break;
    case value <= 45:
      add(n, `N${value}`); 
      break;
    case value <= 60:
      add(g, `G${value}`); 
      break;
    case value <= 75:
      add(o, `O${value}`); 
      break;
    default:
      break;
  }
}

function previousNumbers() {
  const colorCode = document.querySelector(".bingo_number-orders_item");
    let orderList = `<h2>Trekkefølge:</h2>
                    <ul class="bingo_number-orders">${selectedNumbers.map(data =>
                        `<li class="bingo_number-orders_item">${data}</li>`).join('')}
                    </ul>`;
    numberOrders.innerHTML = orderList;
}

// shuffle.addEventListener("click", sortNumber);
shuffle.addEventListener("click", function() {
    sortNumber();
});

// nullstill hele spillet
function reset() {
    allNumbers = [...Array(75).keys()].map((x) => ++x); // rekkene starter helt på nytt 
    currentNumber.innerHTML = "0";
    numberOrders.innerHTML = "";
    selectedNumbers = []; // tall som ble trekt "tømmes ut av systemet"
  
  // resette stylingen til alle kulene på brettet:
  let allBalls = document.getElementsByClassName("bingo_number");
  Array.prototype.forEach.call(allBalls, function(ball) {
    ball.classList.remove("drawn");
    ball.style.transform = "scale(1)";
  });
}

// nullstill klokke 
function resetClock() {
  switchButtons.innerHTML = `<i class="fas fa-play"></i>` + " START KLOKKE"; 
  switchButtons.style.background = "rgb(79 210 186 / 50%)";
  switchButtons.style.color = "#01341E"; 
  if(clockInterval) {
    clearInterval(clockInterval);
  }
  // hvordan nullstillingen blir forhåndsvist og fungerer 
  clockInterval = null;
  clockTime = 0;
  showTime.innerHTML = `<i class="far fa-clock"></i> ` + "00:00";
}

restartGame.addEventListener("click", function() {
    const startOver = confirm("Du er i ferd med å avslutte bingo-spillet! Er du sikker på at du ønsker å utføre denne handlingen?");
    if (startOver) {
      reset();
      resetClock(); 
    } else {
      alert("Vi fortsetter med å spille bingo videre 😁");
    }
  });

/* TIMER FUNKSJONER */
let clockInterval;
let clockTime = 0;
const showTime = document.querySelector(".display_clock");
const switchButtons = document.querySelector(".display_alt-btns");

function startClock() {
  switchButtons.innerHTML = `<i class="fas fa-stop"></i>` + " STOPP TID";
  switchButtons.style.background = "rgb(242 46 82 / 75%)";
  switchButtons.style.color = "#ffffff";
  if(clockInterval){
    clearInterval(clockInterval);
  }
  clockInterval = setInterval(() => { 
    clockTime += 1;
    // formatter stoppeklokke-visning
    showTime.innerHTML = 
    `<i class="far fa-clock"></i> ` + Math.floor((clockTime % 3600) / 60).toString().padStart(2, "0") + ":" + Math.floor((clockTime % 60)).toString().padStart(2, "0")
  }, 1000);
}

// stopper tiden
function stopClock() {
  switchButtons.innerHTML = `<i class="fas fa-play"></i>` + " GJENOPPTA TID";
  switchButtons.style.background = "rgb(79 210 186 / 50%)";
  switchButtons.style.color = "#01341E";
  clearInterval(clockInterval);
  clockInterval = 0;
}

// veksling mellom start og stopp funksjoner 
switchButtons.onclick = function() {
  if(clockInterval) {
    stopClock();
  } else {
    startClock();
  }
}
