import "./Chat.css";

function Chat(props) {
  return (
    <form className="chat">
      {/* Chat Input */}
      <textarea
        className="chat__input"
        name="user-message"
        placeholder="Question responses will be logged here..."
      />

      {/* Chat Menu */}
      <div className="chat__menu">
        <button className="chat__menu__button chat__menu__button--retry">
          RETRY
        </button>
        <button className="chat__menu__button chat__menu__button--stop">
          STOP
        </button>
        <button className="chat__menu__button chat__menu__button--submit">
          SUBMIT
        </button>
      </div>

      {/* Retries Count */}
      <p className="chat__count">Retries remaining: 2</p>
    </form>
  );
}

export default Chat;
