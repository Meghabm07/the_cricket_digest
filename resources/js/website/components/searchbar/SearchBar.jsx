import React, { Component } from "react";
import ReactDOM from "react-dom";
import Select from "react-dropdown-select";

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
        this.onSearch = this.onSearch.bind(this);
    }
    componentDidMount() {}

    onSearch(event) {
        var data = {
            keywords: event.target.value
        };
        const url = "/search-article";
        axios
            .post(url, data)
            .then(response => {
                this.setState({
                    articles: response.data
                });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    render() {
        var ui;
        if (this.state.articles.length > 0) {
            ui = (
                <ul className="results">
                    {this.state.articles.map((article, i) => {
                        return (
                            <li key={i}>
                                <a href={`/article/${article.id}`}>
                                    {article.name.substr(0, 40)} ...
                                </a>
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            ui = (
                <ul className="results">
                    <li className="p-2">
                        <a href="#">Article not found</a>
                    </li>
                </ul>
            );
        }
        return (
            <div className="box">
                <div className="container-2 d-flex flex-row-reverse">
                    <span className="icon">
                        <i className="fa fa-search"></i>
                    </span>
                    <input
                        type="search"
                        className="form-control"
                        id="search"
                        onKeyUp={() => this.onSearch(event)}
                        placeholder="Search..."
                    />
                    {ui}
                </div>
            </div>
        );
    }
}

if (document.getElementById("searchbar")) {
    ReactDOM.render(<SearchBar />, document.getElementById("searchbar"));
}
