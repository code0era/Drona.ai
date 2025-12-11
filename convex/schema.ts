import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(), // Existing field
        image: v.optional(v.string()),
        clerkId: v.string(),
    })
        .index("by_clerk_id", ["clerkId"]) // Keep this index for Clerk webhooks
        .index("email", ["email"]), // <-- NEW/CRITICAL: Index the email field for user lookups

    plans: defineTable({
        // REMOVED: userId: v.string(), 
        userEmail: v.string(), // <-- FIX 1: New field for the foreign key (email address)
        name: v.string(),
        workoutPlan: v.object({
            schedule: v.array(v.string()),
            exercises: v.array(
                v.object({
                    day: v.string(),
                    routines: v.array(
                        v.object({
                            name: v.string(),
                            sets: v.optional(v.number()),
                            reps: v.optional(v.number()),
                            duration: v.optional(v.string()),
                            description: v.optional(v.string()),
                            exercises: v.optional(v.array(v.string())),
                        })
                    ),
                })
            ),
        }),
        dietPlan: v.object({
            dailyCalories: v.number(),
            meals: v.array(
                v.object({
                    name: v.string(),
                    foods: v.array(v.string()),
                })
            ),
        }),
        isActive: v.boolean(),
    })
        // REMOVED: .index("by_user_id", ["userId"])
        .index("by_email", ["userEmail"]) // <-- FIX 2: New index to query plans by email
        .index("by_active", ["isActive"]),
});