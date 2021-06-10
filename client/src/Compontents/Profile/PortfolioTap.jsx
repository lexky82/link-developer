import React from 'react'
import { GithubOutlined, HomeOutlined } from '@ant-design/icons'

function PortfolioTap(props) {

    const { portfolio, user, removePortfolioHandler } = props
    
    return (
        <blockquote id={portfolio.id} className="Portfolio">
            <p className="title">{portfolio.projectName}{user && <button onClick={removePortfolioHandler} style={{ border: '0', outline: '0' }} >X</button>}</p>
            <p>{portfolio.startDate} ~ {portfolio.endDate}</p>
            <p>{portfolio.position}</p>
            {
                portfolio.skill && portfolio.skill.map((skill, i) => (
                    <p key={i} className="skillStackLabel">{skill}</p>
                ))
            }
            <p>{portfolio.description}</p>
            {portfolio.github && <a href={`${portfolio.github}`} target="_blank">{<GithubOutlined style={{ fontSize :'22px', marginRight:'5px'}} />}</a>}
            {portfolio.distribute &&<a href={`${portfolio.distribute}`} target="_blank">{<HomeOutlined style={{ fontSize :'22px' }}/>}</a>}
        </blockquote>
    )
}

export default PortfolioTap
