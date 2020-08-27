import React, { Component } from "react";
import Slider from "react-slick";
import "../../../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../../../node_modules/slick-carousel/slick/slick-theme.css";

export default class SingleVideoCard extends Component {
    render() {
        return (
            <div className="article__card">
                <div className="card h-auto">
                    <iframe
                        src={this.props.videosData.video_url}
                        allow=""
                        frameBorder="0"
                    ></iframe>
                    <div className="card-body">
                        <h6 className="font-weight-bold">
                            {this.props.videosData.name}
                        </h6>
                    </div>
                </div>
            </div>
        );
    }
}
