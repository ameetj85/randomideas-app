import IdeasApi from '../services/IdeasApi';
import IdeaList from './IdeaList';

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector('#form-modal');
    this._ideaList = new IdeaList();
  }

  addEventListeners() {
    this._form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const idea = {
      text: this._form.elements.text.value, // name of element is text
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };

    // this will add idea to server
    const newIdea = await IdeasApi.createIdea(idea);

    // add idea to list
    this._ideaList.addIdeaToList(newIdea.data.data);

    this.clearFields();

    // There is no direct way of telling the Modal form to close.
    // We dispatch an event from here so that it is picked up Modal form and it knows to close itself.
    document.dispatchEvent(new Event('closemodal'));
  }

  clearFields() {
    this._form.elements.text.value = '';
    this._form.elements.tag.value = '';
    this._form.elements.username.value = '';
  }

  render() {
    this._formModal.innerHTML = `
            <form id="idea-form">
            <div class="form-control">
                <label for="idea-text">Enter a Username</label>
                <input type="text" name="username" id="username" />
            </div>
            <div class="form-control">
                <label for="idea-text">What's Your Idea?</label>
                <textarea name="text" id="idea-text"></textarea>
            </div>
            <div class="form-control">
                <label for="tag">Tag</label>
                <input type="text" name="tag" id="tag" />
            </div>
            <button class="btn" type="submit" id="submit">Submit</button>
            </form>
        `;

    // We cannot invoke the next two lines in constructor b/c idea-form does not exist in DOM.
    // It is added in render(), above. Hence why we execute the lines here,
    // after idea-form has been inserted into the DOM.
    this._form = document.querySelector('#idea-form');
    this.addEventListeners();
  }
}

export default IdeaForm;
