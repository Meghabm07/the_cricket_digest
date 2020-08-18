import React, { Component } from "react";
import ConfirmDelete from "./confirmdelete";
import Pagination from "../../../utilities/pagination";
import TableDataSearch from "../../../utilities/tabledatasearch";

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoData: [],
            rowsCount: 10,
            keywords: "",
            videoId: "",
            videoName: "",
            pagination: {
                current_page: 1,
                last_page: 1
            }
        };
        this.activeCreateForm = this.activeCreateForm.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.getvideoData = this.getvideoData.bind(this);
        this.onRowCountChange = this.onRowCountChange.bind(this);
        this.openEditForm = this.openEditForm.bind(this);
        this.openConfirmModal = this.openConfirmModal.bind(this);
        this.setNewPage = this.setNewPage.bind(this);
        this.isTrendingClick = this.isTrendingClick.bind(this);
    }

    getvideoData() {
        const url = "/admin/video/list";
        var rowsCountData = this.state.rowsCount;
        var keywordsData = this.state.keywords;
        axios
            .get(url, {
                params: {
                    page: this.state.pagination.current_page,
                    rowsCount: rowsCountData,
                    keywords: keywordsData
                }
            })
            .then(response => {
                this.setState({ videoData: response.data });
                this.setState({
                    pagination: {
                        current_page: response.data.current_page,
                        last_page: response.data.last_page
                    }
                });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    openEditForm(id) {
        this.props.onActiveEditForm(id);
    }

    componentDidMount() {
        this.getvideoData();
    }

    activeCreateForm() {
        this.props.onAddVideo();
    }

    openConfirmModal(id, name) {
        this.setState({ videoId: id });
        this.setState({ videoName: name });
        $("#confirmModel").modal("show");
    }

    onSearch(event) {
        this.setState({ keywords: event.target.value }, this.getvideoData);
    }

    onRowCountChange() {
        this.setState({ rowsCount: event.target.value }, this.getvideoData);
    }

    setNewPage(newPage) {
        this.setState(
            {
                pagination: {
                    current_page: newPage
                }
            },
            this.getvideoData
        );
    }

    isTrendingClick(event, id) {
        var data = {
            isChecked: event.target.checked
        };
        const url = "/admin/video/" + id + "/trending";
        axios
            .post(url, data)
            .then(response => {
                this.props.onActiveToster({
                    message: response.data.message,
                    status: "success"
                });
                this.getvideoData();
            })
            .catch(error => {
                this.props.onActiveToster({
                    message: error.response.data.message,
                    status: "error"
                });
                console.log(error.response.data);
            });
    }
    render() {
        var videoDetails = this.state.videoData.data;
        var rows;
        if (videoDetails != undefined) {
            if (videoDetails.length != 0) {
                rows = (
                    <tbody>
                        {videoDetails.map((video, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}.</td>
                                    <td>{video.category.name}</td>
                                    <td>{video.name}</td>
                                    <td>
                                        <iframe
                                            width="420"
                                            height="315"
                                            src={video.video_url}
                                            frameborder="0"
                                            allowFullScreen
                                        ></iframe>
                                    </td>
                                    <td>
                                        <div className="form-check">
                                            <label className="form-check-label">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    onClick={e =>
                                                        this.isTrendingClick(
                                                            e,
                                                            video.id
                                                        )
                                                    }
                                                    defaultChecked={parseInt(
                                                        video.is_trending
                                                    )}
                                                />
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                        <a
                                            onClick={() =>
                                                this.openEditForm(video.id)
                                            }
                                        >
                                            <i className="fas fa-edit" />
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            onClick={() =>
                                                this.openConfirmModal(
                                                    video.id,
                                                    video.name
                                                )
                                            }
                                        >
                                            <i className="fas fa-trash" />
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                );
            } else if (videoDetails.length == 0) {
                rows = (
                    <tbody>
                        <tr>
                            <td
                                colSpan="7"
                                className="text-info text-bold text-center"
                            >
                                No Data
                            </td>
                        </tr>
                    </tbody>
                );
            }
        }

        return (
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div>
                                    <TableDataSearch
                                        onSearch={this.onSearch}
                                        onRowCountChange={this.onRowCountChange}
                                        activeCreateForm={this.activeCreateForm}
                                    />
                                </div>
                            </div>
                            <div className="card-body table-responsive">
                                <table className="table  table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Category</th>
                                            <th>Video Name</th>
                                            <th>Video Image</th>
                                            <th>Is Trending</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    {rows}
                                </table>
                                <ConfirmDelete
                                    activeToaster={this.props.onActiveToster}
                                    videoId={this.state.videoId}
                                    videoName={this.state.videoName}
                                />
                            </div>
                            <div className="card-footer clearfix">
                                <Pagination
                                    pagination={this.state.pagination}
                                    setPage={this.setNewPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Table;
