import { mutation, query, internalMutation } from "./_generated/server";

import { IconType } from "react-icons/lib";

import { v } from "convex/values";

export const accounts = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity) {
      const userId = identity.subject;
      const accounts = await ctx.db
        .query("synchubAccount")
        .withIndex("byUserId", (q) => q.eq("userId", userId))
        .order("asc")
        .collect();

      return accounts;
    }
  },
});

export const allAccounts = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity) {
      const accounts = await ctx.db.query("synchubAccount").collect();
      return accounts;
    }
  },
});

export const createAccount = mutation({
  args: {
    username: v.string(),
    displayUsername: v.string(),
    name: v.string(),
    avatar: v.object({ initail: v.string(), bg: v.string() }),
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
  },
  handler: async (
    ctx,
    { username, name, avatar, displayUsername, socialIcons }
  ) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity) {
      const userId = identity.subject;
      await ctx.db.insert("synchubAccount", {
        name,
        username,
        userId,
        avatar,
        displayUsername,
        socialIcons,
      });
    }
  },
});

export const deleteAccount = mutation({
  args: { id: v.id("synchubAccount") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity) {
      await ctx.db.delete(args.id);
    }
  },
});

export const updateUsername = mutation({
  args: { id: v.id("synchubAccount"), username: v.string() },
  handler: async (ctx, { username, id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity) {
      await ctx.db.patch(id, { username });
    }
  },
});

export const updateAccount = mutation({
  args: {
    id: v.id("synchubAccount"),
    displayUsername: v.optional(v.string()),
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
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const { id, ...rest } = args;

    await ctx.db.patch(id, { ...rest });
  },
});

export const getAccount = query({
  args: { usernameId: v.string() },
  handler: async (ctx, args) => {
    const account = await ctx.db
      .query("synchubAccount")
      .filter((q) => q.eq(q.field("username"), args.usernameId))
      .collect();

    return account;
  },
});
