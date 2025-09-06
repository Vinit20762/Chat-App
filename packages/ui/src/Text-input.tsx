import React, {InputHTMLAttributes } from "react";

interface PropType extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  variant?: "small" | "large";
}

export const TextInput = React.forwardRef<HTMLInputElement, PropType>(({type, placeholder, variant, ...rest}, ref) => { 
    return <input ref={ref} type={type} placeholder={placeholder} style={{
        padding: variant === "small" ? 10 : 20,
        margin: variant === "small" ? 10 : 20,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5
    }}
     {...rest}/>
})