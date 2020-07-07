import React from 'react';
import './index.css'

const Picture = ({ url, title, thumbnail }) => (
    <React.Fragment>
        <a className="thumbnail wrapper" href={url} target="_blank" rel="noopener noreferrer">
            <img className="thumbnail-img" src={thumbnail} alt={thumbnail} />
            <div className="thumbnail-overlay"><span className="thumbnail-text">{title}</span>
            </div>
        </a>
    </React.Fragment>
);

export default Picture;