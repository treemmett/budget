import React from 'react';

const CreditCard: React.FC = () => (
  <svg viewBox="0 0 24 24">
    <path
      strokeMiterlimit="10"
      d="M20,19H4c-1.1,0-2-0.9-2-2V7c0-1.1,0.9-2,2-2h16c1.1,0,2,0.9,2,2
	v10C22,18.1,21.1,19,20,19z"
    />
    <line
      strokeWidth="3"
      strokeMiterlimit="10"
      x1="2"
      y1="8.9"
      x2="22"
      y2="8.9"
    />
    <line strokeMiterlimit="10" x1="4.7" y1="15.8" x2="8.7" y2="15.8" />
  </svg>
);

export default CreditCard;
