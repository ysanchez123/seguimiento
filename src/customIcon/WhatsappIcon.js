import React from 'react';
import { TodoIcon } from './';

function WhatsappIcon({ onWhatsapp }) {
  return (
    <TodoIcon
      type="whatsapp"
      onClick={onWhatsapp}
    />
  );
}

export { WhatsappIcon };