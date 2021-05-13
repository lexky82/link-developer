import React from 'react'
import { Select } from "antd";

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
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>

                <Select placeholder="온라인/오프라인" style={{ width: 120 }}>
                    <Option value={true}>온라인</Option>
                    <Option value={false}>오프라인</Option>
                </Select>

                <Select placeholder="지역" style={{ width: 120 }}>
                    <Option value="seoul">서울</Option>
                    <Option value="incheon">인천</Option>
                    <Option value="busan">부산</Option>
                </Select>
        </div>
    )
}

export default Filter
