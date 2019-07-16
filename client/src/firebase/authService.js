import { auth } from './firebase';
import { NOTIF, API_POST, API_GET } from '../utilities/constants';
import Pubsub from '../utilities/pubsub';

import axios from 'axios';

var AuthService = {};

var User = {};

(function(obj) {
  // calls firebase signin function
  obj.sendSigninRequest = (params) => {
    return new Promise((resolve, reject) => {
      auth.signInWithEmailAndPassword(params.email, params.password).then(userData => {
        resolve(userData.uid); // should be falling on deaf ears because onAuthStateChanged() gets called
      }).catch(error => {
        reject(error.code);
      });
    });
  }

  // calls firebase create user function
  obj.sendSignupRequest = (params) => {
    return new Promise((resolve, reject) => {
      auth.createUserWithEmailAndPassword(params.email, params.password).then(userData => {
        let newUserObj = {
          uid: userData.user.uid,
          email: params.email,
          alias: params.username
        };
        axios.post(API_POST.create_user, newUserObj).then(response => {
          console.log(response);
          User.user_id = response.data.user_id;
        }).catch(error => {
          console.log(error);
        });
        resolve(userData.uid); // should be falling on deaf ears because onAuthStateChanged() gets called
      }).catch(error => {
        reject(error.code);
      });
    });
  }

  // calls firebase signout function
  obj.signout = () => {
    console.log(auth);
    auth.signOut();
    User = {};
  }
})(AuthService);

auth.onAuthStateChanged(userData => {
  // @TODO fetch user info from MySQL
  if (userData) {
    console.log(userData);
    console.log('user signed in');
    auth.currentUser.getIdToken(true).then(function(idToken) {
      axios({
        method: 'GET',
        url: API_GET.current_user,
        headers: {
          token: idToken
        }
      }).then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
      })
    }).catch(function(error) {
      // Handle error
    });
    Pubsub.publish(NOTIF.SIGN_IN, null);
  } else {
    console.log('user signed out');
    Pubsub.publish(NOTIF.SIGN_OUT, null);
  }
});

export default AuthService;

export {
  User
}