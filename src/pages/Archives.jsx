import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getDocs, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const Archives = () => {
  const navigate = useNavigate();
  const [memos, setMemos] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getMemos(user.uid);
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  const getMemos = async (uid) => {
    const items = [];
    const usersRef = await getDocs(collection(db, "memos"));
    usersRef.docs.forEach((e) => {
      if (e.data().uid === uid) items.push(e.data());
    });

    setMemos(items);
  };

  return (
    <div className="archives">
      <Navbar />
      <h1>Archives</h1>
      {memos &&
        memos.map((m, i) => (
          <>
            <div className="memo" key={i}>
              <i className="bx bxs-archive-out"></i>
              <div className="memo__details">
                <p className="memo__title">
                  Title: <b>{m.title}</b>
                </p>
                <span className="memo_date">
                  Will show on: <b>{m.date}</b>
                </span>
              </div>
              <hr />
            </div>
            <br />
          </>
        ))}
    </div>
  );
};

export default Archives;
