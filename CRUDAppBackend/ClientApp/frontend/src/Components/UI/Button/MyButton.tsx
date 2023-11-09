import { FC, ButtonHTMLAttributes } from "react";
import './MyButton.module.css';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const MyButton: FC<MyButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} > {}
      {children}
    </button>
  );
};

export default MyButton;
