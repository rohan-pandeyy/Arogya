import { cookies } from "next/headers";
import { getBaseUrl } from "@/lib/getBaseUrl";

export async function getUserFromCookies() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");
  if (!token?.value) return null;

  try {
    const res = await fetch(`${getBaseUrl()}/users/profile`, {
      headers: {
        Cookie: `token=${token.value}`,
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch user:", err);
    return null;
  }
}
