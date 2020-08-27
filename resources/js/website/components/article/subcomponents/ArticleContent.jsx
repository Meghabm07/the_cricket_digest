import React, { Component } from "react";

export default class ArticleContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogData: []
        };
        this.createMarkup = this.createMarkup.bind(this);
        this.getContent = this.getContent.bind(this);
    }

    componentDidMount() {
        this.getContent();
    }

    getContent() {
        const url = "/article/" + this.props.id + "/show";
        axios
            .get(url)
            .then(response => {
                this.setState({ blogData: response.data });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    createMarkup() {
        return {
            __html: this.state.blogData.content
        };
    }
    render() {
        return (
            <div className="card single__article__content">
                <div className="card-body">
                    <h4 className="single__article__title mb-0">
                        {this.state.blogData.main_name}
                    </h4>
                    <img
                        src={this.state.blogData.image}
                        alt=""
                        className="mb-4"
                    />
                    <div dangerouslySetInnerHTML={this.createMarkup()} />
                </div>
            </div>
        );
    }
}
