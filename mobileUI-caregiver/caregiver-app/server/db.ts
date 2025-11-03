import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, caregivers, InsertCaregiver, bookings, InsertBooking, ratings, InsertRating } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Caregiver queries
export async function getAllCaregivers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(caregivers);
}

export async function getCaregiverById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(caregivers).where(eq(caregivers.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createCaregiver(data: InsertCaregiver) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(caregivers).values(data);
  return result;
}

export async function updateCaregiver(id: number, data: Partial<InsertCaregiver>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(caregivers).set(data).where(eq(caregivers.id, id));
  return getCaregiverById(id);
}

export async function deleteCaregiver(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(caregivers).where(eq(caregivers.id, id));
}

// Booking queries
export async function createBooking(data: InsertBooking) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(bookings).values(data);
  return result;
}

export async function getUserBookings(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(bookings).where(eq(bookings.userId, userId));
}

export async function getBookingById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateBooking(id: number, data: Partial<InsertBooking>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(bookings).set(data).where(eq(bookings.id, id));
  return getBookingById(id);
}

// Rating queries
export async function createRating(data: InsertRating) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(ratings).values(data);
  return result;
}

export async function getCaregiverRatings(caregiverId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(ratings).where(eq(ratings.caregiverId, caregiverId));
}

export async function getBookingRating(bookingId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(ratings).where(eq(ratings.bookingId, bookingId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}
