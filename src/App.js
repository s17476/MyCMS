import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
              items.push([doc.id, doc.data()]);
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
                        <a className="App-nav-item" onClick={ async () => {

                            //image CSS
                            let imgWidth, imgHeight;
                            await db.collection("pages")
                                .doc(item[0])
                                .collection("style")
                                .doc("image")
                                .get()
                                .then((doc) => {
                                    imgWidth = doc.data().width;
                                    imgHeight = doc.data().height;
                                    console.log(imgHeight, imgWidth)
                                }).catch((error) => {
                                console.log(error);
                            });

                            //build
                            ReactDOM.render(
                                <div className="App-page" id="Page">
                                    <h1>{item[1].title}</h1>
                                    <img
                                        src={item[1].image}
                                        id="img"
                                        alt=""
                                        style={{
                                            width: imgWidth,
                                            height: imgHeight
                                        }}
                                    />
                                </div>
                                ,document.getElementById("Body"));
                            console.log("iiiiiiiiiiddddddddddd", item[0]);


                        }}>{item[1].title}</a>
                    </div>
                ))}
            </div>
            <div className="App-body" id="Body"></div>
        </div>
    );
  }

}

export default App;
