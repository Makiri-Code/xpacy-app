"use server";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers"
import { revalidateTag } from "next/cache";

const URL = "https://app.xpacy.com";

export const submitSubscribe = async (formData) => {
  const email = formData.get("email");
  const response = await fetch(`${URL}/newsletter/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  if (data.message === "User is already subscribed") {
    return {
      success: false,
      data,
    };
  } else {
    return {
      success: true,
      data,
    };
  }
};


export const handleSearch = async (formData) => {
  const search = {
    purpose: formData.get("purpose"),
    location: formData.get("location") ?? "",
    type: formData.get("type") ?? "",
    minBedrooms: Number(formData.get("minBedrooms")) || "",
    minPrice: Number(formData.get("minPrice")) || "",
    maxPrice: Number(formData.get("maxPrice")) || "",
  }
  const { purpose, type, location, minBedrooms, minPrice, maxPrice } = search
  redirect(`/search?purpose=${purpose}&type=${type}&location=${location}&minBedrooms=${minBedrooms}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
}

export async function handleLogin(userData, redirectUrl) {
  const response = await fetch(`${URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...userData }),

  });
  const data = await response.json();
  if (!response.ok) return { success: false, message: data.message }

  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: data.token,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
  if (data.role === "User") redirect(redirectUrl)
  return { success: true, message: data.message }
}

export async function handleSignup(userData, referralCode) {
  const response = await fetch(`${URL}/user/register?referralCode=${referralCode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...userData })
  })
  const data = await response.json();

  if (!response.ok) return { success: false, message: data.message }

  return { success: true, message: data.message, user: data.user }
}

export async function handleSaveProperty(id) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")
  if (!token?.value) throw new Error("Please log in to continue")
  const response = await fetch(`${URL}/user-property/saved-properties`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token?.value}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ propertyId: id })
  });
  const data = await response.json();
  revalidateTag("saved-properties");
  return data;
}

export async function handleBookProperty() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token");
  if (!token) throw new Error("Please Log in to book this property")
}



export async function handleDelteSavedProp(savedPropertyId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token?.value) throw new Error("Please Log in to continue");
  const response = await fetch(`${URL}/user-property/delete-saved-property/${savedPropertyId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token?.value}`,
      "Content-type": "application/json",
    }
  });
  const data = await response.json();
  revalidateTag('saved-properties');
  return data
}

export async function handleLogOut() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  cookieStore.delete("token");
  redirect("/auth/log-in")
}

export async function processInvoice(id) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token?.value) throw new Error("Please Log in to continue");
  const response = await fetch(`${URL}/payment/paystack/initialize`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ invoice_id: id })
  });
  const data = await response.json();
  return data

}

export async function uploadDisplayPhoto(formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token?.value) throw new Error("Please Log in to continue");
  const response = await fetch(`${URL}/user/upload-display-image`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token?.value}`,
    },
    body: formData
  });
  const data = await response.json();
  revalidateTag("user-profile");
  return data
}

export async function updateUserProfile(userData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token?.value) throw new Error("Please Log in to continue");
  const response = await fetch(`${URL}/user/update-profile`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...userData })
  });
  const data = await response.json();
  revalidateTag("user-profile");
  return data
}

export async function updateUserPassword(userData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token?.value) throw new Error("Please Log in to continue");
  const response = await fetch(`${URL}/user/change-password`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...userData })
  });
  const data = await response.json();
  return data
}

export async function createBooking(formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token?.value) throw new Error("Please Log in to continue");
  const response = await fetch(`${URL}/user/create-booking`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...formData })
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.message)
  return data;
};

export async function handleBookService(form) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token?.value) throw new Error("Please Log in to continue");
  const data = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Handle arrays separately (e.g., property_amenities, images, videos)
      value.forEach((item) => {
        data.append(key, item); // Append each item in the array
      });
    } else if (value !== null && value !== undefined) {
      data.append(key, value);
    }
  });
  const response = await fetch(`${URL}/service/request-service`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token?.value}`,
    },
    body: data
  });
  const res = await response.json();
  return res
};

export async function handleContact(formData){
  const response = await fetch(`${URL}/contact/send-mail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData)
  });
  const data = await response.json();
  return data
}