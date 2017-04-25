import * as firebase from "firebase";
import { config } from './config.js';

firebase.initializeApp(config);

export function getFirebase() {
  return firebase;
}