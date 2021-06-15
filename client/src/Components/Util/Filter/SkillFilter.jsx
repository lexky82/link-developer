import React from 'react'

/* Lib */
import { skill } from "../../../Data";

/* Components */
import { Select } from "antd";
const Option = Select

function SkillFilter(props) {

    const skillFilterHandler = (event) => {
        props.handleFilters(event)
    }

    return (
        <div>
            <Select
                onChange={skillFilterHandler}
                showSearch
                mode="multiple"
                className="skillFilter"
                placeholder="Select a Skill"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {
                    skill.map(item => (
                        <Option key={item.key} value={item.key}>{item.key}</Option>
                    ))
                }

            </Select>
        </div>
    )
}

export default SkillFilter
