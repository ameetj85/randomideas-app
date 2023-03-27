// Using Axios for API calls
import axios from 'axios';

class IdeasApi {
  constructor() {
    this._url = 'http://localhost:5000/api/ideas';
  }

  getIdeas() {
    return axios.get(this._url);
  }

  createIdea(data) {
    return axios.post(this._url, data);
  }

  updateIdea(id, data) {
    return axios.put(`${this._url}/${id}`, data);
  }

  deleteIdea(id) {
    const userName = localStorage.getItem('username')
      ? localStorage.getItem('username')
      : '';
    return axios.delete(`${this._url}/${id}`, {
      data: {
        username: userName,
      },
    });
  }
}

export default new IdeasApi();
