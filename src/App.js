import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import NoPage from "./components/NoPage";
//import Test from './components/Test';
import Posts from "./components/Posts";
import CreatePost from "./components/CreatePost";
import FundRaiserSignup from "./components/FundRaiserSignup";
import FundRaiserLogin from "./components/FundRaiserLogin";
import FundraiserProfile from "./components/FundRaiserProfile";
import DonorSignup from "./components/DonorSignup";
import DonorLogin from "./components/DonorLogin";
import DonorProfile from "./components/DonorProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="signup" element={<FundRaiserSignup/>}/>
        <Route path="login" element={<FundRaiserLogin/>}/>
        <Route path="profile" element={<FundraiserProfile/>} />
        <Route path="donor-profile" element={<DonorProfile/>} />
        <Route path="donor-signup" element={<DonorSignup />} />

        <Route path="donor-login" element={<DonorLogin />}>
          <Route index element={<Home />} />
          <Route path="posts" element={<Posts />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
