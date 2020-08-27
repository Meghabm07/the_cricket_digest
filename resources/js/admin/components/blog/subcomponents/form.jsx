import React, { Component } from "react";
import axios from "axios";
import TextEditor from "../../../utilities/texteditor";
import "../../../../../../node_modules/react-quill/dist/quill.snow.css";
import Select from "react-select";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            name: "",
            mainName: "",
            image: "",
            content: "",
            category: "",
            errors: "",
            formTitle: "",
            editData: [],
            buttonName: "",
            viewRaw: false
        };
        this.setValue = this.setValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getEditData = this.getEditData.bind(this);
        this.getCategoryList = this.getCategoryList.bind(this);
        this.setContent = this.setContent.bind(this);
        this.toggleViewButton = this.toggleViewButton.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.setRawContent = this.setRawContent.bind(this);
    }

    async componentDidMount() {
        await this.getCategoryList();

        if (this.props.blogId != "" && this.props.editFormActive) {
            this.setState({ formTitle: "Edit blog", buttonName: "Update" });
            this.getEditData();
        } else {
            this.setState({ formTitle: "New blog", buttonName: "Submit" });
        }
    }

    setContent(content) {
        this.setState({
            content: content
        });
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
        const url = "/admin/blog/" + this.props.blogId;

        axios
            .get(url)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    content: response.data.content,
                    mainName: response.data.main_name,
                    image: response.data.image,
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
        if (this.props.blogId != "" && this.props.editFormActive) {
            url = "/admin/blog/" + this.props.blogId;
            formData.append("method", "put");
        } else {
            formData.append("method", "post");
            url = "/admin/blog";
        }

        let config = {
            headers: { "content-type": "multipart/form-data" }
        };

        formData.append("name", this.state.name);

        formData.append("mainName", this.state.mainName);

        formData.append("content", this.state.content);

        formData.append("image", this.state.image);

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
        if (event.target.name != "image") {
            this.setState({ [event.target.name]: event.target.value });
        } else if ((event.target.name = "image")) {
            this.setState({ image: event.target.files[0] });
        }
    }

    setRawContent(event) {
        this.setState({ content: event.target.value });
    }

    toggleViewButton() {
        if (this.state.viewRaw) {
            this.setState({ viewRaw: false });
        } else {
            this.setState({ viewRaw: true });
        }
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
                            <label htmlFor="exampleInputName">Name</label>
                            <input
                                onChange={this.setValue}
                                type="text"
                                name="name"
                                value={this.state.name}
                                className="form-control"
                                id="exampleInputName"
                                placeholder="Enter Name"
                            />
                            {this.state.errors ? (
                                <span className="text-danger">
                                    {this.state.errors.name}
                                </span>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputName">
                                Article Details Name
                            </label>
                            <input
                                onChange={this.setValue}
                                type="text"
                                name="mainName"
                                value={this.state.mainName}
                                className="form-control"
                                id="exampleInputName"
                                placeholder="Enter Name"
                            />
                            {this.state.errors ? (
                                <span className="text-danger">
                                    {this.state.errors.mainName}
                                </span>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputContent">Content</label>
                            <TextEditor
                                value={this.state.content}
                                onChangeTextEditor={this.setContent}
                            ></TextEditor>
                            {this.state.errors ? (
                                <span className="text-danger">
                                    {this.state.errors.content}
                                </span>
                            ) : null}
                        </div>
                        <div class="form-group">
                            <label htmlFor="exampleInputFile">
                                Raw Html Content
                            </label>
                            <textarea
                                class="form-control"
                                name=""
                                defaultValue={this.state.content}
                                onChange={this.setRawContent}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputFile">Image</label>
                            <div className="input-group">
                                <input
                                    name="image"
                                    onChange={this.setValue}
                                    type="file"
                                    className="form-control"
                                    id="exampleInputFile"
                                />
                            </div>
                            {this.state.errors ? (
                                <span className="text-danger">
                                    {this.state.errors.image}
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
