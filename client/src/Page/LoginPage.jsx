import React, { useState, useCallback } from "react";
import { Link, withRouter } from 'react-router-dom';

/* Lib */
import { loginUser } from "../_actions/user_actions";
import { useDispatch } from "react-redux";

/* Components */
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button, Typography, Checkbox, notification } from 'antd';

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();

  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const initialEmail = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : '';

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const openNotification = (err) => {
    notification.open({
      message: 'Login Error',
      description:
        err
          ? err
          : '이메일 또는 비밀번호를 확인하시길 바랍니다.',

      icon: <UserOutlined style={{ color: 'red' }} />,
      placement: 'topLeft'
    });
  };

  const emailCheck = useCallback(email => {
    const regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return (email != '' && email != 'undefined' && regex.test(email));
  }, [email])

  const handleRememberMe = useCallback(e => {
    setRememberMe(!rememberMe)
  }, [rememberMe]);

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, [email])

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, [password])

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    if (emailCheck(email) && password) {
      setLoginError('')

      let dataToSubmit = {
        email: email,
        password: password,
      };

      dispatch(loginUser(dataToSubmit))
        .then(response => {
          if (response.payload.loginSuccess) {
            window.localStorage.setItem('userId', response.payload.userId);
            if (rememberMe === true) {
              window.localStorage.setItem('rememberMe', email);
            } else {
              localStorage.removeItem('rememberMe');
            }
            props.history.push("/");
          } else {
            openNotification();
          }
        })
        .catch(err => {
          openNotification(err);
        });
    }
  }, [email, password])

  return (
    <div style={{ maxWidth: "25rem", margin: '10rem auto' }}>
      <Title>로그인</Title>

      <Form onSubmit={onSubmit}>
        <Form.Item required>
          <Input
            id="email"
            placeholder="email"
            type="email"
            value={email}
            onChange={onChangeEmail}
            prefix={<MailOutlined className="site-form-item-icon" />}
          />
          {!emailCheck(email) && <div>이메일 형식을 입력하세요!</div>}
        </Form.Item>

        <Form.Item required>
          <Input
            id="password"
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={onChangePassword}
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        {loginError && <div>{loginError}</div>}
        <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe}>이메일 저장</Checkbox>

        <Button type="primary" style={{ minWidth: '100%' }} onClick={onSubmit} >
          로그인
        </Button>
      </Form>
      <div>
        회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하기</Link>
      </div>
    </div>
  )
};

export default withRouter(LoginPage)