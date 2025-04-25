import React from 'react';

export const isDev = (): boolean => {
  return import.meta.env.DEV === true;
};

export const DevOnly: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return isDev() ? React.createElement(React.Fragment, null, children) : null;
};