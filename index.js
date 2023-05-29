// объявление переменных - строковых констант.
let LIMIT = 10000;
const CURRENCY = "руб.";
const STATUS_IN_LIMIT = "лимит не превышен";
const STATUS_OUT_OF_LIMIT = "лимит превышен";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status_red";

// объявление переменных - ссылок на html элементы.
const inputNode = document.querySelector(".js-input");
const limitInputNode = document.querySelector(".js-limit-input");
const categorySelect = document.querySelector("#categorySelect");
const buttonNode = document.querySelector(".js-button");
const historyNode = document.querySelector(".js-history");
const sumNode = document.querySelector(".js-sum");
const limitNode = document.querySelector(".js-limit");
const addLimitNode = document.querySelector(".js-add-limit");
const statusNode = document.querySelector(".js-status");
const resetNode = document.querySelector(".js-reset-button");

const expenses = []; // объявление основной переменной, при запуске содержит в себе пустой массив, который пополняется по нажатию на "добавить".
const categories = [];
let sum = 0;

init(expenses, categories);

buttonNode.addEventListener("click", function () {
  const expense = getExpenseFromUser(); // получаем расход от пользователя.
  const category = getCategoryFromUser();

  if (!expense) {
    // проверка, есть ли расход. Если его нет - ничего не делаем.
    return;
  }

  //пока не выбрана категория, функция не будет работать - кнопка "добавить" не активна.
  if (category === "Категория") {
    return;
  }

  //из полученных переменных собираем объект newExpense, состоящий из 2-х полей: amount и category.
  const newExpense = { amount: expense, category: category };
  console.log(newExpense);

  trackExpense(expense, category); // если расход есть, отслеживаем его.

  render(expenses); // и отрисовываем интерфейс.
});

function init(expenses) {
  limitNode.innerText = LIMIT;
  statusNode.innerText = STATUS_IN_LIMIT;
  sumNode.innerText = calculateExpenses(expenses);
}

function trackExpense(expense, category) {
  expenses.push(expense);
  categories.push(category);
}

function getExpenseFromUser() {
  if (inputNode.value === "") {
    // проверка ввода. если поле ввода пустое:
    return null; // при нажатии на "добавить" в консоль ничего не будет выводиться, происходит завершение функции.
  }

  const expense = parseInt(inputNode.value); // parseInt - в консоли преобразует строку в число. Также округляет его до целого без знаков после запятой.

  clearInput();

  return expense;
}

//возвращаем выбранную пользователем категорию.
function getCategoryFromUser() {
  const category = categorySelect.value;
  return category;
}

//Стрелочная функция. Сброс поля ввода после нажатия на кнопку "добавить".
const clearInput = () => {
  inputNode.value = "";
};

// !Считаем общую сумму расходов:
function calculateExpenses(expenses) {
  expenses.forEach((element) => {
    //пробегаем по массиву объектов expense, берем из каждого поле amount и прибавляем к переменной sum .
    // список расходов.
    sum += element;
  });

  return sum;
}

function render(expenses) {
  // передача расходов.
  const sum = calculateExpenses(expenses); // считаем сумму.

  renderHistory(expenses, categories);
  renderSum(sum);
  renderStatus(sum);
}

// !Выводим список трат:
function renderHistory(expenses, categories) {
  let expensesListHTML = "";

  //  expenses.forEach((element) => {
  // список расходов.
  for (let i = 0; i < expenses.length; i++) {
    expensesListHTML += `<li>${expenses[i]} ${CURRENCY} - ${categories[i]}</li>`;
  }
  historyNode.innerHTML = `<ol>${expensesListHTML} </ol>`;
}

function renderSum(sum) {
  sumNode.innerText = sum;
}

// !Сравнение с лимитом и вывод статуса:
function renderStatus(sum) {
  if (sum <= LIMIT) {
    statusNode.innerText = STATUS_IN_LIMIT;
    statusNode.classList.toggle;
    statusNode.className = "status";
  } else {
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} 
    (${LIMIT - sum} ${CURRENCY})`;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    //прописали св-во цвета в файле css, но класс в html добавится к элементу через js
  }
}

// ! Добавление нового лимита:
function changeLimitHandler() {
  const newLimit = getNewLimitFromUser();

  //!операнд. Оператор «логическое НЕ» превращает true в false и наоборот.
  // || - (или)
  if (!newLimit || newLimit < 0) {
    return;
  }

  togglePopup(); //закрытие попапа по нажатию на кнопку "задать лимит".

  trackNewLimit(newLimit); //отслеживаем новый лимит.

  renderNewLimit(newLimit);
  renderStatus(sum);
}

function trackNewLimit(newLimit) {
  LIMIT = newLimit;
}

function getNewLimitFromUser() {
  if (!limitInputNode.value) {
    return;
  }

  const newLimit = parseInt(limitInputNode.value); // parseInt - в консоли преобразует строку в число. Также округляет его до целого без знаков после запятой.

  clearLimitInput();

  return newLimit;
}

function clearLimitInput() {
  limitInputNode.value = "";
}

function renderNewLimit() {
  limitNode.innerText = LIMIT;
}

const newLocal = "LIMIT";

// !Сброс истории расходов:
resetNode.addEventListener("click", function () {
  historyNode.innerText = "";
  sumNode.innerText = 0;
  statusNode.innerText = STATUS_IN_LIMIT;
  statusNode.classList.remove("status_red");
  expenses.length = 0;
});

addLimitNode.addEventListener("click", changeLimitHandler);
