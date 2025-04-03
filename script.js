const quoteApiUrl = "https://api.quotable.io/random?minLength=150&maxLength=200";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
let quote = "";
let time = 0;
let timer = "";
let mistakes = 0;
var wpmVal
var accuracyVal
var dataValues

const renderNewQuote = async () => {
  try {
    const response = await fetch(quoteApiUrl);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    let data = await response.json();
    quote = data.content;
  } catch (error) {
    console.error("Failed to fetch quote from API:", error);
    // Fetch from local JSON if API fails
    const localResponse = await fetch("/quotes.json");
    const localData = await localResponse.json();
    const randomIndex = Math.floor(Math.random() * localData.quotes.length);
    quote = localData.quotes[randomIndex];
  }

  let arr = quote.split("").map((value) => {
    return "<span class='quote-chars'>" + value + "</span>";
  });
  quoteSection.innerHTML = arr.join("");
};

if(userInput){
userInput.addEventListener("input", () => {
  let quoteChars = document.querySelectorAll(".quote-chars");
   quoteChars = Array.from(quoteChars);

   let userInputChars = userInput.value.split("");

   quoteChars.forEach((char, index) => {
     if (char.innerText == userInputChars[index]) {
      char.classList.add("success");
    }
     else if (userInputChars[index] == null) {
       if (char.classList.contains("success")) {
        char.classList.remove("success");
      } else {
        char.classList.remove("fail");
      }
    }
     else {
       if (!char.classList.contains("fail")) {
         mistakes += 1;
        char.classList.add("fail");
      }
      document.getElementById("mistakes").innerText = mistakes;
    }
     let check = quoteChars.every((element) => {
      return element.classList.contains("success");
    });
     if (check) {
      displayResult();
    }
  });
});
}
 function updateTimer() {
    document.getElementById("timer").innerText = ++time + "s";
}

 const timeReduce = () => {
   timer = setInterval(updateTimer, 1000);
};
 const displayResult = () => {
   document.querySelector(".result").style.display = "block";
  clearInterval(timer);
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
    timeTaken = (time) / 60;
 
  wpmVal = parseInt((userInput.value.length / 5 / timeTaken).toFixed(2))
  
  accuracyVal = Math.round(
    ((userInput.value.length - mistakes) / userInput.value.length) * 100
  )
  
  document.getElementById("wpm").innerText =
    wpmVal + " wpm";
  
    document.getElementById("accuracy").innerText =
    accuracyVal + " %"
    
    dataValues = [time, accuracyVal,  mistakes, wpmVal];
    console.log(dataValues)
    localStorage.setItem('myData', JSON.stringify(dataValues));
     window.location.href = 'result.html';
};

 const startTest = () => {
  mistakes = 0;
  timer = "";
  userInput.disabled = false;
  userInput.focus();
  timeReduce();
  document.getElementById("start-test").style.display = "none";
  document.getElementById("stop-test").style.display = "block";
};

if(userInput){
userInput.addEventListener('keydown', function(event) {
   if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
       event.preventDefault();
  }
});
}

document.addEventListener('click', function() {
   userInput.focus();
});

window.onload = () => {
  userInput.value = "";
  document.getElementById("start-test").style.display = "block";
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  renderNewQuote();
};

let valueDisplays = document.querySelectorAll(".num");
let interval = 4000;

valueDisplays.forEach((valueDisplay, index) => {

  var storedDataString = localStorage.getItem('myData');
  dataValues = JSON.parse(storedDataString);
  console.log(dataValues)
  let startValue = 0;
  let endValue = dataValues[index];  
  if(endValue!=0){
  let duration = Math.floor(interval / endValue);
  let counter = setInterval(function () {
    startValue += 1;
    valueDisplay.textContent = startValue;
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
}
else{
  valueDisplay.textContent = endValue;

}
});
 
