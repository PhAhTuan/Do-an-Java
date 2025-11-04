import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  caregiver: router({
    list: publicProcedure.query(async () => {
      return db.getAllCaregivers();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getCaregiverById(input.id);
      }),
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        specialization: z.string(),
        experience: z.number(),
        phone: z.string(),
        email: z.string(),
        address: z.string().optional(),
        hourlyRate: z.number(),
        bio: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new Error("Only admin can create caregiver");
        return db.createCaregiver(input);
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        specialization: z.string().optional(),
        experience: z.number().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        address: z.string().optional(),
        hourlyRate: z.number().optional(),
        bio: z.string().optional(),
        isAvailable: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new Error("Only admin can update caregiver");
        const { id, ...data } = input;
        return db.updateCaregiver(id, data);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new Error("Only admin can delete caregiver");
        return db.deleteCaregiver(input.id);
      }),
  }),

  booking: router({
    create: protectedProcedure
      .input(z.object({
        caregiverId: z.number(),
        serviceDate: z.date(),
        duration: z.number(),
        totalPrice: z.number(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return db.createBooking({
          ...input,
          userId: ctx.user.id,
          status: "pending",
        });
      }),
    getUserBookings: protectedProcedure
      .query(async ({ ctx }) => {
        return db.getUserBookings(ctx.user.id);
      }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getBookingById(input.id);
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "confirmed", "completed", "cancelled"]).optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const booking = await db.getBookingById(input.id);
        if (!booking) throw new Error("Booking not found");
        if (booking.userId !== ctx.user.id && ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const { id, ...data } = input;
        return db.updateBooking(id, data);
      }),
  }),

  rating: router({
    create: protectedProcedure
      .input(z.object({
        bookingId: z.number(),
        caregiverId: z.number(),
        rating: z.number().min(1).max(5),
        comment: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return db.createRating({
          ...input,
          userId: ctx.user.id,
        });
      }),
    getCaregiverRatings: publicProcedure
      .input(z.object({ caregiverId: z.number() }))
      .query(async ({ input }) => {
        return db.getCaregiverRatings(input.caregiverId);
      }),
    getBookingRating: publicProcedure
      .input(z.object({ bookingId: z.number() }))
      .query(async ({ input }) => {
        return db.getBookingRating(input.bookingId);
      }),
  }),
});

export type AppRouter = typeof appRouter;
