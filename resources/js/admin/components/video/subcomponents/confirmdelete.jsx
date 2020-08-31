import React, { Component } from "react";
import axios from "axios";

export default class Confirmdelete extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit() {
        event.preventDefault();

        const url = "/admin/video/" + this.props.videoId;

        axios
            .delete(url)
            .then(response => {
                this.props.activeToaster({
                    message: response.data.message,
                    status: "success"
                });
                this.props.getVideos();
                $("#confirmModel").modal("hide");
            })
            .catch(error => {
                if (error.response.data) {
                    this.props.activeToaster({
                        message: error.response.data.error,
                        status: "error"
                    });
                }
            });
    }
    render() {
        return (
            <div
                className="modal fade"
                id="confirmModel"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Delete video {this.props.videoName}
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
                            {" "}
                            Are you really want to delete this video?
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.onSubmit}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
