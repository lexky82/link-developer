import './App.css';
import React, { Suspense } from 'react';

/* Lib */
import { Route } from 'react-router';
import { GithubOutlined, HomeOutlined, MailOutlined } from "@ant-design/icons";

/* Components */
import NavBar from "./Compontents/NavBar";
import Mainpage from "./Compontents/Mainpage";
import Login from './Compontents/LoginPage/LoginPage';
import Regiseter from "./Compontents/RegisterPage/RegisterPage";
import StudySearch from "./Compontents/StudySearch/StudySearch";
import FriendSearch from "./Compontents/FriendSearch/FriendSearch";
import Myprofile from "./Compontents/Profile/Myprofile";
import UploadStudyPost from "./Compontents/UploadStudyPost";
import StudyDetail from "./Compontents/StudyDetail/StudyDetail";
import Profile from "./Compontents/Profile/Profile"
import Auth from './hoc/auth'

function App() {

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ textAlign: 'center', minHeight: 'calc(100vh - 80px)' }}>
        <Route exact path="/" component={Auth(Mainpage, null)} />
        <Route exact path="/login" component={Auth(Login, false)} />
        <Route exact path="/signup" component={Auth(Regiseter, false)} />
        <Route exact path="/studySearch" component={Auth(StudySearch, null)} />
        <Route exact path="/friendSearch" component={Auth(FriendSearch, null)} />
        <Route exact path="/detail/:studyId" component={Auth(StudyDetail, true)} />
        <Route exact path="/myprofile" component={Auth(Myprofile, true)} />
        <Route exact path="/profile/:profileId" component={Auth(Profile, true)} />
        <Route exact path="/uploadStudy" component={Auth(UploadStudyPost, true)} />
      </div>
      <footer style={{ textAlign: 'center', borderTop:'1px solid black' }}>

        <div style={{ backgroundColor: 'white', fontSize: '22px' }}>
          <a href="mailto:lexky82@gmail.com"><MailOutlined /></a>
          <a href="https://tried.tistory.com/"><HomeOutlined /></a>
          <a href="https://github.com/lexky82"><GithubOutlined /></a>
        </div>


        <div style={{ backgroundColor: 'black', color: 'white' }}>
          Copyright © Kwon Hyeok Jin 2021
          <div style={{ fontSize: '22px' }}>

          </div>

        </div>
      </footer>
    </Suspense>
  );
}

export default App;
