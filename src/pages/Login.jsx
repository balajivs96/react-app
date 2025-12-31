import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '../stores/userSlice';
import { apiURL } from '../api/apiUrl';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loginError, setLoginError] = useState(''); // Login error state

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Field validation
  const validateField = (name, value) => {
    let error = '';

    if (name === 'email') {
      if (!value) error = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(value)) error = 'Enter valid email';
    }

    if (name === 'password') {
      if (!value) error = 'Password is required';
      else if (value.length < 6)
        error = 'Password must be at least 6 characters';
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));

    setLoginError(''); // Clear login error while typing
  };

  const handleBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
    };

    setFormErrors(errors);
    setTouched({ email: true, password: true });

    if (!errors.email && !errors.password) {
      try {
        const res = await fetch(apiURL.login, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
          // Successful login
          sessionStorage.setItem('token', data.token); // store token if backend returns one

          dispatch(
            login({
              isLogged: true,
              email: formData.email,
              id: data?._id,
            })
          );

          navigate('/profile'); // Redirect on success
        } else {
          // Login failed
          setLoginError(data.message || 'Invalid email or password');
        }
      } catch (err) {
        console.error(err);
        setLoginError('Something went wrong. Please try again later.');
      }
    }
  };

  // Check if form is valid for enabling submit button
  const isFormValid = () => {
    const valuesValid = Object.values(formData).every((v) => v !== '');
    const noErrors = Object.values(formErrors).every((e) => e === '');
    return valuesValid && noErrors;
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-5 col-lg-4">
        <form onSubmit={handleSubmit}>
          {loginError && (
            <div className="alert alert-danger text-center">{loginError}</div>
          )}

          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              className={`form-control ${
                touched.email && formErrors.email ? 'is-invalid' : ''
              }`}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="name@example.com"
            />
            <label>Email</label>
            {touched.email && formErrors.email && (
              <div className="invalid-feedback">{formErrors.email}</div>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              name="password"
              className={`form-control ${
                touched.password && formErrors.password ? 'is-invalid' : ''
              }`}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
            />
            <label>Password</label>
            {touched.password && formErrors.password && (
              <div className="invalid-feedback">{formErrors.password}</div>
            )}
          </div>

          <button className="btn btn-primary w-100" disabled={!isFormValid()}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
