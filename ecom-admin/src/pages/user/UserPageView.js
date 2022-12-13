import React from 'react';

const UserPageView = ({ user }) => (
  <div id="user-page" className="user-page">
    <section id="user-info">
      <p>
        <strong>Name</strong>:
        <span>{` ${user?.name}`}</span>
      </p>
    </section>
  </div>
);

export default React.memo(UserPageView);
