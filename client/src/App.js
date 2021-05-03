import './App.css';

/* Lib */
import { Navbar, Nav } from 'react-bootstrap';
import { Route } from 'react-router';
import { useState } from 'react';

/* Components */
import Mainpage from "./Compontent/mainpage";
import Login from './Compontent/signIn';
import SignUp from "./Compontent/signUp";
import StudySearch from "./Compontent/studySearch";
import FriendSearch from "./Compontent/friendSearch";
import Myprofile from "./Compontent/myprofile";
import StudyDetail from "./Compontent/studyDetail";

/* testData */
import studyData from "./testdata/studydata";
import personData from "./testdata/personData";

function App() {

  /* testData State */
  const [notice, setNotice] = useState(studyData);
  const [randerNotice, setRanderNotice] = useState(studyData);
  const [person, setPerson] = useState(personData);

  /* friendSearch State */
  const [randerPerson, setRanderPerson] = useState(personData);

  /* studySearch State */
  const [studyModalOpen, setStudyModalOpen] = useState("");

  /* signIn State */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* myprofile State */
  const [skill, setSkill] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [portfolioList, setPortfolioList] = useState([]);

  return (
    <div className="App">
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark"> {/* Navigatorbar */}
          <Navbar.Brand href="/">
            <img
              src="https://image.flaticon.com/icons/png/512/625/625078.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#">안내</Nav.Link>
              <Nav.Link href="/studySearch">스터디 찾기</Nav.Link>
              <Nav.Link href="/friendSearch">동료 찾기</Nav.Link>
              <Nav.Link href="/myprofile">내정보</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link href="/login">로그인</Nav.Link>
              <Nav.Link href="/signup">회원가입</Nav.Link>
            </Nav>
            <Nav>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Route exact path="/"> {/* Main_Component */}
          <Mainpage></Mainpage>
        </Route>
        <Route exact path="/login"> {/* Login_Component */}
          <Login email={email} setEmail={setEmail} password={password} setPassword={setPassword}></Login>
        </Route>
        <Route exact path="/signup"> {/* SignUp_Component */}
          <SignUp></SignUp>
      </Route>
      <Route exact path="/studySearch"> {/* StudySearch_Component */}
        <StudySearch  
        studyModalOpen={studyModalOpen} setStudyModalOpen={setStudyModalOpen} 
        notice={notice} setNotice={setNotice} 
        randerNotice = {randerNotice} setRanderNotice={setRanderNotice}
        >
        </StudySearch>
      </Route>
      <Route exact path="/friendSearch"> {/* FriendsSearch_Component */}
        <FriendSearch person={person}
        randerPerson={randerPerson} setRanderPerson={setRanderPerson}
        ></FriendSearch>
      </Route>
      <Route exact path="/myprofile"> {/* myprofile_Component */}
        <Myprofile
          skill={skill} setSkill={setSkill} modalOpen={modalOpen} setModalOpen={setModalOpen} 
          portfolioList={portfolioList} setPortfolioList={setPortfolioList}>
          
        </Myprofile>
      </Route>
      <Route exact path="/detail"> {/* Main_Component */}
          <StudyDetail></StudyDetail>
        </Route>

    </div>
  );
}

export default App;
