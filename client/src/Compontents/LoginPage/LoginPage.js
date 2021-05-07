import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../_actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import Icon from '@ant-design/icons';
import { useDispatch } from "react-redux";

const { Title } = Typography;

function LoginPage(props) {

  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };

  // ID 저장 체크 및 저장
  const initialEmail = localStorage.getItem("rememberMe") 
  ? localStorage.getItem("rememberMe") 
  : '';

  return (
    <Formik

      // 입력하지 않았을때 값
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      
      // 입력 값 유효성 검증
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('이메일 형식이 아닙니다.')
          .required('이메일을 입력하지 않았습니다.'),
        password: Yup.string()
          .min(6, '패스워드는 6자리 이상 입력해주세요.')
          .required('패스워드를 입력하지 않았습니다.'),
      })}

      onSubmit={(values, { setSubmitting }) => {

        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem('rememberMe', values.id);
                } else {
                  localStorage.removeItem('rememberMe');
                }
                props.history.push("/");
              } else {
                setFormErrorMessage('이메일 또는 패스워드를 확인해주시기 바랍니다.')
              }
            })
            .catch(err => {
              setFormErrorMessage('이메일 또는 패스워드를 확인해주시기 바랍니다.')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        
        return (
          <div style={{ maxWidth : "350px", margin : '10rem auto'}}>

            <Title level={2}>로그인</Title>
            <form onSubmit={handleSubmit} >

              <Form.Item required>
                <Input
                  id="email"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required>
                <Input
                  id="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}

              <Form.Item>
                <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >저장</Checkbox>
                <div>
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                    로그인
                </Button>
                </div>
                <a href="/signup">회원가입 하기</a>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(LoginPage);


