
import React from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

const Confetti = ({ trigger }) => {
  return (
    <div>
      {trigger && <ConfettiExplosion />}
    </div>
  );
};

export default Confetti;
