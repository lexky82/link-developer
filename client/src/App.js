import './App.css';
import React, { Suspense } from 'react';
/* Lib */
import { Route } from 'react-router';

/* Components */
import NavBar from "./Compontents/Navbar/NavBar";
import Mainpage from "./Compontents/Mainpage";
import Login from './Compontents/LoginPage/LoginPage';
import Regiseter from "./Compontents/RegisterPage/RegisterPage";
import StudySearch from "./Compontents/StudySearch";
import FriendSearch from "./Compontents/FriendSearch";
import Myprofile from "./Compontents/Profile/Myprofile";
import UploadStudyPost from "./Compontents/UploadStudyPost";
import StudyDetail from "./Compontents/StudyDetail";
import Profile from "./Compontents/Profile/Profile";
import Auth from './hoc/auth'

function App() {

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ textAlign:'center', minHeight: 'calc(100vh - 80px)' }}>
        <Route exact path="/" component={Auth(Mainpage, null)} /> {/* Main_Component */}
        <Route exact path="/login" component={Auth(Login, false)} /> {/* Login_Component */}
        <Route exact path="/signup" component={Auth(Regiseter, false)} /> {/* SignUp_Component */}
        <Route exact path="/studySearch" component={Auth(StudySearch, true)} /> {/* StudySearch_Component */}
        <Route exact path="/friendSearch" component={Auth(FriendSearch, true)} /> {/* FriendsSearch_Component */}
        <Route exact path="/myprofile" component={Auth(Myprofile, true)} /> {/* myprofile_Component */}
        <Route exact path="/detail/:studyId" component={Auth(StudyDetail, true)} /> {/* studyDetail_Component */}
        <Route exact path="/profile/:Id" component={Auth(Profile, true)} /> {/* friendPrifle_Component */}

        <Route exact path="/uploadStudy" component={Auth(UploadStudyPost, true)} />
      </div>
    </Suspense>


  );
}

export default App;
