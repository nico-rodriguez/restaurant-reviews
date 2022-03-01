import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import RestaurantDataService from '../services/restaurant.service';


export default function ReviewForm() {
  const { restaurantId, reviewId } = useParams();
  const editing = reviewId ? true : false;
  const initialReviewState = editing
    ? JSON.parse(localStorage.getItem('review')).text
    : '';
  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    const data = {
      text: review,
      name: user.name,
      user_id: user.id,
      restaurant_id: restaurantId
    }

    if (editing) {
      data.review_id = reviewId;
      RestaurantDataService.updateReview(data, restaurantId, reviewId)
        .then(() => {
          setSubmitted(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      RestaurantDataService.createReview(data, restaurantId)
        .then(() => {
          setSubmitted(true);
        }).catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div>
      {user ? (
        <div className='submit-form'>
          {submitted ? (
            <div>
              <h4>Successfully submitted!</h4>
              <Link to={`/restaurants/${restaurantId}`} className='btn btn-success'>
                Back to restaurant
              </Link>
            </div>
          ) : (
            <div>
              <div className='form-group'>
                <label htmlFor='description'>{ editing ? 'Edit' : 'Create' } Review</label>
                <input type='text' className='form-control' id='text' required value={review} onChange={handleInputChange} name='text' />
              </div>
              <button onClick={saveReview} className='btn btn-success'>
                Submit
              </button>
            </div>
          )}
        </div>
        ) : (
        <div>
          Please log in
        </div>  
        )}
    </div>
  );
}
