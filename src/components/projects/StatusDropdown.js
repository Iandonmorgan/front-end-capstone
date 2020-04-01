import React, { useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import APIManager from '../../modules/APIManager';


const StatusDropdown = () => {

    let statusOptions = [];
    const getStatusOptions = () => {
        APIManager.getAll("statuses").then(results => {
            console.log(results);
            results.map(result => {
                let statusOption = {
                    key: result.id,
                    text: result.name,
                    value: result.id
                }
                statusOptions.push(statusOption)
            })
        })
        console.log(statusOptions)
    }


    useEffect(() => {
        getStatusOptions();
    }, [statusOptions]);

    return (
        <Dropdown options={statusOptions} selection defaultValue={1} />
    )

}

export default StatusDropdown
