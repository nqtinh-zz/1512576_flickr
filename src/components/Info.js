import React from 'react';
import '../App.css';



class Info extends React.Component {
    render() {
        return (
            <div className="info">
              <div className="left">
                <div className="text-title">{this.props.title}</div>
                <div className="text-owner">by {this.props.owner}</div>
              </div>
              <div className="right">
                View:&nbsp;{this.props.view}
              </div>
            </div>
        )
    }
}
export default Info;