import React, { useState } from 'react';
import { Button, Form, Input, Switch, DatePicker } from "antd";
import axios from 'axios';

const { TextArea } = Input;

const area = [
    {key : 1, value : "Africa"},
    {key : 2, value : "Europe"},
    {key : 3, value : "Asia"},
    {key : 4, value : "North America"},
    {key : 5, value : "South America"},
    {key : 6, value : "Australia"},
    {key : 7, value : "Antarctica"},
]

function UploadStudyPost(props){

    const [Title, setTitle] = useState('');
    const [Date, setDate] = useState(0);
    const [Headcount, setHeadcount] = useState(0);
    const [Purpose, setPurpose] = useState('');
    const [Description, setDescription] = useState('');
    const [Area, setArea] = useState(1);
    const [OnOff, setOnOff] = useState(true);
    const [Skill, setSkill] = useState([]);
    const [Contact, setContact] = useState('')

    const titleChangeHandler = (event) =>{
        setTitle(event.currentTarget.value);
    }
    const dateChangeHandler = (event) =>{
        setDate(event.currentTarget.value);
    }
    const headcountChangeHandler = (event) =>{
        setHeadcount(event.currentTarget.value)
    }
    const purposeChangeHandler = (event) =>{
        setPurpose(event.currentTarget.value)
    }
    const descriptionChangeHandler = (event) =>{
        setDescription(event.currentTarget.value)
    }
    const areaChangeHandler = (event) =>{
        setArea(event.currentTarget.value)
    } 
    const onOffChangeHandler = (event) =>{
        setOnOff(event.currentTarget.value)
    }
    const contactChangeHandler = (event) => {
        setContact(event.currentTarget.value)
    }

    const submitHandler = (event) =>{
        event.preventDefault();

        /* if(!title || !description){
            return alert(' 모든 값을 넣어주셔야 합니다.');
        }
        */

        const body = {
            writer : props.user.userData._id,
            title : Title,
            date : Date,
            headcount : Headcount,
            purpose: Purpose,
            description : Description,
            area : Area,
            onOff : OnOff,
            Contact : Contact
        }

        axios.post('/api/studyPost', body)
        .then(response => {
            if(response.data.success){
                alert('상품 업로드에 성공 했습니다');
                props.history.push('/');
            }
            else{
                alert('상품 업로드에 실패 했습니다.');
            }
        })
    } 

    return(
        <div style={{ maxWidth : "700px", margin : '2rem auto'}}>
            <div style={{ textAlign: 'center', marginBotto: '2rem' }}>
                <h2 level={2}>스터디 등록</h2>
            </div>


            <Form onSubmitCapture={submitHandler}>
                <label>스터디 이름</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>구하는 날짜</label>
                <DatePicker onChange={dateChangeHandler} value={Date} />
                <br />
                <br />
                <label>총 구하는 인원수</label>
                <Input type="number" onChange={headcountChangeHandler} value={Headcount} />
                <br />
                <br />
                <label>스터디 목적/목표</label>
                <TextArea onChange={purposeChangeHandler} value={Purpose}/>
                <br/>
                <br/>
                <label>스터디 설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description}/>
                <br/>
                <br/>
                <label>지역</label>
                <select onChange={areaChangeHandler} value={Area}>
                {
                    area.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))
                }
                </select>
                <br/>
                <br/>
                <label>온라인/오프라인</label>
                <Switch defaultChecked onChange={onOffChangeHandler} />
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
                <Input onChange={contactChangeHandler} value={Contact} />
                <br/>
                <br/>

                <Button htmlType="submit">
                    확인
                </Button>
            </Form>
        </div>
    )
}

export default UploadStudyPost