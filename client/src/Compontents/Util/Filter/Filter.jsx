import React, {useState} from 'react'
import { Select } from "antd";
import SkillFilter from './SkillFilter';
import AreaFilter from './AreaFilter';

const Option = Select;

function Filter(props) {

 
    return (
        <div style={{ display:'flex' }}>
           <SkillFilter handleFilters={filters => props.showFilteredReulst(filters)} />

            <Select placeholder="온라인/오프라인" style={{ width: 120 }}>
                <Option value={true}>온라인</Option>
                <Option value={false}>오프라인</Option>
            </Select>

            <AreaFilter />
        </div>
    )
}

export default Filter
