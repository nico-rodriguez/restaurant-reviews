import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Navbar({ logout }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const doLogout = () => {
    logout();
    navigate('/', { replace: false });
  }

  return (
    <nav className='navbar navbar-expand navbar-dark bg-dark'>
      <a href='/restaurants' className='navbar-brand'>
        Restaurant reviews
      </a>
      <div className='navbar-nav mr-auto'>
        <li className='nav-item'>
          <Link to='/restaurants' className='nav-link'>
            Restaurants
          </Link>
        </li>
        <li className='nav-item'>
          {user ? (
            <a
              onClick={doLogout}
              className='nav-link'
              style={{ cursor: 'pointer' }}
            >
              Logout {user.name}
            </a>
          ) : (
            <Link to='/login' className='nav-link'>
              Login
            </Link>
          )}
        </li>
      </div>
    </nav>
  )
}