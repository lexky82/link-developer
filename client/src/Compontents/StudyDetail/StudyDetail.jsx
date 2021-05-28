import React, { useState, useEffect } from 'react';

/* Lib */
import axios from 'axios';

/* Components */
import { Table } from 'react-bootstrap';
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { Button } from "antd";

function StudyDetail(props) {

    const studyId = props.match.params.studyId
    const [Study, setStudy] = useState({})
    const [writer, setwriter] = useState({})

    useEffect(() => {
        axios.get(`/api/studyPost/studyPosts_by_id?id=${studyId}`)
            .then(response => {
                setStudy(response.data[0])
                let body = {
                    _id: response.data[0].writer
                }
                axios.post('/api/users/profile', body)
                .then(response => {
                    setwriter(response.data.profile)
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }, [])

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
            <td><a href={`/profile/${Study.writer}`}>{writer && writer.name}</a></td>
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
                    <Table className="recruitmentInfo" size="sm">
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

export default StudyDetail;
