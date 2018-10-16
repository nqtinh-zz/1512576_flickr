import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import '../App.css';
import Image from './Image.js';
import { 
    Link,} from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
   } from 'reactstrap';
  import 'bootstrap/dist/css/bootstrap.css';
import Photo from './Photo';
//import { Switch, Route } from 'react-router-dom'

class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iList: [],
            hasMoreItems: true,
            curPage: 1,
        }
        this.loadItems = this.loadItems.bind(this);
    }
    loadItems() {
        //Thay đổi api_key theo ngày
        const api = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=7f3bf9e919ffdb73d9c1bc1b5b641411&extras=owner_name%2C+url_n%2C+views&per_page=20&page=${this.state.curPage}&format=json&nojsoncallback=1`;
        axios.get(api)
            .then((res) => {
                let iList = this.state.iList;
                res.data.photos.photo.map(image => iList.push(image));

                const curPage = this.state.curPage + 1;
                this.setState({ iList, curPage });

                //console.log(iList)
            })
    }
    render() {
        const loader = <div className="loader">Loading ...</div>;
        return (
            <div className="App">
                <Navbar className="bg-dark " light expand="md">
                    <NavbarBrand className="text-white" href="/">1512576_Myflickr</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className="text-white" href="/">Explore</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="text-white" ><Link to="/tag">Tag</Link></NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                <div className="title"><h2>Explore</h2></div>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadItems}
                    hasMore={this.state.hasMoreItems}
                    loader={loader}>

                    <div id="mygallery">
                        {
                            this.state.iList.map((image, i) =>
                            <Image key={i} id={image.id} secret={image.secret} server={image.server} link={image.url_n} owner={image.ownername} title={image.title} view={image.views} />
                        )}
                        

                    </div>
                </InfiniteScroll>
            </div>

        );
    }
}
export default Explore;