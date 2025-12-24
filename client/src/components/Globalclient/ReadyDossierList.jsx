// File: ReadyDossierList.jsx
import React from "react";
import * as XLSX from "xlsx";


const ReadyDossierList = () => {
//   const data = [
//     { id: 1, name: "TACROLUS 0.03%", ganeric: "Tacrolimus Ointment 0.03% w/w ", composition: "Tacrolimus USP 0.03% w/w Ointment base q.s. ", category: "Drug-Immunosupressant" },
 
//   ];

const data = [
  {
    id: 1,
    name: "IQ GOLD",
    generic: "L-Carnosine and Docosahexaenoic Acid Syrup",
    composition: "Each 5 ml Contains: L-Carnosine 100 mg, Docosahexaenoic Acid 5 mg, Flavoured Syrupy base q.s., Colour : Erythrosine",
    category: "",
  },
  {
    id: 2,
    name: "NAPO NYLOKIT",
    generic: "Combipack of Lansoprazole Delayed Release Capsules USP, Tinidazole Tablets and Clarithromycin Tablets USP",
    composition: "Each kit contains: (A) Lansoprazole 30mg, (B) Tinidazole 500mg, (C) Clarithromycin 250mg",
    category: "Helicobacter pylori-associated peptic ulcer disease",
  },
  {
    id: 3,
    name: "RABMED-A",
    generic: "Enteric Coated Rabeprazole Sodium & Sustained Release Aceclofenac Capsules",
    composition: "Rabeprazole Sodium 20 mg (Enteric Coated Pellets), Aceclofenac 200 mg (Sustained Release Pellets), Excipients q.s.",
    category: "Proton pump inhibitor & NSAID",
  },
  {
    id: 4,
    name: "MERE-FER",
    generic: "Ferrous Ascorbate, Folic Acid and Zinc Sulfate Monohydrate Tablets",
    composition: "Ferrous Ascorbate eq. Iron 100 mg, Folic Acid 1.5 mg, Zinc Sulfate Monohydrate eq. Zinc 22.5 mg",
    category: "Supplement",
  },
  {
    id: 5,
    name: "OMIPP",
    generic: "Omeprazole Delayed-Release Capsules USP 20 mg",
    composition: "Omeprazole USP 20 mg (Enteric Coated Pellets), Excipients q.s.",
    category: "Proton pump inhibitor",
  },
  {
    id: 6,
    name: "Rabz-L",
    generic: "Enteric Coated Rabeprazole Sodium & Sustained Release Levosulpiride Capsules",
    composition: "Rabeprazole Sodium 20 mg, Levosulpiride 75 mg, Excipients q.s.",
    category: "Proton pump inhibitor & antipsychotic agent",
  },
  {
    id: 7,
    name: "Rabz-D",
    generic: "Enteric Coated Rabeprazole Sodium & Sustained Release Domperidone Capsules",
    composition: "Rabeprazole Sodium 20 mg, Domperidone 30 mg, Excipients q.s.",
    category: "Proton pump inhibitor & antiemetic",
  },
  {
    id: 8,
    name: "NAPO CAL",
    generic: "Calamine & Diphenhydramine Hydrochloride Lotion",
    composition: "Calamine 8% w/v, Diphenhydramine Hydrochloride 1% w/v, Ethanol 2.35% v/v, Aqueous base q.s.",
    category: "Anti-allergic",
  },
  {
    id: 9,
    name: "IZOL 200",
    generic: "Itraconazole Capsules BP 200 mg",
    composition: "Itraconazole 200 mg (Pellets), Excipients q.s.",
    category: "Antifungal",
  },
  {
    id: 10,
    name: "TACROLUS 0.03%",
    generic: "Tacrolimus Ointment 0.03% w/w",
    composition: "Tacrolimus USP 0.03% w/w, Ointment base q.s.",
    category: "Drug - Immunosuppressant",
  },
  
];


//   const downloadExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Dossier List");
//     XLSX.writeFile(workbook, "Ready_Dossier_List.xlsx");
//   };

const downloadExcel = () => {
  const link = document.createElement("a");
  link.href = "./../../../public/Ready-Dossier-List-Cian_Drug.xlsx"; // public folder me file ka path
  link.download = "Ready_Dossier_List.xlsx";
  link.click();
};



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-full w-full bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Ready Dossier List
        </h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={downloadExcel}
            className="bg-[#1f2937] text-white px-6 py-2 rounded-lg hover:bg-[#303946] transition"
          >
            Download Ready Dossier List
          </button>
        </div>

        <p className="flex justify-center mb-5 text-gray-500">Note:  Please click to button view all Products.
  </p>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-blue-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-3 px-4 border">S.No</th>
                <th className="py-3 px-4 border">Product Name</th>
                <th className="py-3 px-4 border">Ganeric Name</th>
                <th className="py-3 px-4 border">Composition</th>
                <th className="py-3 px-4 border">Category</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={row.id}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border font-medium text-gray-800">
                    {row.name}
                  </td>
                  <td className="py-2 px-4 border">{row.generic}</td>
                  <td className="py-2 px-4 border">{row.composition}</td>
                  <td className="py-2 px-4 border ">
                    {row.category}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReadyDossierList;
