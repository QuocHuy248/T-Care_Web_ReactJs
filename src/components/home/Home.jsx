import React, { useEffect, useState } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import About from "./about/About";
import { Assistant } from "./assistant/Assistant";
import { CheckFind } from "./checkFind/CheckFind";
import LogoProject from "../logoProject/LogoProject";
import { CareHub } from "./../carehub/CareHub";
import axios from "axios";
import EmployeeServiceAPI from "../../service/employeeServiceAPI";
import Phone from "../common/phone/Phone";
export function Home() {
    const [rateTopThree, setRateTopThree] = useState();
    useEffect(() => {
        loadTopThreeRates();
    }, []);
    const loadTopThreeRates = async () => {
        const employeeList = await EmployeeServiceAPI.getRatesTopThree();
        setRateTopThree(employeeList);
    };
    return (
        <>
            <div className="container-head">
                <LogoProject />
                <div id="logInHome">
                    <NavLink className="navlink-no-underline" to="/login">
                        <Button className="buttonLogin" variant="contained">
                            Đăng nhập
                        </Button>
                    </NavLink>
                </div>
            </div>
            <div className="bg-ff">
                <div className="d-flex bg-white-bb-red">
                    <CheckFind />
                    <div className="w45">
                        <img className="w100"
                            src="https://res.cloudinary.com/dw4xpd646/image/upload/v1703748824/Cloudinary-React/gwsdfpleoznddaljvn9m.png"
                           
                        />  
                    </div>  
                </div>
                <About />
                <div className="rate-average mt-3">
                    <div className="rate-average-top">
                        <p className="rate-average-content">
                            {/* Access a network of background checked caregivers */}
                            Hệ thống những người hỗ trợ chuyên nghiệp
                        </p>
                    </div>
                    <div className="rate-average-bot">
                        <p className="rate-average-rate">
                            Với trung bình lượt đánh giá là 4.7 sao, chúng tôi sẽ giúp bạn tìm người
                            hỗ trợ tốt nhất
                        </p>
                    </div>
                </div>

                <div className="d-flex justify-content-center ">
                    <div className="row profile-assistant mb-5">
                        {rateTopThree?.map((e) => (
                            <div className="col-4" key={e?.employeeId}>
                                <Assistant employee={e} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <CareHub />
            <Phone/>
        </>
    );
}
