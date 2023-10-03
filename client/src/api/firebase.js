// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDocs, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { arrayUnion, Timestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()

export const storage = getStorage();

export const db = getFirestore();

//register with email and pasword
export const register = async (email, password, file, displayName, navigation, setErr, setLoading) => {
  setLoading(true)
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const date = new Date().getTime();
    const storageRef = ref(storage, `${displayName + date}`);
    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL
          })
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName: displayName,
            email: email,
            photoURL: downloadURL
          });
          await setDoc(doc(db, "userChats", res.user.uid), {
          });
          navigation('/')
        } catch (error) {
          console.log(error)
          setErr(true)
          setLoading(false)
        }

      })
    })
    setLoading(false)
  } catch (error) {
    console.log(error)
    setErr(true)
    setLoading(false)
  }
}

//login with email password

export const loginUser = async (email, password, setErr, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate('/')
  } catch (error) {
    setErr(true)
  }
}



export const LogoutUser = () => {
  signOut(auth)
}

// handle search

export const HandleSearch = async (username, setUser, setErr) => {
  const q = query(
    collection(db, "users"),
    where("displayName", "==", username)
  );

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
  } catch (err) {
    setErr(true);
  }
}

//handle select
export const HandleSelect = async (user, currentUser, setUser, setUsername) => {
  //check whether the group(chats in firestore) exists, if not create
  const combinedId =
    currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
  try {
    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
      //create a chat in chats collection
      await setDoc(doc(db, "chats", combinedId), { messages: [] });

      //create user chats
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }
  } catch (err) { }

  setUser(null);
  setUsername("")
}


// get the chats realtime


export const getChats = (currentUser, setChats) => {
  const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
    setChats(doc.data())
  });
}


//handleSend messsage

export const HandleSend = async (img, text, setText, setImg, data, currentUser) => {

  if (img) {
    const storageRef = ref(storage, uuid());
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on(
      (error) => {
        //TODO:Handle Error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text: text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      }
    );
  }
  else {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

  }
  await updateDoc(doc(db, "userChats", currentUser.uid), {
    [data.chatId + ".lastMessage"]: {
      text,
    },
    [data.chatId + ".date"]: serverTimestamp(),
  });

  await updateDoc(doc(db, "userChats", data.user.uid), {
    [data.chatId + ".lastMessage"]: {
      text,
    },
    [data.chatId + ".date"]: serverTimestamp(),
  });

  setText("");
  setImg(null);

}
