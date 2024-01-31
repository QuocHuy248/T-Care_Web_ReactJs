import React, { useEffect, useState } from 'react'
import SearchLocationInput from '../apiGoogleMap/SearchLocationInput '
import "./addCustomer.css"  
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ButtonForMe } from '../ButtonForMe';
import { LegalNotice } from '../carehub/LegalNotice';
import ServiceIndexSale from './ServiceIndexSale';
import { toast } from 'react-toastify';
import { FormControl, Input, MenuItem, Select, TextareaAutosize } from '@mui/material';
import { ContainerViewSale } from './ContainerViewerSale';
import { DateIndexSale } from './DataIndexSale';
import { SkillIndexSaleEdit } from './SkillIndexSaleEdit';
import { InfoIndexSaleEdit } from './InforIndexSaleEdit';
import dayjs from 'dayjs';

export default function EditCustomer() {
  const [listInformation, setListInformation] = useState();
  const [customer,setCustomer] = useState(); 
  const [listService, setListService] = useState();
  const [listSkill, setListSkill] = useState();
  const [saleNote, setSaleNote] = useState();
  const [checkButtonService, setCheckButtonService] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInfos, setSelectedInfos] = useState([]);
  const [selectedGender, setSelectedGender] = useState('FEMALE');
  const [selectedEdecade, setSelectedEdecade] = useState('FORTY');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [noteForPatient, setNoteForPatient] = useState('');
  const [noteForEmployee, setNoteForEmployee] = useState('');
  const [phone,setPhone] = useState("");
  const [relation, setRelation] = useState('MYPARENT');
  const [km, setKm] = useState(10);
  const [skillIdRequest, setSkillIdRequest] = useState([])
  const [infoIdRequest, setInforIdRequest] = useState([])
  const [resetInputAddress, setResetInputAddress] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 0,
    lng: 0, 
  });
  const [place, setPlace] = useState("");
  const [value, setValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [defaultDateRange,setDefaultDateRange] = useState([]);
  const [dayInWeek, setDayInWeek] = useState([]);
  const [timeEndPicker, setTimeEndPicker] = useState([]);
  const [startDay, setStartDay] = useState();
  const [endDay, setEndDay] = useState();
  const [listDateSession, setListDateSession] = useState([])
  let navigate = useNavigate();
  const { id } = useParams();
  const {idSale} = useParams();
  const gender = ['MALE','FEMALE','OTHER']
  const edecadeList = ['THIRTY','FORTY','FIFTY','SIXTY','SEVENTY','EIGHTY','NINETY']
  const relationship = ['MYPARENT','MYSPOUSE','MYGRANDPARENTS','MYSELF','OTHER']

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setSelectedLocation({
        lat: latitude,
        lng: longitude,
      });
    });
  }, []);
  useEffect(() => {
    let axiosData = async () => {
      const responseService = await axios.get("http://localhost:8080/api/serviceGenerals");
      setListService(responseService.data);
      const responseInformation = await axios.get("http://localhost:8080/api/add-infos");
      setListInformation(responseInformation.data);
      const responseSkill = await axios.get("http://localhost:8080/api/skills");
      setListSkill(responseSkill.data);
      const customer = await axios.get(`http://localhost:8080/api/carts/${id}`);
      console.log(customer.data);
      setCustomer(customer.data)
      setFirstName(customer.data.firstName);
      setLastName(customer.data.lastName);
      setStartDay(customer.data.timeStart);
      setNoteForPatient(customer.data.noteForPatient)
      setNoteForEmployee(customer.data.noteForEmployee)
      setSaleNote(customer.data.saleNote);
      setRelation(customer.data.memberOfFamily)
      setSelectedGender(customer.data.gender)
      setSelectedLocation({
        lat: customer.data.locationPlace.latitude,
        lng: customer.data.locationPlace.longitude
      });
      setPlace(customer.data.locationPlace.name)
      setKm(customer.data.locationPlace.distanceForWork)
      
      setPhone(customer.data.phone)
      setSelectedEdecade(customer.data.decade)
      setDefaultDateRange([customer.data.timeStart])
      setTimeEndPicker([customer.data.timeEnd])
      setCheckButtonService(customer.data.service.id)
      setSelectedSkills(customer.data.skillList)
      setSelectedInfos(customer.data.infoList)
      setSkillIdRequest(customer.data.skillList.map(e => e.id))
      setInforIdRequest(customer.data.infoList.map(e => e.id))  
      setStartDay(customer.data.timeStart)
      setEndDay(customer.data.timeEnd)
      setListDateSession(customer.data.dateSessionResponseList)

      if(customer.data.timeStart && customer.data.timeEnd){
        setSelectedDate([dayjs(customer.data.timeStart), dayjs(customer.data.timeEnd)])
      }
      
     
      
    };
    axiosData();
  }, []);

  
  const transformedData = Object.entries(value).map(([date, sessionList]) => ({
    date,
    sessionOfDateList: sessionList,
  }));
  function convertDateFormat(dateString) {
    if (!dateString) {
      return "";
    }
  
    const parts = dateString.includes('/')
      ? dateString.split('/')
      : dateString.split('-');
  
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  
  const getDisplayValueGender = (value) => {
    switch (value) {
      case 'MALE':
        return 'Nam';
      case 'FEMALE':
        return 'Nữ';
      case 'OTHER':
        return 'Khác';
      default:
        return '';
    }
  };
  const getDisplayValueRelation = (value) => {
    switch (value) {
      case 'MYPARENT':
        return 'Bố/Mẹ';
      case 'MYSPOUSE':
        return 'Vợ/Chồng';
      case 'MYGRANDPARENTS':
        return 'Ông/Bà';
      case 'MYSELF':
        return 'Bản thân';
      case 'OTHER':
        return 'Khác';
      default:
        return '';
    }
  };
  const getDisplayValueEdecade = (value) => {
    switch (value) {
      case 'THIRTY':
        return '30s';
      case 'FORTY':
        return '40s';
      case 'FIFTY':
        return '50s';
      case 'SIXTY':
        return '60s';
      case 'SEVENTY':
        return '70s';
      case 'EIGHTY':
        return '80s';
      case 'NINETY':
        return '90s';
      default:
        return '';
    }
  };
  
  const cart = {
    timeStart: convertDateFormat(startDay),
    timeEnd: convertDateFormat(endDay),
    noteForPatient: noteForPatient, 
    noteForEmployee: noteForEmployee,
    saleNote: saleNote,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    serviceId: checkButtonService,
    memberOfFamily:relation,
    edecade:selectedEdecade,
    gender:selectedGender,
    latitude: selectedLocation.lat,
    longitude: selectedLocation.lng,
    locationPlace:place,
    distanceForWork: km,
    listDateSession: transformedData,
    idSkills: skillIdRequest,
    idAddInfos: infoIdRequest
  }
  const handleButtonClick = () => {
    const startDate = selectedDate[0];
    const endDate = selectedDate[1];
    const currentDate = new Date();
    if (!selectedDate || !selectedDate[0] || !selectedDate[1]) {
      toast.error("Vui lòng nhập ngày bắt đầu và ngày kết thúc");
      return;
    }


    if (startDate <= currentDate) {
      toast.error("Vui lòng điền ngày bắt đầu lớn hơn ngày hiện tại");
      return;
    }

    if (endDate <= startDate) {
      toast.error("Vui lòng điền ngày kết thúc phải lớn hơn ngày bắt đầu");
      return;
    }
    console.log("cart", cart);
    axios.put(`http://localhost:8080/api/carts/sale/${id}`, cart)
    .then(response => {
      console.log(response.data);
       const cartId = response.data
      toast.success("Thay đổi thông tin khách hàng thành công")
      navigate(`/sale/${idSale}/render-list-assistant/${id}`)
      console.log(response.data);
    })
    .catch(error => {
      toast.error("Vui lòng điền đầy đủ thông tin");
    });
  }
  const handleKmChange = (newKm) => {
    setKm(newKm)
  };
  
  
  const handleQueryChange = (newQuery) => {
  };
    return (
    <>
      <ContainerViewSale />
      <div>
        <div className="index-user-header">
          <h4>THAY ĐỔI THÔNG TIN KHÁCH HÀNG</h4>
        </div>
      </div>
      
      <div className='container'>
        <div >  
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '80px' }}>
          <h6>Họ</h6>
          <div>
            <Input
              placeholder="Nhập họ của khách"
              sx={{ '--Input-focused': 1, width: 256 }}
              type="text"
              value={firstName || customer?.firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>
        <div style={{ marginRight: '80px' }}>
          <h6>Tên</h6>
          <div>
            <Input
              placeholder="Nhập tên của khách"
              sx={{ '--Input-focused': 1, width: 256 }}
              type="text"
              value={lastName || customer?.lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div>
        <h6>Số điện thoại</h6>
        <div style={{ marginRight: '100px' }}>
           <Input
            placeholder="Nhập số điện thoại"
            sx={{ '--Input-focused': 1, width: 256 }}
            type="text"
            value={phone || customer?.phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
       

       
      </div>
      <div style={{padding:"40px 0 20px 0", fontWeight:"600", fontSize:"30px"}}>Thông tin người cần chăm sóc</div>

        <div style={{ display: 'flex', alignItems: 'center', }}>
          <h6>Giới tính:</h6>
          <div style={{ marginRight: '140px',paddingLeft: "58px" }}>
          <FormControl>
            <Select
              value={selectedGender || ''}
              onChange={(e) => setSelectedGender(e.target.value)}
              displayEmpty
              placeholder="Chọn giới tính"
            >
              <MenuItem value="" disabled>
                Chọn giới tính
              </MenuItem>
              {gender?.map((option) => (
                <MenuItem key={option} value={option}>
                  {getDisplayValueGender(option)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <h6>Mối quan hệ</h6>
        <div style={{ marginRight: '120px', paddingLeft: "35px" }}>
        <FormControl>
            <Select
              value={relation || ''}
              onChange={(e) => setRelation(e.target.value)}
              displayEmpty
              placeholder="Mối quan hệ"
            > 
              <MenuItem value="" disabled>
                Mối quan hệ: 
              </MenuItem>
              {relationship?.map((option) => (
                <MenuItem key={option} value={option}>
                  {getDisplayValueRelation(option)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
         
          
        </div>
        <h6>Thập niên</h6>
        <div style={{ paddingRight: '30px', paddingLeft: "80px" }}>
        <FormControl>
            <Select
              value={selectedEdecade || ''}
              onChange={(e) => setSelectedEdecade(e.target.value)}
              displayEmpty
              placeholder="Chọn thập niên"
            >
              <MenuItem value="" disabled>
                Chọn thập niên
              </MenuItem>
              {edecadeList?.map((option) => (
                <MenuItem key={option} value={option}>
                   {getDisplayValueEdecade(option)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
          <div style={{paddingTop: '40px'}}>
        <h6>Ghi chú cho bệnh nhân</h6>
        <div>
          <TextareaAutosize
            placeholder="Ghi chú cho bệnh nhân"
            minRows={4}
            style={{width:"940px"}}
            value={noteForPatient || customer?.noteForPatient}
            onChange={(e) => setNoteForPatient(e.target.value)}
            sx={{
              '&::before': {
                display: 'none',
              },
              '&:focus-within': {
                outline: '2px solid var(--Textarea-focusedHighlight)',
                outlineOffset: '2px',
              },
            }}
          />
        </div>
      </div>
      <div style={{paddingTop: '40px'}}>
        <h6>Ghi chú cho nhân viên</h6>
        <div>
          <TextareaAutosize
            placeholder="Ghi chú cho nhân viên"
            minRows={4}
            style={{width:"940px"}}
            value={noteForEmployee || customer?.noteForEmployee}
            onChange={(e) => setNoteForEmployee(e.target.value)}
            sx={{
              '&::before': {
                display: 'none',
              },
              '&:focus-within': {
                outline: '2px solid var(--Textarea-focusedHighlight)',
                outlineOffset: '2px',
              },
            }}
          />
        </div>
      </div>
      <div style={{paddingTop: '40px',paddingBottom: "40px"}}>
        <h6>Ghi chú của sale</h6>
        <div>
          <TextareaAutosize
            placeholder="Ghi chú của sale"
            minRows={4}
            style={{width:"940px"}}
            value={saleNote || customer?.saleNote}
            onChange={(e) => setSaleNote(e.target.value)}
            sx={{
              '&::before': {
                display: 'none',
              },
              '&:focus-within': {
                outline: '2px solid var(--Textarea-focusedHighlight)',
                outlineOffset: '2px',
              },
            }}
          />
        </div>
      </div>
          <div>
        <div>
        </div>
      </div>
          <div className="w-100"><SearchLocationInput
            setSelectedLocation={setSelectedLocation}
            onQueryChange={handleQueryChange}
            setPlace={setPlace}
            marginTest={"0"}
            resetInputAddress={resetInputAddress}
            children={true}
            onKmChange={handleKmChange}
            defaultValue={customer?.locationPlace?.name}
          /></div>
          <div style={{paddingTop: '40px'}}>
            <h6 className='m0'>Thời gian cần chăm sóc</h6>
            <div className="index-user-body-dates-render">
              <DateIndexSale
                setSelectedDate={setSelectedDate}
                dayInWeek={dayInWeek}
                setValue={setValue}
                selectedDate={selectedDate}
                setDayInWeek={setDayInWeek}
                setStartDay={setStartDay}
                setEndDay={setEndDay}
                defaultDateRange = {defaultDateRange}
                timeEndPicker = {timeEndPicker}
              />
            </div>
          </div>
          <div style={{paddingTop: '40px'}}>
            <h6>Gói của khách</h6>
            <div className="index-user-body-services-render">
              {listService?.map((e) => (
                <ServiceIndexSale
                  key={e.id}
                  value={e}
                  setCheckButtonService={setCheckButtonService}
                  checkButtonService={checkButtonService}
                />
              ))}
            </div>
          </div>
          <div className="index-user-body-skills">
          <h6>Kỹ năng/ Đào tạo</h6>
            <div className="index-user-body-skills-render">
              {listSkill?.map((e) => (
                <SkillIndexSaleEdit
                  key={e.id}
                  setSelectedSkills={setSelectedSkills}
                  selectedSkills={selectedSkills}
                  skillIdRequest={skillIdRequest}
                  setSkillIdRequest={setSkillIdRequest}
                  value={e}
                />
              ))}
            </div>
          </div>
          <div className="index-user-body-infos">
            <h6>Thông tin thêm</h6>
            <div className="index-user-body-infos-render">
              {listInformation?.map((e) => (
                <InfoIndexSaleEdit
                  key={e.id}
                  setSelectedInfos={setSelectedInfos}
                  selectedInfos={selectedInfos}
                  infoIdRequest={infoIdRequest}
                  setInforIdRequest={setInforIdRequest}
                  value={e}
                />
              ))}
            </div>
          </div>
          <div className="button-index-user">
            <ButtonForMe
              value={60}
              childrenButton={"Thay đổi"}
              colorButton={"#3b71aa"}
              onclick={handleButtonClick}
            />
          </div>  
        </div>
      </div>
      <LegalNotice />
    </>
  );
}
