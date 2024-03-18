import Chat from "./Chat/Chat";
import ChatInterface from "./ChatInterface/ChatInterface";
import "./Message.css";

function Message(props) {
  return (
    <div className="message">
      <ChatInterface />
      <Chat />
    </div>
  );
}

export default Message;
