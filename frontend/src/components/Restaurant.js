import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import RestaurantDataService from '../services/restaurant.service';

export default function Restaurant() {
  const initialRestaurantState = {
    id: null,
    name: '',
    address: '',
    cuisine: '',
    reviews: [],
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);
  const { restaurantId } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));

  const getRestaurant = (restaurantId) => {
    RestaurantDataService.getRestaurant(restaurantId)
      .then(({ data }) => {
        setRestaurant(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(restaurantId, reviewId, user.id)
      .then(() => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1);
          return {
            ...prevState,
          };
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getRestaurant(restaurantId);
  }, [restaurantId]);

  return (
    <div>
      {restaurant ? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>
            {restaurant.cuisine}
            <br />
            <strong>Address: </strong>
            {restaurant.address.building} {restaurant.address.street},{' '}
            {restaurant.address.zipcode}
          </p>
          <Link
            to={`/restaurants/${restaurantId}/reviews`}
            className='btn btn-primary'
          >
            Add review
          </Link>
          <h4>Reviews</h4>
          <div className='row'>
            {restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review, index) => {
                return (
                  <div className='col-lg-4 pb-1' key={review._id}>
                    <div className='card'>
                      <div className='card-body'>
                        <p className='card-text'>
                          {review.text}
                          <br />
                          <strong>User: </strong>
                          {review.name}
                          <br />
                          <strong>Date: </strong>
                          {review.date}
                        </p>
                        {user && user.id === review.user_id && (
                          <div className='row'>
                            <button
                              onClick={() => deleteReview(review._id, index)}
                              className='btn btn-primary col-lg-5 mx-1 mb-1'
                            >
                              Delete
                            </button>
                            <Link
                              to={`/restaurants/${restaurantId}/reviews/${review._id}`}
                              className='btn btn-primary col-lg-5 mx-1 mb-1'
                              onClick={() => localStorage.setItem('review', JSON.stringify(review))}
                            >
                              Edit
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className='col-sm-4'>
                <p>No reviews yet</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected</p>
        </div>
      )}
    </div>
  );
}
