import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './App.css';
import firebase from './Firebase';
const db = firebase.firestore();

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            logo: "",
            header: "",
            items: []
        };
    }

  componentDidMount() {
        var items = [];
      var headerRef = db.collection("header").doc("myHeader");
      headerRef.get()
          .then((doc) => {
              this.setState({logo: doc.data().headerLogo});
              document.getElementById("logo").style.visibility = "visible";
              this.setState({header: doc.data().headerText});
          })
          .catch((error) => {
              console.log(error);
          });
      var pagesRef = db.collection("pages");
      pagesRef.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
              items.push(doc.data());
          })
          this.setState({
              items: items
          });
      })

  }

  render(){


    return (
        <div className="App">
          <header className="App-header">
            <img src={this.state.logo} className="App-logo" id="logo" alt="logo" />
            <h1 className="App-text">{this.state.header}</h1>

          </header>
            <div className="App-nav" id="navbar">
                {this.state.items.map(item => (
                    <div>
                        <a className="App-nav-item" to={"/"+item.id}>{item.title}</a>
                    </div>
                ))}
            </div>
        </div>
    );
  }

}

export default App;
