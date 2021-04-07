import { Form, Button } from 'react-bootstrap';

function login() {

    return (
        <div>
            <h2 className="login-title">로그인</h2>
            <Form className="login">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control required type="email" placeholder="이메일" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control required type="password" placeholder="비밀번호" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="이메일 기억" />
                </Form.Group>

                <Button variant="primary" type="submit">로그인</Button>
            </Form>

        </div>
    )
}

export default login;