import React from 'react'

/* Lib */
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { USER_SERVER } from './Config'
import axios from 'axios';

/* Components */
import { Navbar, Nav } from 'react-bootstrap';

function NavBar(props) {
    const user = useSelector(state => state.user)

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
               props.history.push('/login');
            } else {
                alert('Log Out Failed')
            }
        });
    };

    if (user.userData && !user.userData.isAuth) {
        return (
            <div>
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
                            <Nav.Link href="/studySearch">스터디 찾기</Nav.Link>
                            <Nav.Link href="/friendSearch">동료 찾기</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link href="/login">로그인</Nav.Link>
                            <Nav.Link href="/signup">회원가입</Nav.Link>
                        </Nav>
                        <Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
    else {
        return (
            <div>
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
                            <Nav.Link href="/studySearch">스터디 찾기</Nav.Link>
                            
                            <Nav.Link href="/friendSearch">동료 찾기</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                        <Nav.Link href="/uploadStudy">스터디 게시</Nav.Link>
                        <Nav.Link href="/myprofile">내정보</Nav.Link>
                            <Nav.Link onClick={logoutHandler}>로그아웃</Nav.Link>
                        </Nav>
                        <Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default withRouter(NavBar);
