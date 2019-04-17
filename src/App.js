import React, { Component } from 'react';
import './App.css';
import blogPosts from './BlogPosts.js'
import loading from './loading.png'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>My Blog</h1>
        </header>
        <div className='main'>
        <main className="App-main"> 
          <BlogPosts/>
        </main>
        <nav className="App-nav">
          <AjaxCalls subreddit='olkb'/>
        </nav>
        </div>
        <footer className='App-footer'>
          <h3>Page by Solvi Magnusson</h3>
        </footer>
      </div>
    );
  }
}

class BlogPosts extends Component{
  constructor(props){
    super(props)
    this.state = {click: false}
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.setState(state => ({
      click : !state.click
    }));
  }

  render(){
    return(
      <div className='Blog-posts'>
        <Post post={blogPosts['1']} click={this.state.click} onClick={this.handleClick} />
        <Post post={blogPosts['2']} click={this.state.click} onClick={this.handleClick} />
        <Post post={blogPosts['3']} click={this.state.click} onClick={this.handleClick} />
      </div>
      
    );
  }
}
class Post extends Component{
  constructor(props){
    super(props)
    this.post = props.post
    this.state = {click: false}
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.setState(state => ({
      click : !state.click
    }));
  }

  render(){
    return(
      <div onClick={this.handleClick}>
      {
        this.state.click ? <Large post={this.post}/> : <Small post={this.post}/> 
      }
      </div> 
  );
  }
    
}

class Small extends Component{
  constructor(props){
    super(props)
    this.post = props.post
  }
  render(){
    return(
      <div className='blogPost'>
        <img className='img-small' src={this.post.image}></img>
        <div className='blogArticle'>
          <h1>{this.post.title}</h1>
          <h3>{this.post.date}</h3>
          <h3>{this.post.summary}</h3>
        </div>
      </div>
    );
  }
}
class Large extends Component{
  constructor(props){
    super(props)
    this.post = props.post
  }
  render(){
    return(
      <div className='blogPost'>
        <img className='img-large' src={this.post.image}></img>
        <div className='blogArticle'>
          <h1>{this.post.title}</h1>
          <h3>{this.post.date}</h3>
          {this.post.blody}
        </div>
      </div>
    );
  }
}


class AjaxCalls extends Component{
  constructor(props){
    super(props)
    this.state = {
      error:null,
      isLoaded:false,
      data : []
    }
  }

  async componentDidMount() {
    var url = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=d4bf3cbc441d4e858c032c789ee88e33';
    try{
     setInterval(async () =>{
      var req = new Request(url);
      fetch(req)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              data : result.articles
            })
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            })
          }
        )
     }, 5000)
    }catch(e){
      console.log(e);
    }
    
  }

  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      // return <div>Loading...</div>;
      return <img src={loading} className='App-logo'></img>
    } else {
      return (
        <div className='headlines'>
          <ul>
          {data.map(item => (
            <li key={item.title}>
              <a href={item.url}>{item.title}</a>
               
            </li>
          ))}
        </ul>
        </div>
      );
    }
  }
}

export default App;
