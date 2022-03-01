import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

import RestaurantDataService from '../services/restaurant.service';

export default function RestaurantsList() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchZip, setSearchZip] = useState('');
  const [searchCuisine, setSearchCuisine] = useState('');
  const [cuisines, setCuisines] = useState(['All cuisines']);
  const [nextPage, setNextPage] = useState(1);
  const showMoreButton = useRef();

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const onChangeSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const onChangeSearchZip = (event) => {
    setSearchZip(event.target.value);
  };

  const onChangeSearchCuisine = (event) => {
    setSearchCuisine(event.target.value);
  };

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then(({ data }) => {
        setRestaurants(data.restaurants);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(({ data }) => {
        setCuisines(['All cuisines'].concat(data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const refreshRestaurantsList = () => {
    retrieveRestaurants();
  };

  const toggleShowMoreButton = (disabled = false) => {
    showMoreButton.current.disabled = disabled;
    showMoreButton.current.innerText = disabled
      ? 'No more results'
      : 'Show more';
  };

  const showMoreRestaurants = () => {
    RestaurantDataService.getAll(nextPage)
      .then(({ data }) => {
        if (data.restaurants.length > 0) {
          setRestaurants(restaurants.concat(data.restaurants));
          setNextPage(nextPage + 1);
        } else {
          toggleShowMoreButton(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then(({ data }) => {
        setRestaurants(data.restaurants);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const findByName = () => {
    find(searchName, 'name');
  };

  const findByZip = () => {
    find(searchZip, 'zipcode');
  };

  const findByCuisine = () => {
    if (searchCuisine === 'All cuisines') {
      refreshRestaurantsList();
    } else {
      find(searchCuisine, 'cuisine');
    }
  };

  return (
    <div>
      <div className='row pb-1'>
        <div className='input-group col-lg-4'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by name'
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className='input-group col-lg-4'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by zip'
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>
        <div className='input-group col-lg-4'>
          <select onChange={onChangeSearchCuisine}>
            {cuisines.map((cuisine) => {
              return (
                <option key={cuisine} value={cuisine}>
                  {' '}
                  {cuisine.substring(0, 20)}{' '}
                </option>
              );
            })}
          </select>
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className='row'>
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;

          return (
            <div key={restaurant._id} className='col-lg-4 pb-1'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{restaurant.name}</h5>
                  <p className='card-text'>
                    <strong>Cuisine: </strong>
                    {restaurant.cuisine}
                    <br />
                    <strong>Address: </strong>
                    {address}
                  </p>
                  <div className='row'>
                    <Link
                      to={`/restaurants/${restaurant._id}`}
                      className='btn btn-primary col-lg-5 mx-1 mb-1'
                    >
                      View reviews
                    </Link>
                    <a
                      target='_blank'
                      rel='noreferrer'
                      href={`https://www.google.com/maps/place/${address}`}
                      className='btn btn-primary col-lg-5 mx-1 mb-1'
                    >
                      View map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='row'>
        <button
          className='btn btn-outline-secondary m-3'
          type='button'
          onClick={showMoreRestaurants}
          ref={showMoreButton}
        >
          Show more
        </button>
      </div>
    </div>
  );
}
