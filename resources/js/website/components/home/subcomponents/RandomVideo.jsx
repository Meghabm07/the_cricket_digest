import React, { Component } from "react";

export default class RandomVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoData: []
        };
        this.getVideoList = this.getVideoList.bind(this);
    }

    componentDidMount() {
        this.getVideoList();
    }

    getVideoList() {
        const url = "/video/list";
        axios
            .get(url)
            .then(response => {
                this.setState({ videoData: response.data });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    render() {
        return (
            <div>
                {this.state.videoData.map((video, i) => {
                    return (
                        <a href="/video" className="article__card" key={i}>
                            <div className="card mt-4">
                                <iframe
                                    src={video.video_url}
                                    frameBorder="0"
                                ></iframe>
                                <div className="card-body d-flex align-items-center ">
                                    <h6 className="card-title">{video.name}</h6>
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>
        );
    }
}
