import React from "react";

function PopularPosts(){
    return(
            <div className="popular-posts col-md-3">
                <h5> HISTORY CALLS:</h5>
                <div className="">
                    <img src="/images/q.jpg" alt=""/>
                    <div className="popularimagebelow">
                        <span className="d-flex">
                            <i className="fa fa-like"></i>
                            <i className="fa fa-like"></i>
                        </span>
                    </div>
                </div>
                <p className="abel">
                   CAll 
                    <br/>
                    <span className="smalltext">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, porro?
                    </span>
                </p>
            </div>
    )
}

export default PopularPosts;