import React, { useState } from 'react';
import { Button, Form, Input, Switch, DatePicker } from 'antd/dist/antd';
import { Jumbotron } from "react-bootstrap";
import axios from 'axios';
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const area = [
    { key: 1, value: "서울" },
    { key: 2, value: "부산" },
    { key: 3, value: "인천" },
    { key: 4, value: "대구" },
    { key: 5, value: "대전" },
    { key: 6, value: "광주" },
    { key: 7, value: "경기" },
    { key: 8, value: "울산" },
    { key: 9, value: "세종" },
    { key: 11, value: "강원" },
    { key: 12, value: "충북" },
    { key: 13, value: "충남" },
    { key: 14, value: "전북" },
    { key: 15, value: "전남" },
    { key: 16, value: "경북" },
    { key: 17, value: "경남" },
    { key: 18, value: "제주" },
]

function UploadStudyPost(props) {

    const [Title, setTitle] = useState('');
    const [Date, setDate] = useState('');
    const [Purpose, setPurpose] = useState('');
    const [Description, setDescription] = useState('');
    const [Area, setArea] = useState(1);
    const [OnOff, setOnOff] = useState(false);
    const [Skill, setSkill] = useState([]);
    const [PhoneNumber, setPhoneNumber] = useState('')
    const [Position, setPosition] = useState('')
    const [Email, setEmail] = useState('')
    
    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value);
    }
    const positionChangeHandler = (event) => {
        setPosition(event.currentTarget.value)
    }
    const dateChangeHandler = (event, dateString) => {
        setDate(dateString);
    }
    const purposeChangeHandler = (event) => {
        setPurpose(event.currentTarget.value)
    }
    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }
    const areaChangeHandler = (event) => {
        setArea(event.currentTarget.value)
    }
    const onOffChangeHandler = (event) => {
        setOnOff(event)
    }
    const phoneNumberChangeHandler = (event) => {
        setPhoneNumber(event.currentTarget.value)
    }
    

    const submitHandler = (event) => {
        event.preventDefault();

        if (!Title || !Date || !Purpose || !Area || !PhoneNumber) {
            return alert(' 필수적으로 입력해야할 값을 입력하지 않았습니다.');
        }

        const body = {
            writer: props.user.userData._id,
            title: Title,
            date: Date,
            position : Position, 
            purpose: Purpose,
            description: Description,
            area: Area,
            skill: [],
            onOff: OnOff,
            phoneNumber: PhoneNumber,
            email : props.user.userData.email
        }

        console.log(body);

        axios.post('/api/studyPost', body)
            .then(response => {
                if (response.data.success) {
                    alert('스터디 공고 등록을 완료했습니다');
                    props.history.push('/studySearch');
                }
                else {
                    alert('스터디 공고 등록에 실패 했습니다.');
                }
            })
    }

    return (

        <div>
            <Jumbotron className="search__header">
                <h2 className="search__header-title">스터디를 등록하여 동료를 모집해요!</h2>
            </Jumbotron>
            <div style={{ maxWidth: "500px", margin: '2rem auto' }}>

                <Form onSubmitCapture={submitHandler}>
                    <label>스터디 이름</label>
                    <Input require onChange={titleChangeHandler} value={Title} />
                    <br />
                    <br />
                    <label>구하는 포지션</label>
                    <Input placeholder="ex) Frontend Developer, Backend Developer" require onChange={positionChangeHandler} value={Position} />
                    <br />
                    <br />
                    <label>시작 날짜</label>
                    <DatePicker onChange={dateChangeHandler}/>
                    <br />
                    <br />
                    <label>스터디 목적/목표</label>
                    <TextArea onChange={purposeChangeHandler} value={Purpose} />
                    <br />
                    <br />
                    <label>스터디 설명</label>
                    <TextArea onChange={descriptionChangeHandler} value={Description} />
                    <br />
                    <br />
                    <label>지역</label>
                    <select require onChange={areaChangeHandler} value={Area}>
                        {
                            area.map(item => (
                                <option key={item.key} value={item.key}>{item.value}</option>
                            ))
                        }
                    </select>
                    <br />
                    <br />
                    <label>온라인/오프라인</label>
                    <Switch checkedChildren="Online" unCheckedChildren="Offline" onChange={onOffChangeHandler} />
                    <br />
                    <br />
                    {/*   <label>구하는 기술스택</label>
                <select onChange={skillChangeHandler} value={Skill}>
                {
                    skill.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))
                }
                </select>
                <br/>
                <br/> */}

                    <label>연락처</label>
                    <Input type="tel" onChange={phoneNumberChangeHandler} value={PhoneNumber} prefix={<PhoneOutlined />} />
                    <br />
                    <br />
                    <br />

                    <Button htmlType="submit">등록</Button>
                </Form>
            </div>
        </div>
    )
}

export default UploadStudyPost