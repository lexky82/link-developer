import { Table } from 'react-bootstrap';
import { useParams } from 'react-router';

function studyDetail(props) {


    return (
        <div>
            <div className="container detail">

                <header>
                    <div className="detail__header">
                        <h2 className="title">프론트엔드 개발자 구합니다!</h2>
                        <h4 className="projectName">포트폴리오 스터디</h4>
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
                                <td>스터디 목적/목표</td>
                                <td>서로의 기술로 협업, 리뷰하여 각자의 포트폴리오를 완성과 보완</td>
                            </tr>
                            <tr>
                                <td>스터디 규모</td>
                                <td>4명</td>
                            </tr>
                            <tr>
                                <td>기간</td>
                                <td>2021.04.30 ~ 2021.05.14</td>
                            </tr>
                            <tr>
                                <td>온라인/오프라인</td>
                                <td>온라인</td>
                            </tr>
                            <tr>
                                <td>위치</td>
                                <td>서울</td>
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
                            서로 기술을 공유하고 협업하여 각자의 포트폴리오를 완성하는 스터디 입니다.
                        </p>
                    </div>
                </section>
                <section>
                    <div>
                        <h5>연락처</h5>
                        <p>010-1234-1234</p>
                        <p>lexky@naver.com</p>
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