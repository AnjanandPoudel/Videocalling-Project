import React, { Component } from 'react';

class SearchComponent extends Component {
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div className="search-box">
                <input type="text"  placeholder="Search by id/name" name="Search" />
                <button className="btn btn-button btn-primary" type="submit">Search</button>
            </div>
        )
    }
}

export default SearchComponent;