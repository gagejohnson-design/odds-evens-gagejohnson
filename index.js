// MAIN (Required)

// =========1) State + Core Logic (non-UI area)==========
// // state
// // Stores arrays: numberBank, odds, evens (single source of truth).

const state = {
  numberBank: [],
  oddNumbers: [],
  evenNumbers: [],
};

let rootElement;

// // addNumber(value)
// // Validates/coerces input to a number, pushes into numberBank, triggers rerender.

function addNumber(value) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return;
  }
  state.numberBank.push(number);
  render();
}

// // sortOneNumber()
// // Removes first item from numberBank, routes to odds/evens, triggers rerender.

function sortOneNumber() {
  if (state.numberBank.length === 0) return;

  const first = state.numberBank.shift();

  if (isEven(first)) {
    state.evenNumbers.push(first);
  } else {
    state.oddNumbers.push(first);
  }
  render();
}

// // sortAllNumbers()
// // Routes all items from numberBank to odds/evens, empties bank, triggers rerender.

function sortAllNumbers() {
  while (state.numberBank.length > 0) {
    const first = state.numberBank.shift();

    if (isEven(first)) {
      state.evenNumbers.push(first);
    } else {
      state.oddNumbers.push(first);
    }
  }
  render();
}

// // isEven(n)
// // Parity helpers used by sort functions to route numbers correctly.

function isEven(n) {
  return n % 2 === 0;
}

// 2) ===========UI Components + Rendering (UI area)===========
// // render()
// // Clears root + rebuilds full UI from state (calls component functions).

function render() {
  rootElement.innerHTML = "";
  rootElement.appendChild(createApp());
}

// // createApp()
// // Composes the full layout (header, form, controls, lists).

function createApp() {
  const container = document.createElement("div");

  const header = createHeader();
  const form = createNumberForm();
  const controls = createSortControls();

  const bankList = createNumberList("Number Bank", state.numberBank);
  const oddList = createNumberList("Odd Numbers", state.oddNumbers);
  const evenList = createNumberList("Even Numbers", state.evenNumbers);

  container.appendChild(header);
  container.appendChild(form);
  container.appendChild(controls);
  container.appendChild(bankList);
  container.appendChild(oddList);
  container.appendChild(evenList);

  return container;
}

// // createHeader()
// // Builds the title/header section.

function createHeader() {
  const header = document.createElement("h1");
  header.textContent = "Number Bank";
  return header;
}

// // createNumberForm()
// // Builds input + “Add number” button; event handler calls addNumber() only.

function createNumberForm() {
  const form = document.createElement("form");

  const input = document.createElement("input");
  input.type = "number";

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Add number";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    addNumber(input.value);
    input.value = "";
  });

  form.appendChild(input);
  form.appendChild(button);

  return form;
}

// // createSortControls()
// // Builds “Sort 1” + “Sort All”; handlers call sortOneNumber()/sortAllNumbers() only.

function createSortControls() {
  const container = document.createElement("div");

  const sortOneButton = document.createElement("button");
  sortOneButton.type = "button";
  sortOneButton.textContent = "Sort 1";
  sortOneButton.addEventListener("click", () => {
    sortOneNumber();
  });

  const sortAllButton = document.createElement("button");
  sortAllButton.type = "button";
  sortAllButton.textContent = "Sort All";
  sortAllButton.addEventListener("click", () => {
    sortAllNumbers();
  });

  container.appendChild(sortOneButton);
  container.appendChild(sortAllButton);

  return container;
}

// // createNumberList(title, numbers)
// // Reusable list component for Number Bank, Odds, Evens.

function createNumberList(title, numbers) {
  const section = document.createElement("section");

  const heading = document.createElement("h2");
  heading.textContent = title;

  const list = document.createElement("ul");

  if (numbers.length === 0) {
    const li = document.createElement("li");
    li.textContent = "-";
    list.appendChild(li);
  } else {
    numbers.forEach((n) => {
      const li = document.createElement("li");
      li.textContent = n;
      list.appendChild(li);
    });
  }

  section.appendChild(heading);
  section.appendChild(list);

  return section;
}

// 3) Event Wiring Rules (cross-cutting)
// // Event listeners update state via functions only.
// // No direct DOM edits inside handlers besides calling render() (or state function triggers render).

// BONUS (Optional)

// A) Random Number
// // addRandomNumber()
// // Generates a random integer and feeds it into addNumber().

function addRandomNumber() {}

// // createRandomButton()
// // UI button that calls addRandomNumber().

function createRandomButton() {}

// B) Comma-Separated Input
// // parseNumberInput(rawString)
// // Splits by commas, trims, converts to numbers, filters invalids.

function parseNumberInput(rawString) {}

// // addNumbers(valuesArray)
// // Adds multiple numbers to numberBank in one go, then rerenders.

function addNumbers(valuesArray) {}

// C) Sort N At A Time
// // state.sortCount (or similar)
// // Stores how many to sort per action.

state.sortCount = undefined;

// // sortNNumbers(count)
// // Repeats “sort one” logic count times or until bank is empty.

function sortNNumbers(count) {}

// // createSortCountControl()
// // Input/select that updates state.sortCount.

function createSortCountControl() {}

// D) Sorted Categories (Asc/Desc)
// // state.sortOrder ('asc' | 'desc')
// // Stores current sort direction preference.

state.sortOrder = undefined;

// // sortCategoryArrays()
// // Sorts odds/evens after inserts according to sortOrder.

function sortCategoryArrays() {}

// // createSortOrderDropdown()
// // UI control to toggle asc/desc; updates state.sortOrder and rerenders.

function createSortOrderDropdown() {}

rootElement = document.getElementById("app");
render();
