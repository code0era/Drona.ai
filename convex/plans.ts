import { mutation, query } from "./_generated/server";

import { v } from "convex/values";

export const createPlan = mutation({
    args: {
        // FIX 1: Change argument name and type to match the new schema field
        userEmail: v.string(),
        name: v.string(),
        workoutPlan: v.object({
            schedule: v.array(v.string()),
            exercises: v.array(
                v.object({
                    day: v.string(),
                    routines: v.array(
                        v.object({
                            name: v.string(),
                            sets: v.number(),
                            reps: v.number(),
                            // Ensure other optional fields from your schema are included here if needed
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
    },
    handler: async (ctx, args) => {
        // FIX 2: Deactivate old plans using the new 'by_email' index
        const activePlans = await ctx.db
            .query("plans")
            // Use the new index and the userEmail argument
            .withIndex("by_email", (q) => q.eq("userEmail", args.userEmail))
            .filter((q) => q.eq(q.field("isActive"), true))
            .collect();

        for (const plan of activePlans) {
            await ctx.db.patch(plan._id, { isActive: false });
        }

        // Insert the new plan. The 'args' now correctly contains userEmail.
        const planId = await ctx.db.insert("plans", args);

        return planId;
    },
});

export const getUserPlans = query({
    // FIX 3: Change argument name and type to match the new lookup key
    args: { userEmail: v.string() },
    handler: async (ctx, args) => {
        const plans = await ctx.db
            .query("plans")
            // FIX 4: Use the new 'by_email' index
            .withIndex("by_email", (q) => q.eq("userEmail", args.userEmail))
            .order("desc")
            .collect();

        return plans;
    },
});