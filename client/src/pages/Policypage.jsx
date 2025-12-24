import React from 'react';
import logo from '../assets/venderhome/Media copy.png'; // Assuming logo is in the same directory

const QualityPolicy = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl border border-gray-200">
        <div className="flex justify-center mb-6">
          <img 
            src={logo} 
            alt="Cure Pharma Logo" 
            className="h-16 w-auto object-contain"
          />
        </div>
        
        <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Quality Policy
        </h1>
        
        <p className="text-gray-700 mb-4">
          Cure Pharmaceutical Industries is committed to the following:
        </p>
        
        <ol className="list-decimal list-inside text-gray-700 space-y-3">
          <li>
            Providing pharmaceutical products, which meet safety, quality and efficacy requirements according to the relevant national and international regulations.
          </li>
          <li>
            Establishing and maintaining a Quality Management System which satisfies the requirements of ISO 9001:2015, and any other customer specific requirements.
          </li>
          <li>
            Implementing appropriate actions to address any quality risks and opportunities associated with internal / external issues and to meet the needs and expectations of interested parties.
          </li>
          <li>
            Ensuring all company's personnel are fully competent to carry out their assigned tasks.
          </li>
          <li>
            Striving to continually improve company's performance through the determination of quality objectives, evaluating results, implementing the appropriate corrective actions, following up management review outputs, and controlling production processes.
          </li>
        </ol>
        
        <div className="mt-6 text-gray-700 italic text-sm text-center">
          By signing this Quality Policy, the chief executive officer gives his approval to establish and maintain the Quality Management System in the company.
        </div>
      </div>
    </div>
  );
};

export default QualityPolicy;