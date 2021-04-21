import { Table } from 'react-bootstrap';

function studyDetail() {

    return (
        <div>
            <div className="container detail">

                <header>
                    <div className="detail__header">
                        <h2 className="title">프론트엔드 개발자 구합니다!</h2>
                        <h4 className="projectName">프로젝트 명</h4>
                    </div>
                </header>

                <section>
                    <Table className="recruitmentInfo" size="sm">
                        <tbody>
                            <tr>
                                <td>구하는 개발자</td>
                                <td>Frontend Developer</td>
                            </tr>
                            <tr>
                                <td>프로젝트 명</td>
                                <td>링크디벨롭</td>
                            </tr>
                            <tr>
                                <td>스터디 규모</td>
                                <td>3명</td>
                            </tr>
                            <tr>
                                <td>기간</td>
                                <td>2021-04-20 ~ 2021-04-30</td>
                            </tr>
                            <tr>
                                <td>온라인/오프라인</td>
                                <td>온라인</td>
                            </tr>
                            <tr>
                                <td>위치</td>
                                <td>서울 노원구</td>
                            </tr>
                        </tbody>
                    </Table>
                </section>
                <section>
                    <div className="skillStackinfo">
                        <h5>기술 스택</h5>
                        <ul>
                            <li className="skillStackLabel">Java</li>
                            <li className="skillStackLabel">Python</li>
                            <li className="skillStackLabel">React</li>
                        </ul>
                    </div>
                </section>
                <section>
                    <div>
                        <h5>스터디 소개</h5>
                        <p>
                            링크디벨롭이라는 이름의 스터디를 모집하거나 찾는 서비스를 웹앱으로 구현하려고 기획 중 이다.
                            많은 시간과 노력이 들겠지만 완성하면 자신의 능력을 증명하는 강력한 증거가 될 것이고 성장의 원동력이 될 것 이다.
                        </p>
                    </div>
                </section>
                <section>
                    <div>
                        <h5>연락처</h5>
                        <p>010-9685-8478</p>
                        <p>lexky@normal.com</p>
                    </div>
                </section>

                <section>
                    <div>
                        <h5>구성원</h5>
                        <Notice></Notice>
                    </div>
                </section>

               
            </div>
        </div>
    )

    function Notice(props) {
        return (
            <div className="peopleList__person">
                    <img src="https://avatars.githubusercontent.com/u/80798626?v=4" />
                <div className="person__info">
                    <p className="title"><a href="#">권옹</a></p>
                    <div>Fronted Developer</div>
                    <div className="skillStackLabel">Vue</div>
                </div>
            </div>
        )
    }
}

export default studyDetail;