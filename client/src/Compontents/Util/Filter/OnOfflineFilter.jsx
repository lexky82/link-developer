import React, {useState} from 'react'
import { Select } from "antd";
const Option = Select

function OnOfflineFilter(props) {

    const onOffFilterHandler = (event) => {
        props.handleFilters(event)
    }

    return (
        <div>
            <Select onChange={onOffFilterHandler} placeholder="온라인/오프라인" style={{ width: 120 }}>
                <Option value={true}>온라인</Option>
                <Option value={false}>오프라인</Option>
            </Select>
        </div>
    )
}

export default OnOfflineFilter