import React from 'react';
import { ReactComponent as WhatsappSVG } from './whatsapp.svg';
import './TodoIcon.css';

const iconTypes = {
  "whatsapp": color => (
    <WhatsappSVG className="Icon-svg Icon-svg--whatsapp" fill={color} />
  ),
};

function TodoIcon({ type, color = 'gray', onClick }) {
  return (
    <span
      className={`Icon-container Icon-container--${type}`}
      onClick={onClick}
    >
      {iconTypes[type](color)}
    </span>
  );
}

export { TodoIcon };
