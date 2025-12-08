import { defineSchema, defineTable } from "convex/server";

import { v } from "convex/values";
import { Drum } from "lucide-react";
import { describe } from "node:test";
export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        image: v.optional(v.string()),
        clerkId: v.string(),

    }).index("by_clerk_id", ["clerkId"]),

    plans: defineTable({
        isActive: v.boolean(),
        userId: v.id("users"),
        name: v.string(),
        workoutPlan: v.object({
            exercises: v.array(
                v.object({
                    day: v.string(),
                    routines: v.array(
                        v.object({
                            name: v.string(),
                            sets: v.optional(v.number()),
                            reps: v.optional(v.float64()),
                            description: v.optional(v.string()),
                            duration: v.optional(v.string()),
                            exercises: v.optional(v.array(v.string())),
                        })
                    ),
                })
            ),
            schedule: v.array(v.string()),
        }),

    })
        .index("by_active", ["isActive"])
        .index("by_user_id", ["userId"]),

}) 