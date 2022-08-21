const numberContainer = document.querySelector("#number-container");
const operationContainer = document.querySelector("#operation-container");
const sumContainer = document.querySelector("#sum-container");

const buttons = [...Array(10).keys()].reverse();

const operations = [
  {
    label: "+",
    operation: (a, b) => a + b,
  },
  {
    label: "-",
    operation: (a, b) => a - b,
  },
  {
    label: "x",
    operation: (a, b) => a * b,
  },
  {
    label: "/",
    operation: (a, b) => a / b,
  },
];

let obj = {
  a: [],
  operation: null,
  label: "",
  b: [],
};


const numberMapper = (number) => {
  if (!obj.operation) {
    obj.a.push(number);
    console.log(obj);
  } else {
    obj.b.push(number);
    console.log(obj);
  }
  renderSum();
};

const operationMapper = (operation, label) => {
  if (obj.a.length > 0) {
    obj.operation = operation;
    obj.label = label;
    console.log(obj);
  }
  if (obj.b.length > 0) {
    obj.a = [operation(parseInt(obj.a.join("")), parseInt(obj.b.join("")))];
    obj.b = [];
    renderAnswer();
    console.log(obj);
  }
  renderSum();
};

const renderNumberButtons = () => {
  buttons.map((button) => {
    const number_button = document.createElement("button");
    number_button.classList.add("button");
    number_button.textContent = button;
    number_button.addEventListener("click", () => numberMapper(button));
    numberContainer.appendChild(number_button);
  });
};

const renderOperationsButtons = () => {
  operations.map((operation) => {
    const operation_button = document.createElement("button");
    operation_button.classList.add("button");
    operation_button.textContent = operation.label;
    operation_button.addEventListener("click", () =>
      operationMapper(operation.operation, operation.label)
    );
    operationContainer.appendChild(operation_button);
  });
};

const renderSum = () => {
  sumContainer.textContent = obj.a + (obj.label || "") + (obj.b || "");
};
const renderAnswer = () => {
  sumContainer.textContent = obj.a + obj.label + obj.b + "=" + answer;
};

const clearAnswer = () => {
  sumContainer.textContent = "";
};

const sum = () => {
    if (obj.b == 0 && obj.label == "/") {
        answer = "Don't divide by zero"
        renderAnswer();
    } else {
        answer = obj.operation(parseInt(obj.a.join("")), parseInt(obj.b.join("")));
        renderAnswer();
    }
  
  obj = { a: [], operation: null, b: [] };
};

const clearSum = () => {
  obj = { a: [], operation: null, b: [] };
  clearAnswer();
};

renderNumberButtons();
renderOperationsButtons();
renderSum();
