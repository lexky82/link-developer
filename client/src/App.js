import './App.css';

/* Lib */

import { Route } from 'react-router';

/* Components */
import NavBar from "./Compontents/Navbar/NavBar";
import Mainpage from "./Compontents/mainpage";
import Login from './Compontents/LoginPage/LoginPage';
import Regiseter from "./Compontents/RegisterPage/RegisterPage";
import StudySearch from "./Compontents/studySearch";
import FriendSearch from "./Compontents/friendSearch";
import Myprofile from "./Compontents/myprofile";
import UploadStudyPost from "./Compontents/UploadStudyPost";
import StudyDetail from "./Compontents/studyDetail";
import Auth from './hoc/auth'

function App() {

  return (
    <div className="App">


      <NavBar/>
      
      <Route exact path="/" component={Auth(Mainpage, null)} /> {/* Main_Component */}
      <Route exact path="/login" component={Auth(Login, false)} /> {/* Login_Component */}
      <Route exact path="/signup" component={Auth(Regiseter, false)} /> {/* SignUp_Component */}
      <Route exact path="/studySearch" component={Auth(StudySearch, true)} /> {/* StudySearch_Component */}
      <Route exact path="/friendSearch" component={Auth(FriendSearch, true)} /> {/* FriendsSearch_Component */}
      <Route exact path="/myprofile" component={Auth(Myprofile, true)} /> {/* myprofile_Component */}
      <Route exact path="/detail" component={Auth(StudyDetail, true)} /> {/* Main_Component */}
      <Route exact path="/uploadStudy" component={Auth(UploadStudyPost, true)} />
      
    </div>
  );
}

export default App;
