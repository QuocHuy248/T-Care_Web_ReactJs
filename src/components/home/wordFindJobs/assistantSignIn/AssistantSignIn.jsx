import React from "react";
import "./AssistantSignIn.css";
import { FormSignIn } from "../../formSignIn/FormSignIn";
import { NavBarFindJob } from "../navBarFindJob/NavBarFindJob";
import EmployeeServiceAPI from "../../../../service/employeeServiceAPI";

const formSignIn = (
  
  <div className="" style={{ display: "flex", margin:'5% 12% 0 12%' }}>
    <div style={{ width: "60%", padding: '5%', backgroundColor:'white' }}>
      <FormSignIn
        url={"/assistant/address"}
        termAgreed={
          'Bạn cần phải đủ 18 tuổi trở lên để sử dụng T-Care.com. Khi chọn vào ô này, bạn đã chấp thuận với điều khoản và dịch vụ của công ty chúng tôi.'
        }
        marginContent={'0 0'}
        marginContainer={'0 0'}
        marginHeader={'Gia nhập T-Care ngay bây giờ!'}
        color={"#213f5f"}
        checkRole ={"ROLE_EMPLOYEE"}
        api ={EmployeeServiceAPI.signInEmployee}
      />
    </div>
    <div style={{margin :'200px 30px',width:'40%'}}>
      
      <img style={{width:'100px', marginBottom:'20px'}} src="https://res.cloudinary.com/dw4xpd646/image/upload/v1704079025/Cloudinary-React/zflccxtn90ivd9y2oawy.png" alt="" />
      <p style={{fontSize:'30px'}}>Tìm kiếm công việc hỗ trợ ngay bây giờ</p>
      <p>Chỉ tốn vài phút để đăng kí thông tin!</p>
    </div>
  </div>
);

export function AssistantSignIn() {
  return (
    <>
      <NavBarFindJob children={formSignIn}/>
    </>
  );
}
