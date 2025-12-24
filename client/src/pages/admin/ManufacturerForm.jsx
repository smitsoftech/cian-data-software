// import React, { useState } from "react";
// import AdminSidebar from "../../components/admin/AdminSidebar";

// const ManufacturerForm = () => {
//   const [showsidebar, setShowsidebar] = useState(false);
//   const [formData, setFormData] = useState({
//     manufacturerName: "",
//     cinNumber: "",
//     panGstNumber: "",
//     incorporationYear: "",
//     typeOfCompany: "",
//     parentCompany: "",
//     website: "",
//     email: "",
//     contactNumber: "",
//     whatsappNumber: "",
//     factoryAddress1: "",
//     factoryAddress2: "",
//     factoryAddress3: "",
//     managingDirectorName: "",
//     cfoName: "",
//     businessDevelopmentHead: "",
//     qaqcHead: "",
//     regulatoryAffairsHead: "",
//     rdHead: "",
//     productionPlantHead: "",
//     hrAdminHead: "",
//     pharmacovigilanceContact: "",
//     authorizedSignatory: "",
//     contactDetails: "",
//     licensetype: "",
//     licensenumber: "",
//     validity: "",
//     drugManufacturingLicenseType: "",
//     renewalDate: "",
//     issuingAuthority: "",
//     RegulatoryInspectionHistory: "",
//     siteName: "",
//     siteType: "",
//     siteAddress: "",
//     manufacturingDepartments: "",
//     stpDetails: "",
//     utilityDetails: "",
//     cleanroomclassification: "",
//     GPSlocation: "",
//     dosageForm: "",
//     therapeuticCategory: "",
//     batchSize: "",
//     annualCapacity: "",
//     brandsmanufactured: "",
//     exportMarketAuthorization: "",
//     qualityManagementSystem: "",
//     documentControlSoftware: "",
//     validationMaster: "",
//     auditHistory: "",
//     changeControlProcess: "",
//     equipmentNo: "",
//     equipmentLocation: "",
//     dueDate: "",
//     maintenanceSchedule: "",
//     qualificationStatus: "",
//     equipmentSoftware: "",
//     supplierName: "",
//     supplierAddress: "",
//     materialName: "",
//     venderType: "",
//     coaAvailability: "",
//     approvedVendorStatus: "",
//     auditScore: "",
//     lastAuditDate: "",
//     sourceTraceability: "",
//     agreementType: "",
//     contactstartDate: "",
//     contactEndDate: "",
//     leadTime: "",
//     pricingTerms: "",
//     exclusivityclauses: "",
//     penaltyClauses: "",
//     paymentTerms: "",
//     dossierPrepared: "",
//     marketRegistration: "",
//     DMFandCEPfailed: "",
//     productStabilityDataAvailable: "",
//     systemused: "",
//     ProductRecallHistory: "",
//     ERPused: "",
//     integration: "",
//     serializationSystem: "",
//     dataBackupFrequency: "",
//     cyberSecurityMeasures: "",
//     compliance: "",
//     formulstionOwnership: "",
//     patentNumber: "",
//     productDevelopmentState: "",
//     stabilityStudiesStatus: "",
//     studyData: "",
//     RandDColaborationsDetails: "",
//     internalAuditfrequency: "",
//     customerauditHistory: "",
//     RegulatoryAuditObservations: "",
//     CAPAcloser: "",
//     qualityrating: "",
//     performanceReviewNotes: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${import.meta.env.VITE_SERVER}/api/manufacturers/add`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       if (res.ok) {
//         alert("Manufacturer data saved successfully!");
//       } else {
//         alert("Error saving data");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Server error");
//     }
//   };

//   // ✅ Sidebar toggle
//   const handleSideBar = () => setShowsidebar((prev) => !prev);

//   return (
//     <div className="flex h-screen bg-white">
//       {/* Sidebar */}
//       {/* <aside className="w-64 bg-indigo-700 text-white p-4">
//         <h2 className="text-2xl font-bold mb-6">ERP Dashboard</h2>
//         <ul className="space-y-3">
//           <li className="hover:bg-indigo-600 p-2 rounded">🏭 Manufacturers</li>
//           <li className="hover:bg-indigo-600 p-2 rounded">📦 Products</li>
//           <li className="hover:bg-indigo-600 p-2 rounded">📈 Reports</li>
//           <li className="hover:bg-indigo-600 p-2 rounded">⚙️ Settings</li>
//         </ul>
//       </aside> */}

//       <AdminSidebar sidebar={{ showsidebar, handleSideBar }} />

//       {/* Main Content */}
//       <div className="flex-1 p-6 overflow-y-auto">
//         <header className="mb-6 border-b pb-3">
//           <h1 className="text-2xl font-bold text-gray-800">
//             Manufacturer Master Form
//           </h1>
//         </header>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Section 1: Basic Info */}
//           <section className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-indigo-700">
//               1️⃣ Manufacturer Information
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {[
//                 { key: "manufacturerName", label: "Manufacturer Name" },
//                 { key: "cinNumber", label: "CIN Number" },
//                 { key: "panGstNumber", label: "PAN / GST Number" },
//                 { key: "incorporationYear", label: "Incorporation Year" },
//                 { key: "typeOfCompany", label: "Type of Company" },
//                 { key: "parentCompany", label: "Parent Company (if applicable)" },
//                 { key: "website", label: "Website" },
//                 { key: "email", label: "Email" },
//                 { key: "contactNumber", label: "Contact Number" },
//                 { key: "whatsappNumber", label: "WhatsApp Number" },
//                 { key: "factoryAddress1", label: "Factory Address Line 1" },
//                 { key: "factoryAddress2", label: "Factory Address Line 2" },
//                 { key: "factoryAddress3", label: "Factory Address Line 3" },
//               ].map(({ key, label }) => (
//                 <div key={key}>
//                   <label className="block text-sm font-medium text-gray-700">
//                     {label}
//                   </label>
//                   <input
//                     type="text"
//                     name={key}
//                     value={formData[key]}
//                     onChange={handleChange}
//                     className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>


//           {/* Example of another section */}
//           <section className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-indigo-700">
//               2️⃣ Key Personnel Details
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {[
//                 { key: "managingDirectorName", label: "Managing Director / CEO / CMD Name" },
//                 { key: "cfoName", label: "Chief Financial Officer (CFO) Name" },
//                 { key: "businessDevelopmentHead", label: "Business Development Head" },
//                 { key: "qaqcHead", label: "QA / QC Head" },
//                 { key: "regulatoryAffairsHead", label: "Regulatory Affairs Head" },
//                 { key: "rdHead", label: "R&D Head" },
//                 { key: "productionPlantHead", label: "Production / Plant Head" },
//                 { key: "hrAdminHead", label: "HR & Admin Head" },
//                 { key: "pharmacovigilanceContact", label: "Pharmacovigilance Contact Person" },
//                 { key: "authorizedSignatory", label: "Authorized Signatory" },
//                 { key: "contactDetails", label: "Contact Details" },
//               ].map(({ key, label }) => (
//                 <div key={key}>
//                   <label className="block text-sm font-medium text-gray-700">
//                     {label}
//                   </label>
//                   <input
//                     type="text"
//                     name={key}
//                     value={formData[key]}
//                     onChange={handleChange}
//                     className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>

//           <section className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-indigo-700">
//               3️⃣ Accreditation & Certification Master
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {[
//                 { key: "licensetype", label: "License Type" },
//                 { key: "licensenumber", label: "License Number" },
//                 { key: "validity", label: "Validity Period" },
//                 { key: "drugManufacturingLicenseType", label: "Drug Manufacturing License Type" },
//                 { key: "renewalDate", label: "Renewal Date" },
//                 { key: "issuingAuthority", label: "Issuing Authority" },
//                 { key: "RegulatoryInspectionHistory", label: "Regulatory Inspection History (EU-GMP / USFDA / MHRA)" },
//               ].map(({ key, label }) => (
//                 <div key={key}>
//                   <label className="block text-sm font-medium text-gray-700">
//                     {label}
//                   </label>
//                   <input
//                     type="text"
//                     name={key}
//                     value={formData[key]}
//                     onChange={handleChange}
//                     className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* 4️⃣ Factory / Site Master */}
//           <section className="bg-white shadow rounded-lg p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-4 text-indigo-700">
//               4️⃣ Factory / Site Master
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {[
//                 { key: "siteName", label: "Site Name" },
//                 { key: "siteType", label: "Site Type" },
//                 { key: "siteAddress", label: "Site Address" },
//                 { key: "manufacturingDepartments", label: "Manufacturing Departments" },
//                 { key: "stpDetails", label: "STP Details" },
//                 { key: "utilityDetails", label: "Utility Details" },
//                 { key: "cleanroomclassification", label: "Cleanroom Classification" },
//                 { key: "GPSlocation", label: "GPS Location" },
//               ].map(({ key, label }) => (
//                 <div key={key}>
//                   <label className="block text-sm font-medium text-gray-700">
//                     {label}
//                   </label>
//                   <input
//                     type="text"
//                     name={key}
//                     value={formData[key]}
//                     onChange={handleChange}
//                     className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* 5️⃣ Product Capabilities Master */}
//           <section className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-indigo-700">
//               5️⃣ Product Capabilities Master
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {[
//                 { key: "dosageForm", label: "Dosage Form" },
//                 { key: "therapeuticCategory", label: "Therapeutic Category" },
//                 { key: "batchSize", label: "Batch Size" },
//                 { key: "annualCapacity", label: "Annual Capacity" },
//                 { key: "brandsmanufactured", label: "Brands Manufactured" },
//                 { key: "exportMarketAuthorization", label: "Export Market Authorization" },
//               ].map(({ key, label }) => (
//                 <div key={key}>
//                   <label className="block text-sm font-medium text-gray-700">
//                     {label}
//                   </label>
//                   <input
//                     type="text"
//                     name={key}
//                     value={formData[key]}
//                     onChange={handleChange}
//                     className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* 6️⃣ Quality & Compliance Master */}
//           <section className="bg-white shadow rounded-lg p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-4 text-indigo-700">
//               6️⃣ Quality & Compliance Master
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {[
//                 { key: "qualityManagementSystem", label: "Quality Management System" },
//                 { key: "documentControlSoftware", label: "Document Control Software" },
//                 { key: "validationMaster", label: "Validation Master" },
//                 { key: "auditHistory", label: "Audit History" },
//                 { key: "changeControlProcess", label: "Change Control Process" },
//               ].map(({ key, label }) => (
//                 <div key={key}>
//                   <label className="block text-sm font-medium text-gray-700">
//                     {label}
//                   </label>
//                   <input
//                     type="text"
//                     name={key}
//                     value={formData[key]}
//                     onChange={handleChange}
//                     className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* 7️⃣ Equipment & Calibration Master */}
//           <section className="bg-white shadow rounded-lg p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-4 text-indigo-700">
//               7️⃣ Equipment & Calibration Master
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {[
//                 { key: "equipmentNo", label: "Equipment No" },
//                 { key: "equipmentLocation", label: "Equipment Location" },
//                 { key: "dueDate", label: "Due Date" },
//                 { key: "maintenanceSchedule", label: "Maintenance Schedule" },
//                 { key: "qualificationStatus", label: "Qualification Status" },
//                 { key: "equipmentSoftware", label: "Equipment Software" },
//               ].map(({ key, label }) => (
//                 <div key={key}>
//                   <label className="block text-sm font-medium text-gray-700">
//                     {label}
//                   </label>
//                   <input
//                     type={key === "dueDate" ? "date" : "text"}
//                     name={key}
//                     value={formData[key]}
//                     onChange={handleChange}
//                     className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* 8️⃣ Raw Material & Supplier Master */}
//           <section className="bg-white shadow rounded-lg p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-4 text-indigo-700">
//               8️⃣ Raw Material & Supplier Master
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {[
//                 { key: "supplierName", label: "Supplier Name" },
//                 { key: "supplierAddress", label: "Supplier Address" },
//                 { key: "materialName", label: "Material Name" },
//                 { key: "venderType", label: "Vendor Type" },
//                 { key: "coaAvailability", label: "COA Availability" },
//                 { key: "approvedVendorStatus", label: "Approved Vendor Status" },
//                 { key: "auditScore", label: "Audit Score" },
//                 { key: "lastAuditDate", label: "Last Audit Date" },
//                 { key: "sourceTraceability", label: "Source Traceability" },
//               ].map(({ key, label }) => (
//                 <div key={key}>
//                   <label className="block text-sm font-medium text-gray-700">
//                     {label}
//                   </label>
//                   <input
//                     type={key === "lastAuditDate" ? "date" : "text"}
//                     name={key}
//                     value={formData[key]}
//                     onChange={handleChange}
//                     className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* 9️⃣ Contract / Business Terms Master */}
//           <section className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-indigo-700">
//               9️⃣ Contract / Business Terms Master
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {[
//                 { name: "agreementType", label: "Agreement Type (LOI, Contract, P2P, Buy-Back)" },
//                 { name: "contactstartDate", label: "Contract Start Date" },
//                 { name: "contactEndDate", label: "Contract End Date" },
//                 { name: "leadTime", label: "Lead Time / MOQ" },
//                 { name: "pricingTerms", label: "Pricing Terms (Ex-Works / CIF / FOB)" },
//                 { name: "exclusivityclauses", label: "Confidentiality / Exclusivity Clauses" },
//                 { name: "penaltyClauses", label: "Penalty Clauses / SLAs" },
//                 { name: "paymentTerms", label: "Payment Terms" },
//               ].map((field) => (
//                 <div key={field.name}>
//                   <label className="block text-sm font-medium text-gray-700">{field.label}</label>
//                   <input
//                     type={
//                       field.name === "contactstartDate" || field.name === "contactEndDate"
//                         ? "date"
//                         : "text"
//                     }
//                     name={field.name}
//                     value={formData[field.name]}
//                     onChange={handleChange}
//                     className="mt-1 p-2 border rounded w-full"
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* 🔟 Regulatory Affairs Master */}
//           <section className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-indigo-700">
//               🔟 Regulatory Affairs Master
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {[
//                 { name: "dossierPrepared", label: "CTD/eCTD Dossier Prepared (Yes/No)" },
//                 { name: "marketRegistration", label: "Market Registrations (India, ROW, EU, USA, etc.)" },
//                 { name: "DMFandCEPfailed", label: "DMF / CEP Filed" },
//                 { name: "productStabilityDataAvailable", label: "Product Stability Data Available (Yes/No)" },
//                 { name: "systemused", label: "Pharmacovigilance System Used" },
//                 { name: "ProductRecallHistory", label: "Product Recall History" },
//               ].map((field) => (
//                 <div key={field.name}>
//                   <label className="block text-sm font-medium text-gray-700">{field.label}</label>
//                   <input
//                     name={field.name}
//                     value={formData[field.name]}
//                     onChange={handleChange}
//                     className="mt-1 p-2 border rounded w-full"
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* 1️⃣2️⃣ Digital System Integration Master */}
//           <section className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-indigo-700">
//               1️⃣2️⃣ Digital System Integration Master
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {[
//                 { name: "ERPused", label: "ERP Used" },
//                 { name: "integration", label: "Integration" },
//                 { name: "serializationSystem", label: "Serialization System" },
//                 { name: "dataBackupFrequency", label: "Data Backup Frequency" },
//                 { name: "cyberSecurityMeasures", label: "Cybersecurity Measures" },
//                 { name: "compliance", label: "Compliance" },
//               ].map((field) => (
//                 <div key={field.name}>
//                   <label className="block text-sm font-medium text-gray-700">{field.label}</label>
//                   <input
//                     name={field.name}
//                     value={formData[field.name]}
//                     onChange={handleChange}
//                     className="mt-1 p-2 border rounded w-full"
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* 1️⃣3️⃣ Intellectual Property & R&D Master */}
//           <section className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-indigo-700">
//               1️⃣3️⃣ Intellectual Property & R&D Master
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {[
//                 { name: "formulstionOwnership", label: "Formulation Ownership" },
//                 { name: "patentNumber", label: "Patent Number" },
//                 { name: "productDevelopmentState", label: "Product Development Stage" },
//                 { name: "stabilityStudiesStatus", label: "Stability Studies Status" },
//                 { name: "studyData", label: "Study Data" },
//                 { name: "RandDColaborationsDetails", label: "R&D Collaborations Details" },
//               ].map((field) => (
//                 <div key={field.name}>
//                   <label className="block text-sm font-medium text-gray-700">{field.label}</label>
//                   <input
//                     name={field.name}
//                     value={formData[field.name]}
//                     onChange={handleChange}
//                     className="mt-1 p-2 border rounded w-full"
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* 1️⃣4️⃣ Audit & Performance Master */}
//           <section className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-indigo-700">
//               1️⃣4️⃣ Audit & Performance Master
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {[
//                 { name: "internalAuditfrequency", label: "Internal Audit Frequency" },
//                 { name: "customerauditHistory", label: "Customer Audit History" },
//                 { name: "RegulatoryAuditObservations", label: "Regulatory Audit Observations" },
//                 { name: "CAPAcloser", label: "CAPA Closure" },
//                 { name: "qualityrating", label: "Quality Rating" },
//                 { name: "performanceReviewNotes", label: "Performance Review Notes" },
//               ].map((field) => (
//                 <div key={field.name}>
//                   <label className="block text-sm font-medium text-gray-700">{field.label}</label>
//                   <input
//                     name={field.name}
//                     value={formData[field.name]}
//                     onChange={handleChange}
//                     className="mt-1 p-2 border rounded w-full"
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>




//           {/* More sections can be added similarly */}

//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow"
//             >
//               💾 Save Manufacturer
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ManufacturerForm;



import React, { useState, useEffect, useRef } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


const ManufacturerForm = ({ mode = "add" }) => {
  const { id } = useParams();
  const [searchId, setSearchId] = useState(""); // ✅ Input for "Get Manufacturer"

  const [showsidebar, setShowsidebar] = useState(false);
  const [showSection1, setShowSection1] = useState(true);
  const [showSection2, setShowSection2] = useState(false);
  const [showSection3, setShowSection3] = useState(true);
  const [showSection4, setShowSection4] = useState(false);
  const [showSection5, setShowSection5] = useState(true);
  const [showSection6, setShowSection6] = useState(false);
  const [showSection7, setShowSection7] = useState(false);
  const [showSection8, setShowSection8] = useState(false);
  const [showSection9, setShowSection9] = useState(false);
  const [showSection10, setShowSection10] = useState(false);
  const [showSection11, setShowSection11] = useState(false);
  const [showSection12, setShowSection12] = useState(false);
  const [showSection13, setShowSection13] = useState(false);
  const [showSection14, setShowSection14] = useState(false);
  const [showLicenseDropdown, setShowLicenseDropdown] = useState(false);
  const [showDrugLicenseDropdown, setShowDrugLicenseDropdown] = useState(false);
  const [showInspectionDropdown, setShowInspectionDropdown] = useState(false);

  const licenseDropdownRef = useRef(null);
  const drugLicenseDropdownRef = useRef(null);
  const inspectionDropdownRef = useRef(null);


  useEffect(() => {
    function handleClickOutside(e) {
      if (licenseDropdownRef.current && !licenseDropdownRef.current.contains(e.target)) {
        setShowLicenseDropdown(false);
      }
    }

    function handleEscape(e) {
      if (e.key === "Escape") setShowLicenseDropdown(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);


  const [formData, setFormData] = useState({
    manufacturerName: "",
    cinNumber: "",
    panGstNumber: "",
    incorporationYear: "",
    typeOfCompany: "",
    parentCompany: "",
    website: "",
    email: "",
    contactNumber: "",
    whatsappNumber: "",
    factoryAddress1: "",
    factoryAddress2: "",
    factoryAddress3: "",
    managingDirectorName: "",
    cfoName: "",
    businessDevelopmentHead: "",
    qaqcHead: "",
    regulatoryAffairsHead: "",
    rdHead: "",
    productionPlantHead: "",
    hrAdminHead: "",
    pharmacovigilanceContact: "",
    authorizedSignatory: "",
    contactDetails: "",
    licensetype: [],
    licensenumber: "",
    validity: "",
    drugManufacturingLicenseType: [],
    renewalDate: "",
    issuingAuthority: "",
    RegulatoryInspectionHistory: [],
    siteName: "",
    siteType: "",
    siteAddress: "",
    manufacturingDepartments: "",
    stpDetails: "",
    utilityDetails: "",
    cleanroomclassification: "",
    GPSlocation: "",
    dosageForm: "",
    therapeuticCategory: "",
    batchSize: "",
    annualCapacity: "",
    brandsmanufactured: "",
    exportMarketAuthorization: "",
    qualityManagementSystem: "",
    documentControlSoftware: "",
    validationMaster: "",
    auditHistory: "",
    changeControlProcess: "",
    equipmentNo: "",
    equipmentLocation: "",
    dueDate: "",
    maintenanceSchedule: "",
    qualificationStatus: "",
    equipmentSoftware: "",
    supplierName: "",
    supplierAddress: "",
    materialName: "",
    venderType: "",
    coaAvailability: "",
    approvedVendorStatus: "",
    auditScore: "",
    lastAuditDate: "",
    sourceTraceability: "",
    agreementType: "",
    contactstartDate: "",
    contactEndDate: "",
    leadTime: "",
    pricingTerms: "",
    exclusivityclauses: "",
    penaltyClauses: "",
    paymentTerms: "",
    dossierPrepared: "",
    marketRegistration: "",
    DMFandCEPfailed: "",
    productStabilityDataAvailable: "",
    systemused: "",
    ProductRecallHistory: "",
    ERPused: "",
    integration: "",
    serializationSystem: "",
    dataBackupFrequency: "",
    cyberSecurityMeasures: "",
    compliance: "",
    formulstionOwnership: "",
    patentNumber: "",
    productDevelopmentState: "",
    stabilityStudiesStatus: "",
    studyData: "",
    RandDColaborationsDetails: "",
    internalAuditfrequency: "",
    customerauditHistory: "",
    RegulatoryAuditObservations: "",
    CAPAcloser: "",
    qualityrating: "",
    performanceReviewNotes: "",

    safetyOfficerName: "",
    employeeCount: "",
    diversityRatio: "",
    csrInitiatives: "",
    localEmployment: "",
    boardComposition: "",
    codeOfConduct: "",
    whistleblowerPolicy: "",
    DataPrivacyandITCompliance: "",
    esgReportingFrequency: "",

  });

  const licenseTypes = [
    "NON–β-LACTAM BLOCK",
    "β-LACTAM BLOCK (Dedicated)",
    "Cephalosporin Block (Dedicated)",
    "Penicillin Block (Dedicated)",
    "Carbapenem Block (Dedicated)",
    "Oncology / Cytotoxic Block (Dedicated)",
    "Hormonal Block (Dedicated)",
    "Steroid Block (Dedicated)",
    "Veterinary Block",
    "Sterile Injectable Block",
    "Ophthalmic / Nasal Sterile Block",
    "OSD Block (Oral Solids)",
    "Liquid Orals Block",
    "Ointment / Cream / Gel Block",
    "AYUSH Block",
    "Cosmetics Block",
    "Nutraceutical (FSSAI) Block",

  ]

const drugManufacturingLicenseTypes = [
  "WHO GMP",
  "PIC/S GMP",
  "EU GMP",
  "US FDA (cGMP)",
  "UK MHRA GMP",
  "Health Canada GMP",
  "TGA Australia GMP",
  "Japan GMP (PMDA)",
  "ANVISA Brazil GMP",
  "GCC GMP (SFDA / MOHAP)",
  "Cambodia MOH / DDF Approval",
  "Myanmar FDA Approval",
  "Sri Lanka NMRA Approval",
  "Vietnam DAV Approval",
  "Philippines FDA Approval",
  "Ukraine GMP (SMDC)",
  "Kenya PPB Approval",
  "Tanzania TMDA Approval",
  "Uganda NDA Approval"
];


  const inspectionTypes = ["EU-GMP", "USFDA", "MHRA"];

  const toggleMultiSelect = (field, value) => {
    if (!value) return;

    setFormData((prev) => {
      const list = prev[field]?.filter(Boolean) || [];
      return {
        ...prev,
        [field]: list.includes(value)
          ? list.filter((v) => v !== value)
          : [...list, value],
      };
    });
  };


  const MultiSelectBox = ({
    placeholder,
    value = [],
    show,
    setShow,
    options,
    onChange,
  }) => (
    <>
      <div
        onClick={() => setShow((s) => !s)}
        className="mt-1 p-2 border rounded w-full bg-white cursor-pointer flex justify-between items-center"
      >
        <span className={value.length ? "text-gray-700" : "text-gray-400"}>
          {value.filter(Boolean).length
            ? value.filter(Boolean).join(", ")
            : placeholder}
        </span>

        <span className="text-gray-500">▾</span>
      </div>

      {show && (
        <div className="absolute z-20 mt-1 w-full max-h-64 overflow-y-auto border bg-white rounded shadow-lg p-3">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={value.includes(opt)}
                onChange={() => onChange(opt)}
                className="h-4 w-4"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}
    </>
  );


  // ✅ Get manufacturer by ID
  const handleFetchManufacturer = async () => {
    if (!searchId.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Enter Manufacturer ID!",
        text: "Please enter a valid manufacturer ID to fetch data.",
        confirmButtonColor: "#6B46C1",
      });
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER}/api/manufacturers/${searchId}`
      );
      const data = await res.json();

      if (data?.success && data?.data) {
        setFormData((prev) => ({ ...prev, ...data.data }));

        Swal.fire({
          icon: "success",
          title: "Manufacturer Loaded!",
          text: "Fields have been pre-filled from the existing manufacturer.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Not Found!",
          text: "No manufacturer found with that ID.",
        });
      }
    } catch (error) {
      console.error("❌ Error fetching manufacturer:", error);
      Swal.fire({
        icon: "error",
        title: "Fetch Failed!",
        text: "Unable to fetch manufacturer details.",
      });
    }
  };

  // ✅ If editing, fetch existing data
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER}/api/manufacturers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(prev => ({
          ...prev,
          ...data.data
        }));
      });
  }, [id]);


  const handleSideBar = () => setShowsidebar((prev) => !prev);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const url =
  //     mode === "edit"
  //       ? `${import.meta.env.VITE_SERVER}/api/manufacturers/${id}`
  //       : `${import.meta.env.VITE_SERVER}/api/manufacturers/add`;

  //   const method = mode === "edit" ? "PUT" : "POST";

  //   const res = await fetch(url, {
  //     method,
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(formData),
  //   });

  //   if (res.ok) {
  //     Swal.fire({
  //       icon: "success",
  //       title: mode === "edit" ? "Updated Successfully!" : "Created Successfully!",
  //       text: mode === "edit" ? "Manufacturer details have been updated." : "New manufacturer added.",
  //       showConfirmButton: false,
  //       timer: 2000,
  //     });
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error!",
  //       text: "Something went wrong. Please try again.",
  //       showConfirmButton: true,
  //     });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🧹 Clean up formData to avoid duplicate _id or metadata errors
      const { _id, createdAt, updatedAt, __v, ...cleanData } = formData;

      const url =
        mode === "edit"
          ? `${import.meta.env.VITE_SERVER}/api/manufacturers/${id}`
          : `${import.meta.env.VITE_SERVER}/api/manufacturers/add`;

      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        Swal.fire({
          icon: "success",
          title:
            mode === "edit"
              ? "✅ Updated Successfully!"
              : "🎉 Created Successfully!",
          text:
            mode === "edit"
              ? "Manufacturer details have been updated."
              : "New manufacturer has been added successfully.",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "❌ Failed!",
          text: data.message || "Something went wrong. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("❌ Error saving manufacturer:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error!",
        text: "Unable to connect to the server. Please check your connection.",
        confirmButtonColor: "#d33",
      });
    }
  };



  return (
    <div className="flex h-screen bg-white">
      <AdminSidebar sidebar={{ showsidebar, handleSideBar }} />

      <div className="flex-1 p-6 overflow-y-auto">
        <header className="mb-6 border-b pb-3">
          <h1 className="text-2xl font-bold text-gray-800">
            {mode === "edit" ? "✏️ Edit Manufacturer" : "🏭 Add Manufacturer"}
          </h1>
        </header>

        {/* ✅ New Fetch Section (Visible only in ADD mode) */}
        {mode !== "edit" && (
          <div className="bg-white/80 border border-gray-200 shadow-lg rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Enter Manufacturer ID
              </label>
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="e.g., 6909d6bfb3d6c18e9e4983df"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <button
              onClick={handleFetchManufacturer}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-5 py-2 mt-5 rounded-lg shadow-md transition-all duration-300"
            >
              🔍 Get Manufacturer
            </button>
          </div>
        )}


        {/* 🔥 Same full form below (keep unchanged), only button text changed */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ✅ Your full form as it is */}



          {/* 1️⃣ Manufacturer Information */}
          <section className="bg-white shadow rounded-lg p-6">

            <h2
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
              onClick={() => setShowSection1(!showSection1)}
            >
              1️⃣ Manufacturer Information
              <span>{showSection1 ? "▲" : "▼"}</span>
            </h2>
            {showSection1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: "manufacturerName", label: "Manufacturer Name *", required: true },
                  { key: "cinNumber", label: "CIN Number" },
                  { key: "panGstNumber", label: "PAN / GST Number" },
                  { key: "incorporationYear", label: "Year of Incorporation" },
                  { key: "typeOfCompany", label: "Type (Own / Third Party / Contract / Loan License)" },
                  { key: "parentCompany", label: "Parent / Group Company Name" },
                  { key: "website", label: "Website" },
                  { key: "email", label: "Email" },
                  { key: "contactNumber", label: "Contact Number" },
                  { key: "whatsappNumber", label: "WhatsApp Number" },
                  { key: "factoryAddress1", label: "Factory Address Line 1" },
                  { key: "factoryAddress2", label: "Factory Address Line 2" },
                  { key: "factoryAddress3", label: "Factory Address Line 3" },
                ].map(({ key, label, required }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700  ">
                      {label}
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      required={required}

                      disabled={
                        mode === "edit" &&
                        ["manufacturerName", "cinNumber", "panGstNumber"].includes(key)
                      }
                      className={`  mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none 
            ${mode === "edit" && ["manufacturerName", "cinNumber", "panGstNumber"].includes(key) ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>


          {/* 2️⃣ Key Personnel Details */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
              onClick={() => setShowSection2(!showSection2)}
            >
              2️⃣ Key Personnel Details
              <span>{showSection2 ? "▲" : "▼"}</span>
            </h2>
            {showSection2 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: "managingDirectorName", label: "Managing Director / CEO / CMD Name" },
                  { key: "cfoName", label: "Chief Financial Officer (CFO) Name" },
                  { key: "businessDevelopmentHead", label: "Business Development Head" },
                  { key: "qaqcHead", label: "QA / QC Head" },
                  { key: "regulatoryAffairsHead", label: "Regulatory Affairs Head" },
                  { key: "rdHead", label: "R&D Head" },
                  { key: "productionPlantHead", label: "Production / Plant Head" },
                  { key: "hrAdminHead", label: "HR & Admin Head" },
                  { key: "pharmacovigilanceContact", label: "Pharmacovigilance Contact Person" },
                  { key: "authorizedSignatory", label: "Authorized Signatory" },
                  { key: "contactDetails", label: "Contact Details" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 3️⃣ Accreditation & Certification Master */}
          <section className="bg-white shadow rounded-lg p-6">

            <h2
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
              onClick={() => setShowSection3(!showSection3)}
            >
              3️⃣ Accreditation & Certification Master
              <span>{showSection3 ? "▲" : "▼"}</span>
            </h2>

            {showSection3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {[
                  { key: "licensetype", label: "License Type *" },
                  { key: "licensenumber", label: "License Number" },
                  { key: "validity", label: "Validity Period" },
                  { key: "drugManufacturingLicenseType", label: "Drug Manufacturing License Type" },
                  { key: "renewalDate", label: "Renewal Date" },
                  { key: "issuingAuthority", label: "Issuing Authority" },
                  { key: "RegulatoryInspectionHistory", label: "Regulatory Inspection History (EU-GMP / USFDA / MHRA)" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>

                    {/* 1️⃣ LICENSE TYPE */}
                    {key === "licensetype" && (
                      <div ref={licenseDropdownRef} className="relative">
                        <MultiSelectBox
                          placeholder="Select License Types"
                          value={formData.licensetype}
                          show={showLicenseDropdown}
                          setShow={setShowLicenseDropdown}
                          options={licenseTypes}
                          onChange={(v) => toggleMultiSelect("licensetype", v)}
                        />
                      </div>
                    )}

                    {/* 2️⃣ DRUG MANUFACTURING LICENSE TYPE */}
                    {key === "drugManufacturingLicenseType" && (
                      <div ref={drugLicenseDropdownRef} className="relative">
                        <MultiSelectBox
                          placeholder="Select Drug Manufacturing License Types"
                          value={formData.drugManufacturingLicenseType}
                          show={showDrugLicenseDropdown}
                          setShow={setShowDrugLicenseDropdown}
                          options={drugManufacturingLicenseTypes}
                          onChange={(v) =>
                            toggleMultiSelect("drugManufacturingLicenseType", v)
                          }
                        />
                      </div>
                    )}

                    {/* 3️⃣ INSPECTION HISTORY */}
                    {key === "RegulatoryInspectionHistory" && (
                      <div ref={inspectionDropdownRef} className="relative">
                        <MultiSelectBox
                          placeholder="Select Inspection Types"
                          value={formData.RegulatoryInspectionHistory}
                          show={showInspectionDropdown}
                          setShow={setShowInspectionDropdown}
                          options={inspectionTypes}
                          onChange={(v) =>
                            toggleMultiSelect("RegulatoryInspectionHistory", v)
                          }
                        />
                      </div>
                    )}

                    {/* NORMAL INPUT */}
                    {![
                      "licensetype",
                      "drugManufacturingLicenseType",
                      "RegulatoryInspectionHistory",
                    ].includes(key) && (
                        <input
                          type="text"
                          name={key}
                          value={formData[key] || ""}
                          onChange={handleChange}
                          className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-indigo-500"
                        />
                      )}
                  </div>
                ))}
              </div>
            )}
          </section>



          {/* 4️⃣ Factory / Site Master */}
          <section className="bg-white shadow rounded-lg p-6 mb-6">

            <h2
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
              onClick={() => setShowSection4(!showSection4)}
            >
              4️⃣ Factory / Site Master
              <span>{showSection4 ? "▲" : "▼"}</span>
            </h2>
            {showSection4 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: "siteName", label: "Site Name" },
                  { key: "siteType", label: "Site Type" },
                  { key: "siteAddress", label: "Site Address" },
                  { key: "manufacturingDepartments", label: "Manufacturing Departments" },
                  { key: "stpDetails", label: "STP Details" },
                  { key: "utilityDetails", label: "Utility Details" },
                  { key: "cleanroomclassification", label: "Cleanroom Classification" },
                  { key: "GPSlocation", label: "GPS Location" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 5️⃣ Product Capabilities Master */}
          <section className="bg-white shadow rounded-lg p-6">

            <h2
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
              onClick={() => setShowSection5(!showSection5)}
            >
              5️⃣ Product Capabilities Master
              <span>{showSection5 ? "▲" : "▼"}</span>
            </h2>
            {showSection5 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: "dosageForm", label: "Dosage Form *", required: true },
                  { key: "therapeuticCategory", label: "Therapeutic Category" },
                  { key: "batchSize", label: "Batch Size *", required: true },
                  { key: "annualCapacity", label: "Annual Capacity" },
                  { key: "brandsmanufactured", label: "Brands Manufactured" },
                  { key: "exportMarketAuthorization", label: "Export Market Authorization" },
                ].map(({ key, label, required }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      required={required}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 6️⃣ Quality & Compliance Master */}
          <section className="bg-white shadow rounded-lg p-6 mb-6">
            <h2
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
              onClick={() => setShowSection6(!showSection6)}
            >
              6️⃣ Quality & Compliance Master
              <span>{showSection6 ? "▲" : "▼"}</span>
            </h2>
            {showSection6 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: "qualityManagementSystem", label: "Quality Management System" },
                  { key: "documentControlSoftware", label: "Document Control Software" },
                  { key: "validationMaster", label: "Validation Master" },
                  { key: "auditHistory", label: "Audit History" },
                  { key: "changeControlProcess", label: "Change Control Process" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 7️⃣ Equipment & Calibration Master */}
          <section className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-indigo-700">

            </h2>
            <h2
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
              onClick={() => setShowSection7(!showSection7)}
            >
              7️⃣ Equipment & Calibration Master
              <span>{showSection7 ? "▲" : "▼"}</span>
            </h2>
            {showSection7 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: "equipmentNo", label: "Equipment No" },
                  { key: "equipmentLocation", label: "Equipment Location" },
                  { key: "dueDate", label: "Due Date" },
                  { key: "maintenanceSchedule", label: "Maintenance Schedule" },
                  { key: "qualificationStatus", label: "Qualification Status" },
                  { key: "equipmentSoftware", label: "Equipment Software" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <input
                      type={key === "dueDate" ? "date" : "text"}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 8️⃣ Raw Material & Supplier Master */}
          <section className="bg-white shadow rounded-lg p-6 mb-6">
            <h2
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
              onClick={() => setShowSection8(!showSection8)}
            >
              8️⃣ Raw Material & Supplier Master
              <span>{showSection8 ? "▲" : "▼"}</span>
            </h2>
            {showSection8 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: "supplierName", label: "Supplier Name" },
                  { key: "supplierAddress", label: "Supplier Address" },
                  { key: "materialName", label: "Material Name" },
                  { key: "venderType", label: "Vendor Type" },
                  { key: "coaAvailability", label: "COA Availability" },
                  { key: "approvedVendorStatus", label: "Approved Vendor Status" },
                  { key: "auditScore", label: "Audit Score %" },
                  { key: "lastAuditDate", label: "Last Audit Date" },
                  { key: "sourceTraceability", label: "Source Traceability" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <input
                      type={key === "lastAuditDate" ? "date" : "text"}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 9️⃣ Contract / Business Terms Master */}
          <section className="bg-white shadow rounded-lg p-6">

            <h2
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
              onClick={() => setShowSection9(!showSection9)}
            >
              9️⃣ Contract / Business Terms Master
              <span>{showSection9 ? "▲" : "▼"}</span>
            </h2>
            {showSection9 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "agreementType", label: "Agreement Type (LOI, Contract, P2P, Buy-Back)" },
                  { name: "contactstartDate", label: "Contract Start Date" },
                  { name: "contactEndDate", label: "Contract End Date" },
                  { name: "leadTime", label: "Lead Time / MOQ" },
                  { name: "pricingTerms", label: "Pricing Terms (Ex-Works / CIF / FOB)" },
                  { name: "exclusivityclauses", label: "Confidentiality / Exclusivity Clauses" },
                  { name: "penaltyClauses", label: "Penalty Clauses / SLAs" },
                  { name: "paymentTerms", label: "Payment Terms" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                    <input
                      type={
                        field.name === "contactstartDate" || field.name === "contactEndDate"
                          ? "date"
                          : "text"
                      }
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 🔟 Regulatory Affairs Master */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-indigo-700">

            </h2>
            <h2
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
              onClick={() => setShowSection10(!showSection10)}
            >
              🔟 Regulatory Affairs Master
              <span>{showSection10 ? "▲" : "▼"}</span>
            </h2>
            {showSection10 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "dossierPrepared", label: "CTD/eCTD Dossier Prepared (Yes/No)" },
                  { name: "marketRegistration", label: "Market Registrations (India, ROW, EU, USA, etc.)" },
                  { name: "DMFandCEPfailed", label: "DMF / CEP Filed" },
                  { name: "productStabilityDataAvailable", label: "Product Stability Data Available (Yes/No)" },
                  { name: "systemused", label: "Pharmacovigilance System Used" },
                  { name: "ProductRecallHistory", label: "Product Recall History" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                    <input
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/*1️⃣1️⃣ Environmental (EHS / ESG) Master */}
          <section className="bg-white shadow rounded-lg p-6">

            <h2
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
              onClick={() => setShowSection11(!showSection11)}
            >
              1️⃣1️⃣ Environmental (EHS / ESG) Master
              <span>{showSection11 ? "▲" : "▼"}</span>
            </h2>
            {showSection11 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "safetyOfficerName", label: "Safety Officer Name" },
                  { name: "employeeCount", label: "Employee Count" },
                  { name: "diversityRatio", label: "Diversity Ratio" },
                  { name: "csrInitiatives", label: "CSR Initiatives" },
                  { name: "localEmployment", label: "Local Employment" },
                  { name: "boardComposition", label: "Board Composition" },
                  { name: "codeOfConduct", label: "Code of Conduct" },
                  { name: "whistleblowerPolicy", label: "Whistleblower Policy" },
                  { name: "DataPrivacyandITCompliance", label: "Data Privacy and IT Compliance" },
                  { name: "esgReportingFrequency", label: "ESG Reporting Frequency" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                    <input
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 1️⃣2️⃣ Digital System Integration Master */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
              onClick={() => setShowSection12(!showSection12)}
            >
              1️⃣2️⃣ Digital System Integration Master
              <span>{showSection12 ? "▲" : "▼"}</span>
            </h2>
            {showSection12 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "ERPused", label: "ERP Used" },
                  { name: "integration", label: "Integration" },
                  { name: "serializationSystem", label: "Serialization System" },
                  { name: "dataBackupFrequency", label: "Data Backup Frequency" },
                  { name: "cyberSecurityMeasures", label: "Cybersecurity Measures" },
                  { name: "compliance", label: "Compliance" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                    <input
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 1️⃣3️⃣ Intellectual Property & R&D Master */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-indigo-700">

            </h2>
            <h2
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
              onClick={() => setShowSection13(!showSection13)}
            >
              1️⃣3️⃣ Intellectual Property & R&D Master
              <span>{showSection13 ? "▲" : "▼"}</span>
            </h2>
            {showSection13 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "formulstionOwnership", label: "Formulation Ownership" },
                  { name: "patentNumber", label: "Patent Number" },
                  { name: "productDevelopmentState", label: "Product Development Stage" },
                  { name: "stabilityStudiesStatus", label: "Stability Studies Status" },
                  { name: "studyData", label: "Study Data" },
                  { name: "RandDColaborationsDetails", label: "R&D Collaborations Details" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                    <input
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 1️⃣4️⃣ Audit & Performance Master */}
          <section className="bg-white shadow rounded-lg p-6">

            <h2
              className="text-xl font-semibold mb-4 text-indigo-700 cursor-pointer flex justify-between items-center"
              onClick={() => setShowSection14(!showSection14)}
            >
              1️⃣4️⃣ Audit & Performance Master
              <span>{showSection14 ? "▲" : "▼"}</span>
            </h2>
            {showSection14 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "internalAuditfrequency", label: "Internal Audit Frequency" },
                  { name: "customerauditHistory", label: "Customer Audit History" },
                  { name: "RegulatoryAuditObservations", label: "Regulatory Audit Observations" },
                  { name: "CAPAcloser", label: "CAPA Closure" },
                  { name: "qualityrating", label: "Quality Rating" },
                  { name: "performanceReviewNotes", label: "Performance Review Notes" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                    <input
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>


          <div className="flex justify-center">
            <button
              type="submit"
              className={`${mode === "edit" ? "bg-green-600 hover:bg-green-700" : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                } text-white px-6 py-2 rounded-lg shadow`}
            >
              {mode === "edit" ? "✅ Update Manufacturer" : "💾 Save Manufacturer"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ManufacturerForm;
