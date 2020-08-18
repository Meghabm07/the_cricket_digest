import React, { Component } from "react";
import ReactDOM from "react-dom";
import Select from "react-dropdown-select";

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
        this.redirect = this.redirect.bind(this);
    }
    componentDidMount() {
        const url = "/search-article";
        axios
            .get(url)
            .then(response => {
                this.setState({
                    articles: response.data
                });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    redirect(value) {
        window.location.href = "/article/" + value[0].id;
    }

    render() {
        return (
            <Select
                options={this.state.articles}
                separator={true}
                name="Search Blogs..."
                labelField="name"
                color="#E01C2A"
                searchable={true}
                loading={true}
                searchBy="name"
                valueField="id"
                onChange={values => this.redirect(values)}
            />
        );
    }
}

if (document.getElementById("searchbar")) {
    ReactDOM.render(<SearchBar />, document.getElementById("searchbar"));
}
