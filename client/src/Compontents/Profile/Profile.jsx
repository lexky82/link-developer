import React, { useState, useEffect } from 'react';

/* Components */
import Portfolio from "./Portfolio";
import KeyInfo from "./KeyInfo";

/* Lib */
import { Jumbotron } from "react-bootstrap";
import axios from 'axios';

function MyProfile(props) {

    const [Profile, setProfile] = useState([])
    const [portfolioList, setPortfolioList] = useState([]);
    const [skill, setSkill] = useState([]);

    const profileId = props.match.params
    let userId;

    useEffect(() => {

        getProfilePost()
        
    }, [])

    const getProfilePost = () => {

        userId = window.localStorage.getItem("userId")

        let body = {
            _id : profileId.profileId
        }

        axios.post('/api/users/profile', body)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.profile)
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
                <h2 className="search__header-title">좋은 동료를 찾아봅시다!</h2>
            </Jumbotron>

            <div className="container">
                <section className="keyinfo">
                    <KeyInfo
                        Skill={skill}
                        setSkill={setSkill}
                        profile={Profile}
                        setProfile={setProfile}
                        user={profileId.profileId && userId}
                    />
                </section>

                <section className="expreience__portfolio">
                    <Portfolio
                        portfolioList={portfolioList}
                        setPortfolioList={setPortfolioList}
                        user={profileId.profileId && userId}
                    />
                </section>
            </div>
        </div>
    )
}

export default MyProfile;
