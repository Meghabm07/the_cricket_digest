import React, { Component } from "react";
import axios from "axios";
import { isNumber } from "lodash";

export default class Viewblog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogData: []
        };
        this.createMarkup = this.createMarkup.bind(this);
    }

    async componentWillReceiveProps(newProps) {
        if (isNumber(newProps.blogId)) {
            const url = "/admin/blog/" + newProps.blogId + "/show";
            axios
                .get(url)
                .then(response => {
                    this.setState({
                        blogData: response.data
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    createMarkup() {
        return {
            __html: this.state.blogData.content
        };
    }

    render() {
        return (
            <div
                className="modal fade"
                id="viewModel"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog  modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {this.state.blogData.name}
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div
                                dangerouslySetInnerHTML={this.createMarkup()}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
