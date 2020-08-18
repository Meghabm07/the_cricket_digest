import React, { Component } from "react";
import ReactDOM from "react-dom";
import TopHeadings from "../home/subcomponents/TopHeadings";
import SingleArticleCard from "./subcomponenets/SingleArticleCard";

export default class AllArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryWiseArticlesData: []
        };
        this.getAllArticlesCategoryWise = this.getAllArticlesCategoryWise.bind(
            this
        );
    }

    componentDidMount() {
        this.getAllArticlesCategoryWise();
    }

    getAllArticlesCategoryWise() {
        const url = "/category-article";
        axios
            .get(url)
            .then(response => {
                this.setState({ categoryWiseArticlesData: response.data });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    render() {
        var data = [];

        if (this.state.categoryWiseArticlesData.length != 0) {
            Object.keys(this.state.categoryWiseArticlesData).forEach(key => {
                data.push({
                    name: key,
                    blogs: this.state.categoryWiseArticlesData[key]
                });
            });
        }
        return (
            <div className="container-fluid">
                <div className="row mt-5">
                    <div className="col-lg-9 col-md-8 col-sm-12">
                        <div className="row">
                            {data.map((category, i) => {
                                return (
                                    <div className="col-12" key={i}>
                                        <h5 className="font-weight-bold category__title">
                                            {category.name}
                                        </h5>
                                        <div className="row">
                                            {category.blogs.map((blog, j) => {
                                                return (
                                                    <div
                                                        className="col-lg-4 col-md-6 col-sm-12 p-2"
                                                        key={j}
                                                    >
                                                        <SingleArticleCard
                                                            blogsData={blog}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <TopHeadings />
                        <img
                            src="https://www.indiantelevision.com/advt/general/mailer/y2k13/jun/20jun-TEN-CRICKET-mailer.JPG"
                            alt=""
                            className="advertise__banner"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById("allarticle")) {
    ReactDOM.render(<AllArticle />, document.getElementById("allarticle"));
}
