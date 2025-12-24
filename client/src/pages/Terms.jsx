import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 via-white to-green-50 py-12 px-6 lg:px-32 min-h-screen text-gray-800">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 space-y-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 text-center">
          CELESTA HEALTHCARE PVT. LTD. – Terms & Conditions
        </h1>

        <section>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            1. Introduction
          </h2>
          <p className="text-gray-700">
            Welcome to CELESTA HEALTHCARE PVT. LTD. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before placing any order.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            2. Eligibility
          </h2>
          <p className="text-gray-700">
            You must be at least 18 years old to use this website. By agreeing to these terms, you confirm that you meet this requirement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            3. Medical Disclaimer
          </h2>
          <p className="text-gray-700">
            All content on this website is for informational purposes only. It should not be considered a substitute for professional medical advice, diagnosis, or treatment. Always consult your doctor or qualified health provider.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            4. Prescription Policy
          </h2>
          <p className="text-gray-700">
            Certain medicines are sold only against a valid prescription. Uploading a fake or expired prescription is strictly prohibited and may lead to legal action.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            5. Order & Payment
          </h2>
          <p className="text-gray-700">
            Orders are subject to availability and confirmation. Prices are listed in INR and are inclusive of applicable taxes. We reserve the right to refuse or cancel any order at our discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            6. Shipping & Returns
          </h2>
          <p className="text-gray-700">
            We offer shipping across India. Delivery timelines may vary by location. Returns are only accepted for damaged or incorrect products within 7 days of delivery. Medicines once opened cannot be returned.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            7. Privacy & Security
          </h2>
          <p className="text-gray-700">
            We take your privacy seriously and handle your data in accordance with our Privacy Policy. All transactions are secured via encrypted channels.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            8. Modifications
          </h2>
          <p className="text-gray-700">
            We reserve the right to update these terms at any time. Continued use of the platform after changes implies acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            9. Contact Us
          </h2>
          <p className="text-gray-700">
            For any queries regarding our terms or services, please email us at{" "}
            <a
              href="mailto:sharmin@celesta.co.in"
              className="text-green-700 underline"
            >
              sharmin@celesta.co.in
            </a>
          </p>
        </section>

        <div className="text-center text-sm text-gray-400 pt-4 border-t border-gray-200">
          {/* © {new Date().getFullYear()} Gelios Lifesciences. All Rights Reserved. */}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
