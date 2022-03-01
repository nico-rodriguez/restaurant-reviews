import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login({ login }) {
  const intialState = {
    name: '',
    id: '',
  };
  const [user, setUser] = useState(intialState);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const doLogin = () => {
    login(user);
    navigate('/', { replace: false });
  };

  return (
    <div className='submit-form'>
      <div>
        <div className='form-group'>
          <label htmlFor='user'>Username</label>
          <input
            type='text'
            className='form-control'
            id='name'
            required
            value={user.name}
            onChange={handleInputChange}
            name='name'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='id'>Id</label>
          <input
            type='text'
            className='form-control'
            id='id'
            required
            value={user.id}
            onChange={handleInputChange}
            name='id'
          />
        </div>
        <button onClick={doLogin} className='btn btn-success'>
          Login
        </button>
      </div>
    </div>
  );
}
