import React, { Component } from "react";
import Slider from "react-slick";
import "../../../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../../../node_modules/slick-carousel/slick/slick-theme.css";

export default class RelatedVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedVideos: []
        };
        this.getRelatedContent = this.getRelatedContent.bind(this);
    }

    componentDidMount() {
        this.getRelatedContent();
    }

    getRelatedContent() {
        const url = "/related-video/" + this.props.categoryId;
        axios
            .get(url)
            .then(response => {
                this.setState({ relatedVideos: response.data });
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
            <div>
                {this.state.relatedVideos.length > 0 ? (
                    <div className="row">
                        <div className="col-12">
                            <h5 className="font-weight-bold category__title">
                                Related Videos
                            </h5>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                <Slider {...settings}>
                    {this.state.relatedVideos.map((video, i) => {
                        return (
                            <a className="article__card related__videos" key={i}>
                                <div className="card" key={i}>
                                    <iframe
                                        src={video.video_url}
                                        allow=""
                                        frameBorder="0"
                                    ></iframe>
                                    <div className="card-body d-flex align-items-center">
                                        <h6 className="font-weight-bold  mb-0">
                                            {video.name}
                                        </h6>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </Slider>
            </div>
        );
    }
}
