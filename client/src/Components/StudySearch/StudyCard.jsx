import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

/* Components  */
import { UploadOutlined, EnvironmentOutlined } from '@ant-design/icons'

/* image */
import imgStudy from '../../Image/Study.png'

function StudyCard() {
    const studyPosts = useSelector(state => state.study.studyData);

    return (
        <div >
            <ul className="notice">
                <li className="notice__card" >
                    <Link to="uploadStudy" style={{ textDecoration: 'none', color: 'black' }}>
                        <UploadOutlined style={{ fontSize: '100px', padding: '2rem', border: '1px solid black', borderRadius: '50%' }} />
                        <div>
                            <p className="title">스터디 업로드</p>
                        </div>
                    </Link>
                </li>
                {
                    studyPosts && studyPosts.studyInfo.map((study, i) => {
                        return <CardNotice key={i} particle={study} />
                    })
                }
            </ul>
        </div>
    )

    function CardNotice(props) {
        return (
            <li className="notice__card">
                <img src={imgStudy} />
                <Link className="notice__card--title" to={`/detail/${props.particle._id}`}>{props.particle.title}</Link>
                <p className="projectName">{props.particle.purpose}</p>
                <div className="projectName">
                    <EnvironmentOutlined style={{ marginRight: '2px' }} />
                    {props.particle.area}
                </div>
                {
                    props.particle.skill.map((skill, i) => {
                        return <span key={i} className="skillStackLabel">{skill}</span>
                    })
                }
                <p>시작일자 : {props.particle.date}</p>
            </li>
        )
    }
}

export default StudyCard
