import { Jumbotron, Button } from 'react-bootstrap';

function mainpage() {
    return (
        <div>
            <header>
                <Jumbotron className="mainpage">
                    <div className="mainpage__text">
                        <p>개발자 스터디,협업 알선 플랫폼</p>
                        <p className="mainpage__text-title">링크디벨로퍼가 개발자를 찾는데 도와줄게요.</p>
                        <p>나와 다른 능력을 갖고있는 개발자들과 협업해보세요!</p>
                        <Button>찾아보기</Button>
                    </div>
                    <img src="https://image.freepik.com/free-vector/handshake-icon-shake-hands-agreement-good-deal-partnership-concepts_185351-41.jpg" alt="" />
                </Jumbotron>
            </header>
        </div>
    )
}

export default mainpage;