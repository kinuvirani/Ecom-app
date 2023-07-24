import React from "react";
import './footer.css'
const FooterPage = () => {
    return (
        <footer className="section footer-classic context-dark bg-image bottom" style={{background: '#2d3246'}}>
            <div className="container">
                <div className="row row-30">
                    <div className="col-md-4 col-xl-5">
                        <div className="pr-xl-4">
                            <p className="rights"><span></span><span
                                className="copyright-year">2018</span><span>&copy; </span><span>Waves</span><span>. </span><span>All Rights Reserved.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    );
}

export default FooterPage;
