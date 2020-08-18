import React, { Component } from "react";

export default class Categories extends Component {
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
            <ul className="list-group">
                <li className="list-group-item">
                    <h5 className="font-weight-bold mb-0">Categories</h5>
                </li>
                <li className="list-group-item pt-0">
                    <ul className="heading__list">
                        {this.state.categoryData.map((category, i) => {
                            return (
                                <li className="heading__item" key={i}>
                                    <a
                                        target="_blank"
                                        href={`/category/${category.id}`}
                                    >
                                        <i
                                            className="fa fa-angle-right"
                                            aria-hidden="true"
                                        ></i>
                                        {category.name}
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
