const display = document.querySelector(".display");
const result = document.querySelector(".result");
const btns = document.querySelectorAll("button");

/* VARIABLES */
let displayContent = "";
let lastResult = ""; // 이전에 계산된 값 저장 변수
let isCalculated = false; // 계산이 완료되었는지 여부


/* FUNCTIONS */
function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function multiply(a, b) {
  return Number(a) * Number(b);
}

function divide(a, b) {
  return Number(a) / Number(b);
}


btns.forEach((btn) => {
  switch (btn.classList[0]) {
    case "operator":
      btn.addEventListener("click", operatorBtn);
      break;
    case "clear":
      btn.addEventListener("click", clearBtn);
      break;
    case "equal":
      btn.addEventListener("click", equalBtn);
      break;  
    case "operator2":
      if (btn.textContent === "+/-") {
        btn.addEventListener("click", plusMinusBtn);
    } else if (btn.textContent === "%") {
       btn.addEventListener("click", percentageBtn);
  }
  break;

    default:
      btn.addEventListener("click", numberBtn);
      break;
  }
});

function numberBtn(e) {
  displayContent += e.target.textContent;
  display.innerHTML = displayContent;
  // result.innerHTML = e.target.textContent; // 숫자나 연산자 입력시 result에도 보여지도록 추가
  result.innerHTML = displayContent;
  isCalculated = false; 
}

function equalBtn(e) {
  if (!isCalculated && displayContent) {
    // 계산 전이면 계산 실행
    let operator = displayContent.match(/[^\d\.]+/g)[0];
    let operands = displayContent.split(/[^\d\.]+/g);
    let answer;
    switch (operator) {
      case "+":
        answer = add(operands[0], operands[1]);
        break;
      case "-":
        answer = subtract(operands[0], operands[1]);
        break;
      case "×":
        answer = multiply(operands[0], operands[1]);
        break;
      case "÷":
        answer = divide(operands[0], operands[1]);
        break;
      default:
        answer = "0";
        break;
    }
    result.innerHTML = answer;
    lastResult = answer; // 이전에 계산된 값 저장
    display.innerHTML = displayContent; 
    displayContent = "";
    isCalculated = true; // 계산 완료됨
  }
}

function clearBtn(e) {
  displayContent = "";
  // display.innerHTML = displayContent;
  display.innerHTML = ""
  result.innerHTML = "0";
  isCalculated = false; // 계산 전이므로 "=" 버튼 활성화
}

function operatorBtn(e) {
  // 이전에 계산된 값이 있으면 이어서 계산
  if (lastResult) {
    displayContent = lastResult + e.target.textContent;
    lastResult = "";
  } else {
    displayContent += e.target.textContent;
  }
  display.innerHTML = displayContent;
  result.innerHTML = e.target.textContent;
  isCalculated = false; // 계산 중이므로 "=" 버튼 활성화
}


function plusMinusBtn(e) {
  let currentValue = parseFloat(displayContent); // 현재 입력된 숫자를 가져오기
  if (currentValue !== 0) { 
    currentValue = -currentValue;
    displayContent = currentValue.toString(); 
    display.innerHTML = displayContent; // 변경된 값을 화면에 표시합니다.
    result.innerHTML = displayContent;
  }
}

function percentageBtn(e) {
  let currentValue = parseFloat(displayContent); // 현재 입력된 숫자를 가져오기
  currentValue = currentValue / 100; // 현재 값에 100을 나누어 백분율 값을 계산
  displayContent = currentValue.toString(); 
  display.innerHTML = displayContent; 
  result.innerHTML = displayContent;
}
