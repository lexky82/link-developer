import React, { useState } from 'react'
import axios from "axios";
import { Select } from "antd";
import { skill } from "../../Data";
import FileUpload from '../Util/FileUpload';

const Option = Select;

function KeyInfo(props) {

    const { Skill, setSkill, profile, user, image, setImage } = props

    const onAddSkillHandler = (event) => {
        if (Skill.indexOf(event) >= 0) { // 스택 중복검사
            return;
        }

        let newArray = [...Skill];
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
        let newArray = [...Skill];

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
            <div className="keyinfo">
                {
                    user  
                    ? <FileUpload
                        image={image}
                        setImage={setImage}
                    />
                    : image 
                    ? <img src={image} alt="avatar" />
                    : <img src="client\public\person.png" />
                }
                <div className="keyinfo__persionalinfo">
                    <h1>
                        <p>{profile.name}</p>
                        <p>{profile.email}</p>
                    </h1>

                    <p>{profile.position}</p>

                    <div>
                        <span>기술</span>
                        <hr />
                        {
                            user && <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a Skill"
                                onChange={onAddSkillHandler}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    skill.map(item => (
                                        <Option key={item.key} value={item.key}>{item.key}</Option>
                                    ))
                                }
                            </Select>
                        }

                    </div>
                </div>
            </div>
            <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
                {
                    Skill && Skill.map((a, i) => {
                        return <SkillStackLabel key={i} skill={Skill[i]} />
                    })
                }
            </div>
        </div>
    )

    function SkillStackLabel(props) {
        return (
            <li id={props.skill} className="skillStackLabel">
                <span>{props.skill}</span>
                {
                    user && <button onClick={(event) => { onRemoveSkillTag(event) }}>x</button>
                }
            </li>
        )
    }

}

export default KeyInfo