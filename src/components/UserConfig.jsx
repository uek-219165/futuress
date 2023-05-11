import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Spinner from "./Spinner";

const UserConfig = (props) => {
  const [userPic, setUserPic] = useState();
  const [username, setUsername] = useState();
  const [loader, setLoader] = useState(false);
  const [imgSrc, setImgSrc] = useState();

  const handleCapture = async (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const t_file = target.files[0];
        const newUrl = URL.createObjectURL(t_file);
        setImgSrc(newUrl);
        setUserPic(t_file);
      }
    }
  };

  const setUserConfig = async () => {
    if (props.isNewUser) return await setNewUser();
    else return await editCurrentUser();
  };

  const setNewUser = async () => {
    setLoader(true);

    const storageRef = ref(
      storage,
      `images/${props.userUid}/${userPic.name + v4()}`
    );

    const imageUrl = await uploadBytes(storageRef, userPic).then(
      async (snapshot) => {
        const url = await getDownloadURL(snapshot.ref).then((downloadURL) => {
          return downloadURL.toString();
        });
        return url;
      }
    );

    await setDoc(doc(db, "users", props.userUid), {
      uid: props.userUid,
      username: username,
      url: imageUrl,
      points: 0,
    });

    setLoader(false);
    props.setShowConfig(false);
  };

  const editCurrentUser = async () => {
    setLoader(true);

    const userRef = doc(db, "users", props.userUid);
    const storageRef = ref(
      storage,
      `images/${props.userUid}/${userPic.name + v4()}`
    );

    const imageUrl = await uploadBytes(storageRef, userPic).then(
      async (snapshot) => {
        const url = await getDownloadURL(snapshot.ref).then((downloadURL) => {
          return downloadURL.toString();
        });
        return url;
      }
    );

    await updateDoc(userRef, {
      username: username,
      url: imageUrl,
    });

    setLoader(false);
    props.setShowConfig(false);
  };

  return (
    <div className="modal">
      <div className="card">
        <h1>Configure your account</h1>
        <div className="center">
          {imgSrc && <img className="image neon" src={imgSrc} alt="" />}
          <p className="username">{username}</p>
        </div>
        <form action="" autoComplete="off">
          <div>
            <label htmlFor="picture">User Picture</label>
            <input
              accept="image/*"
              id="icon-button-file"
              className="form-control"
              type="file"
              name="picture"
              onChange={(e) => handleCapture(e.target)}
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <br />
          <div>
            <div className="btns-group">
              <button
                className="btn btn-primary"
                type="button"
                onClick={setUserConfig}
              >
                {loader ? <Spinner /> : "Finish"}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => props.setShowConfig(false)}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserConfig;
