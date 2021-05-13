import React from 'react'

function StudyCard(props) {

    const { StudyPosts } = props

    return (
        <div>
            <div className="container">
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
                <img src="https://img.icons8.com/ios/452/client-company.png" />
                <h5><a href={`/detail/${props.particle._id}`}>{props.particle.title}</a></h5>
                <p>{props.particle.area == 3 && "서울"}</p>
                <p>모집 기한 : {props.particle.date}</p>
            </li>
        )
    }
}

export default StudyCard
