function Button({ onSelect, children }) {
  return <button onClick={onSelect}>{children}</button>;
}

export default Button;
