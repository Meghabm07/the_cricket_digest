import React, { Component } from "react";
import ReactDOM from "react-dom";
import TrendingVideos from "../home/subcomponents/TrendingVideos";
import TopHeadings from "../home/subcomponents/TopHeadings";
import SingleArticleCard from "../allarticle/subcomponenets/SingleArticleCard";

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryBlog: []
        };
        this.getCategoryBlog = this.getCategoryBlog.bind(this);
    }

    componentDidMount() {
        this.getCategoryBlog();
    }

    getCategoryBlog() {
        const url = "/related-article/" + this.props.id;
        axios
            .get(url)
            .then(response => {
                this.setState({
                    categoryBlog: response.data
                });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    render() {
        return (
            <div className="container-fluid">
                <TrendingVideos />
                <div className="row mt-3">
                    <div className="col-lg-9 col-md-8 col-sm-12">
                        <div className="row">
                            <div className="col-12">
                                <h5 className="font-weight-bold category__title">
                                    {this.props.name}
                                </h5>
                            </div>
                            {this.state.categoryBlog.map((blog, i) => {
                                return (
                                    <div className="col-lg-4 p-2" key={i}>
                                        <SingleArticleCard blogsData={blog} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <TopHeadings />
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById("category")) {
    const el = document.getElementById("category");
    const props = Object.assign({}, el.dataset);
    ReactDOM.render(
        <Category {...props} />,
        document.getElementById("category")
    );
}
