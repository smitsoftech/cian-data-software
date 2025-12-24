import Manufacturer from "../models/manufacturerModel.js";

// ✅ Add Manufacturer
export const addManufacturer = async (req, res) => {
  try {
    const manufacturerData = req.body;

    // Create new document
    const newManufacturer = new Manufacturer(manufacturerData);
    await newManufacturer.save();

    res.status(201).json({
      success: true,
      message: "Manufacturer added successfully",
      data: newManufacturer,
    });
  } catch (error) {
    console.error("Error adding manufacturer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add manufacturer",
      error: error.message,
    });
  }
};

// ✅ Get All Manufacturers
export const getAllManufacturers = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: manufacturers.length,
      data: manufacturers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch manufacturers",
      error: error.message,
    });
  }
};

// ✅ Get Single Manufacturer by ID
export const getManufacturerById = async (req, res) => {
  try {
    const { id } = req.params;
    const manufacturer = await Manufacturer.findById(id);

    if (!manufacturer) {
      return res.status(404).json({ success: false, message: "Manufacturer not found" });
    }

    res.status(200).json({ success: true, data: manufacturer });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch manufacturer",
      error: error.message,
    });
  }
};

// ✅ Update Manufacturer
export const updateManufacturer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedManufacturer = await Manufacturer.findByIdAndUpdate(
      id,
      { ...updatedData, lastUpdated: new Date() },
      { new: true }
    );

    if (!updatedManufacturer) {
      return res.status(404).json({ success: false, message: "Manufacturer not found" });
    }

    res.status(200).json({
      success: true,
      message: "Manufacturer updated successfully",
      data: updatedManufacturer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update manufacturer",
      error: error.message,
    });
  }
};

// ✅ Delete Manufacturer
export const deleteManufacturer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedManufacturer = await Manufacturer.findByIdAndDelete(id);
    if (!deletedManufacturer) {
      return res.status(404).json({ success: false, message: "Manufacturer not found" });
    }

    res.status(200).json({
      success: true,
      message: "Manufacturer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete manufacturer",
      error: error.message,
    });
  }
};
