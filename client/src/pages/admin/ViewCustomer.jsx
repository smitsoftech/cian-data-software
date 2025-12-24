// src/pages/admin/ViewCustomer.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { FaBackward } from "react-icons/fa";

const ViewCustomer = () => {
  const { id } = useParams();
  const [showsidebar, setShowsidebar] = useState(false);
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(true);

  // Use uploaded file path as logo (developer note: this local path will be transformed to a URL by your tooling)
  const logoUrl = "/mnt/data/bc1bf2ca-df7d-4c53-a941-278c016b62d7.png";

  const handleSideBar = () => setShowsidebar((prev) => !prev);

  const [sections, setSections] = useState({
    s1: true,
    s2: true,
    s3: true,
    s4: true,
    s5: true,
    s6: true,
    s7: true,
    s8: true,
    s9: true,
    s10: true,
  });

  const toggle = (k) => setSections((p) => ({ ...p, [k]: !p[k] }));

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER}/api/customers/${id}`);
        const data = await res.json();
        setCustomer(data.data || {});
      } catch (err) {
        console.error("❌ Customer fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (loading) return <div className="p-8 text-gray-700">Loading customer details...</div>;
  if (!customer || Object.keys(customer).length === 0)
    return <div className="p-8 text-red-500">Customer not found.</div>;

  const renderFields = (fields) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {fields.map(({ key, label, type }) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700">{label}</label>
          <input
            type={type || "text"}
            value={customer[key] ?? ""}
            disabled
            className="mt-1 p-2 border rounded w-full bg-gray-100"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar (uncomment if you want the AdminSidebar visible) */}
      {/* <AdminSidebar sidebar={{ showsidebar, handleSideBar }} /> */}

      <div className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/** Logo from uploaded file path (tooling will transform this) */}
            {/* <img src={logoUrl} alt="logo" className="h-12 w-12 object-contain rounded" /> */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">👥 View Customer Details</h1>
              <p className="text-sm text-gray-500">Customer ID: {customer._id || "—"}</p>
            </div>
          </div>
        </header>

        <div className="space-y-8 p-6">
          {/* 1️⃣ Basic Customer Information */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2
              onClick={() => toggle("s1")}
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
            >
              1️⃣ Basic Customer Information
              <span>{sections.s1 ? "▲" : "▼"}</span>
            </h2>
            {sections.s1 &&
              renderFields([
                { key: "CustName", label: "Customer Name" },
                { key: "CustCd", label: "Customer Code" },
                { key: "CustNo", label: "Customer Number" },
                { key: "ShortName", label: "Short Name" },
                { key: "PayeeName", label: "Payee Name" },
                { key: "CustTpCd", label: "Customer Type" },
                { key: "SegmCd", label: "Segment Code" },
                { key: "LocCd", label: "Location Code" },
                { key: "CustCrtDt", label: "Creation Date" },
                { key: "StopInv", label: "Stop Inventory (Y/N)" },
              ])}
          </section>

          {/* 2️⃣ Address Information */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2
              onClick={() => toggle("s2")}
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
            >
              2️⃣ Address Information
              <span>{sections.s2 ? "▲" : "▼"}</span>
            </h2>
            {sections.s2 &&
              renderFields([
                { key: "AddLine1", label: "Address Line 1" },
                { key: "AddLine2", label: "Address Line 2" },
                { key: "AddLine3", label: "Address Line 3" },
                { key: "City", label: "City" },
                { key: "StateCd", label: "State Code" },
                { key: "GSTStateCd", label: "GST State Code" },
                { key: "Country", label: "Country" },
                { key: "ZipCode", label: "Zip / PIN Code" },
              ])}
          </section>

          {/* 3️⃣ Contact Information */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2
              onClick={() => toggle("s3")}
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
            >
              3️⃣ Contact Information
              <span>{sections.s3 ? "▲" : "▼"}</span>
            </h2>
            {sections.s3 &&
              renderFields([
                { key: "Contact", label: "Contact Person" },
                { key: "TelNo", label: "Telephone Number" },
                { key: "MobileNo", label: "Mobile Number" },
                { key: "FaxNo", label: "Fax Number" },
                { key: "EMailId", label: "Email Address" },
                { key: "Website", label: "Website" },
                { key: "CustDist", label: "Customer Distance" },
              ])}
          </section>

          {/* 4️⃣ Tax & Compliance */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2
              onClick={() => toggle("s4")}
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
            >
              4️⃣ Tax & Compliance
              <span>{sections.s4 ? "▲" : "▼"}</span>
            </h2>
            {sections.s4 &&
              renderFields([
                { key: "GSTIN", label: "GSTIN" },
                { key: "GSTStateCd", label: "GST State Code" },
                { key: "ITaxPANNo", label: "PAN Number" },
                { key: "ExportType", label: "Export Type" },
                { key: "IsRegDlr", label: "Is Registered Dealer (Y/N)" },
                { key: "IsExpCust", label: "Is Export Customer (Y/N)" },
                { key: "IsElgTCS", label: "Eligible for TCS (Y/N)" },
                { key: "TcsType", label: "TCS Type" },
                { key: "IsAplHgrRt", label: "Apply Higher Rate (Y/N)" },
                { key: "IsDdNnRes", label: "Is DD Non-Resident" },
                { key: "IsDdPrmEst", label: "Is DD Premium/EST" },
                { key: "IsBlDisc", label: "Is Block Discount" },
                { key: "IsRevEOYr", label: "Is Reverse End Of Year" },
                { key: "CVatFormCd", label: "VAT Form Code" },
                { key: "CCenFormCd", label: "CENVAT Form Code" },
              ])}
          </section>

          {/* 5️⃣ Transport & Logistics */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2
              onClick={() => toggle("s5")}
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
            >
              5️⃣ Transport & Logistics
              <span>{sections.s5 ? "▲" : "▼"}</span>
            </h2>
            {sections.s5 &&
              renderFields([
                { key: "DestnCd", label: "Destination Code" },
                { key: "TrMdCd", label: "Transport Mode" },
                { key: "TrnspCd", label: "Transporter Code" },
                { key: "LeadDays", label: "Lead Days" },
                { key: "FrtInd", label: "Freight Indicator" },
                { key: "AlwCnsgOBk", label: "Allow Consignee On Book (Y/N)" },
                { key: "SupStkLoc", label: "Supplier Stock Location" },
              ])}
          </section>

          {/* 6️⃣ Banking & Finance */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2
              onClick={() => toggle("s6")}
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
            >
              6️⃣ Banking & Finance
              <span>{sections.s6 ? "▲" : "▼"}</span>
            </h2>
            {sections.s6 &&
              renderFields([
                { key: "BnkName", label: "Bank Name" },
                { key: "BnkIFSCCd", label: "IFSC Code" },
                { key: "BnkAcNo", label: "Bank Account Number" },
                { key: "CustVPA", label: "UPI ID / VPA" },
                { key: "BnkBranch", label: "Bank Branch" },
                { key: "BankLoc", label: "Bank Location" },
                { key: "CustBnkr", label: "Customer Banker" },
                { key: "BAcTpCd", label: "Bank Account Type" },
              ])}
          </section>

          {/* 7️⃣ Licensing & Regulatory */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2
              onClick={() => toggle("s7")}
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
            >
              7️⃣ Licensing & Regulatory
              <span>{sections.s7 ? "▲" : "▼"}</span>
            </h2>
            {sections.s7 &&
              renderFields([
                { key: "DrugLicNo", label: "Drug License Number" },
                { key: "DLicExpDt", label: "Drug License Expiry Date" },
                { key: "OthLicNo", label: "Other License Number" },
                { key: "IsBlDisc", label: "Is Block Discount" },
                { key: "IsRevEOYr", label: "Is Reverse End Of Year" },
              ])}
          </section>

          {/* 8️⃣ Credit & Payment Terms */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2
              onClick={() => toggle("s8")}
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
            >
              8️⃣ Credit & Payment Terms
              <span>{sections.s8 ? "▲" : "▼"}</span>
            </h2>
            {sections.s8 &&
              renderFields([
                { key: "CAcCd", label: "Account Code" },
                { key: "CCrdLimit", label: "Credit Limit" },
                { key: "MinInvAmt", label: "Minimum Invoice Amount" },
                { key: "CSchmCd", label: "Scheme Code" },
                { key: "CBrokerCd", label: "Broker Code" },
                { key: "CBrokerRt", label: "Broker Rate (%)" },
                { key: "CCashDisc", label: "Cash Discount (%)" },
                { key: "CMiscChgPc", label: "Misc Charge (%)" },
                { key: "CMiscDisPc", label: "Misc Discount (%)" },
                { key: "CApSplTerm", label: "Special Terms" },
                { key: "CPayTermCd", label: "Payment Term Code" },
                { key: "CDocsThru", label: "Documents Through" },
                { key: "CCrdPrd", label: "Credit Period (Days)" },
                { key: "CNwPCrdPrd", label: "New Credit Period (Days)" },
                { key: "CIsOvDuChk", label: "Overdue Check (Y/N)" },
                { key: "CNoOfBills", label: "No Of Bills" },
                { key: "COsBlPrd", label: "Outstanding Billing Period" },
                { key: "COsBlAcInd", label: "Outstanding Billing Account Indicator" },
              ])}
          </section>

          {/* 9️⃣ Customer Interface & Special Terms */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2
              onClick={() => toggle("s9")}
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
            >
              9️⃣ Customer Interface & Special Terms
              <span>{sections.s9 ? "▲" : "▼"}</span>
            </h2>
            {sections.s9 &&
              renderFields([
                { key: "CustIntfCd", label: "Customer Interface Code" },
                { key: "IntfFlFrmt", label: "Interface File Format" },
                { key: "ProjRatio", label: "Project Ratio" },
                { key: "NoOfDsp", label: "Number Of Dispatches" },
                { key: "LblLyt", label: "Label Layout" },
                { key: "NoOfCopies", label: "No Of Copies" },
                { key: "OldCode", label: "Old Code" },
                { key: "CustLotNo", label: "Customer Lot Number" },
                { key: "AlwCnsgOBk", label: "Allow Consignee on Book (Y/N)" },
              ])}
          </section>

          {/* 🔟 Miscellaneous / System / Meta */}
          <section className="bg-white shadow rounded-lg p-6 mb-8">
            <h2
              onClick={() => toggle("s10")}
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
            >
              🔟 Miscellaneous / System / Meta
              <span>{sections.s10 ? "▲" : "▼"}</span>
            </h2>
            {sections.s10 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Extra Info / Notes</label>
                  <textarea value={customer.ExtInfo ?? ""} disabled className="mt-1 p-2 border rounded w-full h-28 bg-gray-100" />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {renderFields([
                    { key: "IsRecClsd", label: "Is Record Closed (Y/N)" },
                    { key: "MstUpdBy", label: "Master Updated By" },
                    { key: "MstUpdDtTm", label: "Master Updated DateTime" },
                    { key: "TxRevNo", label: "Transaction Revision No" },
                    { key: "IsRegDlr", label: "Is Registered Dealer (Y/N)" },
                    { key: "IsExpCust", label: "Is Export Customer (Y/N)" },
                    { key: "rdbts", label: "RDBTS" },
                  ])}
                </div>
              </div>
            )}
          </section>

          {/* Back button */}
          <div className="flex justify-center pt-4 pb-10">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg shadow"
            >
              <FaBackward /> <span className="ml-2">Back to Customers</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomer;
