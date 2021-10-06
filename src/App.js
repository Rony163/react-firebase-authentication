import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import initializeAuthentication from './Firebase/firebase.init';
import { useState } from 'react';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const googleUser = result.user;
        const { displayName, email, photoURL } = googleUser;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);
      })
  }

  const handleEmailChange = e => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value);

  }

  const handleRegistration = (e) => {
    e.preventDefault();
    // console.log('Click')
  }

  return (
    <div className="mx-5">
      <form onSubmit={handleRegistration}>
        <h3 className="text-primary">Please Registar</h3>
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input onBlur={handleEmailChange} type="email" class="form-control" id="inputEmail3" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
          <div class="col-sm-10">
            <input onBlur={handlePasswordChange} type="password" class="form-control" id="inputPassword3" />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-10 offset-sm-2">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck1" />
              <label class="form-check-label" for="gridCheck1">
                Example checkbox
              </label>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Sign in</button>
      </form>
      <br /> <br /><br />
      <div>
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
        {
          user.name && <div>
            <h2>Name: {user.name}</h2>
            <p>Email:{user.email}</p>
            <img src={user.photo} alt="" />
          </div>
        }
      </div>
    </div>
  );
}

export default App;
