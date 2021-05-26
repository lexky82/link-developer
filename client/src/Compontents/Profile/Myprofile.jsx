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
    const [image, setImage] = useState('');

    useEffect(() => {

        getProfilePost()
    }, [])

    const getProfilePost = () => {
        let userId = window.localStorage.getItem("userId")

        let body = {
            _id: userId
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
                <h2 className="search__header-title">입력한 정보를 다른 유저들이 볼 수 있어요!</h2>
            </Jumbotron>

            <div className="container">
                <section>
                    <KeyInfo
                        Skill={skill}
                        image={image}
                        setImage={setImage}
                        setSkill={setSkill}
                        profile={Profile}
                        setProfile={setProfile}
                        user={props.user}
                    />
                </section>

                <section className="expreience__portfolio">
                    <Portfolio
                        portfolioList={portfolioList}
                        setPortfolioList={setPortfolioList}
                        user={props.user}
                    />
                </section>
            </div>
        </div>
    )
}

export default MyProfile;
