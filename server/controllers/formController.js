import Form from "../models/FormModel.js";

// Get all form submissions
export const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit new form data
export const createForm = async (req, res) => {
  try {
    const { name, phone, email, businessName } = req.body;

    if (!name || !phone || !email || !businessName) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const newForm = new Form(req.body);
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
