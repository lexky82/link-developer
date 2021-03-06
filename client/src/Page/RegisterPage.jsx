import React, { useState, useCallback } from "react";
import { Link } from 'react-router-dom';

/* Lib */
import { registerUser } from "../_actions/user_actions";
import { useDispatch } from "react-redux";

/* Components */
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

import {
  Form,
  Input,
  Button,
  Typography
} from 'antd';

const { Title } = Typography;

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('')
  
  const emailCheck = useCallback(email => {    
    const regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return (email != '' && email != 'undefined' && regex.test(email)); 
  }, [email])

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, [email])

  const onChangeName = useCallback((e) => {
    setName(e.target.value);
  }, [name])

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
    setMismatchError(e.target.value !== passwordCheck)
  }, [passwordCheck])

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setMismatchError(e.target.value !== password)
  }, [password])

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    
    if(!mismatchError && name && emailCheck(email) && !(password.length < 6)){
      setSignUpError('')

      let dataToSubmit = {
        email: email,
        password: password,
        name: name,
      };

      dispatch(registerUser(dataToSubmit)).then(response => {
        if (response.payload.success) {
          props.history.push("/login");
        } else {
          setSignUpError(response.payload.message)
        }
      })
    }
  }, [email, name, password, passwordCheck])
  
  return (
    <div style={{ maxWidth: "25rem", margin: '10rem auto' }}> 
      <Title>????????????</Title>

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
          {!emailCheck(email) && <div>????????? ????????? ???????????????!</div>}
          </Form.Item>
          
          <Form.Item required>
          <Input
            id="name"
            placeholder="?????????"
            type="text"
            value={name}
            onChange={onChangeName}
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
          {!name && <div>???????????? ??????????????????!</div>}
          </Form.Item>

          <Form.Item required>
          <Input
            id="password"
            placeholder="????????????"
            type="password"
            value={password}
            onChange={onChangePassword}
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
          {password.length < 6 && <div>??????????????? 6?????? ??????</div>}
          </Form.Item>

          <Form.Item required>
          <Input
            id="passwordCheck"
            placeholder="???????????? ??????"
            type="password"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
          {mismatchError && <div>??????????????? ???????????? ????????????.</div>}
          </Form.Item>

          {signUpError && <div>{signUpError}</div>}
        <Button type="primary" style={{ minWidth: '100%' }} onClick={onSubmit} >
          ????????????
        </Button>
      </Form>
      <div>
        ?????? ???????????????????&nbsp;
        <Link to="/login">????????? ????????????</Link>
      </div>
    </div>
  )
  
};

export default RegisterPage