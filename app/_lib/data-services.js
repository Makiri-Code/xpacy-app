export const url = "https://app.xpacy.com"

export async function getBanners() {
  try {
    const response = await fetch(`${url}/settings/homepage-sliders`);
    if (!response.ok) return [];
    const { data } = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetchin banner:", error);
    return [];
  }
}

export async function getFeaturedProperties() {
  try {
    const response = await fetch(`${url}/property/fetch-featured-properties`);
    if (!response.ok) return [];
    const { data } = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetchin banner:", error);
    return [];
  }
}

export async function getFaqs() {
  try {
    const response = await fetch(`${url}/faq/get-all-faqs`);
    if (!response.ok) return [];
    const { data } = await response.json();
    return data || []
  } catch (error) {
    console.error("Error fetching faq:", error)
    return []
  }
}

export async function getRentProperties() {
  try {
    const response = await fetch(`${url}/property/fetch-properties?purpose=rent`);
    const { properties, pagination } = await response.json();
    return [properties, pagination]
  } catch (error) {
    console.error("Error fetching faq:", error)
  }
}

export async function getProperties(search = {}) {

  const { purpose, type, minBedrooms, location, minPrice, maxPrice, page, property_owner_id, status } = search;
  const apiUrl = `${url}/property/fetch-properties?purpose=${purpose || ""}&type=${type || ""}&location=${location || ""}&minBedrooms=${minBedrooms || ""}&minPrice=${minPrice || ""}&maxPrice=${maxPrice || ""}&page=${page || 1}&property_owner_id=${property_owner_id || ""}&property_status=${status || ""}`;
  
  console.log("getProperties Search Params:", search);
  console.log("getProperties API URL:", apiUrl);

  try {
    const response = await fetch(apiUrl);
    const { properties, pagination } = await response.json();
    return [properties, pagination]
  } catch (error) {
    console.error("Error fetching properties:", error)
  }
}

export async function getLatestProperties() {
  try {
    const response = await fetch(`${url}/property/fetch-properties?limit=5`);
    const { properties } = await response.json();
    return properties
  } catch (error) {
    console.error("Error fetching latest properties:", error)
  }
}


export async function getCities() {
  try {
    const response = await fetch(`${url}/location/fetch-states`, { method: "GET" });
    const { state } = await response.json();
    return state
  } catch (error) {
    console.error("Error fetching latest properties:", error)
  }
}

export async function getProperty(id) {
  try {
    const response = await fetch(`${url}/property/fetch-property/${id}`);
    const { property } = await response.json();
    return property;
  } catch (error) {
    console.error("Error fetching latest properties:", error);
  }
}

export async function getOtherProperties() {
  try {
    const response = await fetch(`${url}/property/fetch-properties?purpose=&type=&location=&minBedrooms=&minPrice=&maxPrice=&page=&limit=6`);
    const { properties } = await response.json();
    return properties
  } catch (error) {
    console.error("Error fetching properties:", error)
  }
}

export async function getUserProfile(token) {
  try {
    const response = await fetch(`${url}/user/fetch-profile`, {
       next: {
        tags: ['user-profile']
      },
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
        "Content-type": "application/json",
      },
    });
    const { user } = await response.json();
    return user
  } catch (error) {
    console.error("Error fetching user profile:", error)
  }
}


export async function getPropertyOwnerProfile(token) {
  try {
    const response = await fetch(`${url}/property-owner/fetch-profile`, {
      next: {
        tags: ['property-owner-profile']
      },
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
        console.error("Failed to fetch property owner profile:", response.status, response.statusText);
        return null;
    }
    const data = await response.json();
    return data.user || data.propertyOwner || data; 
  } catch (error) {
    console.error("Error fetching property owner profile:", error)
    return null;
  }
}



export async function getSavedProperties(token) {
  try {
    const response = await fetch(`${url}/user-property/saved-properties`, {
      next: {
        tags: ['saved-properties']
      },
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
      }
    });
    const {data, pagination} = await response.json();
    return {data, pagination}
  } catch (error) {
    console.error("Error fetching user profile:", error)
  }
}

export async function getUserNotifications(token) {
  try {
    const response = await fetch(`${url}/notification/fetch-notifications`, {
      next: {
        tags: ['user-notifications']
      },
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
      }
    });
    const { data } = await response.json();
    console.log(data)
    return data
  } catch (error) {
    console.error("Error fetching user notifications:", error)
  }
}

export async function getBookedServices(token) {
  try {
    const response = await fetch(`${url}/user/fetch-services`, {
      next: {
        tags: ['booked-services']
      },
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
      }
    });
    const  {data}  = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching user booked services:", error)
  }
}

export async function getInvoiceList(token) {
  try {
    const response = await fetch(`${url}/user/fetch-invoices`, {
      next: {
        tags: ['fetch-invoices']
      },
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
      }
    });
    const  {data}  = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching user invoices:", error)
  }
}

export async function getInvoice(token, id) {
  try {
    const response = await fetch(`${url}/user/fetch-invoice/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
      }
    });
    const  data  = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching user invoice:", error)
  }
}

export async function getBookingList(token) {
  try {
    const response = await fetch(`${url}/user/fetch-bookings`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
      }
    });
    const  {data}  = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching user invoice:", error)
  }
}



////// Admin Data Services /////

export async function getAdminProfile(token) {
  try {
    const response = await fetch(`${url}/admin/fetch-admin-profile`, {
      next: {
        tags: ['admin-profile']
      },
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
        console.error(`Error fetching admin profile: ${response.status}`);
        return null;
    }
    const { admin } = await response.json();
    return admin
  } catch (error) {
    console.error("Error fetching admin profile (catch):", error)
    return null;
  }
}

export async function getAdminProperties(token, page) {
  try {
    const response = await fetch(`${url}/admin/fetch-all-propreties?page=${page || 1}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
        const text = await response.text();
        console.error(`Error fetching admin properties: ${response.status} ${response.statusText}`, text.slice(0, 100)); // Log first 100 chars
        return { properties: [], pagination: {} };
    }
    const {properties, pagination} = await response.json();
    return {properties, pagination}
  } catch (error) {
    console.error("Error fetching admin properties (catch):", error)
    return { properties: [], pagination: {} };
  }
}

export async function getAdminServices(token) {
  try {
    const response = await fetch(`${url}/service/fetch-services`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
        const text = await response.text();
         console.error(`Error fetching admin services: ${response.status} ${response.statusText}`, text.slice(0, 100));
         return [];
    }
    const {data} = await response.json();
    return data
  } catch (error) {
     console.error("Error fetching admin services (catch):", error)
     return [];
  }
}

export async function getAdminPayments(token) {
  try {
    const response = await fetch(`${url}/admin/fetch-payments`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
        console.warn("Admin payments endpoint not found or failed.");
        return null;
    }
    const {data} = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching admin payments:", error);
    return null;
  }
}

export async function getPropertyOwner(token) {
  try {
    const response = await fetch(`${url}/admin/property-owner/fetch-propertyowners`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
        if (response.status === 404) {
             console.warn(`Property owners endpoint not found (404). Returning empty list.`);
        } else {
             console.error(`Error fetching property owners: ${response.status}`);
        }
        return [];
    }
    const { data } = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching property owner (catch):", error);
    return [];
  }
}
export async function getPropertyOwnerById(token, id) {
  console.log(id)
  try {
    const response = await fetch(`${url}/admin/property-owner/fetch-propertyowner/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
        "Content-type": "application/json",
      },
    });
    if (!response.ok) return null;
    const {property_owner} = await response.json();
    return property_owner
  } catch (error) {
    console.error("Error fetching property-owner:", error)
    return null;
  }
}
export async function getAllAdmin(token) {
  try {
    const response = await fetch(`${url}/admin/fetch-admin`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
        console.error(`Error fetching admins: ${response.status}`);
        return [];
    }
    const { data } = await response.json();
    return data 
  } catch (error) {
    console.error(`Error in getAllAdmin: ${url}/admin/fetch-admin`, error);
    return []; 
  }
}

export async function getAllUsers(token) {
  try {
    const response = await fetch(`${url}/admin/fetch-users`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
        if (response.status === 404) {
             console.warn("Fetch users endpoint not found (404).");
        } else {
             console.error(`Error fetching users: ${response.status}`);
        }
        return [];
    }
    const { data } = await response.json();
    return data 
  } catch (error) {
    console.error("Error fetching all users:", error);
    return []; 
  }
}

////// Property Owner Data Services /////

export async function getPropertyOwnerBookings(token) {
  try {
    const response = await fetch(`${url}/property-owner/fetch-bookings`, {
      next: {
        tags: ['property-owner-bookings']
      },
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
        if (response.status === 404) {
            // Endpoint might not be deployed yet
            console.warn("Property owner bookings endpoint not found (404). Returning empty list.");
        } else {
            console.error("Failed to fetch property owner bookings:", response.status, response.statusText);
        }
        return [];
    }
    const { data } = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching property owner bookings:", error)
    return []
  }
}

export async function getPropertyOwnerServices(token) {
  try {
    const response = await fetch(`${url}/property-owner/fetch-services`, {
      next: {
        tags: ['property-owner-services']
      },
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
        console.error("Failed to fetch property owner services:", response.status, response.statusText);
        return [];
    }
    const { data } = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching property owner services:", error)
    return []
  }
}

export async function getPropertyOwnerInvoices(token) {
  try {
    const response = await fetch(`${url}/property-owner/fetch-invoices`, {
      next: {
        tags: ['property-owner-invoices']
      },
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
        console.error("Failed to fetch property owner invoices:", response.status, response.statusText);
        return [];
    }
    const { data } = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching property owner invoices:", error)
    return []
  }
}

export async function getPropertyOwnerNotifications(token) {
  try {
    const response = await fetch(`${url}/property-owner/fetch-notifications`, {
      next: {
        tags: ['property-owner-notifications']
      },
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
        console.error("Failed to fetch property owner notifications:", response.status, response.statusText);
        return [];
    }
    const { data } = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching property owner notifications:", error)
    return []
  }
}