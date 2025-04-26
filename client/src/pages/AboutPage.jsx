import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-700">
          About Quick Buy
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-gray-700 text-center">
          Welcome to Quick Buy! We're here to simplify your online shopping experience with an
          easy-to-use platform, a wide range of products, and unbeatable service.
        </p>

        {/* Mission Section */}
        <div className="bg-white shadow-md rounded-xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-sm sm:text-base">
            Our mission is to make shopping quick, smart, and fun. From tech to fashion, we offer
            everything under one roof with fast delivery, clear information, and real user reviews.
          </p>
        </div>

        {/* Our Values Section */}
        <div className="bg-white shadow-md rounded-xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">Our Values</h2>
          <ul className="text-gray-700 text-sm sm:text-base list-disc pl-6 space-y-2">
            <li>🎯 Customer First: Your satisfaction drives us.</li>
            <li>🔍 Transparency: Honest info & reviews.</li>
            <li>⚡ Convenience: Shop fast, easy, and secure.</li>
            <li>✅ Quality: We only offer trusted products.</li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="bg-white shadow-md rounded-xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">Contact Us</h2>
          <p className="text-gray-700 text-sm sm:text-base mb-2">
            Got questions, feedback, or just want to say hi? We'd love to hear from you!
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            📧 <strong>Email:</strong> support@quickbuy.com
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            📞 <strong>Phone:</strong> +1 234 567 890
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
