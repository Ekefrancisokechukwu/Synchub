import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  synchubAccount: defineTable({
    username: v.string(),
    name: v.string(),
    userId: v.string(),
    bio: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    email: v.optional(v.string()),
    avatar: v.object({
      initail: v.string(),
      bg: v.string(),
    }),
  }).index("byUserId", ["userId"]),
});
