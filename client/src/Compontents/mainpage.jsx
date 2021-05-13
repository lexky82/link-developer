import { Jumbotron, Button } from 'react-bootstrap';
import React from "react";

function mainpage(props) {
    return (
        <div>
            <header>
                <Jumbotron className="mainpage">
                    <div className="mainpage__content">
                        <p>개발자 스터디,협업 알선 플랫폼</p>
                        <p className="title">링크디벨로퍼가 개발자를 찾는데 도와줄게요.</p>
                        <p>나와 다른 능력을 갖고있는 개발자들과 협업해보세요!</p>
                        <Button href="/studySearch" className="mainpage__content-button">찾아보기</Button>
                    </div>
                    <img src="https://lh3.googleusercontent.com/proxy/pmKRj9S-hcO3wFdcWiv-BMrr0qKrKla1B06vUXxNosJs-3fUPofRdBba9TLoHj0mxWyRe3fFykyvOs2gTe_mTVm0KWpxscMlYmX2L0vVIGyz19vcFPAMkSpqMq_UAXG9TG4Jf9euYKKqkGuLbvCJWmE3uDX8nEVWZHMNGTEfCcFGhGgrPpEF" alt="" />
                </Jumbotron>
            </header>

            <article>
                
            </article>

            <footer>

            </footer>
        </div>
    )
}

export default mainpage;