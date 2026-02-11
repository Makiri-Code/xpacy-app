import { 
  Home, 
  Calendar, 
  Search, 
  Layers, 
  CreditCard 
} from 'lucide-react';
import React from 'react';

const PropertyNavigation = ({ activeTab, onTabChange }) => {

  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      description: 'Dashboard overview',
    },
    {
      id: 'services',
      label: 'Services',
      icon: Calendar,
      description: 'Book & manage services',
    },
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      description: 'Find properties',
    },
    {
      id: 'properties',
      label: 'Properties',
      icon: Layers,
      description: 'Manage listings',
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: CreditCard,
      description: 'Billing & transactions',
    },
  ];

  return (
    <div className="w-full bg-white shadow-sm rounded-t-2xl fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.label || activeTab === item.id; // Handling potential mismatch in casing/naming

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.label)} // Passing label to match dashboard state
              className={`text-xs flex flex-col items-center justify-center flex-1 py-3 mx-1 rounded-xl transition-all duration-300 group ${
                isActive
                  ? 'bg-white text-gray-900 font-bold'
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
              }`}
            >
              <div className={`p-2 rounded-full mb-2 transition-all ${
                isActive 
                  ? 'bg-white/20' 
                  : 'group-hover:text-primary'
              }`}>
                <Icon size={22} className={
                  isActive ? 'text-gray-900 font-bold' : 'text-gray-600 group-hover:text-primary'
                } />
              </div>
              <span className={`text-xs font-semibold transition-colors ${
                isActive ? 'text-gray-600' : 'text-gray-700'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      
      <div className="flex justify-center mt-4 pb-2">
        <div className="flex gap-1">
          {navigationItems.map((item) => {
             const isActive = activeTab === item.label || activeTab === item.id;
             return (
              <div
                key={item.id}
                className={`w-2 h-2 rounded-full transition-colors ${
                  isActive ? 'text-primary' : 'text-gray-300'
                }`}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default PropertyNavigation;