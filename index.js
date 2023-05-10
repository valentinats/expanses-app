const LIMIT = 10000;
const CURRENCY = "руб.";
const STATUS_IN_LIMIT = "все хорошо";
const STATUS_OUT_OF_LIMIT = "все плохо";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status_red";

const inputNode = document.querySelector(".js-input");
const buttonNode = document.querySelector(".js-button");
const historyNode = document.querySelector(".js-history");
const sumNode = document.querySelector(".js-sum");
const limitNode = document.querySelector(".js-limit");
const statusNode = document.querySelector(".js-status");

const expenses = [];

init(expenses);

buttonNode.addEventListener("click", function () {
  const expense = getExpanseFromUser(); // получаем расход от пользователя.

  if (!expense) {
    // проверка, есть ли расход. Если его нет - ничего не делаем.
    return;
  }

  trackExpense(expense); // если расход есть, отслеживаем его.

  render(expenses); // и отрисовываем интерфейс.
});

function init(expenses) {
  limitNode.innerText = LIMIT;
  statusNode.innerText = STATUS_IN_LIMIT;
  sumNode.innerText = calculateExpanses(expenses);
}

function trackExpense(expense) {
  expenses.push(expense);
}

function getExpanseFromUser() {
  if (inputNode.value === "") {
    // проверка ввода. если поле ввода пустое:
    return null; // при нажатии на "добавить" в консоль ничего не будет выводиться, происходит завершение функции.
  }

  const expense = parseInt(inputNode.value); // parseInt - в консоли преобразует строку в число. Также округляет его до целого без знаков после запятой.

  clearInput();

  return expense;
}

function clearInput() {
  inputNode.value = ""; //сброс поля ввода после нажатия на кнопку "добавить".
}

// !Считаем общую сумму расходов:
function calculateExpanses(expenses) {
  let sum = 0;

  expenses.forEach((element) => {
    // список расходов.
    sum += element;
  });

  return sum;
}

function render(expenses) {
  // передача расходов.
  const sum = calculateExpanses(expenses); // считаем сумму.

  renderHistory(expenses);
  renderSum(sum);
  renderStatus(sum);
}

// !Выводим список трат:
function renderHistory(expenses) {
  let expensesListHTML = "";

  expenses.forEach((element) => {
    // список расходов.
    const elementHTML = `<li>${element} ${CURRENCY}</li>`;
    expensesListHTML += elementHTML;
  });

  historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}

function renderSum(sum) {
  sumNode.innerText = sum;
}

// !Сравнение с лимитом и вывод статуса:
function renderStatus(sum) {
  if (sum <= LIMIT) {
    statusNode.innerText = STATUS_IN_LIMIT;
  } else {
    statusNode.innerText = STATUS_OUT_OF_LIMIT;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME); //прописали св-во цвета в файле css, но класс в html добавится к элементу через js
  }
}
