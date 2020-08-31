import React, { Component } from "react";

export default class TopHeadings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topHeadingsData: []
        };
        this.getTopHeadings = this.getTopHeadings.bind(this);
    }

    componentDidMount() {
        this.getTopHeadings();
    }

    getTopHeadings() {
        const url = "/top-headlines";
        axios
            .get(url)
            .then(response => {
                this.setState({ topHeadingsData: response.data });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
    render() {
        return (
            <ul className="list-group">
                <li className="list-group-item">
                    <h6 className="font-weight-bold mb-0">Popular Articles</h6>
                </li>
                <li className="list-group-item pt-0">
                    <ul className="heading__list">
                        {this.state.topHeadingsData.map((headings, i) => {
                            return (
                                <li className="heading__item" key={i}>
                                    <a
                                        target="_blank"
                                        href={`/article/${headings.id}`}
                                    >
                                        <i
                                            className="fa fa-angle-right"
                                            aria-hidden="true"
                                        ></i>
                                        {headings.name}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </li>
            </ul>
        );
    }
}
