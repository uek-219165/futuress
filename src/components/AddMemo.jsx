import { useState } from "react";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const AddMemo = (props) => {
  const notify = (text) => toast(text);
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState();
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState();

  const handleCapture = async (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const t_file = target.files[0];
        setFile(t_file);
      }
    }
  };

  const uploadMemo = async () => {
    setLoader(true);

    const storageRef = ref(
      storage,
      `videos/${props.userUid}/${file.name + v4()}`
    );
    const userRef = doc(db, "users", props.userUid);
    let points = (await getDoc(userRef)).data().points;

    try {
      const videoUrl = await uploadBytes(storageRef, file).then(
        async (snapshot) => {
          return await getDownloadURL(snapshot.ref).then((downloadURL) => {
            return downloadURL.toString();
          });
        }
      );

      await setDoc(doc(db, "memos", v4()), {
        uid: props.userUid,
        title: title,
        url: videoUrl,
        date: date,
      });

      await updateDoc(userRef, {
        points: ++points,
      });

      notify("Memo added successfully!");
      if (window.navigator.vibrate) window.navigator?.vibrate([100, 100, 100]);
      props.setShowMemo(false);
    } catch (error) {
      console.log(error);
      notify(error);
      if (window.navigator.vibrate) window.navigator?.vibrate([100, 100, 100]);
    }

    setLoader(false);
  };

  return (
    <div className="modal">
      <div className="card">
        <h2>Add new message</h2>
        <div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              className="form-control"
              type="text"
              capture="environment"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="video">Video:</label>
            <input
              accept="video/*"
              id="icon-button-file"
              className="form-control"
              type="file"
              capture="environment"
              name="video"
              onChange={(e) => handleCapture(e.target)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              className="form-control"
              type="date"
              capture="environment"
              name="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <br />
          <div className="btns-group">
            <button
              className={`btn btn-primary ${!file ? "disabled" : ""}`}
              onClick={uploadMemo}
            >
              {loader ? <Spinner /> : "Upload"}
            </button>
            <button
              className="btn btn-danger"
              onClick={() => props.setShowMemo(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemo;
