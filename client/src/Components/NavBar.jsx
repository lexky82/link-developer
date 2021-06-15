import React from 'react'
import { Link } from 'react-router-dom'

/* Lib */
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { USER_SERVER } from '../Config'
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
                    <Link to="/" className="nav-brand">
                        <img
                            src="https://image.flaticon.com/icons/png/512/625/625078.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/studySearch" className="nav-link">스터디 찾기</Link>
                            <Link to="/friendSearch" className="nav-link">유저 조회</Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Link to="/login" className="nav-link">로그인</Link>
                            <Link to="/signup" className="nav-link">회원가입</Link>
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
                <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">  {/* Navigatorbar */}
                    <Link to="/" className="nav-brand">
                        <img
                            src="https://image.flaticon.com/icons/png/512/625/625078.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/studySearch" className="nav-link">스터디 찾기</Link>

                            <Link to="/friendSearch" className="nav-link">유저 조회</Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Link to="/myprofile" className="nav-link">프로필</Link>
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
