import { auth } from './firebase';
import { NOTIF } from '../utilities/constants';
import Pubsub from '../utilities/pubsub';

var AuthService = {};

(function(obj) {
  // calls firebase signin function
  obj.sendSigninRequest = (params) => {
    return new Promise((resolve, reject) => {
      auth.signInWithEmailAndPassword(params.email, params.password).then(user => {
        resolve(user.uid); // should be falling on deaf ears because onAuthStateChanged() gets called
      }).catch(error => {
        reject(error.code);
      });
    });
  }

  // calls firebase create user function
  obj.sendSignupRequest = (params) => {
    return new Promise((resolve, reject) => {
      auth.createUserWithEmailAndPassword(params.email, params.password).then(user => {
        resolve(user.uid); // should be falling on deaf ears because onAuthStateChanged() gets called
        // @TODO create user in MySQL
      }).catch(error => {
        reject(error.code);
      });
    });
  }

  // calls firebase signout function
  obj.signout = () => {
    console.log(auth);
    auth.signOut();
  }
})(AuthService);

auth.onAuthStateChanged(user => {
  // @TODO fetch user info from MySQL
  if (user) {
    console.log(user);
    console.log('user signed in');
    Pubsub.publish(NOTIF.SIGN_IN, null);
  } else {
    console.log('user signed out');
    Pubsub.publish(NOTIF.SIGN_OUT, null);
  }
});

export default AuthService;