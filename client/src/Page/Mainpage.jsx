import React from "react";
import { Link } from "react-router-dom";

/* Components */
import { Carousel } from "antd";
import { Jumbotron, Button } from 'react-bootstrap';

/* image */
import imgStudySearch from '../Image/StudySearch.png'
import imgFriendSearch from '../Image/FriendSearch.png'

function Mainpage() {
    return (
        <div>
            <header>
                <Jumbotron className="mainpage">
                    <div className="mainpage__content">
                        <p>개발자 스터디, 협업 알선 플랫폼</p>
                        <p className="title">링크디벨로퍼가 개발자를 찾는데 도와줄게요.</p>
                        <p>나와 다른 능력을 갖고있는 개발자들과 협업해보세요!</p>

                        <Link to="/studySearch">
                            <Button className="mainpage__content-button">
                                <span>찾아보기</span>
                            </Button>
                        </Link>
                    </div>
                </Jumbotron>
            </header>

            <section style={{ backgroundColor: '#4142dd', color: 'white' }}>
                <div className="container wraper">
                    <div className="wraper__text">
                        <p className="wraper__text--title">
                            개발자 스터디를 찾고 있다면 링크디벨롭퍼를 적극 활용해보세요.
                        </p>
                        <p className="wraper__text--content">본인이 사용하는 기술을 필요로 하는 스터디를 구하고
                        지역을 검색하거나 온라인과 오프라인 여부를 선택하여 자신의 최적화된 스터디를 찾을 수 있습니다.</p>
                    </div>
                    <Carousel dotPosition="top" autoplay>
                        <div>
                            <img src={imgStudySearch} />
                        </div>
                        <div>
                            <img src={imgFriendSearch} />
                        </div>
                    </Carousel>
                </div>
            </section>
        </div>
    )
}

export default Mainpage;
