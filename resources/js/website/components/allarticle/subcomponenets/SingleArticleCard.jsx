import React, { Component } from "react";
import Slider from "react-slick";
import "../../../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../../../node_modules/slick-carousel/slick/slick-theme.css";

export default class SingleArticleCard extends Component {
    render() {
        return (
            <a
                href={`/article/${this.props.blogsData.id}`}
                className="article__card"
            >
                <div className="card h-auto">
                    <img
                        className="card-img-top"
                        src={this.props.blogsData.image}
                        alt=""
                    />
                    <div className="card-body">
                        <h6 className="font-weight-bold">
                            {this.props.blogsData.name}
                        </h6>
                        <p
                            className="article__small__description"
                            dangerouslySetInnerHTML={{
                                __html: `${this.props.blogsData.content
                                    .substring(0, 110)
                                    .toString() + "..."}`
                            }}
                        ></p>
                    </div>
                </div>
            </a>
        );
    }
}
