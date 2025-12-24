// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import AdminSidebar from "../../components/admin/AdminSidebar";

// const CustomerForm = ({ mode = "add" }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [showsidebar, setShowsidebar] = useState(false);

//   const handleSideBar = () => setShowsidebar((prev) => !prev);

//   const [formData, setFormData] = useState({
//     LocCd: "",
//     CustNo: "",
//     CustCd: "",
//     CustCrtDt: "",
//     StopInv: "",
//     CustName: "",
//     ShortName: "",
//     PayeeName: "",
//     CustTpCd: "",
//     SegmCd: "",
//     ITaxPANNo: "",
//     CustSlTp: "",
//     ExportType: "",
//     GSTIN: "",
//     AddLine1: "",
//     AddLine2: "",
//     AddLine3: "",
//     City: "",
//     ZipCode: "",
//     Country: "",
//     StateCd: "",
//     GSTStateCd: "",
//     Contact: "",
//     TelNo: "",
//     MobileNo: "",
//     FaxNo: "",
//     EMailId: "",
//     Website: "",
//     DestnCd: "",
//     TrMdCd: "",
//     TrnspCd: "",
//     LeadDays: "",
//     CustDist: "",
//     FrtInd: "",
//     BnkIFSCCd: "",
//     BnkAcNo: "",
//     BnkName: "",
//     CustBnkr: "",
//     CustVPA: "",
//     BAcTpCd: "",
//     BnkBranch: "",
//     BankLoc: "",
//     DrugLicNo: "",
//     DLicExpDt: "",
//     OthLicNo: "",
//     CAcCd: "",
//     CCrdLimit: "",
//     MinInvAmt: "",
//     CCashDisc: "",
//     CBrokerCd: "",
//     CBrokerRt: "",
//     CPayTermCd: "",
//     CCrdPrd: "",
//     ExtInfo: "",
//   });

//   // 🟣 SECTION STATES
//   const [sec1, setSec1] = useState(true);
//   const [sec2, setSec2] = useState(false);
//   const [sec3, setSec3] = useState(false);
//   const [sec4, setSec4] = useState(false);
//   const [sec5, setSec5] = useState(false);
//   const [sec6, setSec6] = useState(false);
//   const [sec7, setSec7] = useState(false);
//   const [sec8, setSec8] = useState(false);
//   const [sec9, setSec9] = useState(false);

//   // ⭐ When editing, fetch data
//   useEffect(() => {
//     if (mode === "edit") {
//       fetch(`${import.meta.env.VITE_SERVER}/api/customers/${id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setFormData((prev) => ({
//             ...prev,
//             ...data.data,
//           }));
//         });
//     }
//   }, [id, mode]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ⭐ Submit Data
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { _id, createdAt, updatedAt, __v, ...cleanData } = formData;

//       const url =
//         mode === "edit"
//           ? `${import.meta.env.VITE_SERVER}/api/customers/${id}`
//           : `${import.meta.env.VITE_SERVER}/api/customers`;

//       const method = mode === "edit" ? "PUT" : "POST";

//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(cleanData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title:
//             mode === "edit"
//               ? "Updated Successfully!"
//               : "Customer Created Successfully!",
//           timer: 1500,
//           showConfirmButton: false,
//         });

//         navigate("/admin/customers");
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Failed!",
//           text: data.message || "Something went wrong.",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Server Error!",
//         text: "Failed to connect to server.",
//       });
//     }
//   };

//   return (
//     <div className="flex h-screen bg-white">
//       <AdminSidebar sidebar={{ showsidebar, handleSideBar }} />

//       <div className="flex-1 p-6 overflow-y-auto">
//         <h1 className="text-2xl font-bold mb-6">
//           {mode === "edit" ? "✏️ Edit Customer" : "➕ Add Customer"}
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* =============================================================
//               1️⃣ BASIC CUSTOMER INFORMATION
//           ============================================================= */}
//           <div className="bg-white shadow rounded-lg p-6">
//             <h2
//               className="text-lg font-semibold text-indigo-700 cursor-pointer flex justify-between"
//               onClick={() => setSec1(!sec1)}
//             >
//               1️⃣ Basic Customer Information
//               <span>{sec1 ? "▲" : "▼"}</span>
//             </h2>

//             {sec1 && (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

//                 {[
//                   { key: "CustName", label: "Customer Name" },
//                   { key: "CustCd", label: "Customer Code" },
//                   { key: "CustNo", label: "Customer Number" },
//                   { key: "ShortName", label: "Short Name" },
//                   { key: "PayeeName", label: "Payee Name" },
//                   { key: "CustTpCd", label: "Customer Type" },
//                   { key: "SegmCd", label: "Segment Code" },
//                   { key: "LocCd", label: "Location Code" },
//                   { key: "CustCrtDt", label: "Creation Date" },
//                 ].map((f) => (
//                   <div key={f.key}>
//                     <label className="text-sm font-medium text-gray-700">
//                       {f.label}
//                     </label>
//                     <input
//                       type="text"
//                       name={f.key}
//                       value={formData[f.key]}
//                       onChange={handleChange}
//                       className="border p-2 rounded w-full mt-1"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* =============================================================
//               2️⃣ ADDRESS INFORMATION
//           ============================================================= */}
//           <div className="bg-white shadow rounded-lg p-6">
//             <h2
//               className="text-lg font-semibold text-indigo-700 cursor-pointer flex justify-between"
//               onClick={() => setSec2(!sec2)}
//             >
//               2️⃣ Address Information
//               <span>{sec2 ? "▲" : "▼"}</span>
//             </h2>

//             {sec2 && (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

//                 {[
//                   { key: "AddLine1", label: "Address Line 1" },
//                   { key: "AddLine2", label: "Address Line 2" },
//                   { key: "AddLine3", label: "Address Line 3" },
//                   { key: "City", label: "City" },
//                   { key: "StateCd", label: "State Code" },
//                   { key: "Country", label: "Country" },
//                   { key: "ZipCode", label: "Zip Code" },
//                 ].map((f) => (
//                   <div key={f.key}>
//                     <label className="text-sm font-medium text-gray-700">
//                       {f.label}
//                     </label>
//                     <input
//                       type="text"
//                       name={f.key}
//                       value={formData[f.key]}
//                       onChange={handleChange}
//                       className="border p-2 rounded w-full mt-1"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* =============================================================
//               3️⃣ CONTACT INFORMATION
//           ============================================================= */}
//           <div className="bg-white shadow rounded-lg p-6">
//             <h2
//               className="text-lg font-semibold text-indigo-700 cursor-pointer flex justify-between"
//               onClick={() => setSec3(!sec3)}
//             >
//               3️⃣ Contact Information
//               <span>{sec3 ? "▲" : "▼"}</span>
//             </h2>

//             {sec3 && (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

//                 {[
//                   { key: "Contact", label: "Contact Person" },
//                   { key: "TelNo", label: "Telephone Number" },
//                   { key: "MobileNo", label: "Mobile Number" },
//                   { key: "FaxNo", label: "Fax Number" },
//                   { key: "EMailId", label: "Email" },
//                   { key: "Website", label: "Website" },
//                 ].map((f) => (
//                   <div key={f.key}>
//                     <label className="text-sm font-medium text-gray-700">
//                       {f.label}
//                     </label>
//                     <input
//                       type="text"
//                       name={f.key}
//                       value={formData[f.key]}
//                       onChange={handleChange}
//                       className="border p-2 rounded w-full mt-1"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* =============================================================
//               4️⃣ BANKING INFORMATION
//           ============================================================= */}
//           <div className="bg-white shadow rounded-lg p-6">
//             <h2
//               className="text-lg font-semibold text-indigo-700 cursor-pointer flex justify-between"
//               onClick={() => setSec4(!sec4)}
//             >
//               4️⃣ Banking Information
//               <span>{sec4 ? "▲" : "▼"}</span>
//             </h2>

//             {sec4 && (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

//                 {[
//                   { key: "BnkName", label: "Bank Name" },
//                   { key: "BnkAcNo", label: "Bank Account Number" },
//                   { key: "BnkIFSCCd", label: "IFSC Code" },
//                   { key: "CustVPA", label: "UPI ID" },
//                   { key: "BnkBranch", label: "Branch" },
//                   { key: "BankLoc", label: "Bank Location" },
//                 ].map((f) => (
//                   <div key={f.key}>
//                     <label className="text-sm font-medium text-gray-700">
//                       {f.label}
//                     </label>
//                     <input
//                       type="text"
//                       name={f.key}
//                       value={formData[f.key]}
//                       onChange={handleChange}
//                       className="border p-2 rounded w-full mt-1"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* =============================================================
//               5️⃣ TAX & COMPLIANCE
//           ============================================================= */}
//           <div className="bg-white shadow rounded-lg p-6">
//             <h2
//               className="text-lg font-semibold text-indigo-700 cursor-pointer flex justify-between"
//               onClick={() => setSec5(!sec5)}
//             >
//               5️⃣ Tax & Compliance
//               <span>{sec5 ? "▲" : "▼"}</span>
//             </h2>

//             {sec5 && (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

//                 {[
//                   { key: "GSTIN", label: "GST Number" },
//                   { key: "GSTStateCd", label: "GST State Code" },
//                   { key: "ITaxPANNo", label: "PAN Number" },
//                   { key: "ExportType", label: "Export Type" },
//                 ].map((f) => (
//                   <div key={f.key}>
//                     <label className="text-sm font-medium text-gray-700">
//                       {f.label}
//                     </label>
//                     <input
//                       type="text"
//                       name={f.key}
//                       value={formData[f.key]}
//                       onChange={handleChange}
//                       className="border p-2 rounded w-full mt-1"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* =============================================================
//               6️⃣ TRANSPORT & LOGISTICS
//           ============================================================= */}
//           <div className="bg-white shadow rounded-lg p-6">
//             <h2
//               className="text-lg font-semibold text-indigo-700 cursor-pointer flex justify-between"
//               onClick={() => setSec6(!sec6)}
//             >
//               6️⃣ Transport & Logistics
//               <span>{sec6 ? "▲" : "▼"}</span>
//             </h2>

//             {sec6 && (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//                 {[
//                   { key: "DestnCd", label: "Destination Code" },
//                   { key: "TrMdCd", label: "Transport Mode" },
//                   { key: "TrnspCd", label: "Transporter Code" },
//                                    { key: "LeadDays", label: "Lead Days" },
//                   { key: "CustDist", label: "Customer Distance" },
//                   { key: "FrtInd", label: "Freight Indicator" },
//                 ].map((f) => (
//                   <div key={f.key}>
//                     <label className="text-sm font-medium text-gray-700">
//                       {f.label}
//                     </label>
//                     <input
//                       type="text"
//                       name={f.key}
//                       value={formData[f.key]}
//                       onChange={handleChange}
//                       className="border p-2 rounded w-full mt-1"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* =============================================================
//               7️⃣ LICENSING INFORMATION
//           ============================================================= */}
//           <div className="bg-white shadow rounded-lg p-6">
//             <h2
//               className="text-lg font-semibold text-indigo-700 cursor-pointer flex justify-between"
//               onClick={() => setSec7(!sec7)}
//             >
//               7️⃣ Licensing
//               <span>{sec7 ? "▲" : "▼"}</span>
//             </h2>

//             {sec7 && (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//                 {[
//                   { key: "DrugLicNo", label: "Drug License Number" },
//                   { key: "DLicExpDt", label: "Drug License Expiry Date" },
//                   { key: "OthLicNo", label: "Other License Number" },
//                 ].map((f) => (
//                   <div key={f.key}>
//                     <label className="text-sm font-medium text-gray-700">
//                       {f.label}
//                     </label>
//                     <input
//                       type={f.key === "DLicExpDt" ? "date" : "text"}
//                       name={f.key}
//                       value={formData[f.key]}
//                       onChange={handleChange}
//                       className="border p-2 rounded w-full mt-1"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>


//           {/* =============================================================
//               8️⃣ CREDIT & BUSINESS TERMS
//           ============================================================= */}
//           <div className="bg-white shadow rounded-lg p-6">
//             <h2
//               className="text-lg font-semibold text-indigo-700 cursor-pointer flex justify-between"
//               onClick={() => setSec8(!sec8)}
//             >
//               8️⃣ Credit & Business Terms
//               <span>{sec8 ? "▲" : "▼"}</span>
//             </h2>

//             {sec8 && (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//                 {[
//                   { key: "CCrdLimit", label: "Credit Limit" },
//                   { key: "MinInvAmt", label: "Minimum Invoice Amount" },
//                   { key: "CCashDisc", label: "Cash Discount (%)" },
//                   { key: "CBrokerCd", label: "Broker Code" },
//                   { key: "CBrokerRt", label: "Broker Rate (%)" },
//                   { key: "CPayTermCd", label: "Payment Terms Code" },
//                   { key: "CCrdPrd", label: "Credit Period (Days)" },
//                 ].map((field) => (
//                   <div key={field.key}>
//                     <label className="text-sm font-medium text-gray-700">
//                       {field.label}
//                     </label>
//                     <input
//                       type="text"
//                       name={field.key}
//                       value={formData[field.key]}
//                       onChange={handleChange}
//                       className="border p-2 rounded w-full mt-1"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>


//           {/* =============================================================
//               9️⃣ MISCELLANEOUS INFORMATION
//           ============================================================= */}
//           <div className="bg-white shadow rounded-lg p-6 mb-10">
//             <h2
//               className="text-lg font-semibold text-indigo-700 cursor-pointer flex justify-between"
//               onClick={() => setSec9(!sec9)}
//             >
//               9️⃣ Miscellaneous / Extended Info
//               <span>{sec9 ? "▲" : "▼"}</span>
//             </h2>

//             {sec9 && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     Extra Info / Notes
//                   </label>
//                   <textarea
//                     name="ExtInfo"
//                     value={formData.ExtInfo}
//                     onChange={handleChange}
//                     className="border p-2 rounded w-full mt-1 h-24"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>


//           <div className="flex justify-center pb-20">
//             <button
//               type="submit"
//               className={`${
//                 mode === "edit"
//                   ? "bg-green-600 hover:bg-green-700"
//                   : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
//               } text-white px-8 py-3 rounded-lg shadow text-lg`}
//             >
//               {mode === "edit" ? "✅ Update Customer" : "💾 Save Customer"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CustomerForm;




import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminSidebar from "../../components/admin/AdminSidebar";

const CustomerForm = ({ mode = "add" }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showsidebar, setShowsidebar] = useState(false);
  const handleSideBar = () => setShowsidebar((prev) => !prev);

  const initialState = {
    LocCd: "",
    CustNo: "",
    CustCd: "",
    CustCrtDt: "",
    StopInv: "",
    CustName: "",
    ShortName: "",
    PayeeName: "",
    CustTpCd: "",
    SegmCd: "",
    ITaxPANNo: "",
    CustSlTp: "",
    ExportType: "",
    GSTIN: "",
    AddLine1: "",
    AddLine2: "",
    AddLine3: "",
    City: "",
    ZipCode: "",
    Country: "",
    StateCd: "",
    GSTStateCd: "",
    Contact: "",
    TelNo: "",
    MobileNo: "",
    FaxNo: "",
    EMailId: "",
    Website: "",
    DestnCd: "",
    TrMdCd: "",
    TrnspCd: "",
    LeadDays: "",
    CustDist: "",
    FrtInd: "",
    BnkIFSCCd: "",
    BnkAcNo: "",
    BnkName: "",
    CustBnkr: "",
    CustVPA: "",
    BAcTpCd: "",
    BnkBranch: "",
    BankLoc: "",
    CustIntfCd: "",
    IntfFlFrmt: "",
    ProjRatio: "",
    NoOfDsp: "",
    AlwCnsgOBk: "",
    LblLyt: "",
    NoOfCopies: "",
    OldCode: "",
    CustLotNo: "",
    IsElgTCS: "",
    TcsType: "",
    IsAplHgrRt: "",
    IsDdNnRes: "",
    IsDdPrmEst: "",
    DrugLicNo: "",
    DLicExpDt: "",
    OthLicNo: "",
    IsBlDisc: "",
    IsRevEOYr: "",
    SupStkLoc: "",
    CAcCd: "",
    CCrdLimit: "",
    MinInvAmt: "",
    CSchmCd: "",
    CBrokerCd: "",
    CBrokerRt: "",
    CCashDisc: "",
    CMiscChgPc: "",
    CMiscDisPc: "",
    CVatFormCd: "",
    CCenFormCd: "",
    CApSplTerm: "",
    CPayTermCd: "",
    CDocsThru: "",
    CCrdPrd: "",
    CNwPCrdPrd: "",
    CIsOvDuChk: "",
    CNoOfBills: "",
    COsBlPrd: "",
    COsBlAcInd: "",
    ExtInfo: "",
    IsRecClsd: "",
    MstUpdBy: "",
    MstUpdDtTm: "",
    TxRevNo: "",
    IsExpCust: "",
    IsRegDlr: "",
    rdbts: "",
  };

  const [formData, setFormData] = useState(initialState);

  // Section toggles (10 sections)
  const [sec1, setSec1] = useState(true); // Basic Info
  const [sec2, setSec2] = useState(false); // Address
  const [sec3, setSec3] = useState(false); // Contact
  const [sec4, setSec4] = useState(false); // Banking
  const [sec5, setSec5] = useState(false); // Tax & Compliance
  const [sec6, setSec6] = useState(false); // Transport & Logistics
  const [sec7, setSec7] = useState(false); // Licensing
  const [sec8, setSec8] = useState(false); // Business & Credit
  const [sec9, setSec9] = useState(false); // System & Integration
  const [sec10, setSec10] = useState(false); // Misc & Meta

  // fetch on edit
  useEffect(() => {
    if (mode === "edit" && id) {
      fetch(`${import.meta.env.VITE_SERVER}/api/customers/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.success && data.data) setFormData((prev) => ({ ...prev, ...data.data }));
        })
        .catch((err) => {
          console.error("Fetch customer error:", err);
          Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch customer." });
        });
    }
  }, [id, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { _id, createdAt, updatedAt, __v, ...cleanData } = formData;

      const url = mode === "edit" ? `${import.meta.env.VITE_SERVER}/api/customers/${id}` : `${import.meta.env.VITE_SERVER}/api/customers`;
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanData),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: mode === "edit" ? "Updated Successfully!" : "Customer Created Successfully!",
          timer: 1400,
          showConfirmButton: false,
        });
        navigate("/admin/customers");
      } else {
        Swal.fire({ icon: "error", title: "Failed", text: data.message || "Something went wrong" });
      }
    } catch (err) {
      console.error("Submit error:", err);
      Swal.fire({ icon: "error", title: "Server Error", text: "Unable to reach server" });
    }
  };

  // helper to render inputs in grid
  const renderFields = (fields, cols = "md:grid-cols-3") =>
    fields.map((f) => (
      <div key={f.key}>
        <label className="text-sm font-medium text-gray-700">{f.label}</label>
        <input
          type={f.type || "text"}
          name={f.key}
          value={formData[f.key] || ""}
          onChange={handleChange}
          className="border p-2 rounded w-full mt-1"
        />
      </div>
    ));

  return (
    <div className="flex h-screen bg-white">
      <AdminSidebar sidebar={{ showsidebar, handleSideBar }} />

      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">{mode === "edit" ? "✏️ Edit Customer" : "➕ Add Customer"}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* 1️⃣ BASIC CUSTOMER INFORMATION */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-indigo-700 cursor-pointer flex justify-between" onClick={() => setSec1((s) => !s)}>
              1️⃣ Basic Customer Information <span>{sec1 ? "▲" : "▼"}</span>
            </h2>
            {sec1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {renderFields([
                  { key: "CustName", label: "Customer Name" },
                  { key: "CustCd", label: "Customer Code" },
                  { key: "CustNo", label: "Customer Number" },
                  { key: "LocCd", label: "Location Code" },
                  { key: "CustCrtDt", label: "Creation Date", type: "date" },
                  { key: "StopInv", label: "Stop Inventory (Y/N)" },
                  { key: "ShortName", label: "Short Name" },
                  { key: "PayeeName", label: "Payee Name" },
                  { key: "CustTpCd", label: "Customer Type" },
                  { key: "SegmCd", label: "Segment Code" },
                ])}
              </div>
            )}
          </div>

          {/* 2️⃣ ADDRESS INFORMATION */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-indigo-700 cursor-pointer flex justify-between" onClick={() => setSec2((s) => !s)}>
              2️⃣ Address Information <span>{sec2 ? "▲" : "▼"}</span>
            </h2>
            {sec2 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {renderFields([
                  { key: "AddLine1", label: "Address Line 1" },
                  { key: "AddLine2", label: "Address Line 2" },
                  { key: "AddLine3", label: "Address Line 3" },
                  { key: "City", label: "City" },
                  { key: "StateCd", label: "State Code" },
                  { key: "GSTStateCd", label: "GST State Code" },
                  { key: "Country", label: "Country" },
                  { key: "ZipCode", label: "Zip Code" },
                ])}
              </div>
            )}
          </div>

          {/* 3️⃣ CONTACT INFORMATION */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-indigo-700 cursor-pointer flex justify-between" onClick={() => setSec3((s) => !s)}>
              3️⃣ Contact Information <span>{sec3 ? "▲" : "▼"}</span>
            </h2>
            {sec3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {renderFields([
                  { key: "Contact", label: "Contact Person" },
                  { key: "TelNo", label: "Telephone Number" },
                  { key: "MobileNo", label: "Mobile Number" },
                  { key: "FaxNo", label: "Fax Number" },
                  { key: "EMailId", label: "Email" },
                  { key: "Website", label: "Website" },
                  { key: "CustDist", label: "Customer Distance" },
                ])}
              </div>
            )}
          </div>

          {/* 4️⃣ BANKING INFORMATION */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-indigo-700 cursor-pointer flex justify-between" onClick={() => setSec4((s) => !s)}>
              4️⃣ Banking Information <span>{sec4 ? "▲" : "▼"}</span>
            </h2>

            {sec4 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {renderFields([
                  { key: "BnkName", label: "Bank Name" },
                  { key: "BnkAcNo", label: "Bank Account Number" },
                  { key: "BnkIFSCCd", label: "IFSC Code" },
                  { key: "BnkBranch", label: "Branch" },
                  { key: "BankLoc", label: "Bank Location" },
                  { key: "CustVPA", label: "UPI ID" },
                  { key: "BAcTpCd", label: "Bank Account Type" },
                  { key: "CustBnkr", label: "Customer Banker" },
                ])}
              </div>
            )}
          </div>

          {/* 5️⃣ TAX & COMPLIANCE */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-indigo-700 cursor-pointer flex justify-between" onClick={() => setSec5((s) => !s)}>
              5️⃣ Tax & Compliance <span>{sec5 ? "▲" : "▼"}</span>
            </h2>
            {sec5 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {renderFields([
                  { key: "ITaxPANNo", label: "PAN Number" },
                  { key: "GSTIN", label: "GSTIN" },
                  { key: "ExportType", label: "Export Type" },
                  { key: "IsElgTCS", label: "Is Eligible for TCS (Y/N)" },
                  { key: "TcsType", label: "TCS Type" },
                  { key: "IsAplHgrRt", label: "Apply Higher Rate (Y/N)" },
                  { key: "IsDdNnRes", label: "Is DD Non-Resident" },
                  { key: "IsDdPrmEst", label: "Is DD Premium/EST" },
                  { key: "IsBlDisc", label: "Is Block Discount" },
                  { key: "IsRevEOYr", label: "Is Reverse End of Year" },
                  { key: "CVatFormCd", label: "VAT Form Code" },
                  { key: "CCenFormCd", label: "CENVAT Form Code" },
                ])}
              </div>
            )}
          </div>

          {/* 6️⃣ TRANSPORT & LOGISTICS */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-indigo-700 cursor-pointer flex justify-between" onClick={() => setSec6((s) => !s)}>
              6️⃣ Transport & Logistics <span>{sec6 ? "▲" : "▼"}</span>
            </h2>
            {sec6 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {renderFields([
                  { key: "DestnCd", label: "Destination Code" },
                  { key: "TrMdCd", label: "Transport Mode" },
                  { key: "TrnspCd", label: "Transporter Code" },
                  { key: "LeadDays", label: "Lead Days" },
                  { key: "FrtInd", label: "Freight Indicator" },
                  { key: "AlwCnsgOBk", label: "Allow Consignee on Book (Y/N)" },
                ])}
              </div>
            )}
          </div>

          {/* 7️⃣ LICENSING */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-indigo-700 cursor-pointer flex justify-between" onClick={() => setSec7((s) => !s)}>
              7️⃣ Licensing <span>{sec7 ? "▲" : "▼"}</span>
            </h2>
            {sec7 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {renderFields([
                  { key: "DrugLicNo", label: "Drug License Number" },
                  { key: "DLicExpDt", label: "Drug License Expiry Date", type: "date" },
                  { key: "OthLicNo", label: "Other License Number" },
                ])}
              </div>
            )}
          </div>

          {/* 8️⃣ CREDIT & BUSINESS TERMS */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-indigo-700 cursor-pointer flex justify-between" onClick={() => setSec8((s) => !s)}>
              8️⃣ Credit & Business Terms <span>{sec8 ? "▲" : "▼"}</span>
            </h2>
            {sec8 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {renderFields([
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
                  { key: "CDocsThru", label: "Docs Through" },
                  { key: "CCrdPrd", label: "Credit Period (Days)" },
                  { key: "CNwPCrdPrd", label: "New Credit Period (Days)" },
                  { key: "CIsOvDuChk", label: "Overdue Check (Y/N)" },
                  { key: "CNoOfBills", label: "No Of Bills" },
                  { key: "COsBlPrd", label: "Outstanding Billing Period" },
                  { key: "COsBlAcInd", label: "Outstanding Billing Account Indicator" },
                ])}
              </div>
            )}
          </div>

          {/* 9️⃣ SYSTEM & INTEGRATION */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-indigo-700 cursor-pointer flex justify-between" onClick={() => setSec9((s) => !s)}>
              9️⃣ System & Integration <span>{sec9 ? "▲" : "▼"}</span>
            </h2>
            {sec9 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {renderFields([
                  { key: "CustIntfCd", label: "Customer Interface Code" },
                  { key: "IntfFlFrmt", label: "Interface File Format" },
                  { key: "ProjRatio", label: "Project Ratio" },
                  { key: "NoOfDsp", label: "Number of Dispatches" },
                  { key: "LblLyt", label: "Label Layout" },
                  { key: "NoOfCopies", label: "No of Copies" },
                  { key: "OldCode", label: "Old Code" },
                  { key: "CustLotNo", label: "Customer Lot Number" },
                  { key: "SupStkLoc", label: "Supplier Stock Location" },
                ])}
              </div>
            )}
          </div>

          {/* 🔟 MISCELLANEOUS / META */}
          <div className="bg-white shadow rounded-lg p-6 mb-12">
            <h2 className="text-lg font-semibold text-indigo-700 cursor-pointer flex justify-between" onClick={() => setSec10((s) => !s)}>
              🔟 Miscellaneous / Meta <span>{sec10 ? "▲" : "▼"}</span>
            </h2>
            {sec10 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Extra Info / Notes</label>
                  <textarea name="ExtInfo" value={formData.ExtInfo || ""} onChange={handleChange} className="border p-2 rounded w-full mt-1 h-28" />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {renderFields([
                    { key: "IsRecClsd", label: "Is Record Closed (Y/N)" },
                    { key: "MstUpdBy", label: "Master Updated By" },
                    { key: "MstUpdDtTm", label: "Master Updated DateTime" },
                    { key: "TxRevNo", label: "Transaction Revision No" },
                    { key: "IsExpCust", label: "Is Export Customer (Y/N)" },
                    { key: "IsRegDlr", label: "Is Registered Dealer (Y/N)" },
                    { key: "rdbts", label: "RDBTS" },
                  ])}
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-center pb-20">
            <button
              type="submit"
              className={`${
                mode === "edit"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              } text-white px-8 py-3 rounded-lg shadow text-lg`}
            >
              {mode === "edit" ? "✅ Update Customer" : "💾 Save Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
