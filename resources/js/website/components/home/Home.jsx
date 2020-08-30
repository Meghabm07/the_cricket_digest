import React, { Component } from "react";
import ReactDOM from "react-dom";
import Categories from "./subcomponents/Categories";
import MainArticle from "./subcomponents/MainArticle";
import RandomArticle from "./subcomponents/RandomArticle";
import LatestCategory from "./subcomponents/LatestCategory";
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
                <div className="row home__articles">
                    <div className="col-lg-3 col-md-3 col-sm-12 pt-4 categories__column">
                        <Categories />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 pt-4 ">
                        <MainArticle />
                        <RandomArticle />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 pt-4 top__headlines">
                        <TopHeadings />
                        <LatestCategory />
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById("home")) {
    ReactDOM.render(<Home />, document.getElementById("home"));
}
