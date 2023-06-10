import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../../features/auth/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const loginId = "loginId";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUser] = useLoginUserMutation();

  const handleLoginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password }).unwrap();
      dispatch(setCredentials({ ...response }));
      setEmail("");
      setPassword("");
      navigate("/chat");
      // console.log(response);
    } catch (err) {
      toast.error(err?.data?.message || err.error, { toastId: loginId });
    }
  };

  return (
    <section className="section login__section">
      <div className="login__form-container">
        <h3 className="login__title">Login and send me a message</h3>
        <form className="login__form" onSubmit={handleLoginUser}>
          <div className="input__control">
            <input
              type="email"
              className="form__input"
              placeholder="email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
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
          <button type="submit" className="submit__btn">
            login
          </button>
          <div className="already__link">
            <span>Don't have an account?</span>
            <Link to="/signup" className="link">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
