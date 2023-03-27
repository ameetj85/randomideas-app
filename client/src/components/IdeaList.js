import IdeasApi from '../services/IdeasApi';
class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');
    this._ideas = [];

    this.getIdeas();

    this._validTags = new Set();
    this._validTags.add('technology');
    this._validTags.add('software');
    this._validTags.add('business');
    this._validTags.add('education');
    this._validTags.add('health');
    this._validTags.add('inventions');
  }

  addEventListeners() {
    // event delegation - bind to click even on idea list container
    this._ideaListEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-times')) {
        // delete button has a class of fa-times
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
    });
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      // the 2nd .data is the property of the object that is returned and which contains the array of ideas
      this._ideas = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {
    try {
      if (confirm('Are you sure that you want to delete this idea?')) {
        // delete from servers
        const res = await IdeasApi.deleteIdea(ideaId);
        this._ideas.filter((idea) => idea._id !== ideaId);
        this.getIdeas();
      }
    } catch (error) {
      //console.log(error);
      alert('You cannot delete this resource!');
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = '';
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tag = '';
    }

    return tagClass;
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        const deleteBtn =
          idea.username === localStorage.getItem('username')
            ? `<button class="delete">
              <i class="fas fa-times"></i>
            </button>`
            : '';
        return `
            <div class="card" data-id="${idea._id}">
            ${deleteBtn}
            <h3>
                ${idea.text}
            </h3>
            <p class="tag ${tagClass}">${idea.tag}</p>
            <p>
                Posted on <span class="date">${idea.date}</span> by
                <span class="author">${idea.username}</span>
            </p>
            </div>
        `;
      })
      .join('');
    this.addEventListeners();
  }
}

export default IdeaList;
