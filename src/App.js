import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import { Home } from "./components/home/Home";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { UserSignIn } from "./components/home/wordFindCare/userSignIn/UserSignIn";
import { UserAddress } from "./components/home/wordFindCare/userAddress/UserAddress";
import { UserService } from "./components/home/wordFindCare/userService/UserService";
import { DateSession } from "./components/home/wordFindCare/datesession/DateSession";
import { UserNeedCare } from "./components/home/wordFindCare/userNeedCare/UserNeedCare";
import { AssistantCaption } from "./components/home/wordFindCare/assistantCaption/AssistantCaption";
import { RenderListAssistant } from "./components/home/wordFindCare/renderListAssistant/RenderListAssistant";
import { SignInSelect } from "./components/home/login-signin/signInSelect/SignInSelect";
import { LogIn } from "./components/home/login-signin/login/LogIn";
import { SignInUser } from "./components/home/login-signin/signInUser/SignInUser";
import { Profile } from "./components/viewUser/profile/Profile";
import { AssistantSignIn } from "./components/home/wordFindJobs/assistantSignIn/AssistantSignIn";
import { Address } from "./components/home/wordFindJobs/address/Address";
import { DescriptionProcess } from "./components/home/wordFindJobs/descriptionProcess/DescriptionProcess";
import { Availability } from "./components/home/wordFindJobs/availability/Availability";
import { Experience } from "./components/home/wordFindJobs/experience/Experience";
import { Bio } from "./components/home/wordFindJobs/bio/Bio";
import { Photo } from "./components/home/wordFindJobs/photo/Photo";
import SalerView from "./components/saler/SalerView";
import { ForgotPassword } from "./components/home/login-signin/forgotPassword/ForgotPassword";
import AddCustomer from "./components/saler/AddCustomer";
import { IndexUser } from "./components/viewUser/index/IndexUser";
import { ProfileAssistant } from "./components/viewUser/profileAssistant/ProfileAssistant";
import EditCustomer from "./components/saler/EditCustomer";
import { RenderListAssistantSale } from "./components/saler/RenderListAssistantSale";
import { CartUser } from "./components/viewUser/cartUser/CartUser";
import { FilterCartUser } from "./components/viewUser/cartUser/FilterCartUser";
import { SkillAndInfo } from "./components/home/wordFindCare/skillAndInfo/SkillAndInfo";
import { EmployeeIndex } from "./components/employee/EmployeeIndex";
import { ResetPassword } from "./components/home/login-signin/forgotPassword/ResetPassword";
import { EmployeeProfile } from "./components/employee/EmployeeProfile";
import SaleContract from "./components/saler/SaleContract";
import SalerViewForUser from "./components/saler/SaleViewForUser";
import { EmployeeContract } from "./components/employee/EmployeeContract";
import { AdminHome } from "./components/dashboard/AdminHome";
import { AdminStatistics } from "./components/dashboard/AdminStatistics";
import { AdminAssistant } from "./components/dashboard/AdminAssistant";
import { createContext, useReducer } from "react";
import { UserContract } from "./components/viewUser/userContract/UserContract";

export const AuthContext = createContext();
const initUser = {
  userId: "",
  role: "",
};
const userReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "UPDATE_ROLE": {
      return {
        userId: action.payload.userId,
        role: action.payload.role,
      };
    }
    default:
      return state;
  }
};

function App() {
  const [user, dispatch] = useReducer(userReducer, initUser);
  let navigate = useNavigate();
  function PrivateRouteSale({ children }) {
    const auth = useAuthForSale();
    return auth ? children : <Navigate to="/login" />;
  }
  function PrivateRouteEmployee({ children }) {
    const auth = useAuthForEmployee();
    return auth ? children : <Navigate to="/login" />;
  }
  function PrivateRouteAdmin({ children }) {
    const auth = useAuthForAdmin();
    return auth ? children : <Navigate to="/login" />;
  }
  function PrivateRouteUser({ children }) {
    const auth = useAuthForUser();
    return auth ? children : <Navigate to="/login" />;
  }
  function PrivateRouteHome({ children }) {
    let roleUser = JSON.parse(localStorage.getItem("user"));
    if (roleUser) {
      if (roleUser.payload.role == "ROLE_USER") {
        return <Navigate to={`/user/index/${roleUser.payload.userId}`} />;
      }
      if (roleUser.payload.role == "ROLE_EMPLOYEE") {

        return <Navigate to={`/employee/contract/${roleUser.payload.userId}`}/>;
      }
      if (roleUser.payload.role == "ROLE_SALE") {
        return <Navigate to={`/sale/${roleUser.payload.userId}`} />;
      }
      if (roleUser.payload.role == "ROLE_ADMIN") {
        return <Navigate to={`/admin/home/${roleUser.payload.userId}`} />;
      }
    }
    return children;
  }

  function useAuthForSale() {
    let roleUser = JSON.parse(localStorage.getItem("user"));
    console.log("roleUser", roleUser);
    if (roleUser) {
      if (roleUser.payload.role == "ROLE_SALE") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  function useAuthForEmployee() {
    let roleUser = JSON.parse(localStorage.getItem("user"));
    if (roleUser) {
      if (roleUser.payload.role == "ROLE_EMPLOYEE") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  function useAuthForAdmin() {
    let roleUser = JSON.parse(localStorage.getItem("user"));
    if (roleUser) {
      if (roleUser.payload.role == "ROLE_ADMIN") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  function useAuthForUser() {
    let roleUser = JSON.parse(localStorage.getItem("user"));
    if (roleUser) {
      if (roleUser.payload.role == "ROLE_USER") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  console.log("user", user);
  return (
    <>
      <ToastContainer autoClose={3000} theme="colored" />
      <AuthContext.Provider value={{ user, dispatch }}>
        <Routes>
          <Route
            path="/home"
            element={
              <PrivateRouteHome>
                <Home />
              </PrivateRouteHome>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <PrivateRouteHome>
                <LogIn />
              </PrivateRouteHome>
            }
          ></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/sign-in" element={<SignInSelect />}></Route>
          <Route path="/sign-in/find-care" element={<SignInUser />}></Route>
          <Route
            path="/assistant/sign-in"
            element={
              <AssistantSignIn />
            }
          ></Route>
          <Route
            path="/assistant/address/:id"
            element={
                <Address />
            }
          ></Route>
          <Route
            path="/assistant/process/:id"
            element={
                <DescriptionProcess />
            }
          ></Route>
          <Route
            path="/assistant/availability/:id"
            element={
                <Availability />
            }
          ></Route>
          <Route
            path="/assistant/experience/:id"
            element={
                <Experience />
            }
          ></Route>

          <Route
            path="/assistant/bio/:id"
            element={
                <Bio />
            }
          ></Route>
          <Route
            path="/assistant/photo/:id"
            element={
                <Photo />
            }
          ></Route>
          <Route
            path="/user/signin"
            element={
                <UserSignIn />
            }
          ></Route>
          <Route
            path="/user/address/:id"
            element={
                <UserAddress />
            }
          ></Route>
          <Route
            path="/user/service/:id"
            element={
                <UserService />
            }
          ></Route>
          <Route
            path="/user/skill-info/:id"
            element={
                <SkillAndInfo />
            }
          ></Route>
          <Route
            path="/user/date-session/:id"
            element={
                <DateSession />
            }
          ></Route>
          <Route
            path="/user/need-care/:id"
            element={
                <UserNeedCare />
            }
          ></Route>
          <Route
            path="/user/assistant-caption/:idCart"
            element={
                <AssistantCaption />
            }
          ></Route>
          <Route
            path="/user/render-list-assistant/:id"
            element={
                <RenderListAssistant />
            }
          ></Route>
          <Route
            path="/user/profile/:id"
            element={
              <PrivateRouteUser>
                <Profile />
              </PrivateRouteUser>
            }
          ></Route>
          <Route
            path="/user/cart/:id"
            element={
              <PrivateRouteUser>
                <CartUser />
              </PrivateRouteUser>
            }
          ></Route>
          <Route
            path="/user/contract/:id"
            element={
              <PrivateRouteUser>
                <UserContract />
              </PrivateRouteUser>
            }
          ></Route>

          <Route
            path="/user/cart/filter/:id/:idCart"
            element={
              <PrivateRouteUser>
                <FilterCartUser />
              </PrivateRouteUser>
            }
          ></Route>
          <Route
            path="/user/index/:id/:idAssistant"
            element={
              <PrivateRouteUser>
                <ProfileAssistant />
              </PrivateRouteUser>
            }
          ></Route>
          <Route
            path="/user/index/:id"
            element={
              <PrivateRouteUser>
                <IndexUser />
              </PrivateRouteUser>
            }
          ></Route>
          <Route
            path="/sale/:id"
            element={
              <PrivateRouteSale>
                <SalerView />
              </PrivateRouteSale>
            }
          ></Route>
          <Route
            path="/sale/sale-for-user/:id"
            element={
              <PrivateRouteSale>
                <SalerViewForUser />
              </PrivateRouteSale>
            }
          ></Route>
          <Route
            path="/sale/add-customer/:id"
            element={
              <PrivateRouteSale>
                <AddCustomer />
              </PrivateRouteSale>
            }
          ></Route>
          <Route
            path="/sale/edit-customer/:idSale/:id"
            element={
              <PrivateRouteSale>
                <EditCustomer />
              </PrivateRouteSale>
            }
          ></Route>
          <Route
            path="/sale/sale-contract/:id"
            element={
              <PrivateRouteSale>
                <SaleContract />
              </PrivateRouteSale>
            }
          ></Route>
          <Route
            path="/sale/:idSale/render-list-assistant/:id"
            element={
              <PrivateRouteSale>
                <RenderListAssistantSale />
              </PrivateRouteSale>
            }
          ></Route>
          <Route
            path="/employee/index/:idEmployee"
            element={
              <PrivateRouteEmployee>
                <EmployeeIndex />
              </PrivateRouteEmployee>
            }
          ></Route>

          <Route
            path="/employee/contract/:idEmployee"
            element={
              <PrivateRouteEmployee>
                <EmployeeContract />
              </PrivateRouteEmployee>
            }
          ></Route>
          <Route
            path="/employee/profile/:idEmployee"
            element={
              <PrivateRouteEmployee>
                <EmployeeProfile />
              </PrivateRouteEmployee>
            }
          ></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route
            path="/admin/home/:idAdmin"
            element={
              <PrivateRouteAdmin>
                <AdminHome />
              </PrivateRouteAdmin>
            }
          ></Route>
          <Route
            path="/admin/statistics/:idAdmin"
            element={
              <PrivateRouteAdmin>
                <AdminStatistics />
              </PrivateRouteAdmin>
            }
          ></Route>
          <Route
            path="/admin/assistant/:idAdmin"
            element={
              <PrivateRouteAdmin>
                <AdminAssistant />
              </PrivateRouteAdmin>
            }
          ></Route>
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
