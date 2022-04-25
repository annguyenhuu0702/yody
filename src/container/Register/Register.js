import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../api/apiAuth";
import Input from "../../Components/InputField/Input";
import "../Login/_account.scss";
import ChangePageTitle from "../../Components/ChangePageTitle/ChangePageTitle";

const Register = () => {
  // state
  const [showPass, setShowPass] = useState(false);

  // dispatch
  const dispatch = useDispatch();

  // navigate
  const navigate = useNavigate();

  // selector redux
  const message = useSelector((state) => state.auth.register?.message);

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    registerUser(data, dispatch, navigate);
  };

  return (
    <>
      <ChangePageTitle pageTitle={"Đăng ký"} />
      <div className="page-content-account">
        <div className="container">
          <div className="d-group">
            <div className="group-account">
              <h2>
                <Link to="/account/login">
                  <img
                    src="//bizweb.dktcdn.net/100/438/408/themes/848101/assets/back_page.svg?1646961127726"
                    alt=""
                  />
                </Link>
                ĐĂNG KÝ THÀNH VIÊN MỚI
              </h2>
              <form className="account-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg-6 col-left">
                    <div className="form-group">
                      <Input
                        classStyle="form-control"
                        inputType="text"
                        name="first_name"
                        placeholder="Tên"
                        register={register}
                        errors={{ required: true }}
                      />
                      {errors.firstName?.type === "required" && (
                        <p>Please fill in this field !</p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-right">
                    <div className="form-group">
                      <Input
                        classStyle="form-control"
                        inputType="text"
                        name="last_name"
                        placeholder="Họ"
                        register={register}
                        errors={{ required: true }}
                      />
                      {errors.lastName?.type === "required" && (
                        <p>Please fill in this field !</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <Input
                    classStyle="form-control"
                    inputType="text"
                    name="phoneNumber"
                    placeholder="Số điện thoại"
                    register={register}
                    errors={{
                      required: true,
                      pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                    }}
                  />
                  {errors.phoneNumber?.type === "required" && (
                    <p>Please fill in this field !</p>
                  )}
                  {errors.phoneNumber?.type === "pattern" && (
                    <p>Your phone number is not valid !</p>
                  )}
                </div>
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
                <div className="form-group">
                  <div className="form-group">
                    <Input
                      classStyle="form-control"
                      inputType="password"
                      name="password"
                      autoComplete="on"
                      placeholder="Mật khẩu"
                      showPass={showPass}
                      register={register}
                      errors={{ required: true, minLength: 6 }}
                    />
                    {errors.password?.type === "required" && (
                      <p>Please fill in this field !</p>
                    )}
                    {errors.password?.type === "minLength" && (
                      <p>Password must be 6 characters long!</p>
                    )}
                  </div>
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
                <button className="btn-login register" type="">
                  Đăng ký
                </button>
              </form>
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

export default Register;
