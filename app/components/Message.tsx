import React from "react";


interface MessageProps {
     newMessage: string;
     msgIcon?: React.ReactNode;
}

const Message = ({newMessage,msgIcon}:MessageProps) => {
     return (
          <div className="toast">
               <div className="alert alert-info">
                <span>{msgIcon}</span>
                    <span>{newMessage}</span>
               </div>
          </div>
     );
};

export default Message;
