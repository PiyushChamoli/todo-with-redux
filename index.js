let store = Redux.createStore(reducer);

let input = document.querySelector("input");
let ul = document.querySelector("ul");

function handleInput(event) {
  if (event.keyCode === 13 && event.target.value) {
    store.dispatch({
      type: "add",
      todo: event.target.value,
      isCompleted: false,
    });
    event.target.value = "";
  }
}

function createUI(todos) {
  ul.innerHTML = "";
  todos.forEach((todo, i) => {
    let li = document.createElement("li");
    li.classList.add("flex");
    let div = document.createElement("div");
    div.classList.add("flex");

    let radio = document.createElement("input");
    radio.type = "checkbox";
    radio.checked = todo.isCompleted;
    radio.addEventListener("click", () => {
      store.dispatch({
        type: "changeComplete",
        isCompleted: !todo.isCompleted,
        id: i,
      });
    });

    let h2 = document.createElement("h2");
    h2.innerText = todo.todo;

    let close = document.createElement("span");
    close.innerText = "❌";
    close.classList.add("cursor-pointer");
    close.addEventListener("click", () => {
      store.dispatch({ type: "delete", id: i });
    });

    div.append(radio, h2);
    li.append(div, close);
    ul.append(li);
  });
}

store.subscribe(() => {
  let todos = store.getState();
  createUI(todos);
});

input.addEventListener("keyup", handleInput);

function reducer(state = [], action) {
  switch (action.type) {
    case "add":
      return state.concat({
        todo: action.todo,
        isCompleted: action.isCompleted,
      });
      break;
    case "delete":
      return state.filter((todo, i) => i !== action.id);
      break;
    case "changeComplete":
      return state.filter((todo, i) => {
        if (action.id === i) {
          todo.isCompleted = action.isCompleted;
        }
        return todo;
      });
      break;
    default:
      return state;
  }
}
