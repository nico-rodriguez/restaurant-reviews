import { create } from 'axios';


export default create({
  baseURL: 'http://localhost:5000/api/v1/restaurants',
  headers: {
    'Content-Type': 'application/json'
  }
})