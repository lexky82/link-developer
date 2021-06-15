import React from 'react'

/* Lib */
import { area } from "../../../Data";

/* Components */
import { Select } from "antd";
const Option = Select;

function AreaFilter(props) {

    const areaFilterHandler = (event) => {
        props.handleFilters(event)
    }

    return (
        <div>
            <Select mode="multiple" onChange={areaFilterHandler} placeholder="지역" className="areaFilter">
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
