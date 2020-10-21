import React, {Component} from 'react';
import SignInOut from './Components/SignInOut/SignInOut';
import SearchBox from './Components/SearchBox/SearchBox';
import Image from './Components/Image/Image';
import Submit from './Components/Submit/Submit';
import SignInForm from './Components/SignInForm/SignInForm';
import Register from './Components/Register/Register';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';




const particleStyle ={
                  particles: {
                    shape: {
                      stroke: {
                        width: 8
                      }
                    },
                    number: {
                      value: 150,
                      density: {
                        enable: true,
                        value_area: 700
                      }
                    }
                  }
}

const initialState = {
                        searchField: '',
                        box: [],
                        route: 'signin',
                        user: {
                          id: '',
                          name: '',
                          entries: 0
                        }
                      }

const initialUser = {
  id: '',
  name: '',
  entries: 0
}           
class App extends Component {
  constructor(){
    super()
    this.state = initialState;
  }
  theUser = (user) => {
    Object.assign(this.state.user, {id: user.id,name: user.name, entries: user.entries });
  }
  faceIndex = (faces, i,width,height) => {
    return {
      leftCol: faces[i].left_col * width,
      width: (faces[i].right_col * width) - (faces[i].left_col * width),  
      topRow: faces[i].top_row * height,
      height: (faces[i].bottom_row * height) - (faces[i].top_row * height)
    }
  }
  faceLocation = (data) => {
    const image = document.getElementById('image');
    const width = Number(image.width);
    const height = Number(image.height);
    const faces = data.map((data, i) => {
      return data.region_info.bounding_box;
    })
    const Arr = [];
    for( let i = 0; i < faces.length ; i++){
      Arr.push(this.faceIndex(faces, i,width,height));  
    }
    this.setState({box: Arr});
  }
  onSubmit = () =>{ 
    fetch('https://cryptic-cove-08776.herokuapp.com/imgurl',{
      method: 'post',
      headers: {'Content-type': 'Application/json'},
      body: JSON.stringify({
        imgurl: this.state.searchField
      })
    })
    .then(response => response.json())
    .then(data => {
      if(Object.keys(data.outputs[0].data).length > 0 ){
          this.faceLocation(data.outputs[0].data.regions);
          fetch('https://cryptic-cove-08776.herokuapp.com/image', {
              method: 'put',
              headers: {'Content-type': 'Application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(entry => {
              Object.assign(this.state.user, {entries: entry})
              this.setState(this.state);
            })
            .catch(err => {
              console.log(err);
            })
        }
        else{
          alert("No Face detected!!!");
          this.setState({box: []});
        }
       })
       .catch((err) => { console.log(err); });
 }
  onInputChange = (event) => { 
    this.setState({searchField: event.target.value});
  }
  Changeroute = (value ) => {
    this.setState({route: value});
    if(value === 'signin'){
      Object.assign(this.state.user, initialUser);
      this.setState(initialState);
    }
    
  }
  
  render(){
    console.log("Render Run!");
    let route = this.state.route;
    switch(route){
      case 'signin':
        return(
        <div>
          <Particles params={ particleStyle } className = 'particle'/>
          <SignInForm theUser = {this.theUser} Changeroute = {this.Changeroute} />
        </div>
        );
      case 'register':
        return(
        <div>
          <Particles params={ particleStyle } className = 'particle'/>
          <Register theUser = {this.theUser} Changeroute = {this.Changeroute} />
        </div>
        );
      default:
        return(
          <div className="App">
            <Particles params={ particleStyle } className = 'particle'/>
            <div className = 'Sign'>
              <SignInOut Changeroute = {this.Changeroute} />
            </div>
            <h1 id = 'h1' >Face Detection</h1>
            <Rank user = {this.state.user} />
            <div className = 'div'>
              <div className = 'mainDiv'>
                  <div className = 'innerDiv'>
                    <SearchBox onInputChange = { this.onInputChange } />
                    <Submit onSubmit = {this.onSubmit} />
                  </div>
              </div>
                <Image box = {this.state.box} searchField = {this.state.searchField}/>
            </div> 
          </div>
        );
    }
    
  }
}

export default App;
