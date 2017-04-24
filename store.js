import * as firebase from "firebase";
import { config } from './config.js';

export function configureFirebase() {
  firebase.initializeApp(config);
  return firebase;
}

export function getFirebase() {
  return firebase;
}