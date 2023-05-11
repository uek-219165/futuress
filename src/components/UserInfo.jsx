import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";

const UserInfo = (props) => {
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserDetails = async () => {
    const usersRef = await getDocs(collection(db, "users"));
    usersRef.docs.forEach((e) => {
      if (e.data().uid === props.userUid) setUserDetails(e.data());
    });
  };

  return (
    <Info>
      {userDetails ? (
        <div className="userInfo">
          <div className="user-image">
            <img className="image neon" src={userDetails?.url} alt="" />
            <button
              className="edit-btn"
              onClick={() => props.setShowConfig(true)}
            >
              <i className="bx bxs-edit-alt"></i>
            </button>
          </div>
          <p className="username">{userDetails?.username}</p>
          {userDetails.points >= 0 && (
            <div className="userInfo__points">
              <i className="bx bxs-video-plus"></i>
              {userDetails?.points}
            </div>
          )}
        </div>
      ) : (
        "No Data"
      )}
    </Info>
  );
};

const Info = styled.div`
  .userInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 100px;
    &__points {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-size: 1.4rem;
      .bx {
        font-size: 2rem;
      }
    }
  }

  .user-image {
    position: relative;
  }

  .edit-btn {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding: 10px;
    border-radius: 100%;
    border: none;
    transition: transform 0.3s;
    &:hover {
      transform: scale(0.8);
    }
    .bx {
      color: #000;
      font-size: 2rem;
    }
  }
`;

export default UserInfo;
