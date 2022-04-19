import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../api/apiAuth";
import "./__myaccount.scss";

const MyAccount = () => {
  const myInfo = [
    {
      name: "Tài khoản của tôi",
      url: "",
      img: "https://bizweb.sapocdn.net/100/438/408/themes/857207/assets/acc_user_1.svg",
    },

    {
      name: "Đơn hàng của tôi",
      url: "orders",
      img: "https://bizweb.sapocdn.net/100/438/408/themes/857207/assets/acc_user_2.svg",
    },
    {
      name: "Đổi mật khẩu",
      url: "changepassword",
      img: "https://bizweb.sapocdn.net/100/438/408/themes/857207/assets/acc_user_3.svg",
    },
    {
      name: "Sổ địa chỉ",
      url: "address",
      img: "https://bizweb.sapocdn.net/100/438/408/themes/857207/assets/acc_user_4.svg",
    },
    {
      name: "Sản phẩm yêu thích",
      url: "yeu-thich",
      img: "https://bizweb.sapocdn.net/100/438/408/themes/857207/assets/acc_user_6.svg",
    },
  ];

  const user = useSelector((state) => state.auth.login.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut(dispatch, navigate);
  };

  return (
    <div className="my-account">
      <div className="container pl-0">
        <div className="row">
          <div className="col-12 title">
            <div className="title-wrap">
              <div className="title-top">
                <Link to="">Trang chủ</Link>
                <span className="distance">/</span>
                <span>Tài khoản</span>
              </div>
              <div className="title-bottom">
                <strong>
                  <span>TÀI KHOẢN</span>
                </strong>
              </div>
            </div>
          </div>
          <div className="col-12 account-main">
            <div className="col-lg-3 main-left">
              <div className="info">
                <img
                  className="info-avt"
                  src="https://bizweb.sapocdn.net/100/438/408/themes/857207/assets/account_ava.jpg?1650333306279"
                  alt=""
                />
                <p className="info-user">
                  {user && `${user.first_name + " " + user.last_name}`}
                </p>
                <Link
                  className="logout"
                  to="/account/logout"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Link>
              </div>
              <ul>
                {myInfo &&
                  myInfo.map((item) => {
                    return (
                      <li key={item.name}>
                        <img src={item.img} alt="" />
                        <Link to={`${item.url}`}>{item.name}</Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="col-lg-9 main-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
