"use server";

import { cookies } from "next/headers";

export async function getCurrentUser() {
  const backendApi = process.env.BACKEND_API;

  if (!backendApi) {
    return {
      success: false,
      status: null,
      message: "Cấu hình máy chủ chưa hợp lệ.",
    };
  }

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const response = await fetch(`${backendApi}/api/v1/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: data?.message || "Truy xuất thông tin người dùng không thành công.",
      };
    }

    return {
      success: true,
      status: response.status,
      data,
    };
  } catch {
    return {
      success: false,
      status: null,
      message: "Không thể kết nối đến máy chủ.",
    };
  }
}
