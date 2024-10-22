"use client"; // Ensure the component is treated as a client component

import React, { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css"; 

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    ...rest
}) => {
    return (
        <button 
            className={`${styles.btn}`}  // Combina a classe `btn` com qualquer outra classe passada como prop
            {...rest}  // Desestrutura as outras props, como onClick, type, etc.
        >
            {children}
        </button>
    );
};

export default Button;