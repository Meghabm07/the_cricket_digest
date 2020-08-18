import React, { Component } from "react";

export default class ViewVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: {
                name: "",
                video_url: ""
            }
        };
    }

    async componentWillReceiveProps(newProps) {
        if (newProps.videoData) {
            this.setState({ video: newProps.videoData });
        }
    }

    render() {
        return (
            <div
                className="modal fade"
                id="viewVideo"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="modelTitleId"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {this.state.video.name}
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
                            <iframe
                                allow="autoplay; fullscreen"
                                src={this.state.video.video_url}
                                frameBorder="0"
                            ></iframe>
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
