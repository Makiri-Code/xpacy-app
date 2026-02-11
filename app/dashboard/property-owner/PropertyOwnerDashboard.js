"use client";
import React, { useState } from 'react';
import PropertyNavigation from './PropertyNavigation';
import Properties from './Properties';
import PropertyService from './PropertyService';
import PaymentOptionList from '@/app/_components/PaymentOptionList';
import SearchPropertyOwner from '@/app/_components/SearchPropertyOwner';

const PropertyOwnerDashboard = (props) => {
  const { 
    notifications, 
    propertyOwners, 
    paymentList,
    propertyCards,
    bookedServiceCards // Add this prop
  } = props;
  
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      
      {/* Content Area */}
      {activeTab === "Home" && (
        <Properties {...props} propertyCards={propertyCards} />
      )}
      
      {activeTab === "Services" && (
        <PropertyService />
      )}
      
      {activeTab === "Properties" && (
        <Properties {...props} propertyCards={propertyCards} />
      )}

      {/* Booked Services Tab - Add this section */}
      {activeTab === "Booked Services" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Booked Services</h2>
          {bookedServiceCards?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookedServiceCards}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-500 text-lg">No booked services found.</p>
              <p className="text-gray-400 mt-2">When you book services, they will appear here.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "Search" && (
        <SearchPropertyOwner allOwners={propertyOwners} />
      )}
      
      {activeTab === "Payments" && paymentList}

      <PropertyNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default PropertyOwnerDashboard;