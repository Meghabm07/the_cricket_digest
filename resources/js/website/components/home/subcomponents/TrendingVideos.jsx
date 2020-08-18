import React, { Component } from "react";
import Slider from "react-slick";
import "../../../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../../../node_modules/slick-carousel/slick/slick-theme.css";
import ViewVideo from "../../viewvideo/ViewVideo";

export default class TrendingVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoData: [],
            viewVideoData: []
        };
        this.getVideoList = this.getVideoList.bind(this);
        this.openVideModal = this.openVideModal.bind(this);
    }

    componentDidMount() {
        this.getVideoList();
    }
    openVideModal(video) {
        this.setState({ viewVideoData: video });
        // $("#viewVideo").modal("show");
    }
    getVideoList() {
        const url = "/trending-videos";
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
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },

                {
                    breakpoint: 850,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (
            <div className="trending__videos">
                <Slider {...settings}>
                    {this.state.videoData.map((video, i) => {
                        return (
                            <a
                                onClick={() => this.openVideModal(video)}
                                className="article__card"
                                key={i}
                            >
                                <div className="card" key={i}>
                                    <iframe
                                        src={video.video_url}
                                        allow=""
                                        frameBorder="0"
                                    ></iframe>
                                    <div className="card-body d-flex align-items-center">
                                        <h6 className="font-weight-bold">
                                            {video.name}
                                        </h6>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </Slider>
                {/**
             <ViewVideo videoData={this.state.viewVideoData} />
            */}
            </div>
        );
    }
}
