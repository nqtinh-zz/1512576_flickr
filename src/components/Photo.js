import React from 'react';
import axios from 'axios';
import {
    Form, Button
} from 'reactstrap';
class Photo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iPhoto: []
        };
    }

    onHandleSubmit = (event) => {
        event.preventDefault();
        
        var api=`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=33f0bda74e99d513d45befe63bdaf3cc&photo_id=${this.props.match.params.id}&secret=${this.props.match.params.server}&format=json&nojsoncallback=1`
        var img= `https://farm2.staticflickr.com/${this.props.match.params.server}/${this.props.match.params.id}_${this.props.match.params.secret}_n.jpg`
        console.log("dsadas");
        axios.get(api)
            .then((res) => {
                let iPhoto = this.state.iPhoto;
                res.data.photo.tags.tag.map(image => iPhoto.push(image));
                this.setState({ iPhoto });
                console.log(iPhoto);
            })
    }
    render() {


        return (
            // 
            <div className="App-main">
                <Form onSubmit={this.onHandleSubmit}>

                    <Button id="btn" type="submit" color="link">sadsa</Button>

                </Form>
                <div ><img src={ `https://farm2.staticflickr.com/${this.props.match.params.server}/${this.props.match.params.id}_${this.props.match.params.secret}_n.jpg` } /></div>
                

            </div>


            //https://api.flickr.com/services/rest/?method=flickr.tags.getListPhoto&api_key=19539947c0d64209e41f247168624053&photo_id=30244261387&format=json&nojsoncallback=1
        );
    }
}

export default Photo;