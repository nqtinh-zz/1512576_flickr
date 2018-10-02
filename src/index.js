import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import { FontAwesomeIcon } from '../node_modules/@fortawesome/react-fontawesome';
import { faEye } from '../node_modules/@fortawesome/free-solid-svg-icons';



class Scroll extends React.Component 
{
    constructor(props){
		super(props);
		this.state = {
			imageList: [],
			hasMoreItems: true,
			curPage: 1,
		}
		this.loadItems = this.loadItems.bind(this);
	}	
  
    loadItems() {
        //Thay đổi api_key theo ngày
        const api = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=210faf4ab82b8d0fdd0e13dc09080003&extras=owner_name%2C+url_n%2C+views&per_page=20&page=${this.state.curPage}&format=json&nojsoncallback=1`;
        axios.get(api)
      .then(async(res) => {
        let imageList = this.state.imageList;
        await res.data.photos.photo.map(image => imageList.push(image));
        if(this.state.imageList.length<500){
            const curPage = this.state.curPage+1;
            this.setState({ imageList, curPage });
        } else {
            this.setState({ hasMoreItems: false });
        }
        console.log(imageList)
      })
    }
  
    render() {
        const loader = <div className="loader">Loading ...</div>;
        return (
			<InfiniteScroll
				pageStart={0}
                loadMore={this.loadItems}
                hasMore={this.state.hasMoreItems}
                loader={loader}>

				<div id="mygallery">
					{this.state.imageList.map((image, i) => 
          <Item key={i} link={image.url_n} owner={image.ownername} title={image.title} view={image.views}/>  
          )}
				</div>
			</InfiniteScroll>
            
		);
    }
}

class Item extends React.Component {
	render() {
		return (
        <a className="container-img" href={this.props.link}>
          <img src={this.props.link} alt="" />
          <Info owner={this.props.owner} title={this.props.title} view={this.props.view} />
        </a>
		);
	}
}

class Info extends React.Component {
	render() {
		return (
			<div class="info">
				<div className="left">
					<div className="text-title">{this.props.title}</div>
					<div className="text-owner">by {this.props.owner}</div>
				</div>
				<div className="right">
					<FontAwesomeIcon icon={faEye} />&nbsp;{this.props.view}
				</div>
			</div>
		)
	}
}

class App extends React.Component {
    render() {
      return (
        <div className="App">
          <div className="App-nav">
            <div className="App-nav-content">
              <div><span></span></div>
              <div><a href="/" className="logo">MY COLLECTION</a></div>
              <ul className="menu-nav">
                <li><a href="/">You</a></li>
                <li><a href="/">Explore</a></li>
                <li><a href="/">Create</a></li>
                <li><a href="/">Get Pro</a></li>
              </ul>
              <ul className="tool-nav">
                <li><a href="/">Login</a></li>
                <li><a href="/">Sign up</a></li>
              </ul>
            </div>
          </div>
          <div >
            <div className="title"><h2>Explore</h2></div>
            <Scroll />
          </div>
        </div>
      );
    }
  }
ReactDOM.render(
    <App />
, document.getElementById('root'));
