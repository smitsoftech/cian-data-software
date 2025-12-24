// src/pages/admin/ViewManufacturer.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { FaBackward } from "react-icons/fa";


const ViewManufacturer = () => {
  const { id } = useParams();
  const [showsidebar, setShowsidebar] = useState(false);
  const [manufacturer, setManufacturer] = useState({});
  const [loading, setLoading] = useState(true);

const [sections, setSections] = useState({
  section1: true,
  section2: true,
  section3: true,
  section4: true,
  section5: true,
  section6: true,
  section7: true,
  section8: true,
  section9: true,
  section10: true,
  section11: true,
  section12: true,
  section13: true,
  section14: true,
});


  useEffect(() => {
    const fetchManufacturer = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER}/api/manufacturers/${id}`);
        const data = await res.json();
        setManufacturer(data.data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching manufacturer:", err);
        setLoading(false);
      }
    };
    fetchManufacturer();
  }, [id]);

  const handleSideBar = () => setShowsidebar((prev) => !prev);
  const toggleSection = (sectionKey) =>
    setSections((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }));

  if (loading) return <div className="p-8 text-gray-700">Loading manufacturer details...</div>;
  if (!manufacturer) return <div className="p-8 text-red-500">Manufacturer not found.</div>;

  // Helper to render inputs
  const renderFields = (fields) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {fields.map(({ key, label }) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700">{label}</label>
          <input
            type="text"
            name={key}
            value={manufacturer[key] || ""}
            disabled
            className="mt-1 p-2 border rounded w-full bg-gray-100 "
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex h-screen bg-white">
      {/* <AdminSidebar sidebar={{ showsidebar, handleSideBar }} /> */}

      <div className="flex-1  overflow-y-auto">
    <header className="sticky top-0 z-20 bg-white border-b shadow-sm px-6 py-4">
      <h1 className="text-2xl font-bold text-gray-800">
        🏭 View Manufacturer Details
      </h1>
    </header>

        <div className="space-y-8 flex-1 overflow-y-auto p-6 ">
          {/* 1️⃣ Manufacturer Information */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection("section1")}
            >
              1️⃣ Manufacturer Information
              <span>{sections.section1 ? "▲" : "▼"}</span>
            </h2>
            {sections.section1 &&
              renderFields([
                { key: "manufacturerName", label: "Manufacturer Name" },
                { key: "cinNumber", label: "CIN Number" },
                { key: "panGstNumber", label: "PAN / GST Number" },
                { key: "incorporationYear", label: "Year of Incorporation" },
                { key: "typeOfCompany", label: "Type of Company" },
                { key: "parentCompany", label: "Parent Company" },
                { key: "website", label: "Website" },
                { key: "email", label: "Email" },
                { key: "contactNumber", label: "Contact Number" },
                { key: "whatsappNumber", label: "WhatsApp Number" },
                { key: "factoryAddress1", label: "Factory Address Line 1" },
                { key: "factoryAddress2", label: "Factory Address Line 2" },
                { key: "factoryAddress3", label: "Factory Address Line 3" },
              ])}
          </section>

          {/* 2️⃣ Key Personnel Details */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection("section2")}
            >
              2️⃣ Key Personnel Details
              <span>{sections.section2 ? "▲" : "▼"}</span>
            </h2>
            {sections.section2 &&
              renderFields([
                { key: "managingDirectorName", label: "Managing Director / CEO" },
                { key: "cfoName", label: "CFO Name" },
                { key: "businessDevelopmentHead", label: "Business Development Head" },
                { key: "qaqcHead", label: "QA / QC Head" },
                { key: "regulatoryAffairsHead", label: "Regulatory Affairs Head" },
                { key: "rdHead", label: "R&D Head" },
                { key: "productionPlantHead", label: "Production / Plant Head" },
                { key: "hrAdminHead", label: "HR & Admin Head" },
                { key: "pharmacovigilanceContact", label: "Pharmacovigilance Contact" },
              ])}
          </section>

          {/* 3️⃣ Accreditation & Certification Master */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection("section3")}
            >
              3️⃣ Accreditation & Certification Master
              <span>{sections.section3 ? "▲" : "▼"}</span>
            </h2>
            {sections.section3 &&
              renderFields([
                { key: "licensetype", label: "License Type" },
                { key: "licensenumber", label: "License Number" },
                { key: "validity", label: "Validity Period" },
                { key: "drugManufacturingLicenseType", label: "Drug Manufacturing License Type" },
                { key: "issuingAuthority", label: "Issuing Authority" },
              ])}
          </section>

          {/* 4️⃣ Factory / Site Master */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2 onClick={() => toggleSection("section4")} className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center">
              4️⃣ Factory / Site Master
              <span>{sections.section4 ? "▲" : "▼"}</span>
            </h2>
            {sections.section4 && renderFields([
              { key: "siteName", label: "Site Name" },
              { key: "siteType", label: "Site Type" },
              { key: "siteAddress", label: "Site Address" },
              { key: "manufacturingDepartments", label: "Manufacturing Departments" },
              { key: "stpDetails", label: "STP Details" },
              { key: "utilityDetails", label: "Utility Details" },
              { key: "cleanroomclassification", label: "Cleanroom Classification" },
              { key: "GPSlocation", label: "GPS Location" },
            ])}
          </section>

          {/* 5️⃣ Product Capabilities Master */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2 onClick={() => toggleSection("section5")} className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center">
              5️⃣ Product Capabilities Master
              <span>{sections.section5 ? "▲" : "▼"}</span>
            </h2>
            {sections.section5 && renderFields([
              { key: "dosageForm", label: "Dosage Form" },
              { key: "therapeuticCategory", label: "Therapeutic Category" },
              { key: "batchSize", label: "Batch Size" },
              { key: "annualCapacity", label: "Annual Capacity" },
              { key: "brandsmanufactured", label: "Brands Manufactured" },
              { key: "exportMarketAuthorization", label: "Export Market Authorization" },
            ])}
          </section>

          {/* 6️⃣ Quality & Compliance Master */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2 onClick={() => toggleSection("section6")} className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center">
              6️⃣ Quality & Compliance Master
              <span>{sections.section6 ? "▲" : "▼"}</span>
            </h2>
            {sections.section6 && renderFields([
              { key: "qualityManagementSystem", label: "Quality Management System" },
              { key: "documentControlSoftware", label: "Document Control Software" },
              { key: "validationMaster", label: "Validation Master" },
              { key: "auditHistory", label: "Audit History" },
              { key: "changeControlProcess", label: "Change Control Process" },
            ])}
          </section>

          {/* 7️⃣ Equipment & Calibration Master */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2 onClick={() => toggleSection("section7")} className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center">
              7️⃣ Equipment & Calibration Master
              <span>{sections.section7 ? "▲" : "▼"}</span>
            </h2>
            {sections.section7 && renderFields([
              { key: "equipmentNo", label: "Equipment No" },
              { key: "equipmentLocation", label: "Equipment Location" },
              { key: "dueDate", label: "Due Date" },
              { key: "maintenanceSchedule", label: "Maintenance Schedule" },
              { key: "qualificationStatus", label: "Qualification Status" },
              { key: "equipmentSoftware", label: "Equipment Software" },
            ])}
          </section>

          {/* 8️⃣ Raw Material & Supplier Master */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2 onClick={() => toggleSection("section8")} className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center">
              8️⃣ Raw Material & Supplier Master
              <span>{sections.section8 ? "▲" : "▼"}</span>
            </h2>
            {sections.section8 && renderFields([
              { key: "supplierName", label: "Supplier Name" },
              { key: "supplierAddress", label: "Supplier Address" },
              { key: "materialName", label: "Material Name" },
              { key: "venderType", label: "Vendor Type" },
              { key: "coaAvailability", label: "COA Availability" },
              { key: "approvedVendorStatus", label: "Approved Vendor Status" },
              { key: "auditScore", label: "Audit Score %" },
              { key: "lastAuditDate", label: "Last Audit Date" },
              { key: "sourceTraceability", label: "Source Traceability" },
            ])}
          </section>

          {/* 9️⃣ Contract / Business Terms Master */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2 onClick={() => toggleSection("section9")} className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center">
              9️⃣ Contract / Business Terms Master
              <span>{sections.section9 ? "▲" : "▼"}</span>
            </h2>
            {sections.section9 && renderFields([
              { key: "agreementType", label: "Agreement Type" },
              { key: "contactstartDate", label: "Contract Start Date" },
              { key: "contactEndDate", label: "Contract End Date" },
              { key: "leadTime", label: "Lead Time / MOQ" },
              { key: "pricingTerms", label: "Pricing Terms" },
              { key: "exclusivityclauses", label: "Exclusivity Clauses" },
              { key: "penaltyClauses", label: "Penalty Clauses" },
              { key: "paymentTerms", label: "Payment Terms" },
            ])}
          </section>

          {/* 🔟 Regulatory Affairs Master */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2 onClick={() => toggleSection("section10")} className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center">
              🔟 Regulatory Affairs Master
              <span>{sections.section10 ? "▲" : "▼"}</span>
            </h2>
            {sections.section10 && renderFields([
              { key: "dossierPrepared", label: "CTD/eCTD Dossier Prepared" },
              { key: "marketRegistration", label: "Market Registrations" },
              { key: "DMFandCEPfailed", label: "DMF / CEP Filed" },
              { key: "productStabilityDataAvailable", label: "Product Stability Data Available" },
              { key: "systemused", label: "Pharmacovigilance System Used" },
              { key: "ProductRecallHistory", label: "Product Recall History" },
            ])}
          </section>

          {/* 11️⃣ Environmental (EHS / ESG) Master */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2 onClick={() => toggleSection("section11")} className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center">
              1️⃣1️⃣ Environmental (EHS / ESG) Master
              <span>{sections.section11 ? "▲" : "▼"}</span>
            </h2>
            {sections.section11 && renderFields([
              { key: "safetyOfficerName", label: "Safety Officer Name" },
              { key: "employeeCount", label: "Employee Count" },
              { key: "diversityRatio", label: "Diversity Ratio" },
              { key: "csrInitiatives", label: "CSR Initiatives" },
              { key: "localEmployment", label: "Local Employment" },
              { key: "boardComposition", label: "Board Composition" },
              { key: "codeOfConduct", label: "Code of Conduct" },
              { key: "whistleblowerPolicy", label: "Whistleblower Policy" },
              { key: "DataPrivacyandITCompliance", label: "Data Privacy & IT Compliance" },
              { key: "esgReportingFrequency", label: "ESG Reporting Frequency" },
            ])}
          </section>

          {/* 12️⃣ Digital System Integration Master */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2 onClick={() => toggleSection("section12")} className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center">
              1️⃣2️⃣ Digital System Integration Master
              <span>{sections.section12 ? "▲" : "▼"}</span>
            </h2>
            {sections.section12 && renderFields([
              { key: "ERPused", label: "ERP Used" },
              { key: "integration", label: "Integration" },
              { key: "serializationSystem", label: "Serialization System" },
              { key: "dataBackupFrequency", label: "Data Backup Frequency" },
              { key: "cyberSecurityMeasures", label: "Cybersecurity Measures" },
              { key: "compliance", label: "Compliance" },
            ])}
          </section>

          {/* 13️⃣ Intellectual Property & R&D Master */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2 onClick={() => toggleSection("section13")} className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center">
              1️⃣3️⃣ Intellectual Property & R&D Master
              <span>{sections.section13 ? "▲" : "▼"}</span>
            </h2>
            {sections.section13 && renderFields([
              { key: "formulstionOwnership", label: "Formulation Ownership" },
              { key: "patentNumber", label: "Patent Number" },
              { key: "productDevelopmentState", label: "Product Development Stage" },
              { key: "stabilityStudiesStatus", label: "Stability Studies Status" },
              { key: "studyData", label: "Study Data" },
              { key: "RandDColaborationsDetails", label: "R&D Collaborations Details" },
            ])}
          </section>

          {/* 14️⃣ Audit & Performance Master */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2 onClick={() => toggleSection("section14")} className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center">
              1️⃣4️⃣ Audit & Performance Master
              <span>{sections.section14 ? "▲" : "▼"}</span>
            </h2>
            {sections.section14 && renderFields([
              { key: "internalAuditfrequency", label: "Internal Audit Frequency" },
              { key: "customerauditHistory", label: "Customer Audit History" },
              { key: "RegulatoryAuditObservations", label: "Regulatory Audit Observations" },
              { key: "CAPAcloser", label: "CAPA Closure" },
              { key: "qualityrating", label: "Quality Rating" },
              { key: "performanceReviewNotes", label: "Performance Review Notes" },
            ])}
          </section>


          <div className="flex justify-center pt-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-400 text-white px-6 py-2 rounded-lg shadow"
            >
              <FaBackward className=""/> <span className="ml-2">Back to Manufacturers</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewManufacturer;
