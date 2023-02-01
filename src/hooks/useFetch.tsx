import React from "react";

interface MessageProps { message: string };

export const useMessage: React.FC<MessageProps> = ({ message }) => (
  <div>{message}</div>
);