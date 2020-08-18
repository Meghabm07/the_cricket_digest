import React, { Component } from "react";
import axios from "axios";
import "../../../../../../node_modules/react-quill/dist/quill.snow.css";
import Select from "react-select";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            name: "",
            video_url: "",
            category: "",
            errors: "",
            formTitle: "",
            editData: [],
            buttonName: ""
        };
        this.setValue = this.setValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getEditData = this.getEditData.bind(this);
        this.getCategoryList = this.getCategoryList.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
    }

    async componentDidMount() {
        await this.getCategoryList();

        if (this.props.videoId != "" && this.props.editFormActive) {
            this.setState({ formTitle: "Edit video", buttonName: "Update" });
            this.getEditData();
        } else {
            this.setState({ formTitle: "New video", buttonName: "Submit" });
        }
    }

    getCategoryList() {
        const url = "/admin/blog/category/list";

        axios
            .get(url)
            .then(response => {
                this.setState({
                    categoryList: response.data
                });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    getEditData() {
        const url = "/admin/video/" + this.props.videoId;

        axios
            .get(url)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    video_url: response.data.video_url,
                    category: response.data.category
                });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    onSubmit(event) {
        event.preventDefault();
        let formData = new FormData();
        let url;
        if (this.props.videoId != "" && this.props.editFormActive) {
            url = "/admin/video/" + this.props.videoId;
            formData.append("method", "put");
        } else {
            formData.append("method", "post");
            url = "/admin/video";
        }

        let config = {
            headers: { "url-type": "multipart/form-data" }
        };

        formData.append("name", this.state.name);

        formData.append("video_url", this.state.video_url);

        formData.append("category", this.state.category.value);

        axios
            .post(url, formData, config)
            .then(response => {
                this.props.onActiveToster({
                    message: response.data.message,
                    status: "success"
                });
                this.props.closeForm();
            })
            .catch(error => {
                if (error.response.status) {
                    if (error.response.status == 422) {
                        this.props.onActiveToster({
                            message: error.response.data.message,
                            status: "error"
                        });

                        this.setState({ errors: error.response.data.errors });
                    }
                }
            });
    }

    setValue(event) {
        event.persist();
        this.setState({ [event.target.name]: event.target.value });
    }

    selectCategory(selectedOption) {
        this.setState({ category: selectedOption });
    }

    render() {
        return (
            <div className="card card-secondary">
                <div className="card-header">
                    <h3 className="card-title">{this.state.formTitle}</h3>
                </div>
                <form>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Category</label>
                            <Select
                                value={this.state.category}
                                onChange={this.selectCategory}
                                options={this.state.categoryList}
                            />
                            {this.state.errors ? (
                                <span className="text-danger">
                                    {this.state.errors.category}
                                </span>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                onChange={this.setValue}
                                type="text"
                                name="name"
                                value={this.state.name}
                                className="form-control"
                                placeholder="Enter Name"
                            />
                            {this.state.errors ? (
                                <span className="text-danger">
                                    {this.state.errors.name}
                                </span>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label>Video Url</label>
                            <input
                                onChange={this.setValue}
                                type="text"
                                name="video_url"
                                value={this.state.video_url}
                                className="form-control"
                                placeholder="Enter Video Url"
                            />
                            {this.state.errors ? (
                                <span className="text-danger">
                                    {this.state.errors.video_url}
                                </span>
                            ) : null}
                        </div>
                    </div>

                    <div className="card-footer text-right">
                        <button
                            type="button"
                            onClick={this.onSubmit}
                            className="btn btn-primary"
                        >
                            {this.state.buttonName}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Form;
