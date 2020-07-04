import React from 'react';

//Returns a div with a search bar, and passes in appropriate methods for change handling
const SearchBar = (props) => {
    return (
        <div className="input-group flex-nowrap w-25 mx-auto my-5">
            <div className="input-group-prepend">
                <span className="input-group-text" id="addon-wrapping">Search</span>
            </div>
            <input type="text" className="form-control" placeholder="Search by name" aria-label="Username" aria-describedby="addon-wrapping" onChange={(event) => props.handleChange(event)}/>
        </div>
    )
}

export default SearchBar;