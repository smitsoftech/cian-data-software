import React from "react";

const FeesAndPaymentsPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <div className="bg-amber-600 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">Fees & Payments Policy</h1>
          <p className="text-lg">Effective as of July 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            This Fees and Payments Policy outlines the terms and conditions regarding the
            collection, usage, and processing of payments made through CELESTA HEALTHCARE PVT. LTD. platform.
            By making a payment on CELESTA HEALTHCARE PVT. LTD., you agree to the terms mentioned herein.
          </p>
        </section>

        {/* Fee Structure */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Fee Structure</h2>
          <p>
            All service and product fees will be clearly listed on the CELESTA HEALTHCARE PVT. LTD. website or
            communicated to users prior to confirmation. These may include but are not
            limited to:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Event registration fees</li>
            <li>Subscription or membership fees</li>
            <li>Product purchase costs</li>
            <li>Taxes, if applicable</li>
          </ul>
        </section>

        {/* Payment Methods */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Payment Methods</h2>
          <p>
            CELESTA HEALTHCARE PVT. LTD. supports the following payment methods:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Credit and Debit Cards</li>
            <li>UPI and Net Banking</li>
            <li>Digital Wallets</li>
            <li>Other payment gateways integrated on the platform</li>
          </ul>
        </section>

        {/* Payment Terms */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
          <p>
            Payments must be completed before availing any paid service or product. We do
            not guarantee access to paid services until the full payment has been received.
            Failed or declined transactions will not be considered as successful
            registrations or purchases.
          </p>
        </section>

        {/* Refund Policy */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Refund Policy</h2>
          <p>
            Refunds will be handled as per CELESTA HEALTHCARE PVT. LTD. Refund Policy. In general, payments
            once made are non-refundable unless specified otherwise under special
            circumstances or mentioned in a specific service's terms.
          </p>
        </section>

        {/* Invoice & Receipts */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Invoices & Receipts</h2>
          <p>
            Upon successful payment, an invoice or receipt will be generated and sent to
            the registered email address of the user.
          </p>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p>
            If you have any questions regarding our Fees and Payments Policy, feel free to
            contact us at:
          </p>
          <ul className="mt-2">
            <li>Email: <a href="mailto:sharmin@celesta.co.in" className="text-blue-600 hover:underline">sharmin@celesta.co.in</a></li>
            <li>Phone: +91 8378974003</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default FeesAndPaymentsPolicy;
