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
                {this.state.relatedBlogs.map((article, i) => {
                    return (
                        <a href={`/article/${article.id}`} key={i}>
                            <div className="card mt-4">
                                <img
                                    className="card-img-top p-3"
                                    src={article.image}
                                    alt=""
                                />
                                <div className="card-body d-flex align-items-center pt-0 pb-0">
                                    <h6 className="card-title">
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
