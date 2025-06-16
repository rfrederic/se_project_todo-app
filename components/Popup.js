class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    if (!this._popup) {
      throw new Error(`Popup: element not found for selector ${selector}`);
    }

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      const isOverlayClick = evt.target === this._popup;
      const isCloseBtnClick = evt.target.classList.contains("popup__close");

      if (isOverlayClick || isCloseBtnClick) {
        this.close();
      }
    });

    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}

export default Popup;
