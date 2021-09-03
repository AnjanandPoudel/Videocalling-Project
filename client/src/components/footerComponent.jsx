import React from 'react';



function Footer(){

    return(
        <div className="footer">
     
        


            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-4">
                        <h5> About us </h5>
                        <hr/>
                         <a href="/">see our work</a> <br/>
                         <a href="/">Blogs</a><br/>
                         <a href="/">Join us</a><br/>
                         <a href="/">Contributors</a> 

                    </div>
                    <div className=" col-12 col-sm-4">
                        <h5> Contact us </h5>
                        <hr/>
                         <i>Our Email Address:</i>
                         <a href="/"> example@gmal.com </a> <br/>
                         <a href="/"> Ph no: 980909098</a><br/>
                         <a href="/"> Fax : 7687678</a> 

                    </div>
                    <div className=" col-12 col-sm-4">
                        <h5> Contact us </h5>
                        <hr/>
                         <i>Our Email Address:</i>
                         <a href="/"> example@gmal.com </a> <br/>
                         <a href="/"> Ph no: 980909098</a><br/>
                         <a href="/"> Fax : 7687678</a> 

                    </div>
                </div>
                <div className="copyright">
                    <hr/>
                    <p className="copyright-text"> 2020: Copyright </p>
                </div>
            </div>
        </div>
    )
}

export default Footer;