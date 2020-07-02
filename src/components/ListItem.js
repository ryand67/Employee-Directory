import React from 'react';

const ListItem = (props) => {
    return(
        <div className="listItem d-flex justify-content-around text-center">
            <h4>{props.name}</h4>
            <h4>{props.email}</h4>
            <h4>{props.address}</h4>
        </div>
    )
}

export default ListItem;