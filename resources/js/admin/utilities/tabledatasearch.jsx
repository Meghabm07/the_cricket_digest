import React, { Component } from "react";

export default class tabledatasearch extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-3 col-sm-3">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            onKeyUp={() => this.props.onSearch(event)}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">
                                <i
                                    className="fa fa-search"
                                    aria-hidden="true"
                                />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-3">
                    <select
                        className="custom-select w-30"
                        onChange={() => this.props.onRowCountChange(event)}
                    >
                        <option value="10" defaultValue>
                            10
                        </option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                </div>
                <div className="col-md-6 col-sm-6 text-right">
                    <button
                        onClick={() => this.props.activeCreateForm(event)}
                        type="button"
                        className="btn btn-success btn-sm"
                    >
                        Add
                    </button>
                </div>
            </div>
        );
    }
}
