import React from 'react'
import { Link } from "react-router-dom";

/* image */
import imgStudy from '../../image/Study.png'

function StudyCard(props) {

    const { StudyPosts } = props

    return (
        <div>
            <div >
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
                <img src={imgStudy} />
                <p className="notice__card--title"><Link to={`/detail/${props.particle._id}`}>{props.particle.title}</Link></p>
                <p>{props.particle.purpose}</p>
                <p>{props.particle.area}</p>
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
