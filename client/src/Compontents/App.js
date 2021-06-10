import '../css/App.css';
import React, { Suspense } from 'react';

/* Lib */
import { Route, Switch } from 'react-router';

/* Components */
import NavBar from "./NavBar";
import Mainpage from "../pages/Mainpage";
import Login from '../pages/LoginPage';
import Regiseter from "../pages/RegisterPage";
import StudySearch from "../pages/StudySearch";
import FriendSearch from "../pages/FriendSearch";
import Myprofile from "../pages/Myprofile";
import UploadStudyPost from "../pages/UploadStudyPost";
import StudyDetail from "./StudySearch/StudyDetail";
import Profile from "../pages/Profile"
import Auth from './HOC/auth'
import Footer from './Footer'

function App() {

  return (
    <Switch>
      <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar />
        <div style={{ textAlign: 'center', minHeight: 'calc(100vh - 80px)' }}>
          <Route exact path="/" component={Auth(Mainpage, null)} />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route exact path="/signup" component={Auth(Regiseter, false)} />
          <Route exact path="/studySearch" component={Auth(StudySearch, null)} />
          <Route exact path="/friendSearch" component={Auth(FriendSearch, null)} />
          <Route exact path="/detail/:studyId" component={Auth(StudyDetail, null)} />
          <Route exact path="/myprofile" component={Auth(Myprofile, true)} />
          <Route exact path="/profile/:profileId" component={Auth(Profile, null)} />
          <Route exact path="/uploadStudy" component={Auth(UploadStudyPost, true)} />
        </div>
        <Footer />
      </Suspense>
    </Switch>
  );
}

export default App;
