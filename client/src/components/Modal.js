class Modal {
  constructor() {
    this._modal = document.querySelector('#modal');
    this._modalBtn = document.querySelector('#modal-btn');
    this.addEventListeners();
  }

  addEventListeners() {
    this._modalBtn.addEventListener('click', this.open.bind(this)); // open modal to enter new idea
    window.addEventListener('click', this.outsideClick.bind(this)); // check if we clicked outside the modal window and call close

    // We send a 'closemodal' event from IdeaForm. It is picked up by the Modal form here
    // which then closes the modal.
    document.addEventListener('closemodal', () => this.close());
  }

  open() {
    this._modal.style.display = 'block';
  }

  close() {
    this._modal.style.display = 'none';
  }

  outsideClick(e) {
    if (e.target === this._modal) {
      this.close();
    }
  }
}

export default Modal;
