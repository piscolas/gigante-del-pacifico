import axios from 'axios';

const api = axios.create({
  baseURL: 'https://us-central1-cloud-sales-da995.cloudfunctions.net/app/api',
})

export default api;