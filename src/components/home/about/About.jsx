import React from "react";
import Favorite from "@mui/icons-material/Favorite";
import "./About.css";
function About() {
  return (
    <div className="about my-5" >
      <div className="about-container">
        <h1>T-Care.</h1>
        <h3>Từ ngữ nhỏ, ý nghĩa lớn</h3>
        <img
          decoding="async"
          width="150"
          height="140"
          src="https://www.care.com/about/wp-content/uploads/sites/4/2021/12/Senior-Couple-1.png.webp"
          alt=""
          className="wp-image-1992"
          srcSet="https://www.care.com/about/wp-content/uploads/sites/4/2021/12/Senior-Couple-1.png.webp 424w, https://www.care.com/about/wp-content/uploads/sites/4/2021/12/Senior-Couple-1-300x267.png.webp 300w"
          sizes="(max-width: 100px) 100vw, 424px"
        />
        <div className="w-30">
          <p>
            Chúng ta đều cần hạnh phúc
          </p>
        </div>
        <h3>
          Đến với{" "}
          <span>T-Care </span>
        </h3>
        <div className="about-footer">
          <h6>
            {/* Our purpose is to help every family at each stage of care and today, we’re helping
            millions of families at home and at work across 17+ countries and growing. */}
            Sứ mệnh của chúng tôi là mang đến mỗi gia đình sự chăm sóc tận tình, hiện đại. Chúng tôi đang giúp đỡ hàng ngàn gia đình
            trên khắp cả nước và đang tiếp tục phát triển
          </h6>
          <p>
            <Favorite className="me-2 favorite" />
            Chúng tôi sử dụng thiết bị và công nghệ hiện đại, phù hợp với từng hoàn cảnh.
          </p>
          <p>
            <Favorite className="me-2 favorite" />
            Chúng tôi đi đầu trong sự an toàn, với chính sách cải tiến, hiện đại.
          </p>
          <p>
            <Favorite className="me-2 favorite" />
           Chúng tôi đặt sự quan tâm đến khách hàng lên hàng đầu, bởi vì chúng tôi chính là KHÁCH của bạn.
          </p>
          <p>
            <Favorite className="me-2 favorite" />
           Chúng tôi luôn cống hiến hết mình cho mọi gia đình với quan niệm chúng tôi là một phần
           của gia đình bạn.
          </p>
          <p>
            <Favorite className="me-2 favorite" />
            {/* We’re here for all your life, for all families, for all the reasons that matter. */}
            Chúng tôi ở đây vì cuộc sống của bạn, vì gia đình của bạn, bất kì lý do gì.
          </p>
        </div>
        <div className="my-3">
          <h5>T-Care</h5> Đong đầy <span>tình yêu.</span>
        </div>
      </div>
    </div>
  );
}
export default About;
