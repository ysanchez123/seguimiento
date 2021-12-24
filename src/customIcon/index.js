import React from 'react';
import { ReactComponent as WhatsappSVG } from './whatsapp.svg';
import './customIcon.css';

const iconTypes = {
  "whatsapp": color => (
    <WhatsappSVG className="Icon-svg Icon-svg--whatsapp" fill={color} />
  ),
};

function customIcon({ type, color = 'gray', onClick }) {
  return (
    <span
      className={`Icon-container Icon-container--${type}`}
      onClick={onClick}
    >
      {iconTypes[type](color)}
    </span>
  );
}

export { customIcon };