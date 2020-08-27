import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class NavbarCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryData: []
        };
        this.getCategoryList = this.getCategoryList.bind(this);
    }

    componentDidMount() {
        this.getCategoryList();
    }

    getCategoryList() {
        const url = "/category-list";
        axios
            .get(url)
            .then(response => {
                this.setState({ categoryData: response.data });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    render() {
        return (
            <ul className="navbar-nav mr-auto d-none">
                <li className="nav-item">
                    <h5 className="pl-2 font-weight-bold">Categories</h5>
                </li>
                {this.state.categoryData.map((category, i) => {
                    return (
                        <li className="nav-item" key={i}>
                            <a
                                className="nav-link"
                                target="_blank"
                                href={`/category/${category.id}`}
                            >
                                {category.name}
                            </a>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

if (document.getElementById("navBarCategories")) {
    ReactDOM.render(
        <NavbarCategories />,
        document.getElementById("navBarCategories")
    );
}
