import React, { Component } from "react";

export default class RandomArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randomArticleData: []
        };
        this.getRandomArticle = this.getRandomArticle.bind(this);
    }

    componentDidMount() {
        this.getRandomArticle();
    }

    getRandomArticle() {
        const url = "/random-article";
        axios
            .get(url)
            .then(response => {
                this.setState({
                    randomArticleData: response.data
                });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    render() {
        return (
            <div>
                {this.state.randomArticleData.map((random, i) => {
                    return (
                        <div className="card mt-3" key={i}>
                            <div className="card-body">
                                <a
                                    target="_blank"
                                    href={`/article/${random.id}`}
                                    className="random__article"
                                >
                                    <div className="row ">
                                        <div className="col-lg-4 col-md-6 col-sm-12 pr-0 random__article__img">
                                            <img
                                                src={random.image}
                                                className="card-img-top"
                                                alt=""
                                            />
                                        </div>
                                        <div className="col-lg-8  col-md-6 col-sm-12 ">
                                            <h6 className="mb-0 font-weight-bold">
                                                {random.name}
                                            </h6>
                                            <p
                                                className="article__small__description"
                                                dangerouslySetInnerHTML={{
                                                    __html: `${random.content
                                                        .substring(0, 110)
                                                        .toString() + "..."}`
                                                }}
                                            ></p>
                                            {/**
                                         <div className="article__author">
                                                Article By {random.user} |{" "}
                                                {random.date}
                                            </div>
                                        */}
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
