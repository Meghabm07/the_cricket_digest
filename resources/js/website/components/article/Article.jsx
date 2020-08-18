import React, { Component } from "react";
import ReactDOM from "react-dom";
import Categories from "../home/subcomponents/Categories";
import RelatiedArticles from "./subcomponents/RelatedArticle";
import TrendingVideos from "../home/subcomponents/TrendingVideos";
import ArticleContent from "./subcomponents/ArticleContent";

export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container-fluid">
                <TrendingVideos />
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <Categories />
                        <RelatiedArticles categoryId={this.props.categoryId} />
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-12">
                        <ArticleContent id={this.props.id} />
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById("article")) {
    const el = document.getElementById("article");
    const props = Object.assign({}, el.dataset);
    ReactDOM.render(<Article {...props} />, document.getElementById("article"));
}
