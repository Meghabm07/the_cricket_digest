import React, { Component } from "react";

export default class LatestCategory extends Component {
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
            <div>
                {this.state.categoryData.map((category, i) => {
                    return (
                        <a
                            href={`/category/${category.id}`}
                            className="article__card"
                            key={i}
                        >
                            <div className="card mt-4">
                                <img
                                    className="card-img-top p-3"
                                    src={category.image}
                                    alt=""
                                />
                                <div className="card-body d-flex align-items-center ">
                                    <h5 className="card-title mb-0">
                                        {category.name}
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
