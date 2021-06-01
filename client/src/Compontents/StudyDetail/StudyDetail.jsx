import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom'

/* Lib */
import axios from 'axios';
import { useDispatch ,useSelector } from 'react-redux'
import { studyList } from "../../_actions/study_actions";

/* Components */
import { Table } from 'react-bootstrap';
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { Button } from "antd";

function StudyDetail(props) {

    const studyId = props.match.params.studyId
    const [Study, setStudy] = useState({})
    const study = useSelector(state => state.study.studyData);
    const [writer, setwriter] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        if(!study){
            dispatch(studyList())
            .then(response => {
                if (response.payload.success) {
                    console.log(response.payload)
                    studyFilter(response.payload.studyInfo)
                }
                else {
                    alert("스터디 리스트들을 가져오는데 실패 했습니다.")
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }

        else{
            studyFilter(study.studyInfo)
        }
    }, [])

    const studyFilter = (study) =>{
        let result = study.filter(element => {
            return element._id === studyId
        })
        
        setStudy({...result[0]})
    }

    const onOfflineHandler = () => {
        if (Study.onOff) {
            return "온라인"
        }
        else {
            return "오프라인"
        }
    }

    const readWriterHandler = () => {
        return (
            <td><Link to={`/profile/${Study.writer}`}>{writer && writer.name}프로필</Link></td>
        )
    }

    const removeStudyHandler = () => {
        if (props.user.userData._id === Study.writer) {

            let body = {
                _id: Study._id
            }

            if (window.confirm("스터디를 삭제 하시겠습니까?")) {

                axios.post('/api/studyPost/removepost', body)
                    .then(response => {
                        if (response.data.success) {
                            props.history.push('/studysearch')
                        }
                        else {
                            alert('스터디 삭제를 실패하였습니다.')
                        }
                    })
            }
        }
        else {
            alert('해당 스터디의 작성자가 아닙니다.')
        }
    }


    return (
        <div>
            <div className="container detail">

                <header>
                    <div className="detail__header">
                        <h1 className="title">{Study.title}</h1>
                    </div>
                </header>

                <section>
                    <Table className="recruitmentInfo detailInfoTable" size="sm">
                        <tbody>
                            <tr>
                                <td>작성자</td>
                                {readWriterHandler()}
                            </tr>
                            <tr>
                                <td>작성일</td>
                                <td>{Study.createdAt}</td>
                            </tr>
                            <tr>
                                <td>구하는 포지션</td>
                                <td>{Study.position}</td>
                            </tr>
                            <tr>
                                <td>스터디 목적/목표</td>
                                <td>{Study.purpose}</td>
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
                            {
                                Study.skill && Study.skill.map((skill, i) => (
                                    <li key={i} className="skillStackLabel">{skill}</li>
                                ))
                            }
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
                        <MailOutlined /> <a href={`mailto:${Study.email}`}>{Study.email}</a>
                        <br />
                        <PhoneOutlined /> <a href={`tel:${Study.phoneNumber}`}>{Study.phoneNumber}</a>
                    </div>
                </section>
                <div >
                    <Button onClick={removeStudyHandler}>삭제</Button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(StudyDetail);
