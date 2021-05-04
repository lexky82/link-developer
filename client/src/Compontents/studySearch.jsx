import React, { useEffect, useState } from 'react';
import { Jumbotron, Form, Button } from 'react-bootstrap';
import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';
import axios from 'axios';


function TechSerach() {

    const [StudyPosts, setStudyPosts] = useState([])


    useEffect(() => {

        getStudyPost();

    }, [])

    const techstackList = [
        // 나중에 json으로 불려오면 딱이겠고만..
        { name: '', value: '' },
        { name: 'Java', value: 'Java' },
        { name: 'Python', value: 'Python' },
        { name: 'C#', value: 'C#' },
        { name: 'React', value: 'React' },
        { name: 'Node', value: 'Node' },
    ];

    const fuzzySearch = (options) => { // dropdownbox item search
        const fuse = new Fuse(options, {
            keys: ['name', 'value'],
            threshold: 0.3,
        }); // fuse input 선언

        return (value) => {
            if (!value.length) {
                return options;
            }

            return fuse.search(value);
        };
    }

    const getStudyPost = () => {
        axios.post('/api/studyPost/studyPosts')
            .then(response => {
                if (response.data.success) {
                    setStudyPosts(response.data.studyInfo)
                    console.log(response.data.studyInfo)
                }
                else {
                    alert(" 스터디 리스트들을 가져오는데 실패 했습니다.")
                }
            })
        
    }


    /* const handelFilterSKill = (skill) => {
        const newArray = [...Notice];

        let selectedSkill = document.querySelector("#skill > div > input").value;
        const selectedArea = document.getElementById('selectArea').value;
        const selectedOnOff = document.getElementById('selectOnOff').value;
            
        selectedSkill = skill;
        
        console.log(selectedSkill);
        console.log(selectedArea);
        console.log(selectedOnOff);

        const result = newArray.filter(x => {
            return x.skill == selectedSkill && x.area == selectedArea && x.onoff == selectedOnOff
        });
    
        setRanderNotice( result );
    } */

    return (
        <div>
            <Jumbotron className="search__header">
                <h2 className="search__header-title">검색으로 함께할 스터디를 찾아봐요!</h2>
            </Jumbotron>

            <Form className="search__main">
                <Form.Group>
                    <SelectSearch id='skill' options={techstackList} search="true" filterOptions={fuzzySearch} name="techstack" placeholder="기술 검색" />
                </Form.Group>

                <Form.Group>
                    <Form.Control id="selectOnOff" as="select" custom>
                        <option value="" disabled selected>온라인/오프라인</option>
                        <option value="on">온라인</option>
                        <option value="off">오프라인</option>
                        <option value="other">기타</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control id="selectArea" as="select" custom>
                        <option value="" disabled selected>지역</option>
                        <option>서울</option>
                        <option>인천</option>
                        <option>충남</option>
                        <option>대전</option>
                        <option>강원</option>
                        <option>부산</option>
                    </Form.Control>
                </Form.Group>
            </Form>

            <p className="title">전체 결과</p>

            <div className="container">
                <ul className="notice">
                    {
                        StudyPosts.map((a, i) => {
                            return <CardNotice key={i} particle={StudyPosts[i]} />
                        })
                    }
                </ul>
            </div>
        </div>
    )

    function CardNotice(props) {
        return (
            <li className="notice__card">
                <img src="https://img.icons8.com/ios/452/client-company.png" />
                <h5><a href={"detail/"}>{props.particle.title}</a></h5>
                <p>{props.particle.area == 3 && "서울"}</p>
                <span className="skillStackLabel">모집 인원 : {props.particle.headcount}</span>
                <p>모집 기한 : {props.particle.date}</p>
            </li>
        )
    }
}

export default TechSerach;