import { Form, Button } from 'react-bootstrap';

function signup() {

    function ConfirmPassword(password) {
        console.log(password);
    }

    return (
        <div>
            <h2 className="login-title">회원가입</h2>
            <Form className="login">
                <Form.Group controlId="">
                    <Form.Label>이름</Form.Label>
                    <Form.Control required type="text" placeholder="이름" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control required type="email" placeholder="이메일" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control required type="password" placeholder="비밀번호" />
                </Form.Group>
                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control onChange={(e) => { ConfirmPassword(e.target.name) }} required type="password" placeholder="비밀번호 입력" />
                </Form.Group>
                <Button variant="primary" type="submit">가입하기</Button>
            </Form>

        </div>
    )
}

export default signup;