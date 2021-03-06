import React, { Component } from "react";

export default class RelatedArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedBlogs: []
        };
        this.getRelatedContent = this.getRelatedContent.bind(this);
    }

    componentDidMount() {
        this.getRelatedContent();
    }

    getRelatedContent() {
        const url = "/related-article/" + this.props.categoryId;
        axios
            .get(url)
            .then(response => {
                this.setState({ relatedBlogs: response.data });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    render() {
        return (
            <div>
                <div className="row mt-4">
                    <div className="col-12">
                        <h5 className="font-weight-bold category__title">
                            Related Articles
                        </h5>
                    </div>
                </div>

                {this.state.relatedBlogs.map((article, i) => {
                    return (
                        <a href={`/article/${article.id}`} key={i}>
                            <div className={i > 0 ? "card mt-4" : "card"}>
                                <img
                                    className="card-img-top p-3"
                                    src={article.image}
                                    alt=""
                                />
                                <div className="card-body d-flex align-items-center pt-0">
                                    <h6 className="card-title  mb-0">
                                        {article.name}
                                    </h6>
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>
        );
    }
}
