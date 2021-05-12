import React, { useState, useEffect } from 'react';

import { Jumbotron } from "react-bootstrap";
import axios from 'axios';

function Profile(props) {

    const id = props.match.params.studyId

    const [Profile, setProfile] = useState([])
    const [portfolioList, setPortfolioList] = useState([]);
    const [skill, setSkill] = useState([]);

    useEffect(() => {

        getProfilePost()
    }, [])

    const getProfilePost = () => {

        let body = {
            _id: id
        }

        axios.post('/api/users/profile', body)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setProfile(response.data.profile)
                    setSkill(response.data.profile.skill)
                    setPortfolioList(response.data.profile.portfolio)
                }
                else {
                    alert(" 유저 리스트들을 가져오는데 실패 했습니다.")
                }
            })
    }

    return (
        <div>
            <Jumbotron className="search__header">
                <h2 className="search__header-title">안녕하세요!</h2>
            </Jumbotron>

            <div className="container">

                <section className="keyinfo">
                    <img src="https://avatars.githubusercontent.com/u/80798626?v=4" />
                    <div className="keyinfo__persionalinfo">
                        <h1>
                            <p>{Profile.name}</p>
                            <p>{Profile.email}</p>
                        </h1>

                        <p>{Profile.position} 개발자</p>

                        <div>
                            <span>기술</span>
                            <hr />
                            {
                                skill.map((a, i) => {
                                    return <SkillStackLabel key={i} skill={skill[i]} />
                                })
                            }
                        </div>
                    </div>
                </section>

                <section className="expreience__portfolio">
                    <div>
                        <span>포트폴리오</span>

                        <hr />
                        {
                            portfolioList.map((a, i) => {

                                return <Portfolio key={i} portfolio={portfolioList[i]} />
                            })
                        }
                    </div>
                </section>
            </div>
        </div>
    )

    function SkillStackLabel(props) {
        return (
            <li id={props.skill} className="skillStackLabel">
                <span>{props.skill}</span>
            </li>
        )
    }

    function Portfolio(props) {
        return (
            <blockquote id={props.portfolio.id} className="Portfolio">
                <h5 htmlFor="project_name">{props.portfolio.projectName}</h5>
                <p htmlFor="date">{props.portfolio.startDate} ~ {props.portfolio.endDate}</p>
                <p htmlFor="positions">{props.portfolio.position}</p>
                <p htmlFor="skill">{props.portfolio.skill}</p>
                <p htmlFor="description">{props.portfolio.discription}</p>
            </blockquote>
        )
    }
}

export default Profile;
