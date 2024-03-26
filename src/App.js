
import './App.css';
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Layout from './components/Layout';
import NoPage from './components/NoPage';
import Test from './components/Test';
import Profile from './components/Profile';
import Posts from './components/Posts';
import CreatePost from './components/CreatePost';
import FundRaiserSignup from './components/FundRaiserSignup';
import FundRaiserLogin from './components/FundRaiserLogin';
import DonorLogin from './components/DonorLogin';
import DonorSignUp from './components/DonorSignUp';

function App() {
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route path="signup" element={<FundRaiserSignup/>}/>
      <Route path="login" element={<FundRaiserLogin/>}/>
      <Route path="profile" element={<Profile/>} />
        <Route index element={<Home />} />
        <Route path="posts" element={<Posts/>} />
        <Route path="test" element={<Test/>} />
        <Route path="create-post" element={<CreatePost/>} />
        <Route path="donor-login" element={<DonorLogin/>}/>
        <Route path="donor-signup" element={<DonorSignUp/>}/>
        <Route path="*" element={<NoPage />} />
       
      </Route>
    </Routes>
  </BrowserRouter>

  );
}

export default App;
