import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center" style={{ color: 'var(--heading-color)' }}>
          About Quick Buy
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-center">
          Welcome to Quick Buy! We're here to simplify your online shopping experience with an
          easy-to-use platform, a wide range of products, and unbeatable service.
        </p>

        {/* Mission Section */}
        <div className="shadow-md rounded-xl p-6 sm:p-8" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'var(--heading-color)' }}>
            Our Mission
          </h2>
          <p className="text-sm sm:text-base">
            Our mission is to make shopping quick, smart, and fun. From tech to fashion, we offer
            everything under one roof with fast delivery, clear information, and real user reviews.
          </p>
        </div>

        {/* Our Values Section */}
        <div className="shadow-md rounded-xl p-6 sm:p-8" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'var(--heading-color)' }}>
            Our Values
          </h2>
          <ul className="text-sm sm:text-base list-disc pl-6 space-y-2">
            <li>🎯 Customer First: Your satisfaction drives us.</li>
            <li>🔍 Transparency: Honest info & reviews.</li>
            <li>⚡ Convenience: Shop fast, easy, and secure.</li>
            <li>✅ Quality: We only offer trusted products.</li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="shadow-md rounded-xl p-6 sm:p-8" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'var(--heading-color)' }}>
            Contact Us
          </h2>
          <p className="text-sm sm:text-base mb-2">
            Got questions, feedback, or just want to say hi? We'd love to hear from you!
          </p>
          <p className="text-sm sm:text-base">
            📧 <strong>Email:</strong> support@quickbuy.com
          </p>
          <p className="text-sm sm:text-base">
            📞 <strong>Phone:</strong> +1 234 567 890
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
