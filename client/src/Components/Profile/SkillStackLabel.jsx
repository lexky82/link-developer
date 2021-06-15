import React from 'react'

function SkillStackLabel(props) {
    const { user, onRemoveSkillTag } = props

    return (
        <li id={props.skill} className="skillStackLabel">
            <span>{props.skill}</span>
            {
                user && <button onClick={(event) => { onRemoveSkillTag(event) }}>x</button>
            }
        </li>
    )
}

export default SkillStackLabel
