import Chat from "../Chat/Chat";
import ChatInterface from "../ChatInterface/ChatInterface";
import "./Message.css";

function Message(props) {
  return (
    <div className="message">
      <h2 className="message__title">Questions</h2>
      <ChatInterface />
      <Chat />
    </div>
  );
}

export default Message;
