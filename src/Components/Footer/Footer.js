import React from "react";
import "./_footer.scss";
const Footer = () => {
  const social = [
    "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/social_1.png?1646731994406",
    "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/social_2.png?1646731994406",
    "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/social_3.png?1646731994406",
    "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/social_4.png?1646731994406",
    "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/social_5.png?1646731994406",
    "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/social_6.png?1646731994406",
    "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/social_7.png?1646731994406",
  ];
  return (
    <footer className="sec-footer">
      <div className="container pl-0">
        <div className="row footer-top">
          <div className="col-lg-4 footer-item">
            <p className="text">
              “Đặt sự hài lòng của khách hàng là ưu tiên số 1 trong mọi suy nghĩ
              hành động của mình” là sứ mệnh, là triết lý, chiến lược.. luôn
              cùng YODY tiến bước”
            </p>
            <h3 className="title-menu">ĐĂNG KÝ NHẬN THÔNG TIN</h3>
            <div className="form">
              <input
                className="text-input form-control"
                type="text"
                placeholder="Nhập email đăng ký của bạn"
              />
              <button className="btn btn-register">Đăng ký</button>
            </div>
            <div className="social">
              {social.map((item, index) => {
                return (
                  <a href=" " className="social-link" key={index}>
                    <img className="social-img" src={item} alt="" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="col-lg-2 footer-item">
            <h3 className="title-menu">VỀ YODY</h3>
            <ul className="list-menu">
              <li className="menu-item">
                <a href=" ">Giới thiệu</a>
              </li>
              <li className="menu-item">
                <a href=" ">Liên hệ</a>
              </li>
              <li className="menu-item">
                <a href=" ">Tuyển dụng</a>
              </li>
              <li className="menu-item">
                <a href=" ">Tin tức</a>
              </li>
              <li className="menu-item">
                <a href=" ">Hệ thống cửa hàng</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 footer-item">
            <h3 className="title-menu">HỖ TRỢ KHÁCH HÀNG</h3>
            <ul className="list-menu">
              <li className="menu-item">
                <a href=" ">Hướng dẫn chọn size</a>
              </li>
              <li className="menu-item">
                <a href=" ">Chính sách khách hàng thân thiết</a>
              </li>
              <li className="menu-item">
                <a href=" ">Chính sách đổi/trả</a>
              </li>
              <li className="menu-item">
                <a href=" ">Chính sách bảo mật</a>
              </li>
              <li className="menu-item">
                <a href=" ">Thanh toán, giao nhận</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 footer-item col-foo4">
            <ul className="list-menu">
              <li className="menu-item">
                <a href=" ">
                  Công ty CP Thời Trang YODY, đường An Định, TP. Hải Dương
                </a>
              </li>
              <li className="menu-item">
                <a href=" ">
                  Liên hệ đặt hàng: 024 730 56665 Thắc mắc đơn hàng: 024 730
                  16661 Góp ý khiếu nại: 1800 2086
                </a>
              </li>
              <li className="menu-item">
                <a href=" ">chamsockhachhang@yody.vn</a>
              </li>
              <li className="menu-item">
                <a href=" ">0801206940</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copy-right">
          @ Bản quyền thuộc về <b>Yody.vn</b> All right reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
