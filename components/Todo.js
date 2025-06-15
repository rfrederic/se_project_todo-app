class Todo {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateEl = document.querySelector(templateSelector).content;
  }

  _setEventListeners() {
    this._checkbox.addEventListener("change", () => {
      this._data.completed = this._checkbox.checked;
      this._onToggle && this._onToggle(this._checkbox.checked);
    });

    this._deleteBtn.addEventListener("click", () => {
      this._element.remove();
      this._onDelete && this._onDelete(this._checkbox.checked);
    });
  }

  _populateFields() {
    this._element.querySelector(".todo__name").textContent = this._data.name;

    const dateSpan = this._element.querySelector(".todo__date");
    const parsed = new Date(this._data.date);
    dateSpan.textContent = isNaN(parsed)
      ? ""
      : `Due: ${parsed.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;

    this._checkbox = this._element.querySelector(".todo__completed");
    this._deleteBtn = this._element.querySelector(".todo__delete-btn");
    this._label = this._element.querySelector(".todo__label");

    this._checkbox.checked = !!this._data.completed;
    this._checkbox.id = `todo-${this._data.id}`;
    this._label.setAttribute("for", `todo-${this._data.id}`);
  }

  setCallbacks(onToggle, onDelete) {
    this._onToggle = onToggle;
    this._onDelete = onDelete;
  }

  getView() {
    this._element = this._templateEl.querySelector(".todo").cloneNode(true);
    this._populateFields();
    this._setEventListeners();
    return this._element;
  }
}

export default Todo;
