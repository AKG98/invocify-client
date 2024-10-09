import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import {auth} from "../firebase"

export async function signinWithGoogle() {
  return new Promise((resolve, reject) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider).then(async (result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
}