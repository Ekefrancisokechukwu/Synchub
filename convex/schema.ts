import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  synchubAccount: defineTable({
    username: v.string(),
    displayUsername: v.string(),
    name: v.string(),
    userId: v.string(),
    bio: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    email: v.optional(v.string()),
    socialIcons: v.optional(
      v.array(
        v.object({
          link: v.string(),
          icon: v.string(),
          name: v.string(),
          added: v.boolean(),
          hidden: v.boolean(),
        })
      )
    ),
    avatar: v.object({
      initail: v.string(),
      bg: v.string(),
    }),
  }).index("byUserId", ["userId"]),
});
