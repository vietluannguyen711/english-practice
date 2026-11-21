"use server";

import { cookies } from "next/headers";

type RegisterProps = {
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    email: string;
};

export async function register({
    firstName,
    lastName,
    password,
    confirmPassword,
    email,
}: RegisterProps) {
    const backendApi = process.env.BACKEND_API;

    if (!backendApi) {
        return {
            success: false,
            message: "Cấu hình máy chủ chưa hợp lệ.",
        };
    }

    try {
        const response = await fetch(`${backendApi}/api/v1/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                password,
                confirmPassword,
                email,
            }),
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            return {
                success: false,
                message: data?.message || "Đăng ký không thành công.",
            };
        }

        return {
            success: true,
            data,
        };
    } catch {
        return {
            success: false,
            message: "Không thể kết nối đến máy chủ.",
        };
    }
}
type LoginProps = {
    password: string;
    email: string;
};
export async function login({ password, email }: LoginProps) {
    const backendApi = process.env.BACKEND_API;

    if (!backendApi) {
        return {
            success: false,
            message: "Cấu hình máy chủ chưa hợp lệ.",
        };
    }

    try {
        const response = await fetch(`${backendApi}/api/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password, email }),
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            return {
                success: false,
                message: data?.message || "Đăng nhập không thành công.",
            };
        }

        if (!data?.accessToken || !data?.refreshToken) {
            return {
                success: false,
                message: "Phản hồi từ máy chủ không hợp lệ.",
            };
        }

        const cookieStore = await cookies();

        cookieStore.set("accessToken", data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60,
        });

        cookieStore.set("refreshToken", data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });

        return {
            success: true,
            message: "Đăng nhập thành công",
        };
    } catch {
        return {
            success: false,
            message: "Không thể kết nối đến máy chủ.",
        };
    }
}
