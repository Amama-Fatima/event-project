export { default } from "next-auth/middleware"

export const config = { matcher: ["/my-events", "/add-event", "/edit-event/:id"] }