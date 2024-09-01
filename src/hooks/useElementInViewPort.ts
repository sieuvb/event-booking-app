"use client";

import React from "react";

const useElementInViewPort = (callback: Function, getElementContainer?: () => HTMLElement) => {
  // avoid passing callback as a dependency directly to useEffect
  // as it may cause the effect re-run when the callback function changed
  // which might not be a desired behavior
  const callbackRef = React.useRef(callback);
  const getElementContainerRef = React.useRef(getElementContainer);

  React.useEffect(() => {
    callbackRef.current = callback;
    getElementContainerRef.current = getElementContainer;
  }, [callback, getElementContainer]);

  React.useEffect(() => {
    if (!getElementContainerRef.current) {
      return;
    }
    const element = getElementContainerRef.current();
    if (!element) {
      return;
    }
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        callbackRef.current(entry.isIntersecting);
      });
    });
    intersectionObserver.observe(element);

    return () => {
      intersectionObserver.disconnect();
    };
  }, []);
};

export default useElementInViewPort;
