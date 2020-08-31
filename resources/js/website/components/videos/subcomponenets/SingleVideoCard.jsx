import React, { Component } from "react";
import Slider from "react-slick";
import "../../../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../../../node_modules/slick-carousel/slick/slick-theme.css";

export default class SingleVideoCard extends Component {
    render() {
        return (
            <div className="article__card">
                <div className="card all__videos">
                    <iframe
                        src={this.props.videosData.video_url}
                        allow=""
                        frameBorder="0"
                    ></iframe>
                    <div className="card-body">
                        <h5 className="mb-0">{this.props.videosData.name}</h5>
                    </div>
                </div>
            </div>
        );
    }
}
