import React, { Component } from "react";
import ReactDOM from "react-dom";
import Table from "./subcomponents/table";
import Form from "./subcomponents/form";
import { ToastContainer, toast } from "react-toastify";
import "../../../../../node_modules/react-toastify/dist/ReactToastify.css";
import { activeToaster } from "../../utilities/alerts";

export default class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formActive: false,
            formEditType: false,
            editFormActive: false,
            editVideoId: "",
            videoData: []
        };
        this.activateEditForm = this.activateEditForm.bind(this);
        this.activeAddVideoForm = this.activeAddVideoForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }

    activeAddVideoForm() {
        this.setState({ formActive: true });
    }

    closeForm() {
        this.setState({
            formActive: false,
            editVideoId: "",
            editFormActive: false
        });
    }

    activateEditForm(videoId) {
        this.setState({
            editFormActive: true,
            editVideoId: videoId,
            formActive: true
        });
    }

    render() {
        const isFormActive = this.state.formActive;
        let component;

        if (isFormActive) {
            component = (
                <Form
                    videoId={this.state.editVideoId}
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
                    onAddVideo={this.activeAddVideoForm}
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

if (document.getElementById("video")) {
    ReactDOM.render(<Video />, document.getElementById("video"));
}
