import React from 'react'
import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';
import axios from "axios";

function KeyInfo(props) {

    const { skill, setSkill, profile, user } = props

    const fuzzySearch = (options) => {
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

    const skillstackList = [
        // 나중에 json으로 불려오면 딱이겠고만..
        { name: 'Java', value: 'Java' },
        { name: 'Python', value: 'Python' },
        { name: 'C#', value: 'C#' },
    ];

    const onAddSkillHandler = (event) => {
        if (skill.indexOf(event) >= 0) { // 스택 중복검사
            return;
        }

        let newArray = [...skill];
        newArray.push(event);

        let body = {
            _id: user.userData._id,
            skill: newArray
        }

        axios.put('api/users/addskill', body)
            .then(response => {
                if (response.data.success) {

                }
                else {

                    alert('스킬 등록에 실패 했습니다.');
                }
            })

        setSkill(newArray);
    }

    const onRemoveSkillTag = (event) => {
        let selectedSkill = event.target.parentNode.id;
        let newArray = [...skill];

        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i] === selectedSkill) {
                newArray.splice(i, 1);
                i--;
            }
        }

        let body = {
            _id: user.userData._id,
            skill: selectedSkill
        }

        axios.put('api/users/removeskill', body)
            .then(response => {
                if (response.data.success) {

                }
                else {
                    alert('스킬 등록에 실패 했습니다.');
                }
            })

        setSkill(newArray);
    }

    return (
        <div>
            <div className="keyinfo__persionalinfo">
                <h1>
                    <p>{profile.name}</p>
                    <p>{profile.email}</p>
                </h1>

                <p>{profile.position} 개발자</p>

                <div>
                    <span>기술</span>
                    <hr />
                    <SelectSearch onChange={(event) => { onAddSkillHandler(event) }} options={skillstackList} search="true" filterOptions={fuzzySearch} value="sv" name="skillstack" placeholder="기술 검색" />
                    {
                        skill.map((a, i) => {
                            return <SkillStackLabel key={i} skill={skill[i]} />
                        })
                    }
                </div>
            </div>
        </div>
    )
    function SkillStackLabel(props) {
        return (
            <li id={props.skill} className="skillStackLabel">
                <span>{props.skill}</span>
                <button onClick={(event) => { onRemoveSkillTag(event) }}>x</button>
            </li>
        )
    }

}

export default KeyInfo
