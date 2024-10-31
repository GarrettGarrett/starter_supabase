import { db } from "../db";
import { InsertProfile, profilesTable, SelectProfile } from "../schema/profiles-schema";

export const createProfile = async (data: InsertProfile) => {
  try {
    const [newProfile] = await db.insert(profilesTable).values(data).returning();
    return newProfile;
  } catch (error) {
    console.error("Error creating profile: ", error);
    throw new Error("Failed to create profile");
  }
};

