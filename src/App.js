
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home';
import Layout from './components/Layout';
import NoPage from './components/NoPage';
import Posts from './components/Posts';
import CreatePost from './components/CreatePost';
import FundRaiserSignup from './components/FundRaiserSignup';
import FundRaiserLogin from './components/FundRaiserLogin';
import DonorSignup from './components/DonorSignup';
import DonorLogin from './components/DonorLogin';
import Profile from './components/Profile';
import FundraiserProfile from './components/FundRaiserProfile';
import DonorProfile from './components/DonorProfile';
import MyPosts from './components/MyPosts';
import ViewDonations from './components/ViewDonations';

function App() {
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route path="fundraiser-signup" element={<FundRaiserSignup/>}/>
      <Route path="fundraiser-login" element={<FundRaiserLogin/>}/>
      
      <Route path="donor-login" element={<DonorLogin/>}/>
      <Route path="donor-signup" element={<DonorSignup/>}/>

      <Route path="profile" element={<Profile/>} />
      <Route path="fundraiser-profile" element={<FundraiserProfile/>} />
      <Route path="donor-profile" element={<DonorProfile/>} />

        <Route index element={<Home />} />
        <Route path="posts" element={<Posts/>} />
        <Route path="my-posts" element={<MyPosts/>}/>
        <Route path="create-post" element={<CreatePost/>} />
        <Route path="*" element={<NoPage />} />
        <Route path="view-donations" element={<ViewDonations/>}/>

        
      </Route>
    </Routes>
  </BrowserRouter>

  );
}

export default App;
