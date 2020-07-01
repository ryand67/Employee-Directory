import React from 'react';

const SearchBar = () => {
    return (
        <div className="input-group flex-nowrap w-75">
            <div className="input-group-prepend">
                <span className="input-group-text" id="addon-wrapping">Search</span>
            </div>
            <input type="text" className="form-control" placeholder="Search by name" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>
    )
}

export default SearchBar;