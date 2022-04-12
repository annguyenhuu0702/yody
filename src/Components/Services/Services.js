import React from "react";
import "./_services.scss";
const Services = ({ col }) => {
  return (
    <section className="sec-services">
      <div className="container">
        <div className="services-list row">
          <div className={`services-content col-lg-${col} col-6`}>
            <div className="content-left">
              <img
                src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/ser_1.png?1646575637708"
                alt=""
              />
            </div>
            <div className="content-right">
              <span>Miễn phí giao hàng</span>
              <p>
                Miễn phí ship với <b> &gt; 498k</b>
              </p>
            </div>
          </div>
          <div className={`services-content col-lg-${col} col-6`}>
            <div className="content-left">
              <img
                src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/ser_2.png?1646575637708"
                alt=""
              />
            </div>
            <div className="content-right">
              <span>Thanh toán COD</span>
              <p>
                Thanh toán khi <b>nhận hàng&nbsp;(COD)</b>
              </p>
            </div>
          </div>
          <div className={`services-content col-lg-${col} col-6`}>
            <div className="content-left">
              <img
                src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/ser_3.png?1646575637708"
                alt=""
              />
            </div>
            <div className="content-right">
              <span>Khách hàng vip</span>
              <p>
                Ưu đãi dành cho <b> khách hàng VIP</b>
              </p>
            </div>
          </div>
          <div className={`services-content col-lg-${col} col-6`}>
            <div className="content-left">
              <img
                src="https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/ser_4.png?1646575637708"
                alt=""
              />
            </div>
            <div className="content-right">
              <span>Hỗ trợ bảo hành</span>
              <p>
                <b>Đổi, sửa</b> đồ tất cả tại cửa hàng YODY
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
