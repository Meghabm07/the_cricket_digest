import React, { Component } from "react";

export default class MainArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latestArticleData: []
        };
        this.getLatestArticle = this.getLatestArticle.bind(this);
    }

    componentDidMount() {
        this.getLatestArticle();
    }

    getLatestArticle() {
        const url = "/lastet-article";
        axios
            .get(url)
            .then(response => {
                this.setState({ latestArticleData: response.data });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    render() {
        return (
            <div>
                {this.state.latestArticleData.map((article, i) => {
                    return (
                        <a
                            target="_blank"
                            href={`/article/${article.id}`}
                            className="article__card"
                            key={i}
                        >
                            <div className="card ">
                                <img
                                    className="card-img-top p-3"
                                    src={article.image}
                                    alt=""
                                />
                                <div className="card-body">
                                    <h5 className="mb-0 font-weight-bold">
                                        {article.name}
                                    </h5>
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>
        );
    }
}
