
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Layout from './components/Layout';
import NoPage from './components/NoPage';
import Test from './components/Test';
import Profile from './components/Profile';
import Posts from './components/Posts';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route path="profile" element={<Profile/>} />
        <Route index element={<Home />} />
        <Route path="posts" element={<Posts/>} />
        <Route path="test" element={<Test/>} />
        <Route path="create-post" element={<CreatePost/>} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
