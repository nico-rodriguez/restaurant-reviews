import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import RestaurantsList from './RestaurantsList';
import ReviewForm from './ReviewForm';
import Restaurant from './Restaurant';
import Login from './Login';


export default function Main({ login }) {
  return (
    <div className="container mt-3">
      <Routes>
        <Route path='/' element={<RestaurantsList />} />
        <Route path='/restaurants' element={<RestaurantsList />} />
        <Route path='/restaurants/:restaurantId' element={<Restaurant />} />
        <Route path='/restaurants/:restaurantId/reviews' element={<ReviewForm />} />
        <Route path='/restaurants/:restaurantId/reviews/:reviewId' element={<ReviewForm />} />
        <Route path='/login' element={<Login login={login} />} />
      </Routes>
    </div>
  )
}