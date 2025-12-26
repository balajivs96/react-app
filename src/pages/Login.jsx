import { useState } from "react";
import { useNavigate } from "react-router";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});

  const navigate = useNavigate()
  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      if (!value) error = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value)) error = "Enter valid email";
    }

    if (name === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 6)
        error = "Password must be at least 6 characters";
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
  };

  const handleBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    setFormErrors(errors);
    setTouched({ email: true, password: true });

    if (!errors.email && !errors.password) {
      console.log("Login successful", formData);
      sessionStorage.setItem('token','x-access-token');
      navigate('/profile')
    }
  };

  const isFormValid = () => {
    const valuesValid = Object.values(formData).every((v) => v !== "");
    const noErrors = Object.values(formErrors).every((e) => e === "");
    return valuesValid && noErrors;
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-5 col-lg-4">
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              className={`form-control ${
                touched.email && formErrors.email ? "is-invalid" : ""
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
                touched.password && formErrors.password ? "is-invalid" : ""
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
