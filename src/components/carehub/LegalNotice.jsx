import React from "react";
import './LegalNotice.css'
export function LegalNotice (){

    return(
        <div className=" care-hub-footer" >
          <div className="row  care-hub-footer-align" >
            <p  className="mb-4">
              {/* Care.com does not employ any caregiver and is not responsible for the conduct of any
              user of our site. All information in member profiles, job posts, applications, and
              messages is created by users of our site and not generated or verified by Care.com.
              You need to do your own diligence to ensure the job or caregiver you choose is
              appropriate for your needs and complies with applicable laws. */}
              T-Care không tuyển dụng bất kì người chăm sóc nào không chịu trách nhiệm về hành vi chăm sóc của mình.
               Tất cả thông tin trong hồ sơ thành viên, bài đăng công việc, ứng dụng và tin nhắn được tạo bởi người dùng
               trang web của chúng tôi không được T-Care tạo ra hoặc xác minh. Bạn cần phải nỗ lực hết mình để đảm bảo công việc
               hoặc người chăm sóc của bạn là phù hợp với nhu cầu của bạn và tuân thủ pháp luật hiện hành.
            </p>
            <p  className="mb-4">
             T-Care.com® là một trang web dịch vụ của công ty T-Company.
            </p>
            <p  className="mb-4">
              “T-Care.com" được tạo ra để hỗ trợ chăm sóc người cao tuổi, thành lập vào năm 2023
            </p>
            <div  className="col-2">
             Điều khoản dịch vụ
            </div>
            <div  className="col-2">
              Chính sách bảo mật
            </div>
            <div  className="col-3">
             Quyền riêng tư
            </div>
            <div  className="col-5">
              Không được bán và chia sẻ thông tin dưới mọi hình thức
            </div>
          </div>
        </div>
    )
}