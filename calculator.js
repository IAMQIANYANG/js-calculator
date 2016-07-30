/**
 * Created by pandachain on 2016-07-29.
 */

// first row of the calculator, used to display result;
var result = document.querySelector('#result p');

// second row of the calculator, used to show the current calculation result without click "=";
var preview = document.querySelector('#preview p');

// to store the operators used in real calculation, e.g "x" is stored as "*";
var realCalculation = '';

// to store if equal sign has been clicked;
var equalClicked = false;

// all buttons expect ac and del
var calcButtons = document.querySelectorAll('.calc td');

//assign event to all digits and operators(except for "=")
var addEventsCalcButtons = function () {
  for (let i = 0; i < calcButtons.length; i++) {
    // if digit is clicked, the value is passed to the first and second row
    // if operator (except equal sign) is clicked, the value is only passed to the first row
    // if equal is clicked, pass the result to the first row, and clean the second row
    if (calcButtons[i].className === 'digit') {
      calcButtons[i].addEventListener('click', function () {
        checkAndPassValue(i);
        calculate(preview);
        equalClicked = false;

      })
    } else if (calcButtons[i].className === 'operator' && calcButtons[i].innerHTML !== '=') {
      calcButtons[i].addEventListener('click', function () {
        checkAndPassValue(i);
        equalClicked = false;

      })
    } else {
      calcButtons[i].addEventListener('click', function () {
        calculate(result);
        preview.innerHTML = '';
        equalClicked = true;
      });
    }
  }

};

var calculate = function(element){
    realCalculation = result.innerHTML.replace(/×/g, '*').replace(/÷/g, '/');
    element.innerHTML = eval(realCalculation);
};

//show the value clicked in the first row of calculator
var checkAndPassValue = function(i){
  // check if equal sign has been clicked
  // check if first value is an operator
  // check when first value is 0, and if second value is a digit or a decimal point
  // check if more decimal points entered
  // check if two operators entered together;
  // check if divisor is zero
  if (equalClicked){
    result.innerHTML = calcButtons[i].innerHTML;
  } else if (result.innerHTML.length === 0 && isNaN(calcButtons[i].innerHTML) && calcButtons[i].innerHTML !== '.'){
    return;
  } else if(result.innerHTML.length === 1 && result.innerHTML[0] === '0' && calcButtons[i].innerHTML !== '.') {
    result.innerHTML = ''+ calcButtons[i].innerHTML;
   } else if(calcButtons[i].innerHTML === '.' && result.innerHTML.indexOf('.') !== -1){
    return;
  } else if(calcButtons[i].className === 'operator' &&  result.innerHTML.indexOf(calcButtons[i].innerHTML) !== -1) {
    return;
  } else if(calcButtons[i].innerHTML === '0' && result.innerHTML.slice(-1) === "÷") {
    preview.innerHTML = '∞'
  } else {
    result.innerHTML += calcButtons[i].innerHTML;
  }
};


var clear = function(){
  var ac = document.querySelector('#clear');
  ac.addEventListener('click', function(){
    result.innerHTML = '';
    preview.innerHTML = '';
  })

};

var del = function(){
  var dele = document.querySelector('#delete');
  dele.addEventListener('click', function(){
    result.innerHTML = result.innerHTML.slice(0, -1);
    preview.innerHTML = '';
  })
};


var ready = function(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};

ready(addEventsCalcButtons);
ready(clear);
ready(del);
