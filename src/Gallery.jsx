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
                <div className="react-gallery-photo" style={style}>
                    <a className="back" href="javascript:" onClick={this.closeImage.bind(this)}>&lt; Back to gallery</a>
                    <div className="react-gallery-photo-img responsive-photo">
                        <a href="javascript:" onClick={this.viewImage.bind(this, nextImage)}>
                            <img style={{width: "100%"}} src={photo.fullsize} />
                        </a>
                    </div>
                    <div className="react-gallery-photo-description responsive-description">
                        <h3 className="title">{photo.name}</h3>
                        <p className="description">{photo.description}</p>
                        {prevImage != null ? <a className="prev" href="javascript:" onClick={this.viewImage.bind(this, prevImage)}>&lt; Prev</a> : <a className="prev" disabled>&lt; Prev</a>}
                        &nbsp;
                        {nextImage != null ? <a className="next" href="javascript:" onClick={this.viewImage.bind(this, nextImage)}>Next &gt;</a> : <a className="next" disabled>Next &gt;</a>}
                    </div>
                    <div style={{display: "table", clear: "both"}}></div>
                </div>
            );
        }
    }
}
