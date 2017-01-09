import React from 'react';
import ReactDOM from 'react-dom';

import Gallery from './Gallery';


export function renderGallery(photos, fullscreen, dom_element) {
    ReactDOM.render(<Gallery photos={photos} fullscreen={fullscreen} />, dom_element);
}
