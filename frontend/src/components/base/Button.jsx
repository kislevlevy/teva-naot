import React from 'react';

export default function Button({ btnType, children }) {
  return <div className={`btn-base ${btnType}`}>{children}</div>;
}
