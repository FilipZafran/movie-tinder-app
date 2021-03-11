import React from 'react';
import './avatar.css';
import { AvatarCircles } from './AvatarCircles';

const Avatar = ({ initials, circle }) => {
  return (
    <div className={circle ? 'avatar__container' : 'avatarBackground'}>
      <div className={circle ? 'avatar__circle' : ''}>
        <AvatarCircles />
      </div>
      <div className="initials">{initials}</div>
    </div>
  );
};

export default Avatar;
