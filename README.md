# Restaurant reviews

## About

Full stack restaurant reviews application. The application may also be run locally. Just run `npm start` at each `frontend` and `backend` folders.

It's deployed with MongoDB Realm at [https://restaurant-reviews-akkut.mongodbstitch.com/](https://restaurant-reviews-akkut.mongodbstitch.com/).

## Characteristics

- MERN stack.
- Serverless backend, hosted with [MongoDB Realm](https://www.mongodb.com/realm).
- Sample data generated through [MongoDB Atlas](https://www.mongodb.com/atlas).
- Pagination through 'Show more' button.
- Progressive web application.
- Custom icon application.

## Improvements

Some features that may be fixed or improved:

- Apply multiple search filters (right now, only one search filter is applied at a time).
- Authenticate users when updating or deleting reviews.
- Implement a proper authentication mechanism (e.g., JSON web tokens).
- The filters don't work well with the pagination (it resets to the first page).
- Automatic pagination without using a button (`IntersectionObserver` may come handy for this).
- After logging in, go to the previous page.

## Acknowledgements

- [freeCodeCamp](https://www.freecodecamp.org/)
- [Beau Carnes](https://github.com/beaucarnes)
