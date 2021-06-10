import React from 'react'

/* Lib */
import axios from "axios";

/* Components */
import { useState, useEffect } from 'react';
import { Select } from "antd";
import { skill } from "../../Data";
import FileUpload from '../Util/FileUpload';

/* image */
import imgPerson from '../../image/person.png'
import SkillStackLabel from './SkillStackLabel';

const Option = Select;

function KeyInfo(props) {
    const { profile, user } = props
    const [Skill, setSkill] = useState([]);
    const [image, setImage] = useState('');

    useEffect(() => {
        setSkill(profile.skill)

        if(profile.image){
            setImage(profile.image[0].path)
        }

    }, [profile])

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
            .catch((err) => {
                alert(err)
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
                    alert('스킬 삭제에 실패 했습니다.');
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
                        ? <img src={`http://3.16.138.36:5000/${image}`} alt="avatar" />
                        : <img src={imgPerson} />
                }
                <div className="keyinfo__persionalinfo">
                    <h2>
                        <p>{profile.name}</p>
                        <p>{profile.email}</p>
                    </h2>

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
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {
                    Skill && Skill.map((skill, i) => {
                        return <SkillStackLabel key={i} skill={skill} onRemoveSkillTag={onRemoveSkillTag} user={user}/>
                    })
                }
            </div>
        </div>
    )
}

export default KeyInfo