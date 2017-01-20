import React from 'react';

export default class Gallery extends React.Component {
    constructor() {
        super();

        this.state = {
            view: {
                type: "list"
            }
        };
    }

    viewImage(image_id) {
        this.setState({
            view: {
                type: "single",
                id: image_id
            }
        });
    }

    closeImage() {
        this.setState({
            view: {
                type: "list"
            }
        });
    }

    render() {
        if (this.state.view.type == "list") {
            return (
                <div>
                    {this.props.photos.map((photo, i) => {
                        return (
                            <div className="responsive-thumbnail" key={i}>
                                <div>
                                    <a href="javascript:" onClick={this.viewImage.bind(this, i)}>
                                        <img src={photo.thumbnail} style={{width: "100%", height: "auto", boxSizing: "border-box"}} />
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                    <div style={{display: "table", clear: "both"}}></div>
                </div>
            );
        } else if (this.state.view.type == "single") {
            var prevImage = null,
                nextImage = null;

            if (this.state.view.id != 0) {
                prevImage = this.state.view.id - 1;
            }

            if (this.state.view.id != (this.props.photos.length - 1)) {
                nextImage = this.state.view.id + 1;
            }

            var photo = this.props.photos[this.state.view.id];
            var style = {
                height: "100%",
                width: "100%",
                maxWidth: 1400,
                margin: "auto"
            };

            if (this.props.fullscreen) {
                style.position = 'fixed';
                style.top = 0;
                style.left = 0;
            }

            return (
                <div style={style}>
                    <div className="responsive-photo">
                        <img style={{width: "100%"}} src={photo.fullsize} />
                    </div>
                    <div className="responsive-description">
                        <a style={{float: "right"}} href="javascript:" onClick={this.closeImage.bind(this)}>Back to gallery</a>
                        <h3>{photo.name}</h3>
                        <p>{photo.description}</p>
                        {prevImage != null ? <a href="javascript:" onClick={this.viewImage.bind(this, prevImage)}>&lt; Prev</a> : <a disabled>&lt; Prev</a>}
                        &nbsp;
                        {nextImage != null ? <a href="javascript:" onClick={this.viewImage.bind(this, nextImage)}>Next &gt;</a> : <a disabled>Next &gt;</a>}
                    </div>
                    <div style={{display: "table", clear: "both"}}></div>
                </div>
            );
        }
    }
}
