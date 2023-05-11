import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, provider, db } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { useState } from "react";

const ProceedWithGoogle = () => {
  const navigate = useNavigate();
  const notify = (text) => toast(text);
  const [isUser, setIsUser] = useState(false);

  const continueWithGoogle = async () => {
    provider.setCustomParameters({ prompt: "select_account" });

    await signInWithPopup(auth, provider)
      .then(async ({ user }) => {
        await checkIfNewUser();

        if (!isUser)
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            username: user.reloadUserInfo.displayName,
            url: user.reloadUserInfo.photoUrl,
            points: 0,
          });

        navigate("/");
      })
      .catch((error) => {
        notify(error.message);
        if (window.navigator.vibrate)
          window.navigator?.vibrate([100, 100, 100]);
      });
  };

  const checkIfNewUser = async (uid) => {
    const usersRef = await getDocs(collection(db, "users"));
    const checkUser = usersRef.docs.filter((e) => e.data().uid === uid);

    if (checkUser.length > 0) checkUser[0].data() && setIsUser(true);
    else setIsUser(false);
  };

  return (
    <GoogleBtn type="button" className="btn" onClick={continueWithGoogle}>
      <i className="bx bxl-google"></i>Continue with google
    </GoogleBtn>
  );
};

const GoogleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: var(--white);
  width: 100%;
  .bx {
    font-size: 26px;
  }
  &:hover {
    background-color: var(--primary-color);
  }
`;

export default ProceedWithGoogle;
