import React, { useEffect, useState } from "react";
import "./CartUser.css";
import { useParams } from "react-router-dom";
import { ContainerViewUser } from "../containerViewUser/ContainerViewUser";
import { LegalNotice } from "../../carehub/LegalNotice";
import axios from "axios";
import LoadingCommon from "../../common/LoadingCommon";
import { RenderListCart } from "./RenderListCart";
import { toast } from "react-toastify";

const memberOfFamilyList = [
  { id: "MYPARENT", name: "Cha Mẹ của tôi" },
  { id: "MYSPOUSE", name: "Vợ/Chồng của tôi" },
  { id: "MYSELF", name: "Bản thân tôi" },
  { id: "MYGRANDPARENTS", name: "Ông bà của tôi" },
  { id: "OTHER", name: "Khác" },
];

const ageRender = [
  { id: "THIRTY", name: "30s" },
  { id: "FORTY", name: "40s" },
  { id: "FIFTY", name: "50s" },
  { id: "SIXTY", name: "60s" },
  { id: "SEVENTY", name: "70s" },
  { id: "EIGHTY", name: "80s" },
  { id: "NINETY", name: "90s" },
];
export function CartUser() {
  const { id } = useParams();
  const [listCart, setListCart] = useState();
  const [checkModal, setCheckModal] = useState();
  const [checkCallApiCart, setCheckCallApiCart] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/carts/user/${id}`);
        const updatedListCart = response.data.content.map((cartItem, index) => ({
          ...cartItem,
        }));
        updatedListCart.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
        if (updatedListCart.length === 0 ) {
          setHasShownToast(true); 
        }
        setListCart(updatedListCart);
      } catch (error) {
        toast.error("Lấy dữ liệu thất bại")
      }
      setIsLoading(false)

    };

    fetchData();
  }, [id, checkModal, checkCallApiCart, message]);
  useEffect(()=>{ if (hasShownToast) {
    toast.info("Chưa có dữ liệu")
  }},[hasShownToast])
  if(isLoading){
    <LoadingCommon/>
  }
  return (
    <>
      <ContainerViewUser idUser={id} />
      <div style={{ margin: "20px 30px" }}>
        <h2>Danh sách yêu cầu</h2>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Buổi làm</th>
              <th>Tên trợ lý</th>
              <th>Ảnh</th>
              <th>Dịch vụ</th>
              <th>Kỹ năng </th>
              <th>Bổ sung</th>
              <th>Trạng thái </th>
              <th>Hoạt động</th>
            </tr>
          </thead>
          <tbody>
            <RenderListCart
              setMessage={setMessage}
              listCart={listCart}
              setCheckCallApiCart={setCheckCallApiCart}
              setCheckModal={setCheckModal}
              checkModal={checkModal}
              ageRender={ageRender}
              memberOfFamilyList={memberOfFamilyList}
            />
          </tbody>
        </table>
      </div>
      <LegalNotice />
    </>
  );
}
