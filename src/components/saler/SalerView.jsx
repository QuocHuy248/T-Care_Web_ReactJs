import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaAddressCard, FaEdit, FaExchangeAlt, FaTrashAlt } from "react-icons/fa";
import { LegalNotice } from "../carehub/LegalNotice";
import LogoProject from "../logoProject/LogoProject";
import { ContainerViewUser } from "../viewUser/containerViewUser/ContainerViewUser";
import { ContainerViewSale } from "./ContainerViewerSale";
import Search from "./search";
import Swal from "sweetalert2";
import LoadingCommon from "../common/LoadingCommon";

export default function SalerView() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [check, setCheck] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, [check]);

  const { id } = useParams();
  let navigate = useNavigate();
  const loadCustomers = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(`http://localhost:8080/api/carts/sale/${id}`);
      const customers = response.data;

      setIsLoading(false);

      setCustomers(customers);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingCommon />;
  }

  const handleOnClick = (id) => {
    console.log(id);
    axios
      .get(`http://localhost:8080/api/carts/${id}`)
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          title: 'Yêu cầu khách chuyển: ' + response.data.totalAmount.toLocaleString(),
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Tạo hợp đồng",
        }).then((result) => {
          if (result.isConfirmed) {
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            axios
              .post(`http://localhost:8080/api/contracts/createContract/${id}`)
              .then(() => {
                setCheck(prevCheck => !prevCheck);
                loadCustomers();
               
              })
              .then(() => {
                setIsLoading(true)
                setTimeout(() => {
                  navigate(`/sale/d6206379-5c88-4239-b265-2929c972749e`);
                  toast.success("Tạo hợp đồng thành công");
                }, 1000);
              })
              
              .catch((error) => {
                loadCustomers();
                console.log(error);
              });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteCustomer = (id) => {
    axios
      .delete(`http://localhost:8080/api/carts/deleteCustomerBySale/${id}`)
      .then((response) => {
        console.log(response);
        toast.success("Xóa khách hàng thành công", { autoClose: 1000 });
        loadCustomers();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Xóa thất bại");
      });
  };
  return (
    <>
      <ContainerViewSale />
      <div>
        <div className="container">
          <header>
            <div className="d-flex justify-content-end">
              <Search search={search} setSearch={setSearch} />
            </div>
            <nav className="navbar bg-body-tertiary">
              <div className="container-fluid">
                <a className="navbar-brand">Danh sách khách hàng</a>
                <div className="d-flex" style={{ gap: "10px" }}>
                  <button type="button" className="btn btn-outline-light">
                    <Link
                      style={{ textDecoration: "none", color: "#0d6efd" }}
                      to={`/sale/add-customer/${id}`}
                    >
                      <i className="far fa-plus-square"></i>
                      Thêm khách hàng mới
                    </Link>
                  </button>
                </div>
              </div>
            </nav>
          </header>

          <div className="content">
            <table id="tbCustomer" className="table table-hover">
              <thead>
                <tr>
                  <th>Họ Tên</th>
                  <th>Địa chỉ</th>
                  <th>Số điện thoại</th>
                  <th>Ngày thuê</th>
                  <th>Quan hệ</th>
                  <th>Gói</th>
                  <th>Ghi chú người thuê</th>
                  <th>Ghi chú người nhà</th>
                  <th>Người hỗ trợ</th>
                  <th>Ghi chú của sale</th>
                  <th></th>
                  <th colSpan="2" style={{ textAlign: "center" }}>
                    ...
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers &&
                  customers
                  .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
                    .filter(
                      (customer) =>
                        customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
                        customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
                        customer.phone.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((customer) => (
                      <tr key={customer.id}>
                        <td style={{ maxWidth: "100px" }}>
                          {" "}
                          {customer.lastName ? customer.lastName : ""}{" "}
                          {customer.firstName ? customer.firstName : ""} (
                          {customer.gender === "MALE"
                            ? "Nam"
                            : customer.gender === "FEMALE"
                            ? "Nữ"
                            : "Khác"}
                          )
                        </td>
                        <td style={{ maxWidth: "170px" }}>
                          {customer.locationPlace ? customer.locationPlace : ""}
                        </td>
                        <td>{customer.phone}</td>
                        <td style={{ maxWidth: "150px", minWidth: "120px" }}>
                          {customer.timeStart !== null ? customer.timeStart : ""} <br />
                          {customer.timeEnd !== null ? customer.timeEnd : ""}
                        </td>
                        <td>
                          {customer.memberOfFamily !== null
                            ? customer.memberOfFamily === "MYPARENT"
                              ? "Cha/Mẹ"
                              : customer.memberOfFamily === "MYSPOUSE"
                              ? "Vợ/Chồng"
                              : customer.memberOfFamily === "MYSELF"
                              ? "Bản thân"
                              : customer.memberOfFamily === "MYGRANDPARENTS"
                              ? "Ông/Bà"
                              : "Khác"
                            : ""}
                        </td>
                        <td style={{ maxWidth: "150px" }}>{customer.serviceGeneral} </td>
                        <td style={{ maxWidth: "150px" }}>{customer.noteForEmployee}</td>
                        <td style={{ maxWidth: "150px" }}>{customer.noteForPatient}</td>
                        <td style={{ maxWidth: "150px" }}>
                          {customer.employeeFirstName} {customer.employeeLastName}{" "}
                        </td>
                        <td style={{ maxWidth: "150px" }}>{customer.saleNote}</td>

                        <td className="mx-2">
                          <Link
                            className="btn btn-warning"
                            to={`/sale/edit-customer/${id}/${customer.id}`}
                          >
                            <FaEdit />
                          </Link>
                        </td>
                        <td className="mx-2">
                          <Link
                            className="btn btn-outline-primary"
                            onClick={() => handleOnClick(customer.id)}
                          >
                            <FaAddressCard />
                          </Link>
                        </td>
                        <td className="mx-2">
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteCustomer(customer.id)}
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                        <td className="mx-2">
                          <Link
                            className="btn btn-warning"
                            to={`/sale/${id}/render-list-assistant/${customer.id}`}
                          >
                            <FaExchangeAlt />
                          </Link>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
