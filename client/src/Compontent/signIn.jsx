import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';

function signIn(props) {

    const { email, setEmail, password, setPassword } = props;

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)

    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log('email', email);
        console.log('password'. password);

        let body = {
            email : email,
            password : password
        }

    }
    return (
        <div>
            <h2 className="login-title">로그인</h2>
            <Form className="login">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control required type="email" value={email} onChange={onEmailHandler} placeholder="이메일" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control required type="password" value={password} onChange={onPasswordHandler} placeholder="비밀번호" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="이메일 기억" />
                </Form.Group>

                <Button variant="primary" type="submit" onSubmit={onSubmitHandler}>로그인</Button>
            </Form>

        </div>
    )
}

export default signIn;