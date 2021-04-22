import { Table } from 'react-bootstrap';
import { useParams } from 'react-router';

function studyDetail(props) {

    const id = 1;

    return (
        <div>
            <div className="container detail">

                <header>
                    <div className="detail__header">
                        <h2 className="title">{props.studyNotice[id].title}</h2>
                        <h4 className="projectName">{props.studyNotice[id].projectName}</h4>
                    </div>
                </header>

                <section>
                    <Table className="recruitmentInfo" size="sm">
                        <tbody>
                            <tr>
                                <td>구하는 개발자</td>
                                <td>{props.studyNotice[id].developer}</td>
                            </tr>
                            <tr>
                                <td>스터디 목적/목표</td>
                                <td>{props.studyNotice[id].purpose}</td>
                            </tr>
                            <tr>
                                <td>스터디 규모</td>
                                <td>{props.studyNotice[id].headcount}</td>
                            </tr>
                            <tr>
                                <td>기간</td>
                                <td>{props.studyNotice[id].date}</td>
                            </tr>
                            <tr>
                                <td>온라인/오프라인</td>
                                <td>{props.studyNotice[id].onOff}</td>
                            </tr>
                            <tr>
                                <td>위치</td>
                                <td>{props.studyNotice[id].area}</td>
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
                            {props.studyNotice[id].introduce}
                        </p>
                    </div>
                </section>
                <section>
                    <div>
                        <h5>연락처</h5>
                        <p>{props.studyNotice[id].phoneNumber}</p>
                        <p>{props.studyNotice[id].email}</p>
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