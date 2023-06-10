import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterUserMutation } from "../../features/auth/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const registerId = "registerId";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registerUser] = useRegisterUserMutation();

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match!", { toastId: registerId });
      return;
    } else if (!name || !email || !password) {
      toast.error("All the fields are mandatory!", { toastId: registerId });
      return;
    } else {
      try {
        const response = await registerUser({
          name,
          email,
          password,
        }).unwrap();

        dispatch(setCredentials({ ...response }));
        navigate("/chat");
      } catch (err) {
        toast.error(err?.data?.message || err.error, { toastId: registerId });
      }
    }
  };

  return (
    <section className="section signup__section">
      <div className="signup__form-container">
        <h3 className="signup__title">Signup and send me a message</h3>
        <form className="signup__form" onSubmit={handleRegisterUser}>
          <div className="input__control">
            <input
              type="text"
              className="form__input"
              placeholder="user name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input__control">
            <input
              type="email"
              className="form__input"
              placeholder="email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input__control">
            <input
              type="password"
              className="form__input"
              placeholder="password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input__control">
            <input
              type="password"
              className="form__input"
              placeholder="confirm password..."
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button type="submit" className="submit__btn">
            signup
          </button>
          <div className="already__link">
            <span>Already have an account?</span>
            <Link to="/contact" className="link">
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
