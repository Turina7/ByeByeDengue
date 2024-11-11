"use client";

import React, { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css"; 

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    className,
    ...rest
}) => {
    const combinedClassName = `${styles.btn} ${className || ''}`.trim();

    return (
        <button 
            className={combinedClassName}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;