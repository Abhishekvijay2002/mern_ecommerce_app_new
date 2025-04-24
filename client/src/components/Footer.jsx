import React from "react";

const FooterSections = () => {
  return (
    <div className="bg-gradient-to-b from-blue-500 to-blue-700 text-white py-10 px-6">
      {/* Upper Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {/* Connect with Us */}
        <div>
          <h3 className="text-xl font-bold mb-4">Connect with Us</h3>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline">Facebook</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">Twitter</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Instagram</a>
            </li>
          </ul>
        </div>

        {/* Get to Know Us */}
        <div>
          <h3 className="text-xl font-bold mb-4">Get to Know Us</h3>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline">About QuickBuy</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">Contact Us</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Careers</a>
            </li>
          </ul>
        </div>

        {/* Make Money with Us */}
        <div>
          <h3 className="text-xl font-bold mb-4">Make Money with Us</h3>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline">Sell on QuickBuy</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Become an Affiliate</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Lower Section */}
      <div className="border-t border-blue-300 pt-4 text-center">
        <p className="text-sm">&copy; 2025 YourCompany, Inc. All rights reserved.</p>
      </div>
    </div>
  );
};

export default FooterSections;
