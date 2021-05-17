import React, { useState } from 'react';
import { Button, Form, Input, Switch, DatePicker, Select } from 'antd/dist/antd';
import { Jumbotron } from "react-bootstrap";
import axios from 'axios';
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { area, skill } from "../Data";


const { Option } = Select
const { TextArea } = Input;



function UploadStudyPost(props) {

    const [Title, setTitle] = useState('');
    const [Date, setDate] = useState('');
    const [Purpose, setPurpose] = useState('');
    const [Description, setDescription] = useState('');
    const [Area, setArea] = useState('');
    const [OnOff, setOnOff] = useState(false);
    const [Skill, setSkill] = useState([]);
    const [PhoneNumber, setPhoneNumber] = useState('')
    const [Position, setPosition] = useState('')
    
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
        setArea(event)
    }
    const onOffChangeHandler = (event) => {
        setOnOff(event)
    }
    const phoneNumberChangeHandler = (event) => {
        setPhoneNumber(event.currentTarget.value)
    }
    const skillChangeHandler = (event) => {
        setSkill(event)
    }
    

    const submitHandler = (event) => {
        event.preventDefault();

        if (!Title || !Date || !Area || !PhoneNumber) {
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
            skill: Skill,
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
                    <Select require onChange={areaChangeHandler} value={Area} style={{ width: '15%' }}>
                        {
                            area.map(item => (
                                <Option value={item.key} key={item.key} >{item.key}</Option>
                            ))
                        }
                    </Select>
                    <br />
                    <br />
                    <label>온라인/오프라인</label>
                    <Switch checkedChildren="Online" unCheckedChildren="Offline" onChange={onOffChangeHandler} />
                    <br />
                    <br />
                    <label>요구 기술스택</label>
                    <Select placeholder="Select Skill" allowClear mode="multiple" style={{ width: '100%' }}  onChange={skillChangeHandler} tokenSeparators={[',']}>
                    {
                        skill.map(item => (
                            <Option key={item.key} value={item.key}>{item.key}</Option>
                        ))
                    }
                    </Select>
                    <br/>
                    <br/>

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