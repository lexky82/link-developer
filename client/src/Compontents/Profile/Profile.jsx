import React, { useState, useEffect } from 'react';

/* Lib */
import axios from 'axios';

/* Components */
import { Jumbotron } from "react-bootstrap";
import Portfolio from "./Portfolio";
import KeyInfo from "./KeyInfo";

function MyProfile(props) {

    const [Profile, setProfile] = useState([])
    const [portfolioList, setPortfolioList] = useState([]);
    const [skill, setSkill] = useState([]);
    const [image, setImage] = useState('');

    const profileId = props.match.params
    let userId;

    useEffect(() => {

        getProfilePost()

    }, [])

    const getProfilePost = () => {

        userId = window.localStorage.getItem("userId")

        let body = {
            _id: profileId.profileId
        }

        axios.post('/api/users/profile', body)
            .then(response => {
                if (response.data.success) {
                    setProfile(response.data.profile)
                    setSkill(response.data.profile.skill)
                    setPortfolioList(response.data.profile.portfolio)
                    response.data.profile.image[0] && setImage(response.data.profile.image[0].path)
                }
                else {
                    alert(" 유저 리스트들을 가져오는데 실패 했습니다.")
                }
            })
    }

    return (
        <div>
            <Jumbotron className="search__header">
                <h1 className="search__header-title">이 유저는 어떤가요?</h1>
            </Jumbotron>

            <div className="container">
                <section>
                    <KeyInfo
                        Skill={skill}
                        image={image}
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
