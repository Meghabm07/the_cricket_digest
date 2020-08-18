import React, { Component } from "react";
import ReactDOM from "react-dom";
import Categories from "./subcomponents/Categories";
import MainArticle from "./subcomponents/MainArticle";
import RandomArticle from "./subcomponents/RandomArticle";
import RandomVideo from "./subcomponents/RandomVideo";
import TopHeadings from "./subcomponents/TopHeadings";
import TrendingVideos from "./subcomponents/TrendingVideos";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container-fluid">
                <TrendingVideos />
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <Categories />
                        <img
                            src="https://www.indiantelevision.com/advt/general/mailer/y2k13/jun/20jun-TEN-CRICKET-mailer.JPG"
                            alt=""
                            className="advertise__banner"
                        />
                        <img
                            src="https://cricclubs.com/documentsRep/startup/939-startup.JPG"
                            alt=""
                            className="advertise__banner"
                        />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <MainArticle />
                        <RandomArticle />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <TopHeadings />
                        <RandomVideo />
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById("home")) {
    ReactDOM.render(<Home />, document.getElementById("home"));
}
