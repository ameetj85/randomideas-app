// Using Axios for API calls
import axios from 'axios';

class IdeasApi {
  constructor() {
    this._url = 'http://localhost:5000/api/ideas';
  }

  getIdeas() {
    return axios.get(this._url);
  }
}

export default new IdeasApi();
