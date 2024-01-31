import { Menu, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import Swal from "sweetalert2";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link, useParams } from "react-router-dom";
import { ModalEditCartUser } from "./ModalEditCartUser";

export function RenderListCart({
    setMessage,
    listCart,
    setCheckCallApiCart,
    setCheckModal,
    checkModal,
    ageRender,
    memberOfFamilyList,
}) {
    const { id } = useParams();


    const [menuSelected, setMenuSelected] = useState(null);
    const [status, setStatus] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [member, setMember] = useState("");
    const [gender, setGender] = useState("");
    const [decade, setDecade] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [noteForEmployee, setNoteForEmployee] = useState("");
    const [noteForPatient, setNoteForPatient] = useState("");
    const [phone, setPhone] = useState("");
    const [stompClient, setStompClient] = useState(null);

    const handleGenderClick = (selectedGender) => {
        setGender(selectedGender);
    };
    const handleChangeMemberOfFamily = (e) => {
        setMember(e.target.value);
    };
    const handleChangeAge = (e) => {
        setDecade(e.target.value);
    };
    const [idCart, setIdCart] = useState("");
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setMenuSelected(event.currentTarget.dataset.id);
        setAnchorEl(event.currentTarget);
        setStatus(event.currentTarget.getAttribute("value-id"));
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDeletedCart = (value) => {
        Swal.fire({
            title: "Xóa yêu cầu",
            text: "Bạn có chắc chắn xóa yêu cầu này?",
            showCancelButton: true,
            confirmButtonText: "Có",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/api/carts/${value}`).then((res) => {
                    toast.success("Yêu cầu đã xóa.");
                    setCheckCallApiCart((pre) => !pre);
                });
            }
        });
    };
    console.log(listCart);
    const handleUpdateContract = (id) => {
        const findById = listCart.find((e) => e.id === id);
        if (
            findById.decade &&
            findById.gender &&
            findById.firstName &&
            findById.lastName &&
            findById.memberOfFamily &&
            findById.noteForEmployee &&
            findById.noteForPatient
        ) {
            Swal.fire({
                title: "Tạo yêu cầu",
                text: "Bạn có chắc chắn với yêu cầu này?",
                showCancelButton: true,
                confirmButtonText: "Có",
                cancelButtonText: "Hủy",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .put(`http://localhost:8080/api/carts/cartStatus/${findById.id}`)
                        .then((res) => {
                            Swal.fire({
                                title: "Chuyển tiền vào số tài khoản này để gặp hộ lý, số tiền là 200.000 VNĐ",
                                html:
                                  "Số TK: <strong>076 997 0012</strong><br>" +
                                  "Ngân hàng MB Bank <br>" +
                                  "Nội dung: HOTEN_SODIENTHOAI",
                              });
                            toast.success("Yêu cầu đã được chuyển đến quản lí.");
                            setCheckCallApiCart((pre) => !pre);
                        });
                }
            });
        } else if (findById.employee == null) {
            toast.error("Chọn trợ lý");
        } else {
            toast.error("Thông tin người bệnh chưa đầy đủ không thể tạo yêu cầu");
        }
    };
    const handleUpdate = (value) => {
        const findById = listCart.find((e) => e.id === value);
        const checkAge = ageRender.find((e) => e.id === findById?.decade);
        const checkMember = memberOfFamilyList.find((e) => e.id === findById?.memberOfFamily);
        setGender(findById.gender || "");
        setDecade(checkAge ? checkAge.id || "" : "");
        setFirstName(findById.firstName || "");
        setLastName(findById.lastName || "");
        setMember(checkMember ? checkMember.id || "" : "");
        setNoteForEmployee(findById.noteForEmployee || "");
        setNoteForPatient(findById.noteForPatient || "");
        setPhone(findById.phone || "");
        setCheckModal(true);
        setIdCart(findById.id);
    };
    useEffect(() => {
        const socket = new SockJS("http:/localhost:8080/ws");
        const client = Stomp.over(socket);
        client.connect({}, () => {
            client.subscribe("/topic/saler", (message) => {
                const receivedMessage = JSON.parse(message.body);
                // setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                setMessage(receivedMessage);
            });
        });
        socket.onerror = (error) => {
            console.error("Socket error:", error);
        };
        setStompClient(client);
        return () => {
            client.disconnect();
        };
    }, []);
    return (
        <>
            {listCart?.map((e) => {
                const mergedData = e.historyWorkingResponseList.reduce((result, currentItem) => {
                    const existingItem = result.find(
                        (item) => item.dateInWeekName === currentItem.dateInWeekName
                    );
                    if (existingItem) {
                        if (!existingItem.sessionOfDate.includes(currentItem.sessionOfDateName)) {
                            existingItem.sessionOfDate.push(currentItem.sessionOfDateName);
                        }
                    } else {
                        result.push({
                            dateInWeekName: currentItem.dateInWeekName,
                            sessionOfDate: [currentItem.sessionOfDateName],
                        });
                    }

                    return result;
                }, []);

                return (
                    <tr key={e.id}>
                        <td style={{ width: "100px" }}>
                            {e.timeStart} <br /> {e.timeEnd}
                        </td>
                        <td style={{ width: "250px" }}>
                            {mergedData.map((mergedItem, index) => (
                                <div key={index}>
                                    {mergedItem.dateInWeekName} -{" "}
                                    {mergedItem.sessionOfDate.join(", ")}
                                </div>
                            ))}
                        </td>
                        <td style={{width:"150px"}}>
                            {e?.employee?.firstName && e?.employee?.lastName ? (
                                
                                    e?.cartStatus === "Đang xác nhận" ? 
                                    <div>
                                    {e.employee.firstName} {e.employee.lastName} <br />    </div>
: <div>
                                    {e.employee.firstName} {e.employee.lastName} <br /> 
                                    <Link to={`/user/cart/filter/${id}/${e.id}`}>Đổi hộ lý</Link>

                             
                                </div>
                                
                               
                            ) : (
                                <Link to={`/user/cart/filter/${id}/${e.id}`}>Thêm trợ lý</Link>
                            )}
                        </td>
                        <td>
                            <img
                                src={
                                    e?.employee?.photoUrl ||
                                    "https://res.cloudinary.com/dw4xpd646/image/upload/v1703929545/Cloudinary-React/gfxdp8xr8hhsdx0jxyea.png"
                                }
                                alt=""
                                style={{ width: "70px", height: "70px" }}
                            />
                        </td>
                        <td>{e.service.name}</td>
                        <td style={{ width: "170px" }}>
                            {e.infoList.map((e) => e.name).join(", ")}
                        </td>
                        <td style={{ width: "170px" }}>
                            {e.skillList.map((e) => e.name).join(", ")}
                        </td>
                        <td>{e.cartStatus}</td>
                        <td>
                            <i
                                data-id={e.id}
                                value-id={e.cartStatus}
                                style={{ cursor: "pointer" }}
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                                className="fa-solid fa-ellipsis-vertical"
                            ></i>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <ModeEditIcon
                                        onClick={() => handleUpdate(menuSelected)}
                                        style={{ color: "#377af9", cursor: "pointer" }}
                                    />
                                </MenuItem>

                                {status === "Đang xác nhận" || (
                                    <MenuItem onClick={handleClose}>
                                        <CreditScoreIcon
                                            onClick={() => handleUpdateContract(menuSelected)}
                                            style={{ color: "#ff7d4d", cursor: "pointer" }}
                                        />
                                    </MenuItem>
                                )}
                                <MenuItem onClick={handleClose}>
                                    <DeleteForeverIcon
                                        onClick={() => handleDeletedCart(menuSelected)}
                                        style={{ color: "#ff2626", cursor: "pointer" }}
                                    />
                                </MenuItem>
                            </Menu>
                        </td>
                    </tr>
                );
            })}
            <ModalEditCartUser
                gender={gender}
                setGender={setGender}
                setCheckModal={setCheckModal}
                checkModal={checkModal}
                handleGenderClick={handleGenderClick}
                handleChangeMemberOfFamily={handleChangeMemberOfFamily}
                firstName={firstName}
                setNoteForEmployee={setNoteForEmployee}
                setFirstName={setFirstName}
                noteForEmployee={noteForEmployee}
                handleChangeAge={handleChangeAge}
                memberOfFamilyList={memberOfFamilyList}
                setNoteForPatient={setNoteForPatient}
                noteForPatient={noteForPatient}
                lastName={lastName}
                setLastName={setLastName}
                ageRender={ageRender}
                decade={decade}
                phone={phone}
                setPhone={setPhone}
                member={member}
                idCart={idCart}
            />
        </>
    );
}
