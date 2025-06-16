import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector("form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll("input");
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();

    if (this._form) {
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        const inputValues = this._getInputValues();
        this._handleFormSubmit(inputValues);

        this._form.reset();
      });
    }
  }
}

export default PopupWithForm;
