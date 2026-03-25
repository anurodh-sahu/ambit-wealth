import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("*/api/user", () => {
    console.log("🔵 Mocking /api/user");
    return HttpResponse.json({
      id: 1,
      name: "John Doe",
    });
  }),

  // http.post("/api/login", async ({ request }) => {
  //   const body = await request.json();

  //   if (body.username === "admin") {
  //     return HttpResponse.json({ token: "fake-token" });
  //   }

  //   return new HttpResponse(null, { status: 401 });
  // }),
];
