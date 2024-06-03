"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { io } from "socket.io-client";
import { fetchUser } from "@/redux/actions/userActions";
import { fetchUserApi } from "@/api/userApi";
import { fetchProfile } from "@/redux/actions/profileActions";
import { fetchProfileApi } from "@/api/profileApi";
import "../../../../public/styleSheets/chat.css";
import { fetchChat, fetchMessage, sendMessage } from "../../../redux/actions/messageActions";
import { chatApi, fetchMessageApi, sendMessageApi } from "../../../api/chatApi";

const useSocket = (profileData, id, chatfetch) => {
  const socket = useMemo(() => io("http://localhost:3000", { withCredentials: true }), []);

  useEffect(() => {
    if (profileData) {
      socket.emit("join", profileData._id);
      chatfetch(id);
    }
  }, [profileData, socket, id, chatfetch]);

  useEffect(() => {
    socket.on("connect", () => console.log("connected", socket.id));
    return () => socket.disconnect();
  }, [socket]);

  return socket;
};

const UserProfile = ({ user, onClick, isSelected }) => (
  <div className={`user ${isSelected ? 'bg' : ''}`} onClick={onClick}>
    <div className="img">
      <img src={user.avatar ? `/user/${user.avatar}` : `/user/user.webp`} alt="profile-pic" />
    </div>
    <div className="content">
      <p>{user.username}</p>
      {/* <h6>hello</h6> */}
    </div>
    <div className="time">3:32 PM</div>
  </div>
);
const Message = ({ msg, user }) => {
  const isSender = msg?.sender._id === user._id;
  return (
      <div className="chatbot-chat">
        {isSender ?
          <div class="chatbot-messages chatbot-sent-messages">
            <p>{msg.message}</p>
          </div> : <div class="chatbot-messages chatbot-received-messages">
            <p>{msg.message}</p>
          </div>
        }

      </div>
  );
};


const Page = () => {
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const profileData = useSelector((state) => state.profile.profileData);
  const chat = useSelector((state) => state.message.chat);
  const messages = useSelector((state) => state.message.messages);
  const chatfetch = useCallback(async (id) => {
    try {
      dispatch(fetchChat.request());
      const response = await chatApi({ receiver_id: id });
      dispatch(fetchChat.success(response));
    } catch (error) {
      console.error("Fetch chat error:", error);
      dispatch(fetchChat.failure(error.data.error));
    }
  }, [dispatch]);

  const fetchMessages = useCallback(async () => {
    try {
      dispatch(fetchMessage.request());
      const response = await fetchMessageApi({ chatId: chat._id });
      dispatch(fetchMessage.success(response));
    } catch (error) {
      console.error("Fetch messages error:", error);
      dispatch(fetchMessage.failure(error?.data?.error));
    }
  }, [chat, dispatch]);

  const socket = useSocket(profileData, id, chatfetch);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchUser.request());
        const userResponse = await fetchUserApi();
        dispatch(fetchUser.success(userResponse));

        dispatch(fetchProfile.request());
        const profileResponse = await fetchProfileApi();
        dispatch(fetchProfile.success(profileResponse));
      } catch (error) {
        console.error("Profile Page error:", error);
        dispatch(fetchUser.failure(error));
        dispatch(fetchProfile.failure(error));
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (chat && id) {
      fetchMessages();
    }
  }, [chat, id, fetchMessages]);

  useEffect(() => {
    socket.on("message", (data) => {
      if (chat && id) {
        fetchMessages();
      }
    });
  }, [socket, chat, id, fetchMessages]);

  const selectedUser = useMemo(() => userData?.find(user => user._id === id), [userData, id]);

  const handleChat = (userId) => {
    router.push(`/chat?id=${userId}`);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      try {
        socket.emit('message', { senderRoomId: profileData._id, receiverRoomId: id, message });
        await sendMessageApi({ chat_id: chat._id, message });
        fetchMessages();
        setMessage('');
      } catch (error) {
        console.error("Send message error:", error);
      }
    }
  };


  const filteredUsers = userData?.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="chatMain">
      <div className="left">
        <div className="header">
          <div className="profile">
            <img src={`/user/${profileData?.avatar}`} alt="profile-pic" />
          </div>
        </div>
        <div className="search">
          <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search" />
        </div>
        {filteredUsers?.map((user) => (
          <UserProfile
            key={user._id}
            user={user}
            isSelected={id === user._id}
            onClick={() => handleChat(user._id)}
          />
        ))}
      </div>
      <div className="right">
        {selectedUser ? (
          <>
            <div className="head">
              <div className="img">
                <img
                  src={selectedUser.avatar ? `/user/${selectedUser.avatar}` : `/user/user.webp`}
                  alt="img"
                />
              </div>
              <div className="content">
                <p>{selectedUser.username}</p>
              </div>
            </div>
            <div className="mainBox">
              <div className="messages">
                {messages?.map((msg, index) => (
                  <Message key={index} msg={msg} user={profileData} />
                ))}
              </div>
            </div>
            <div className="bottomInput">
              <form onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Type a message"
                  value={message}
                  className="send"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  className={message.trim().length > 0 ? "send" : "none"}
                  type="submit"
                >
                  Send
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="noUser">Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default Page;