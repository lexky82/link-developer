import axios from 'axios';
import { useState ,useEffect } from 'react';
import { Table } from 'react-bootstrap';


function StudyDetail(props) {

    const studyId = props.match.params.studyId
    const [Study, setStudy] = useState({})

    const onOfflineHandler = () => {
        if(Study.onOff){
            return "온라인"
        }
        else{
            return "오프라인"
        }
    }

    useEffect(() => {
        axios.get(`/api/studyPost/studyPosts_by_id?id=${studyId}`)
            .then(response => {
                setStudy(response.data[0])
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div className="container detail">

                <header>
                    <div className="detail__header">
                        <h2 className="title">{Study.title}</h2>
                        <h4 className="projectName">{Study.purpose}</h4>
                    </div>
                </header>

                <section>
                    <Table className="recruitmentInfo" size="sm">
                        <tbody>
                            <tr>
                                <td>구하는 개발자</td>
                                <td>{Study.position}</td>
                            </tr>
                            <tr>
                                <td>스터디 목적/목표</td>
                                <td>{Study.purpose}</td>
                            </tr>
                            <tr>
                                <td>스터디 규모</td>
                                <td>총 {Study.headcount}명</td>
                            </tr>
                            <tr>
                                <td>시작 날짜</td>
                                <td>{Study.date}</td>
                            </tr>
                            <tr>
                                <td>온라인/오프라인</td>
                                <td>{onOfflineHandler()}</td>
                            </tr>
                            <tr>
                                <td>위치</td>
                                <td>{Study.area}</td>
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
                            {Study.description}
                        </p>
                    </div>
                </section>
                <section>
                    <div>
                        <h5>연락처</h5>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default StudyDetail;
