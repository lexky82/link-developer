import React from 'react'
import SkillFilter from './SkillFilter';
import AreaFilter from './AreaFilter';
import OnOfflineFilter from './OnOfflineFilter';

function Filter(props) {
    return (
        <div style={{ display:'flex' , flexWrap:'wrap'}}>
           <SkillFilter handleFilters={filters => props.showFilteredReulst(filters, 'skill')} />

            <OnOfflineFilter handleFilters={filters => props.showFilteredReulst(filters, 'onOff')} />

            <AreaFilter handleFilters={filters => props.showFilteredReulst(filters, 'area')}/>
        </div>
    )
}

export default Filter
