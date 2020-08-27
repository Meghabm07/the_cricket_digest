import React, { Component } from "react";
import ReactDOM from "react-dom";
import TopHeadings from "../home/subcomponents/TopHeadings";
import SingleArticleCard from "./subcomponenets/SingleVideoCard";

export default class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryWiseVideosData: []
        };
        this.getAllVideossCategoryWise = this.getAllVideossCategoryWise.bind(
            this
        );
    }

    componentDidMount() {
        this.getAllVideossCategoryWise();
    }

    getAllVideossCategoryWise() {
        const url = "/category-video";
        axios
            .get(url)
            .then(response => {
                this.setState({ categoryWiseVideosData: response.data });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    render() {
        var data = [];

        if (this.state.categoryWiseVideosData.length != 0) {
            Object.keys(this.state.categoryWiseVideosData).forEach(key => {
                data.push({
                    name: key,
                    videos: this.state.categoryWiseVideosData[key]
                });
            });
        }
        return (
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="row">
                            {data.map((category, i) => {
                                return (
                                    <div className="col-12" key={i}>
                                        <h5 className="font-weight-bold category__title">
                                            {category.name}
                                        </h5>
                                        <div className="row">
                                            {category.videos.map((video, j) => {
                                                return (
                                                    <div
                                                        className="col-lg-3 col-md-6 col-sm-12 p-2"
                                                        key={j}
                                                    >
                                                        <SingleArticleCard
                                                            videosData={video}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById("allvideo")) {
    ReactDOM.render(<Video />, document.getElementById("allvideo"));
}
