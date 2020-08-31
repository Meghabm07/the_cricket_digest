import React, { Component } from "react";
import { Helmet } from "react-helmet";
import DocumentMeta from "react-document-meta";

import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    PinterestIcon,
    TwitterIcon,
    WhatsappIcon
} from "react-share";

export default class ArticleContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogData: []
        };
        this.createMarkup = this.createMarkup.bind(this);
        this.getContent = this.getContent.bind(this);
    }

    componentDidMount() {
        this.getContent();
    }

    getContent() {
        const url = "/article/" + this.props.id + "/show";
        axios
            .get(url)
            .then(response => {
                this.setState({ blogData: response.data });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    createMarkup() {
        return {
            __html: this.state.blogData.content
        };
    }
    render() {
        const meta = {
            title: this.state.blogData.main_name,
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
                <Helmet>
                    <title>{this.state.blogData.main_name}</title>
                    <meta charset="utf-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="csrf_token" content="" />
                    <meta property="type" content="blog" />
                    <meta property="url" content={window.location.href} />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />

                    <meta name="_token" content="" />
                    <meta name="robots" content="noodp" />
                    <meta
                        property="title"
                        content={this.state.blogData.main_name}
                    />
                    <meta
                        property="image"
                        content={this.state.blogData.image}
                    />
                    <meta property="og:locale" content="en_US" />
                    <meta property="og:type" content="blog" />
                    <meta
                        property="og:title"
                        content={this.state.blogData.main_name}
                    />
                    <meta
                        property="og:image"
                        content={this.state.blogData.image}
                    />
                    <meta content="image/*" property="og:image:type" />
                    <meta property="og:url" content={window.location.href} />
                    <meta
                        property="og:site_name"
                        content="thecricketdigest.com"
                    />
                </Helmet>
                <div className="card single__article__content">
                    <div className="card-body">
                        <h4 className="single__article__title mb-0">
                            {this.state.blogData.main_name}
                        </h4>

                        <div dangerouslySetInnerHTML={this.createMarkup()} />
                        <br />

                        <div className="row">
                            <div className="col-12">
                                <h6 className="font-weight-bold">
                                    {" "}
                                    Share Now{" "}
                                </h6>
                            </div>
                            <div className="col-12">
                                <FacebookShareButton
                                    url={window.location.href}
                                    quote="link"
                                    title={this.state.blogData.main_name}
                                    media={this.state.blogData.image}
                                    className="pr-2"
                                >
                                    <FacebookIcon size={40} round />
                                </FacebookShareButton>

                                <WhatsappShareButton
                                    url={window.location.href}
                                    title={this.state.blogData.main_name}
                                    media={this.state.blogData.image}
                                    quote="link"
                                    className="pr-2"
                                >
                                    <WhatsappIcon size={40} round />
                                </WhatsappShareButton>

                                <EmailShareButton
                                    url={window.location.href}
                                    title={this.state.blogData.main_name}
                                    media={this.state.blogData.image}
                                    quote="link"
                                    className="pr-2"
                                >
                                    <EmailIcon size={40} round />
                                </EmailShareButton>

                                <LinkedinShareButton
                                    url={window.location.href}
                                    title={this.state.blogData.main_name}
                                    media={this.state.blogData.image}
                                    quote="link"
                                    className="pr-2"
                                >
                                    <LinkedinIcon size={40} round />
                                </LinkedinShareButton>

                                <TwitterShareButton
                                    url={window.location.href}
                                    title={this.state.blogData.main_name}
                                    media={this.state.blogData.image}
                                    quote="link"
                                    className="pr-2"
                                >
                                    <TwitterIcon size={40} round />
                                </TwitterShareButton>

                                <PinterestShareButton
                                    url={window.location.href}
                                    title={this.state.blogData.main_name}
                                    media={this.state.blogData.image}
                                    quote="link"
                                    className="pr-2"
                                >
                                    <PinterestIcon size={40} round />
                                </PinterestShareButton>
                            </div>
                        </div>
                    </div>
                </div>
            </DocumentMeta>
        );
    }
}
