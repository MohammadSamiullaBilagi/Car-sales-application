import { Inngest } from "inngest";
import { serve } from "inngest/express"; // ADD THIS IMPORT
import { connectDB } from "./db.js";
import { User } from "../models/user.model.js";

export const inngest = new Inngest({ id: "marvel63cars" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    
    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address, // Fixed typo
      name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
      imageUrl: image_url,
      addresses: [],
      wishlist: [], 
    };

    await User.create(newUser);
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id }); // Fixed: was "Id" should be "id"
  }
);

export const functions = [syncUser, deleteUserFromDB];

// ADD THIS: Export the serve handler
export const inngestServe = serve({
  client: inngest,
  functions: functions,
});