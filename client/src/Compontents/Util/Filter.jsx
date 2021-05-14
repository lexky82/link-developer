import React from 'react'
import { Select } from "antd";
import { skill, area } from "../../Data";

const Option = Select;

function Filter() {
    return (
        <div>
            <Select
                showSearch
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

            <Select placeholder="온라인/오프라인" style={{ width: 120 }}>
                <Option value={true}>온라인</Option>
                <Option value={false}>오프라인</Option>
            </Select>

            <Select placeholder="지역" style={{ width: 120 }}>
                {
                    area.map(item => (
                        <Option value={item.key} key={item.key} >{item.value}</Option>
                    ))
                }
            </Select>
        </div>
    )
}

export default Filter
