import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../_actions/user_action'
import { withRouter } from 'react-router-dom';
import { Form, Button, FormLabel } from "react-bootstrap";

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/')
                } else {
                    alert('아이디 또는 비밀번호가 일치하지 않습니다.')
                }
            })
    }


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '65vh'
        }}>
            <Form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <FormLabel>Email</FormLabel>
                <Form.Control type="email" value={Email} onChange={onEmailHandler} />
                <FormLabel>Password</FormLabel>
                <Form.Control type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <Button type="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default withRouter(LoginPage)
