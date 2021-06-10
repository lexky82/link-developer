import React from "react";

/* Lib */
import * as Yup from 'yup';
import { registerUser } from "../_actions/user_actions";
import { useDispatch } from "react-redux";

/* Components */
import { Formik } from 'formik';
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

import {
  Form,
  Input,
  Button,
  Typography
} from 'antd';

const { Title } = Typography;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (

    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('이름을 입력하지 않았습니다.'),
        email: Yup.string()
          .email('이메일 형태가 아닙니다.')
          .required('이메일을 입력하지 않았습니다.'),
        password: Yup.string()
          .min(6, '패스워드는 6자리 이상 입력해주세요.')
          .required('패스워드를 입력하지 않았습니다.'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], '패스워드와 일치하지 않습니다.')
          .required('패스워드 확인을 입력하지 않았습니다.')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg)
            }
          })

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className="app">
            
            <Form style={{ maxWidth : "400px", margin : '10rem auto' }} {...formItemLayout} onSubmit={handleSubmit} >
              <Title level={2}>회원가입</Title>

              <Form.Item required label="이름">
                <Input
                  id="name"
                  placeholder="이름"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>

              <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                <Input
                  id="email"
                  placeholder="Email Adress"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  prefix={<MailOutlined />}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required label="비밀번호" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                <Input
                  id="password"
                  placeholder="비밀번호"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label="비밀번호 확인" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="비밀번호 다시 입력해주세요"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  회원가입
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};


export default RegisterPage