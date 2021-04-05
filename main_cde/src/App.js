import './App.css';

/* Lib */
import { Navbar, Nav } from 'react-bootstrap';
import { Route, Switch } from 'react-router';
import { useState } from 'react';

/* Components */
import Mainpage from "./Compontent/mainpage";
import Login from './Compontent/login';
import SignUp from "./Compontent/sign-up";
import Search from "./Compontent/tech-search";
import FriendSearch from "./Compontent/friends-search";

function App() {

  const [Email, setEmail] = useState('');
  const [Passwrod, setPassword] = useState('');

  return (
    <div className="App">
      <nav> {/* Navigation_bar */}
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
              <Nav.Link href="/search">스터디 찾기</Nav.Link>
              <Nav.Link href="/friendSearch">동료 찾기</Nav.Link>
              <Nav.Link href="#">내정보</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link href="/login">로그인</Nav.Link>
              <Nav.Link href="/signup">회원가입</Nav.Link>
            </Nav>
            <Nav>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </nav>

      <Switch>
        <Route exact path="/"> {/* Main_Component */}
          <Mainpage></Mainpage>
        </Route>
        <Route exact path="/login"> {/* Login_Component */}
          <Login></Login>
        </Route>
        <Route exact path="/signup"> {/* SignUp_Component */}
          <SignUp></SignUp>
        </Route>
        <Route exact path="/search"> {/* Search_Component */}
          <Search></Search>
        </Route>
        <Route exact path="/friendSearch"> {/* FriendsSearch_Component */}
          <FriendSearch></FriendSearch>
        </Route>
      </Switch>

    </div>
  );
}

export default App;
