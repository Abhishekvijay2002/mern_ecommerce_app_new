import React from "react";
const supportData = [
  {
    title: "Orders & Shipping",
    questions: [
      "How do I track my order?",
      "What are the delivery timelines?",
    ],
  },
  {
    title: "Returns & Refunds",
    questions: [
      "How do I initiate a return?",
      "When will I receive my refund?",
    ],
  },
  {
    title: "Payments & Transactions",
    questions: [
      "What payment methods are accepted?",
      "My payment failed, what should I do?",
    ],
  },
  {
    title: "Account & Security",
    questions: [
      "How do I reset my password?",
      "How do I delete my account?",
    ],
  },
];

const SupportHelp = () => {
  return (
    <div>
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Support & Help</h2>
      <div className="space-y-6">
        {supportData.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
            <ul className="list-disc list-inside text-gray-700 mt-1 space-y-1">
              {section.questions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SupportHelp;
