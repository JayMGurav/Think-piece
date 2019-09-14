import React, { Component } from 'react';
import Authentication from './Authentication';
import {firestore, auth, createUserProfileDocument} from '../firebase';

import Posts from './Posts';
const {collectIdsAndData} = require("../utilities");

class Application extends Component {
  state = {
    user : null,
    posts: [],
    
  };

  unsubscribeFromFirestore = null;
  unsubscribeFromAuth = null;
  componentDidMount = async () => {
    this.unsubscribeFromFirestore = firestore.collection("posts").onSnapshot(snapShot => {
      const posts = snapShot.docs.map(collectIdsAndData);
      this.setState({posts})
    })
    
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const user = await createUserProfileDocument(userAuth);
      this.setState({user}); 
    })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  }

  render() {
    const { posts,user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication  user={user}/>
        <Posts posts={posts}  />
      </main>
    );
  }
}

export default Application;
