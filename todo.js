// HTML에서 필요한 것들을 얻기 위해 querySelector를 사용함
const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    // id가 1일경우에만을 의미한다
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}
function saveToDos() {
  // localStorage는 string형식만 저장하므로 변경해준다
  //   JSON은 자바스크립트 객체 notation의 준말이다
  //   데이터를 전달할때,자바스크립트가 그걸 다룰 수 있도록 Object로 바꿔주는 기능
  //   STRING<->OBJECT
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  //   윈도우에서 이모지는 윈도우키+온점
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);

  //   엔터치고나면 사라짐
  toDoInput.value = "";
}

function someThing(toDo) {
  paintToDo(toDo.text);
}

function loadToDos() {
  //value값 저장함
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedTodos = JSON.parse(loadedToDos);
    parsedTodos.forEach(someThing);
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
