import React, { useEffect, useState } from 'react'
import { ContainerViewUser } from '../viewUser/containerViewUser/ContainerViewUser'
import SearchLocationInput from '../apiGoogleMap/SearchLocationInput '
import "./addCustomer.css"  
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { DateIndexUser } from '../viewUser/index/DateIndexUser';
import { ButtonForMe } from '../ButtonForMe';
import { LegalNotice } from '../carehub/LegalNotice';
import ServiceIndexSale from './ServiceIndexSale';
import { toast } from 'react-toastify';
import { FormControl, FormLabel, Input, MenuItem, Radio, RadioGroup, Select, TextareaAutosize } from '@mui/material';
import { SkillIndexUser } from '../viewUser/index/SkillIndexUser';
import { InfoIndexUser } from '../viewUser/index/InfoIndexUser';
import { ContainerViewSale } from './ContainerViewerSale';
import { InfoIndexSale } from './InfoIndexSale';
import { SkillIndexSale } from './SkillIndexSale';
import LoadingCommon from '../common/LoadingCommon';

export default function AddCustomer() {
  const [listInformation, setListInformation] = useState();
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
  const [resetInputAddress, setResetInputAddress] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 0,
    lng: 0, 
  });
  const [place, setPlace] = useState("");
  const [value, setValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  
  const [dayInWeek, setDayInWeek] = useState([]);
  const [startDay, setStartDay] = useState();
  const [endDay, setEndDay] = useState();
  let navigate = useNavigate();
  const { id } = useParams();
  const gender = ['MALE','FEMALE','OTHER']
  const edecade = ['THIRTY','FORTY','FIFTY','SIXTY','SEVENTY','EIGHTY','NINETY']
  const relationship = ['MYPARENT','MYSPOUSE','MYGRANDPARENTS','MYSELF','OTHER']
  const handleReset = () => {
    setSelectedInfos([]);
    setSelectedSkills([]);
    setCheckButtonService("");
    setResetInputAddress((pre) => !pre);
  };
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
      setIsLoading(false)
    };
    axiosData();
  }, []);
  const loadCustomers = async () => {
    try {
      setIsLoading(true);
  
      const response = await axios.get(`http://localhost:8080/api/carts/sale/${id}`);
      const customers = response.data;
  
      setIsLoading(false);
  
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

    
  const transformedData = Object.entries(value).map(([date, sessionList]) => ({
    date,
    sessionOfDateList: sessionList,
  }));
  if (isLoading) {
    return <LoadingCommon />;
  }
  function convertDateFormat(dateString) {
    if (!dateString) {
      return ""; 
    }
  
    const parts = dateString.split('/');
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
    idSkills: selectedSkills,
    idAddInfos: selectedInfos,

  }
  const handleButtonClick = () => {
    if (!selectedDate || !selectedDate[0] || !selectedDate[1]) {
      toast.error("Vui lòng ngày bắt đầu và ngày kết thúc");
      return;
    }


    const startDate = selectedDate[0];
    const endDate = selectedDate[1];
    const currentDate = new Date();


    if (startDate <= currentDate) {
      toast.error("Vui lòng điền ngày bắt đầu lớn hơn ngày hiện tại");
      return;
    }

    if (endDate <= startDate) {
      toast.error("Vui lòng điền ngày kết thúc phải lớn hơn ngày bắt đầu");
      return;
    }
    console.log(cart);
    axios.post(`http://localhost:8080/api/carts/sale/${id}`, cart)
    .then(response => {
      console.log(response.data);
       const cartId = response.data
      toast.success("Thêm mới khách hàng thành công")
      setIsLoading(false
        )
      loadCustomers();
      navigate(`/sale/${id}/render-list-assistant/${cartId}`)
    })
    .catch(error => {
      toast.error("Vui lòng điền đầy đủ thông tin");
    });
  }
  const handleKmChange = (newKm) => {
    setKm(newKm)
  };

  
  return (
    <>
      <ContainerViewSale />
      <div>
        <div className="index-user-header">
          <h4>THÊM MỚI KHÁCH HÀNG</h4>
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
              value={firstName}
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
              value={lastName}
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      </div>
      <div style={{padding:"40px 0 20px 0", fontWeight:"600", fontSize:"30px"}}>Thông tin người cần chăm sóc</div>

        <div style={{ display: 'flex', alignItems: 'center' }}>

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
              {gender.map((option) => (
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
              {relationship.map((option) => (
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
              {edecade.map((option) => (
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
            value={noteForPatient}
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
            value={noteForEmployee}
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
            value={saleNote}
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
            setPlace={setPlace}
            marginTest={"0"}
            resetInputAddress={resetInputAddress}
            children={true}
            setKm = {setKm}
            onKmChange={handleKmChange}
          /></div>
          <div style={{paddingTop: '40px'}}>
            <h6 className='m0'>Thời gian cần chăm sóc</h6>
            <div className="index-user-body-dates-render">
              <DateIndexUser
                setSelectedDate={setSelectedDate}
                dayInWeek={dayInWeek}
                setValue={setValue}
                selectedDate={selectedDate}
                setDayInWeek={setDayInWeek}
                setStartDay={setStartDay}
                setEndDay={setEndDay}
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
                <SkillIndexSale
                  key={e.id}
                  setSelectedSkills={setSelectedSkills}
                  selectedSkills={selectedSkills}
                  value={e}
                />
              ))}
            </div>
          </div>
          <div className="index-user-body-infos">
            <h6>Thông tin thêm</h6>
            <div className="index-user-body-infos-render">
              {listInformation?.map((e) => (
                <InfoIndexSale
                  key={e.id}
                  setSelectedInfos={setSelectedInfos}
                  selectedInfos={selectedInfos}
                  value={e}
                />
              ))}
            </div>
          </div>
          <div className="button-index-user">
            <ButtonForMe
              value={60}
              childrenButton={"Tạo mới"}
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
