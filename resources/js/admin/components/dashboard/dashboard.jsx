import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReportCard from "./subcomponents/reportcards";

export default class Dashboard extends Component {
    render() {
        return (
            <div className="p-4">
                <section className="content">
                    <div className="container-fluid">
                        <ReportCard />
                    </div>
                </section>
            </div>
        );
    }
}

if (document.getElementById("dashboard")) {
    ReactDOM.render(<Dashboard />, document.getElementById("dashboard"));
}
