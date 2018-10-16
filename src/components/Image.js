import React from 'react';
import '../App.css';
import Info from './Info.js';
import { Link } from "react-router-dom";

class Image extends React.Component {
    render() {
        return (
            <Link to={`/photo//${this.props.server}/${this.props.secret}/${this.props.id}`} className="container-img">
            <a className="container-img" href={this.props.link}>
	          <img src={this.props.link} alt="" />
	          <Info owner={this.props.owner} title={this.props.title} view={this.props.view} />
	        </a>
            
            </Link>
        );
    }
}

export default Image;