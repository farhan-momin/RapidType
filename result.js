const dataValues = [10, 10, 10, 50];
 
let valueDisplays = document.querySelectorAll(".num");
let interval = 4000;

valueDisplays.forEach((valueDisplay, index) => 
{
  let startValue = 0;

  let endValue = dataValues[index]; 
  let duration = Math.floor(interval / endValue);
  
  let counter = setInterval
  (function () 
    {
      startValue += 1;
      valueDisplay.textContent = startValue;
      if (startValue == endValue) 
        {
          clearInterval(counter);
        }
    }, 
    duration);
}
);

