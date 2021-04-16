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
import FriendSearch from "./Compontent/friends-search";
import Myinfo from "./Compontent/myinfo";

/* testData */
import studyData from "./testdata/studydata";
import personData from "./testdata/personData";

function App() {

  /* testData State */
  const [notice, setNotice] = useState(studyData);
  const [person, setPerson] = useState(personData);

  /* myInfo Components */
  const [skill, setSkill] = useState([]);
  const [ portfolioModalOpen, setPortfolioModal ] = useState(false);
  const [ careerModalOpen, setCareerModalOpen ] = useState(false);
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
              <Nav.Link href="/myinfo">내정보</Nav.Link>
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
          <Login></Login>
        </Route>
        <Route exact path="/signup"> {/* SignUp_Component */}
          <SignUp></SignUp>
      </Route>
      <Route exact path="/studySearch"> {/* StudySearch_Component */}
        <StudySearch notice={notice}></StudySearch>
      </Route>
      <Route exact path="/friendSearch"> {/* FriendsSearch_Component */}
        <FriendSearch person={person}></FriendSearch>
      </Route>
      <Route exact path="/Myinfo"> {/* MyInfo_Component */}
        <Myinfo
          skill={skill} setSkill={setSkill} portfolioModalOpen={portfolioModalOpen} setPortfolioModal={setPortfolioModal} portfolioList={portfolioList} setPortfolioList={setPortfolioList}>
          careerModalOpen={careerModalOpen} setCareerModalOpen={setCareerModalOpen}
        </Myinfo>
      </Route>

    </div>
  );
}

export default App;
