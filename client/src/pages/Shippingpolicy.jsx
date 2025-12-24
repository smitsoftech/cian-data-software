import React from "react";

const ShippingAndDeliveryPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <div className="bg-amber-600 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">Shipping & Delivery Policy</h1>
          <p className="text-lg">Effective as of July 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            This Shipping and Delivery Policy describes how CELESTA HEALTHCARE PVT. LTD. manages the
            shipment and delivery of physical products ordered through our
            platform. By placing an order, you agree to the terms outlined here.
          </p>
        </section>

        {/* Shipping Coverage */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Shipping Coverage</h2>
          <p>
            CELESTA HEALTHCARE PVT. LTD. currently offers shipping within India. For orders outside
            India, please contact our support team before placing the order.
          </p>
        </section>

        {/* Delivery Timeframes */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Delivery Timeframes</h2>
          <p>
            Estimated delivery times vary based on location and product type.
            Orders are typically processed and shipped within 2-4 business days.
            Delivery may take 5-10 business days depending on the destination.
          </p>
        </section>

        {/* Shipping Charges */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Shipping Charges</h2>
          <p>
            Shipping charges, if applicable, will be clearly displayed at checkout.
            Free shipping may be offered on certain products or during promotional
            periods.
          </p>
        </section>

        {/* Tracking Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Order Tracking</h2>
          <p>
            Once your order is shipped, you will receive an email or SMS with
            tracking details. You can use this information to monitor the status
            of your shipment.
          </p>
        </section>

        {/* Delays */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Delays in Delivery</h2>
          <p>
            Delays may occur due to unforeseen circumstances, including weather
            conditions, holidays, logistics issues, or natural disasters. CELESTA HEALTHCARE PVT. LTD.
            is not liable for delays beyond our control but will assist you in
            tracking and resolving such issues.
          </p>
        </section>

        {/* Undeliverable Packages */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Undeliverable Packages</h2>
          <p>
            If a package is returned to us due to an incorrect or incomplete
            address, you will be contacted to arrange reshipment. Additional
            shipping charges may apply.
          </p>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p>
            For any queries related to shipping and delivery, reach out to us at:
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

export default ShippingAndDeliveryPolicy;
