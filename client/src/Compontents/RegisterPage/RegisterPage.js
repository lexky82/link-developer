import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../_actions/user_action';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Form, FormLabel, Button } from "react-bootstrap";

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }
        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push("/login")
                } else {
                    alert("Failed to sign up")
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

                <FormLabel>Name</FormLabel>
                <Form.Control type="text" value={Name} onChange={onNameHandler} />

                <FormLabel>Password</FormLabel>
                <Form.Control type="password" value={Password} onChange={onPasswordHandler} />

                <FormLabel>Confirm Password</FormLabel>
                <Form.Control type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <br />
                <Button type="submit">
                    회원 가입
                </Button>
            </Form>
        </div>
    )
}

export default withRouter(RegisterPage)
