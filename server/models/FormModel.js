import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    altPhone: String,
    email: String,
    altEmail: String,
    businessName: String,
    businessAddress: String,
    pinCode: String,
    country: String,
    state: String,
    city: String,
    accountType: String,
    productType: String,
    productCatalog: String,
    sku: String,
    referralSource: String,
    additionalInfo: String,
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);
export default Form;
