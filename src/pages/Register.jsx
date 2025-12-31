import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),

  username: yup.string().required('Username is required'),
});

export const Register = () => {
  const navigate = useNavigate(); // ✅ move here, top-level of component
  const [registerError, setRegisterError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Registration failed');
      }
      navigate('/login');
    } catch (err) {
      console.error(err);
      setRegisterError(
        err.message || 'Something went wrong. Please try again later.'
      );
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-5 col-lg-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          {registerError && (
            <div className="alert alert-danger text-center">
              {registerError}
            </div>
          )}

          <div className="form-floating mb-3">
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="name@example.com"
              {...register('email')}
            />
            <label>Email</label>
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Password"
              {...register('password')}
            />
            <label>Password</label>
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              placeholder="Username"
              {...register('username')}
            />
            <label>Username</label>
            {errors.username && (
              <div className="invalid-feedback">{errors.username.message}</div>
            )}
          </div>

          <button className="btn btn-primary w-100" disabled={!isValid}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
