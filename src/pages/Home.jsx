import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";
import AddMemo from "../components/AddMemo";
import UserConfig from "../components/UserConfig";
import UserInfo from "../components/UserInfo";
import BottomBar from "../components/BottomBar";
import SplashScreen from "../components/SplashScreen";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [isNewUser, setShowConfig] = useState(false);
  const [addMemo, setShowMemo] = useState(false);
  const [memos, setMemos] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/login");
      }
    });

    if (user) {
      getMemos();
      checkIfNewUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, user]);

  const checkIfNewUser = async () => {
    const usersRef = await getDocs(collection(db, "users"));
    const checkUser = usersRef.docs.filter((e) => e.data().uid === user.uid);

    if (checkUser.length > 0) checkUser[0].data() && setShowConfig(false);
    else setShowConfig(true);
  };

  const getMemos = async (uid) => {
    const items = [];
    const usersRef = await getDocs(collection(db, "memos"));
    usersRef.docs.forEach((e) => {
      const today = new Date().toISOString().slice(0, 10);
      if (e.data().uid === user.uid && e.data().date === today)
        items.push(e.data());
    });

    console.log(items);

    setMemos(items);
  };

  if (!user) return <SplashScreen />;

  return (
    <>
      <Navbar />
      <div className="main">
        {isNewUser ? (
          <UserConfig
            userUid={user.uid}
            setShowConfig={setShowConfig}
            isNewUser={isNewUser}
          />
        ) : (
          <UserInfo userUid={user.uid} setShowConfig={setShowConfig} />
        )}
        {addMemo && <AddMemo userUid={user.uid} setShowMemo={setShowMemo} />}
        <br />
        <h2>Today memos:</h2>
        <div className="memo-box">
          {memos &&
            memos.map((m, i) => (
              <a
                className="link"
                href={m.url}
                key={i}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="memo glow">
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
              </a>
            ))}
        </div>
      </div>
      <BottomBar setShowMemo={setShowMemo} />
    </>
  );
};

export default Home;
