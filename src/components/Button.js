import "./Button.css";

const Button = ({ children, modifierClass, onClick, type }) => {
  return (
    <button type={type} onClick={onClick} className={`btn ${modifierClass}`}>
      {children}
    </button>
  );
};

export default Button;
