import mongoose from "mongoose";

const manufacturerSchema = new mongoose.Schema(
  {
    // 1. Basic Company Information
    manufacturerName: { type: String, required: true, unique: true },  
    cinNumber: { type: String },
    panGstNumber: { type: String },
    incorporationYear: { type: Number },
    typeOfCompany: { type: String, },
    parentCompany: { type: String },
    website: { type: String },
    email: { type: String },
    contactNumber: { type: String },
    whatsappNumber: { type: String },
    factoryAddress1: { type: String },
    factoryAddress2: { type: String },
    factoryAddress3: { type: String },

    // 2.  Key Personnel Master, 
    managingDirectorName: { type: String },
    cfoName: { type: String },
    businessDevelopmentHead: { type: String },
    qaqcHead: { type: String },
    regulatoryAffairsHead: { type: String },
    rdHead: { type: String },
    productionPlantHead: { type: String },
    hrAdminHead: { type: String },
    pharmacovigilanceContact: { type: String },
    authorizedSignatory: { type: String },
    contactDetails: { type: String },
    
  
    // 3. Accreditation & Certification Master
    licensetype: [{ type: String }],
    licensenumber: { type: String },
    validity: { type: String },
    drugManufacturingLicenseType: [{ type: String }],
    renewalDate: { type: String },
    issuingAuthority: { type: String },
    RegulatoryInspectionHistory: [{ type: String }],
    

    // 4.Factory / Site Master
    siteName: { type: String },
    siteType: { type: String },
    siteAddress: { type: String },
    manufacturingDepartments: { type: String },
    stpDetails: { type: String },
    utilityDetails: { type: String },
    cleanroomclassification: { type: String },
    GPSlocation: { type: String },

    // 5. product Capabilities master
    dosageForm: { type: String, required: true, },
    therapeuticCategory: { type: String },
    batchSize: { type: String, required: true, },
    annualCapacity: { type: String },
    brandsmanufactured: { type: String },
    exportMarketAuthorization: { type: String },

    // 6.quality & Compliance Master
    qualityManagementSystem: { type: String },
    documentControlSoftware: { type: String },
    validationMaster: { type: String },
    auditHistory: { type: String },
    changeControlProcess: { type: String },

    // 7. Equipment &  Calibration Master
    equipmentNo: { type: String },
    equipmentLocation: { type: String },
    dueDate: { type: String },
    maintenanceSchedule: { type: String },
    qualificationStatus: { type: String },
    equipmentSoftware: { type: String },

    // 8. Raw Material &  Supplier  master
    supplierName: { type: String },
    supplierAddress: { type: String },
    materialName: { type: String },
    venderType: { type: String },
    coaAvailability: { type: String },
    approvedVendorStatus: { type: String },
    auditScore: { type: String },
    lastAuditDate: { type: Date },
    sourceTraceability: { type: String },

    // 9. contact / business terms master 
    agreementType: { type: String },
    contactstartDate: { type: Date },
    contactEndDate: { type: Date },
    leadTime: { type: String },
    pricingTerms: { type: String },
    exclusivityclauses: { type: String },
    penaltyClauses: { type: String },
    paymentTerms: { type: String },

    // 10. regulatory affairs master
    dossierPrepared: { type: String },
    marketRegistration: { type: String },
    DMFandCEPfailed: { type: String },
    productStabilityDataAvailable: { type: String },
    systemused: { type: String },
    ProductRecallHistory: { type: String },

    // 11. Environmental (EHS / ESG) Master
    safetyOfficerName: { type: String },
    employeeCount: { type: String },
    diversityRatio: { type: String },
    csrInitiatives: { type: String },
    localEmployment: { type: String },
    boardComposition: { type: String },
    codeOfConduct: { type: String },
    whistleblowerPolicy: { type: String },
    DataPrivacyandITCompliance: { type: String },
    esgReportingFrequency: { type: String },
   
    // 12. digital system integration master
    ERPused: { type: String },
    integration: { type: String },
    serializationSystem: { type: String },
    dataBackupFrequency: { type: String },
    cyberSecurityMeasures: { type: String },
    compliance: { type: String },

    // 13. intellectual property and R&D master
    formulstionOwnership: { type: String },
    patentNumber: { type: String },
    productDevelopmentState: { type: String },
    stabilityStudiesStatus: { type: String },
    studyData: { type: String },
    RandDColaborationsDetails: { type: String },


    // 14. Audit and performance master
    internalAuditfrequency: { type: String },
    customerauditHistory: { type: String },
    RegulatoryAuditObservations: { type: String },
    CAPAcloser: { type: String },
    qualityrating: { type: String },
    performanceReviewNotes: { type: String },

    // 15. Document and attachment master
    file: [{type: String}],


 

      // 16. Tracking Fields
    // createdDate: { type: Date, default: Date.now },
    // lastUpdated: { type: Date, default: Date.now },

  },
  { timestamps: true }
);


// Update 'lastUpdated' automatically on save
manufacturerSchema.pre("save", function (next) {
  this.lastUpdated = new Date();
  next();
});

const Manufacturer = mongoose.model("Manufacturer", manufacturerSchema);
export default Manufacturer;


// Need to manage state? → useState
// Need side effects? → useEffect
// Need global state? → useContext
// Complex state logic? → useReducer
// Pass callback to memo child? → useCallback
// Expensive calculation? → useMemo
// Need DOM access? → useRef
// Measurements before paint? → useLayoutEffect
// Heavy background work? → useTransition / useDeferredValue