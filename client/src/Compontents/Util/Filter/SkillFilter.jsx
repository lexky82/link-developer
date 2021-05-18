import React, { useState } from 'react'
import { Select } from "antd";
import { skill } from "../../../Data";
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
                style={{ width: 200 }}
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
