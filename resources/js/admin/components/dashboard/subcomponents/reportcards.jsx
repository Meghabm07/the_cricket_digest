import React, { Component } from "react";

export default class reportcards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalCount: []
        };
        this.getTotalCount = this.getTotalCount.bind(this);
    }

    componentDidMount() {
        this.getTotalCount();
    }

    getTotalCount() {
        const url = "/admin/dashboard/total-count";

        axios
            .get(url)
            .then(response => {
                this.setState({
                    totalCount: response.data
                });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
    render() {
        return (
            <div className="row">
                <div className="col-lg-3 col-6">
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>{this.state.totalCount.totalBlogs}</h3>

                            <p>Total Blogs</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-bag" />
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-6">
                    <div className="small-box bg-success">
                        <div className="inner">
                            <h3>{this.state.totalCount.totalVideos}</h3>

                            <p>Total Videos</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-stats-bars" />
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-6">
                    <div className="small-box bg-warning">
                        <div className="inner">
                            <h3>{this.state.totalCount.totalMostViewBlogs}</h3>

                            <p>Total Most Viewed Blogs</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-person-add" />
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-6">
                    <div className="small-box bg-danger">
                        <div className="inner">
                            <h3>{this.state.totalCount.totalTrendingBlogs}</h3>

                            <p>Total Trending Blogs</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-pie-graph" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
