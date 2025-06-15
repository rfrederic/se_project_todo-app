import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const generateTodo = (data, counterInstance) => {
  const todo = new Todo(data, "#todo-template").getView();

  const checkbox = todo.querySelector(".todo__checkbox");
  if (checkbox) {
    checkbox.checked = !!data.completed;
    checkbox.addEventListener("change", (e) => {
      counterInstance.updateCompleted(e.target.checked);
    });
  }

  const delBtn = todo.querySelector(".todo__delete");
  if (delBtn) {
    delBtn.addEventListener("click", () => {
      const wasCompleted = checkbox ? checkbox.checked : false;
      todo.remove();
      counterInstance.updateTotal(false);
      if (wasCompleted) counterInstance.updateCompleted(false);
    });
  }

  return todo;
};

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const section = new Section({
  items: initialTodos,
  renderer: (item) => generateTodo(item, todoCounter),
  containerSelector: ".todos__list",
});
section.renderItems();
const addTodoPopup = new PopupWithForm("#add-todo-popup", (values) => {
  const newTodo = {
    id: uuidv4(),
    name: values.name,
    date: new Date(values.date).toISOString(),
    completed: false,
  };

  section.addItem(generateTodo(newTodo, todoCounter));
  todoCounter.updateTotal(true);
  addTodoPopup.close();
});
addTodoPopup.setEventListeners();

document
  .querySelector(".button_action_add")
  .addEventListener("click", () => addTodoPopup.open());

const formElement = document.forms["add-todo-form"];
const formValidator = new FormValidator(validationConfig, formElement);
formValidator.enableValidation();
