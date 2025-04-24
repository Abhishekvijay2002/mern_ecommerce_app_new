import React from 'react';
import Headersection from '../components/Headersection';
import FooterSections from '../components/Footer';
import { Outlet } from 'react-router-dom';

function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <Headersection />

      {/* Main Content */}
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Footer Section */}
      <FooterSections />
    </div>
  );
}

export default UserLayout;

