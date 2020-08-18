import React, { Component } from "react";
import ConfirmDelete from "./confirmdelete";
import Pagination from "../../../utilities/pagination";
import TableDataSearch from "../../../utilities/tabledatasearch";
import Viewblog from "./viewblog";

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogData: [],
            rowsCount: 10,
            keywords: "",
            blogId: "",
            blogName: "",
            pagination: {
                current_page: 1,
                last_page: 1
            }
        };
        this.activeCreateForm = this.activeCreateForm.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.getblogData = this.getblogData.bind(this);
        this.onRowCountChange = this.onRowCountChange.bind(this);
        this.openEditForm = this.openEditForm.bind(this);
        this.openConfirmModal = this.openConfirmModal.bind(this);
        this.openViewModal = this.openViewModal.bind(this);
        this.setNewPage = this.setNewPage.bind(this);
        this.isTrendingClick = this.isTrendingClick.bind(this);
    }
    isTrendingClick(event, id) {
        var data = {
            isChecked: event.target.checked
        };

        console.log(data);
        const url = "/admin/blog/" + id + "/trending";
        axios
            .post(url, data)
            .then(response => {
                this.props.onActiveToster({
                    message: response.data.message,
                    status: "success"
                });
                this.getblogData();
            })
            .catch(error => {
                this.props.onActiveToster({
                    message: error.response.data.message,
                    status: "error"
                });
                console.log(error.response.data);
            });
    }

    getblogData() {
        const url = "/admin/blog/list";
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
                this.setState({ blogData: response.data });
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
        this.getblogData();
    }

    activeCreateForm() {
        this.props.onAddBlog();
    }

    openConfirmModal(id, name) {
        this.setState({ blogId: id });
        this.setState({ blogName: name });
        $("#confirmModel").modal("show");
    }

    openViewModal(id, name) {
        this.setState({ blogId: id });
        this.setState({ blogName: name });
        $("#viewModel").modal("show");
    }

    onSearch(event) {
        this.setState({ keywords: event.target.value }, this.getblogData);
    }

    onRowCountChange() {
        this.setState({ rowsCount: event.target.value }, this.getblogData);
    }

    setNewPage(newPage) {
        this.setState(
            {
                pagination: {
                    current_page: newPage
                }
            },
            this.getblogData
        );
    }
    render() {
        var blogDetails = this.state.blogData.data;
        var rows;
        if (blogDetails != undefined) {
            if (blogDetails.length != 0) {
                rows = (
                    <tbody>
                        {blogDetails.map((blog, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}.</td>
                                    <td>{blog.category.name}</td>
                                    <td>{blog.name}</td>
                                    <td>
                                        <img
                                            src={blog.image}
                                            className=" img-fluid"
                                            alt=""
                                        />
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
                                                            blog.id
                                                        )
                                                    }
                                                    defaultChecked={parseInt(
                                                        blog.is_trending
                                                    )}
                                                />
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                        <a
                                            onClick={() =>
                                                this.openViewModal(
                                                    blog.id,
                                                    blog.name
                                                )
                                            }
                                        >
                                            <i className="fas fa-eye" />
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            onClick={() =>
                                                this.openEditForm(blog.id)
                                            }
                                        >
                                            <i className="fas fa-edit" />
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            onClick={() =>
                                                this.openConfirmModal(
                                                    blog.id,
                                                    blog.name
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
            } else if (blogDetails.length == 0) {
                rows = (
                    <tbody>
                        <tr>
                            <td
                                colSpan="8"
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
                                            <th>Blog Name</th>
                                            <th>Blog Image</th>
                                            <th>Is Trending</th>
                                            <th>View</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    {rows}
                                </table>
                                <ConfirmDelete
                                    activeToaster={this.props.onActiveToster}
                                    blogId={this.state.blogId}
                                    blogName={this.state.blogName}
                                />
                                <Viewblog blogId={this.state.blogId} />
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
