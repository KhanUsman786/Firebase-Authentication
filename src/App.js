import React,{Component} from 'react'
import './App.css';
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

firebase.initializeApp({
  apiKey: "add your api key",
  authDomain: "add your auh domain"
})


class App extends Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div className="signbox">Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1><span className='welcome'>Welcome</span>{firebase.auth().currentUser.displayName}</h1>
            <img
              alt="profile picture"
              src={firebase.auth().currentUser.photoURL}
            />
            <p>Name : <span className='welcome'>{firebase.auth().currentUser.displayName}</span></p>
            <p>Email : <span className='welcome'>{firebase.auth().currentUser.email}</span></p>
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    )
  }
}

export default App
