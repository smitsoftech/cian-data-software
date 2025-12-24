


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FilteredProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();
  const [globalSearch, setGlobalSearch] = useState("");


  // Manufacturer Names Cache
  const [manufacturerNames, setManufacturerNames] = useState({});

  // Column Filter Popup Visibility
  const [openFilter, setOpenFilter] = useState(null);

  // Final Applied Filters
  const [finalNameFilter, setFinalNameFilter] = useState([]);
  const [finalDivisionFilter, setFinalDivisionFilter] = useState([]);
  const [finalManufacturerFilter, setFinalManufacturerFilter] = useState([]);
  const [finalHsnFilter, setFinalHsnFilter] = useState([]);

  // Temporary Filters (inside popup)
  const [tempNameFilter, setTempNameFilter] = useState([]);
  const [tempDivisionFilter, setTempDivisionFilter] = useState([]);
  const [tempManufacturerFilter, setTempManufacturerFilter] = useState([]);
  const [tempHsnFilter, setTempHsnFilter] = useState([]);

  // ================================
  // 1️⃣ Fetch Products
  // ================================
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/api/v1/products`)
      .then((res) => {
        const data = res.data.products || [];
        setProducts(data);
        setFiltered(data);
      });
  }, []);

  // ================================
  // 2️⃣ Fetch Manufacturer Names by ID
  // ================================
  const fetchManufacturerName = async (id) => {
    if (manufacturerNames[id]) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/manufacturers/${id}`
      );

      const name = res?.data?.data?.manufacturerName || "N/A";

      setManufacturerNames((prev) => ({
        ...prev,
        [id]: name,
      }));
    } catch (err) {
      setManufacturerNames((prev) => ({
        ...prev,
        [id]: "N/A",
      }));
    }
  };

  // Load all manufacturer names once
  useEffect(() => {
    products.forEach((p) => {
      (p.manufacturer || []).forEach((id) => fetchManufacturerName(id));
    });
  }, [products]);

  // ================================
  // 3️⃣ Dropdown filter options
  // ================================
  const nameOptions = [
    ...new Set(products.map((p) => p.name || "")),
  ].map((x) => ({ label: x, value: x }));

//   const divisionOptions = [
//     ...new Set(products.map((p) => p.division || "")),
//   ].map((x) => ({ label: x, value: x }));

  const handleManufacturerView = (id) =>
    navigate(`/admin/manufacturers/view/${id}`);

const divisionOptions = [
  ...new Set(
    products
      .map((p) => p.division)
      .filter((d) => d && typeof d === "string" && d.trim() !== "")
  ),
].map((d) => ({
  label: d,
  value: d,
}));

const hsnOptions = [
  ...new Set(
    products
      .map((p) => p.hsn)
      .filter((h) => h && typeof h === "string" && h.trim() !== "")
  ),
].map((h) => ({
  label: h,
  value: h,
}));


  const manufacturerOptions = [
    ...new Set(products.flatMap((p) => p.manufacturer || [])),
  ].map((x) => ({
    label: manufacturerNames[x] || `Manufacturer ${x}`,
    value: x,
  }));

  // ================================
  // 4️⃣ Apply filters only when OK clicked
  // ================================
  useEffect(() => {
    let data = [...products];

      // 1️⃣ Global text search (name)
  if (globalSearch.trim() !== "") {
    data = data.filter((p) =>
      p.name?.toLowerCase().includes(globalSearch.toLowerCase())
    );
  }

    if (finalNameFilter.length > 0) {
      data = data.filter((p) =>
        finalNameFilter.some((f) => f.value === p.name)
      );
    }

    if (finalDivisionFilter.length > 0) {
      data = data.filter((p) =>
        finalDivisionFilter.some((f) => f.value === p.division)
      );
    }

    if (finalManufacturerFilter.length > 0) {
      data = data.filter((p) =>
        (p.manufacturer || []).some((id) =>
          finalManufacturerFilter.some((f) => f.value === id)
        )
      );
    }

    if (finalHsnFilter.length > 0) {
      data = data.filter((p) =>
        finalHsnFilter.some((f) => f.value === p.hsn)
      );
    }

    setFiltered(data);
  }, [globalSearch, finalNameFilter, finalDivisionFilter, finalManufacturerFilter, finalHsnFilter, products]);

  // ================================
  // 5️⃣ Filter popup component
  // ================================
  // const FilterPopup = ({ column, options, tempState, setTempState }) => {
  //   if (openFilter !== column) return null;

  //   const applyFilters = () => {
  //     if (column === "name") setFinalNameFilter(tempState);
  //     if (column === "division") setFinalDivisionFilter(tempState);
  //     if (column === "manufacturer") setFinalManufacturerFilter(tempState);
  //     if (column === "hsn") setFinalHsnFilter(tempState);

  //     setOpenFilter(null);
  //   };

  //   const resetFilters = () => setTempState([]);

  //   return (
  //     <div className="absolute z-500 bg-white border shadow-xl w-56 mt-1 p-3 rounded">
  //       <div className="max-h-40 overflow-y-auto text-sm">
  //         {options.map((opt) => (
  //           <label key={opt.value} className="flex gap-2 items-center mb-1 font-normal text-gray-700">
  //             <input
  //               type="checkbox"
  //               checked={tempState.some((i) => i.value === opt.value)}
  //               onChange={(e) => {
  //                 if (e.target.checked) {
  //                   setTempState([...tempState, opt]);
  //                 } else {
  //                   setTempState(tempState.filter((i) => i.value !== opt.value));
  //                 }
  //               }}
  //             />
  //             {opt.label}
  //           </label>
  //         ))}
  //       </div>

  //       <div className="flex justify-between mt-3">
  //         <button className="text-xs" onClick={resetFilters}>
  //           Reset
  //         </button>
  //         <button
  //           onClick={applyFilters}
  //           className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
  //         >
  //           OK
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  const FilterPopup = ({ column, options, tempState, setTempState }) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (openFilter !== column) return null;

  const applyFilters = () => {
    if (column === "name") setFinalNameFilter(tempState);
    if (column === "division") setFinalDivisionFilter(tempState);
    if (column === "manufacturer") setFinalManufacturerFilter(tempState);
    if (column === "hsn") setFinalHsnFilter(tempState);

    setOpenFilter(null);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setTempState([]);
  };

  // Filter options based on search
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="absolute z-500 bg-white border shadow-xl w-56 mt-1 p-3 rounded">
      
      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border px-2 py-1 rounded mb-2 text-sm focus:outline-none"
      />

      <div className="max-h-40 overflow-y-auto text-sm pr-1">
        {filteredOptions.map((opt) => (
          <label
            key={opt.value}
            className="flex gap-2 items-center mb-1 font-normal text-gray-700"
          >
            <input
              type="checkbox"
              checked={tempState.some((i) => i.value === opt.value)}
              onChange={(e) => {
                if (e.target.checked) {
                  setTempState([...tempState, opt]);
                } else {
                  setTempState(tempState.filter((i) => i.value !== opt.value));
                }
              }}
            />
            {opt.label}
          </label>
        ))}

        {filteredOptions.length === 0 && (
          <p className="text-xs text-gray-500 text-center py-2">No results</p>
        )}
      </div>

      <div className="flex justify-between mt-3">
        <button className="text-xs" onClick={resetFilters}>
          Reset
        </button>

        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          OK
        </button>
      </div>
    </div>
  );
};


  // ================================
  // 6️⃣ Final UI
  // ================================
return (
  <div className="p-2 bg-gray-50 min-h-screen">

{/* TOP BAR: Search + Counts */}
<div className="p-4 bg-white border-b flex justify-between items-center">
  
  {/* 🔍 Search by Name */}
  <input
    type="text"
    placeholder="🔍 Search by product name..."
    value={globalSearch}
    onChange={(e) => setGlobalSearch(e.target.value)}
    className="w-96 border rounded-md px-3 py-2 text-sm outline-none focus:ring focus:ring-blue-200"
  />

  {/* 📊 Counts */}
  <div className="text-sm text-gray-700 font-bold flex gap-6">
    <div>
      Total Products: <span className="text-blue-600  ">{products.length}</span>
    </div>
    <div>
      Filtered: <span className="text-green-600">{filtered.length}</span>
    </div>
  </div>

</div>


    <div className="bg-white border shadow-md rounded-xl overflow-hidden">
      <div className="overflow-y-auto h-[87vh]">
        
        <table className="min-w-max text-sm w-full">
          <thead className="sticky top-0 bg-yellow-200 border-b text-gray-700 text-[13px]">
            <tr>
              <th className="p-3 border text-center w-14">Sr.</th>
              <th className="p-3 border w-20 text-center">Image</th>

              {/* Name */}
              <th className="p-3 border relative w-[280px] font-medium cursor-pointer">
                <div
                  onClick={() => {
                    setOpenFilter(openFilter === "name" ? null : "name");
                    setTempNameFilter(finalNameFilter);
                  }}
                  className="flex justify-between items-center"
                >
                  Name <span className="text-xs">▼</span>
                </div>

                <FilterPopup
                  column="name"
                  options={nameOptions}
                  tempState={tempNameFilter}
                  setTempState={setTempNameFilter}
                />
              </th>

              {/* Division */}
              <th className="p-3 border relative w-[150px] font-medium cursor-pointer">
                <div
                  onClick={() => {
                    setOpenFilter(
                      openFilter === "division" ? null : "division"
                    );
                    setTempDivisionFilter(finalDivisionFilter);
                  }}
                  className="flex justify-between items-center"
                >
                  Division <span className="text-xs">▼</span>
                </div>

                <FilterPopup
                  column="division"
                  options={divisionOptions}
                  tempState={tempDivisionFilter}
                  setTempState={setTempDivisionFilter}
                />
              </th>

              <th className="p-3 border w-[260px] text-center">Composition</th>
              <th className="p-3 border w-[260px] text-center">
                ShortComposition
              </th>

              {/* HSN */}
              <th className="p-3 border relative w-[130px] cursor-pointer">
                <div
                  onClick={() => {
                    setOpenFilter(openFilter === "hsn" ? null : "hsn");
                    setTempHsnFilter(finalHsnFilter);
                  }}
                  className="flex justify-between items-center font-medium"
                >
                  HSN <span className="text-xs">▼</span>
                </div>

                <FilterPopup
                  column="hsn"
                  options={hsnOptions}
                  tempState={tempHsnFilter}
                  setTempState={setTempHsnFilter}
                />
              </th>

              {/* Manufacturer */}
              <th className="p-3 border relative w-[150px] font-medium cursor-pointer">
                <div
                  onClick={() => {
                    setOpenFilter(
                      openFilter === "manufacturer" ? null : "manufacturer"
                    );
                    setTempManufacturerFilter(finalManufacturerFilter);
                  }}
                  className="flex justify-between items-center"
                >
                  Manufacturer <span className="text-xs">▼</span>
                </div>

                <FilterPopup
                  column="manufacturer"
                  options={manufacturerOptions}
                  tempState={tempManufacturerFilter}
                  setTempState={setTempManufacturerFilter}
                />
              </th>

              <th className="p-3 border w-[150px] text-center">View Man..</th>
              <th className="p-3 border w-[150px] text-center">
                Packing Style
              </th>
              <th className="p-3 border w-[260px] text-center">Description</th>
              <th className="p-3 border w-[150px] text-center">
                Main Category
              </th>
              <th className="p-3 border w-[150px] text-center">
                Sub Category
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p, index) => (
              <tr
                key={p._id}
                className="hover:bg-gray-50 transition text-[13px]"
              >
                <td className="p-3 border text-center text-gray-600">
                  {index + 1}
                </td>

                {/* Image */}
                <td className="p-2 border text-center">
                  <img
                    src={
                      p.images?.[0] ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTFlhSWwrzGBZnqDlW7uLEEJWBhFc8sW_Ruw&s"
                    }
                    className="w-10 h-10 rounded-md object-cover mx-auto shadow-sm"
                  />
                </td>

                {/* Name */}
                <td className="p-2 border truncate max-w-[180px] text-gray-800">
                  {p.name}
                </td>

                <td className="p-2 border text-center text-gray-700">
                  {p.division || "—"}
                </td>

                <td className="p-2 border truncate max-w-[250px] text-gray-700">
                  {p.composition || "—"}
                </td>

                <td className="p-2 border truncate max-w-[250px] text-gray-700">
                  {p.shortComposition || "—"}
                </td>

                <td className="p-2 border text-center text-gray-700">
                  {p.hsn || "—"}
                </td>

                <td className="p-2 border">
                  {(p.manufacturer || []).map((id) => (
                    <div key={id} className="text-blue-600">
                      {manufacturerNames[id] || "Loading..."}
                    </div>
                  ))}
                </td>

                <td className="p-2 border text-center">
                  {(p.manufacturer || []).map((id, i) => (
                    <button
                      key={id}
                      onClick={() => handleManufacturerView(id)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-2 m-1 py-1 rounded-md text-xs"
                    >
                      View {i + 1}
                    </button>
                  ))}
                </td>

                <td className="p-2 border text-center text-gray-700">
                  {p.packingstyle || "—"}
                </td>

                <td className="p-2 border truncate max-w-[250px] text-gray-700">
                  {p.description || "—"}
                </td>

                <td className="p-2 border text-center text-gray-700">
                  {p.mainCategory || "—"}
                </td>

                <td className="p-2 border text-center text-gray-700">
                  {p.subCategory || "—"}
                </td>
              </tr>
            ))}

            {!filtered.length && (
              <tr>
                <td colSpan="8" className="text-center py-5 text-gray-600">
                  Loading products...
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </div>
  </div>
);

};

export default FilteredProducts;

// this is FilteredProduct page