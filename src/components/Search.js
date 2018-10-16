import React from 'react';

import axios from 'axios';
import Image from './Image.js';
import {

    Link,
} from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, Form, Input, Button
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
//import App from "../App.js";
class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            iList: [],  
            textsearch: '',
        };
    }

    onHandleChange = (event) => {
        this.setState({
            iList:[],
            textsearch: event.target.value
        });
    }

    onHandleKeyPress = (event) => {
        if (event.key === 'Enter') {
            document.getElementById('btn').click();
        } else {
            return;
        }
    }

    onHandleSubmit = (event) => {
        event.preventDefault();
        var api = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7f3bf9e919ffdb73d9c1bc1b5b641411&tags=${this.state.textsearch}%2C&extras=url_n%2Cviews%2Cowner_name&format=json&nojsoncallback=1`;

        axios.get(api)
            .then((res) => {
                let iList = this.state.iList;
                res.data.photos.photo.map(image => iList.push(image));
                this.setState({ iList });
            })
        
        
    }

    render() {

        return (
            <div className="App">
                <Form onSubmit={this.onHandleSubmit}>
                    <Navbar className="bg-dark " light expand="md">
                        <NavbarBrand className="text-white" href="/">1512576_Myflickr</NavbarBrand>
                        <Nav className="ml-auto" navbar>
                            <Input name="textsearch" onChange={this.onHandleChange} onKeyPress={this.onHandleKeyPress}></Input>
                            <Button id="btn" type="submit" color="link"></Button>
                            <NavItem>
                                <NavLink className="text-white" href="/">Explore</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-white" ><Link to="/tag">Tag</Link></NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </Form>
                <div className="title"><h2>Explore</h2></div>


                <div id="mygallery">
                    {
                        this.state.iList.map((image, i) =>
                        <Image key={i} id={image.id} secret={image.secret} server={image.server} link={image.url_n} owner={image.ownername} title={image.title} view={image.views} />
                    )}
                </div>


            </div>
        );
    }
}
export default Search;