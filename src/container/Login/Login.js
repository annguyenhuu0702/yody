import React, { useState } from "react";
import ChangePageTitle from "../../Components/ChangePageTitle/ChangePageTitle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../Components/InputField/Input";
import "./_account.scss";
import { useForm } from "react-hook-form";
import { loginUSer } from "../../api/apiAuth";

const Login = () => {
  // state
  const [showPass, setShowPass] = useState(false);

  //dispatch
  const dispatch = useDispatch();

  // selector redux
  const message = useSelector((state) => state.auth.login?.message);

  // navigate
  const navigate = useNavigate();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    loginUSer(data, dispatch, navigate);
  };

  return (
    <>
      <ChangePageTitle pageTitle={"Đăng nhập"} />
      <div className="page-content-account">
        <div className="container">
          <div className="d-group">
            <div className="group-account">
              <h2>ĐĂNG NHẬP</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="account-form">
                <div className="form-group">
                  <Input
                    classStyle="form-control"
                    inputType="text"
                    name="email"
                    placeholder="Email"
                    register={register}
                    errors={{
                      required: true,
                      pattern:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    }}
                  />
                  {errors.email?.type === "required" && (
                    <p>Please fill in this field !</p>
                  )}
                  {errors.email?.type === "pattern" && (
                    <p>Please enter a valid email !</p>
                  )}
                </div>
                <div className="form-group form-group-password">
                  <Input
                    classStyle="form-control"
                    inputType="password"
                    name="password"
                    placeholder="Mật khẩu"
                    showPass={showPass}
                    autoComplete="on"
                    register={register}
                    errors={{
                      required: true,
                      minLength: 6,
                    }}
                  />
                  {errors.password?.type === "required" && (
                    <p>Please fill in this field !</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p>Password must be 6 characters long !</p>
                  )}
                  <span
                    className="show-pass"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? (
                      <i className="fa-solid fa-eye"></i>
                    ) : (
                      <i className="fa-solid fa-eye-slash"></i>
                    )}
                  </span>
                </div>
                {<p>{message}</p>}
                <button className="btn-login" type="">
                  Đăng nhập
                </button>
              </form>
              <div className="forgot">
                <a href=" " className="forgot-text left">
                  Quên mật khẩu
                </a>
                <Link to="/account/register" className="forgot-text right">
                  Đăng ký
                </Link>
              </div>
              <div className="social-login">
                <p className="social-text">
                  <span>--- Hoặc ---</span>
                </p>
                <a href=" " className="with-facebook">
                  <img
                    className="w-25"
                    src="https://bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg"
                    alt=""
                  />
                </a>
                <a href=" " className="with-google">
                  <img
                    className="w-25"
                    src="https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
