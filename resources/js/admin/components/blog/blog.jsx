import React, { Component } from "react";
import ReactDOM from "react-dom";
import Table from "./subcomponents/table";
import Form from "./subcomponents/form";
import { ToastContainer, toast } from "react-toastify";
import "../../../../../node_modules/react-toastify/dist/ReactToastify.css";
import { activeToaster } from "../../utilities/alerts";

export default class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formActive: false,
            formEditType: false,
            editFormActive: false,
            editBlogId: "",
            blogData: []
        };
        this.activateEditForm = this.activateEditForm.bind(this);
        this.activeAddBlogForm = this.activeAddBlogForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }

    activeAddBlogForm() {
        this.setState({ formActive: true });
    }

    closeForm() {
        this.setState({
            formActive: false,
            editBlogId: "",
            editFormActive: false
        });
    }

    activateEditForm(blogId) {
        this.setState({
            editFormActive: true,
            editBlogId: blogId,
            formActive: true
        });
    }

    render() {
        const isFormActive = this.state.formActive;
        let component;

        if (isFormActive) {
            component = (
                <Form
                    blogId={this.state.editBlogId}
                    editFormActive={this.state.editFormActive}
                    onActiveToster={activeToaster}
                    closeForm={this.closeForm}
                />
            );
        } else {
            component = (
                <Table
                    onActiveEditForm={this.activateEditForm}
                    onActiveToster={activeToaster}
                    onAddBlog={this.activeAddBlogForm}
                />
            );
        }

        return (
            <div>
                <ToastContainer
                    enableMultiContainer
                    containerId={"B"}
                    position={toast.POSITION.TOP_RIGHT}
                />
                <div className="row pt-5">
                    <div className="col-md-11 m-auto">{component}</div>
                </div>
            </div>
        );
    }
}

if (document.getElementById("blog")) {
    ReactDOM.render(<Blog />, document.getElementById("blog"));
}
