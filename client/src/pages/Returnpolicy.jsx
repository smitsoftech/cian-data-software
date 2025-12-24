import React from "react";

const ReturnRefundCancellation = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 via-white to-green-50 py-12 px-6 lg:px-32 min-h-screen text-gray-800">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 space-y-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 text-center">
          Return, Refund & Cancellation Policy - CELESTA HEALTHCARE PVT. LTD.
        </h1>

        <section>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            1. Returns
          </h2>
          <p className="text-gray-700">
            We strive to provide our customers with the best quality products.
            However, due to the nature of pharmaceutical products, we accept
            returns only under specific conditions:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
            <li>The item delivered was damaged or defective.</li>
            <li>The wrong product was delivered.</li>
            <li>
              Returns are only accepted within <strong>7 days</strong> of
              delivery.
            </li>
          </ul>
          <p className="mt-2 text-gray-700">
            Opened or used medicines and healthcare products cannot be returned.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            2. Refunds
          </h2>
          <p className="text-gray-700">
            Once your return is approved and received, your refund will be
            processed. The refund will be made to the original payment method
            within 7-10 business days.
          </p>
          <p className="mt-2 text-gray-700">Please note:</p>
          <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
            <li>Shipping charges are non-refundable.</li>
            <li>
              In case of COD orders, refund will be initiated via bank transfer.
            </li>
            <li>You will be notified once your refund has been processed.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            3. Cancellations
          </h2>
          <p className="text-gray-700">
            Orders can be cancelled if they haven’t been packed or shipped. To
            cancel an order, please contact our support team immediately.
          </p>
          <p className="mt-2 text-gray-700">
            In case the order has already been shipped, it cannot be cancelled
            and will fall under our return policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            4. Contact for Support
          </h2>
          <p className="text-gray-700">
            For return, refund or cancellation requests, please email us at{" "}
            <a
              href="mailto:sharmin@celesta.co.in"
              className="text-green-700 underline"
            >
              sharmin@celesta.co.in
            </a>{" "}
            or call our customer care helpline.
          </p>
        </section>

        <div className="text-center text-sm text-gray-400 pt-4 border-t border-gray-200">
          {/* © {new Date().getFullYear()} Celesta Lifesciences. All Rights Reserved. */}
        </div>
      </div>
    </div>
  );
};

export default ReturnRefundCancellation;
