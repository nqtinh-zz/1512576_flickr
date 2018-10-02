import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';



class InfiScroll extends React.Component 
{
    constructor(props){
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
        const api = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=210faf4ab82b8d0fdd0e13dc09080003&extras=owner_name%2C+url_n%2C+views&per_page=20&page=${this.state.curPage}&format=json&nojsoncallback=1`;
        axios.get(api)
      .then(async(res) => {
        let iList = this.state.iList;
        res.data.photos.photo.map(image => iList.push(image));
   
            const curPage = this.state.curPage+1;
            this.setState({ iList, curPage });
        
        console.log(iList)
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
					{this.state.iList.map((image, i) => 
          <Image key={i} link={image.url_n} owner={image.ownername} title={image.title} view={image.views}/>  
          )}
				</div>
			</InfiniteScroll>
            
		);
    }
}

class Image extends React.Component {
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
					View:&nbsp;{this.props.view}
				</div>
			</div>
		)
	}
}

class App extends React.Component {
    render() {
      return (
        <div className="App">
          <div className="nav">
            <div className="nav-content">

              <ul className="menu-nav">
                <li><a href="/"> 1512576_Mycollection</a></li>   
              </ul>
            </div>
          </div>
          <div >
            <div className="title"><h2>Explore</h2></div>
            <InfiScroll />
          </div>
        </div>
      );
    }
  }
ReactDOM.render(
    <App />
, document.getElementById('root'));
