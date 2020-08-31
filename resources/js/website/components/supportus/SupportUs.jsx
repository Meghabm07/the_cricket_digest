import React, { Component } from "react";
import ReactDOM from "react-dom";
import DocumentMeta from "react-document-meta";

export default class SupportUs extends Component {
    render() {
        const meta = {
            title: "Support Us",
            canonical: window.location.url,
            meta: {
                charset: "utf-8",
                name: {
                    keywords: "cricket,cricket digest"
                }
            }
        };
        return (
            <DocumentMeta {...meta}>
                <div className="container-fluid">
                    <div className="row mt-3">
                        <div className="col-lg-9 col-md-8 col-sm-12">
                            <div className="row">
                                <div className="col-12">
                                    <h5 className="font-weight-bold category__title">
                                        Support Us
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DocumentMeta>
        );
    }
}

if (document.getElementById("supportus")) {
    const el = document.getElementById("supportus");
    const props = Object.assign({}, el.dataset);
    ReactDOM.render(
        <SupportUs {...props} />,
        document.getElementById("supportus")
    );
}
