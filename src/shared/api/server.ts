import ky from "ky";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");

export const serverApi = ky.create({
  credentials: "include",
  prefix: API_BASE_URL,
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (accessToken != null) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
  },
});
