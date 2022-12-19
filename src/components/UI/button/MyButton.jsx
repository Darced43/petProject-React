import React from "react";

export const MyButton = ({children, ...props}) => {
    return(
        <button {...props} className='mt-1'>{children}</button>
    )
}