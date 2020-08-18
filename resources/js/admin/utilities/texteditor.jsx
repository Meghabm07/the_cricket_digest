import React, { Component } from "react";
import ReactQuill from "react-quill"; // ES6

// --------------------------------------Css Files-----------------------------------------

import "react-quill/dist/quill.snow.css"; // ES6

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { text: "" }; // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this);
    }

    // --------------------------------------React Life Cycles -----------------------------------------

    componentWillReceiveProps(newProps) {
        this.setState({ text: newProps.value });
    }

    // --------------------------------------User Defined functions-----------------------------------------

    handleChange(value) {
        this.setState({ text: value });
        this.props.onChangeTextEditor(value);
    }

    // --------------------------------------Render functions-----------------------------------------

    render() {
        var toolbar = [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction

            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["link", "image", "video", "formula"], // add's image support
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ["clean"] // remove formatting button
        ];

        var modules = {
            toolbar: toolbar
        };
        return (
            <ReactQuill
                modules={modules}
                value={this.state.text}
                onChange={this.handleChange}
            />
        );
    }
}

export default TextEditor;
