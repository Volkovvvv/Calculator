import '../styles/style.css';

let result = 0;
let currentFirstNum = '';
let currentSecondNum = '';
let operation = '';
let isResult = false;
let isError = false;

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleButton = document.getElementById('theme-toggle');
  let resultDOM = document.querySelector('.result');
  const operationDOM = document.querySelectorAll('#operation');
  const numbers = document.querySelectorAll('#number');
  const extraOperations = document.querySelectorAll('.extra-operation');

  let isTheme = false;
  console.log(themeToggleButton);

  themeToggleButton.addEventListener('change', () => {
    if (isTheme) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });
  function enableDarkMode() {
    isTheme = true;
    document.body.classList.add('dark-mode');
  }
  function disableDarkMode() {
    isTheme = false;
    document.body.classList.remove('dark-mode');
  }

  numbers.forEach(item => {
    item.addEventListener('click', () => {
      if (isError) {
        resetValues();
      }
      enableAllOperations();

      if (resultDOM.value.length >= 15) {
        resultDOM.style.fontSize = '0.6rem';
        resultDOM.value = 'Достигнут лимит длины строки';
        return;
      }

      if (item.value === ',') {
        if (!operation) {
          if (!currentFirstNum.includes('.')) {
            currentFirstNum = currentFirstNum || '0';
            currentFirstNum += '.';
            resultDOM.value = currentFirstNum;
          }
        } else {
          if (!currentSecondNum.includes('.')) {
            currentSecondNum = currentSecondNum || '0';
            currentSecondNum += '.';
            resultDOM.value = `${currentFirstNum}${operation}${currentSecondNum}`;
          }
        }
        return;
      }

      if (isResult) {
        currentFirstNum = item.value;
        currentSecondNum = '';
        operation = '';
        resultDOM.value = currentFirstNum;
        isResult = false;
      } else {
        if (!operation) {
          currentFirstNum += item.value;
          resultDOM.value = currentFirstNum;
        } else {
          currentSecondNum += item.value;
          resultDOM.value = `${currentFirstNum}${operation}${currentSecondNum}`;
        }
      }

      resizeFont();
    });
  });

  operationDOM.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isError || resultDOM.value === 'Достигнут лимит числа') {
        resetValues();
        isError = false;
      }

      if (btn.value === '=') {
        if (currentSecondNum) {
          result = calculate(+currentFirstNum, +currentSecondNum, operation);
          resultDOM.value = result;
          isResult = true;
          currentFirstNum = result;
          currentSecondNum = '';
          operation = '';
        }
      } else {
        if (isResult) {
          isResult = false;
          currentSecondNum = '';
        }
        if (currentSecondNum) {
          result = calculate(+currentFirstNum, +currentSecondNum, operation);
          currentFirstNum = result.toString();
          resultDOM.value = result;
          currentSecondNum = '';
        }
        operation = btn.value;
        resultDOM.value = `${currentFirstNum}${operation}`;
      }
      resizeFont();
    });
  });

  const calculate = (num1, num2, operation) => {
    switch (operation) {
      case 'AC':
        return 1;
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '×':
        return num1 * num2;
      case '÷':
        if (num2 === 0) {
          operationDOM.forEach(btn => disableOperations(btn));
          extraOperations.forEach(btn => disableOperations(btn));
          isError = true;
          return 'Ошибка';
        } else {
          return num1 / num2;
        }
      default:
        return num1;
    }
  };

  extraOperations.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.value === 'AC') {
        resetValues();
      }
      if (btn.value === '%') {
        if (!currentFirstNum && !currentSecondNum) {
          return;
        }
        if (currentSecondNum) {
          currentSecondNum = parseFloat(currentSecondNum) / 100;
          resultDOM.value = `${currentFirstNum}${operation}${currentSecondNum}`;
        } else {
          currentFirstNum = parseFloat(currentFirstNum) / 100;
          resultDOM.value = currentFirstNum;
        }
      }
      if (btn.value === '+/-') {
        console.log('sdsd');
        if (!currentSecondNum) {
          currentFirstNum = -currentFirstNum;
          resultDOM.value = currentFirstNum;
        } else {
          currentSecondNum = -currentSecondNum;
          resultDOM.value = `${currentFirstNum}${operation}(${currentSecondNum})`;
        }
      }
      resizeFont();
    });
  });

  const disableOperations = item => {
    item.setAttribute('disabled', 'true');
    item.style.opacity = 0.2;
    item.style.pointerEvents = 'none';
  };

  const enableOperations = item => {
    item.removeAttribute('disabled');
    item.style.opacity = 1;
    item.style.pointerEvents = 'auto';
  };

  const enableAllOperations = () => {
    operationDOM.forEach(btn => enableOperations(btn));
    extraOperations.forEach(btn => enableOperations(btn));
  };

  const resetValues = () => {
    result = 0;
    currentFirstNum = '';
    currentSecondNum = '';
    operation = '';
    isResult = false;
    isError = false;
    resultDOM.value = '0';
    enableAllOperations();
    resizeFont();
  };

  const resizeFont = () => {
    if (resultDOM.value.length > 10) {
      resultDOM.style.fontSize = '1rem';
    } else {
      resultDOM.style.fontSize = '1.5rem';
    }
  };
});
