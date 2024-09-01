"use client";

import { Result } from "antd";

const ErrorHandler = ({ error }: { error: Error }) => {
  const is404 = error.message.includes("404");
  return <Result status={is404 ? "404" : "error"} title={error.message} />;
};

export default ErrorHandler;
