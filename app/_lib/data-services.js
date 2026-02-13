export const url = "https://app.xpacy.com"

export async function getBanners() {
  try {
    const response = await fetch(`${url}/settings/homepage-sliders`);
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetchin banner:", error);
  }
}

export async function getFeaturedProperties() {
  try {
    const response = await fetch(`${url}/property/fetch-featured-properties`);
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetchin banner:", error);
  }
}

export async function getFaqs() {
  try {
    const response = await fetch(`${url}/faq/get-all-faqs`);
    const { data } = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching faq:", error)
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
    const data = await response.json();
    return data.user || data.propertyOwner || data; 
  } catch (error) {
    console.error("Error fetching property owner profile:", error)
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
    const { admin } = await response.json();
    return admin
  } catch (error) {
    console.error("Error fetching user profile:", error)
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
    const {properties, pagination} = await response.json();
    return {properties, pagination}
  } catch (error) {
    console.error("Error fetching user profile:", error)
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
    const {data} = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching user profile:", error)
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
    const { data } = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return [];
  }
}
export async function getPropertyOwnerById(token, id) {
  console.log(id)
  try {
    const response = await fetch(`${url}/admin/property-owner/fetch-propertowner/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token?.value}`,
        "Content-type": "application/json",
      },
    });
    const {property_owner} = await response.json();
    return property_owner
  } catch (error) {
    console.error("Error fetching property-owner:", error)
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
    const { data } = await response.json();
    return data 
  } catch (error) {
    console.error(`Error in getAllAdmin: ${url}/admin/fetch-admin`, error);
    return []; 
  }
}