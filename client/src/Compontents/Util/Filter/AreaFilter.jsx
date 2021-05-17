import React from 'react'
import { area } from "../../../Data";
import { Select } from "antd";
const Option = Select;

function AreaFilter() {
    return (
        <div>
            <Select placeholder="지역" style={{ width: 120 }}>
                {
                    area.map(item => (
                        <Option value={item.key} key={item.key}>{item.key}</Option>
                    ))
                }
            </Select>
        </div>
    )
}

export default AreaFilter
