import mountMarketing from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mountMarketing(ref.current);
  });

  return <div ref={ref}></div>;
};
