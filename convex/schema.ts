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
    links: v.optional(
      v.array(
        v.object({
          txt: v.string(),
          headline: v.optional(v.boolean()),
          link: v.optional(v.string()),
          visible: v.boolean(),
          img: v.optional(v.string()),
          id: v.string(),
        })
      )
    ),
    avatar: v.object({
      initail: v.string(),
      bg: v.string(),
    }),
  }).index("byUserId", ["userId"]),
  // synchubAccountLinks: defineTable({
  //   userId: v.string(),
  //   links: v.optional(
  //     v.array(
  //       v.object({
  //         txt: v.string(),
  //         headline: v.optional(v.string()),
  //         link: v.optional(v.string()),
  //         visible: v.boolean(),
  //         img: v.optional(v.string()),
  //         id: v.string(),
  //       })
  //     )
  //   ),
  // }).index("byUserId", ["userId"]),
});
