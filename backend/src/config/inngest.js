import {Inngest} from "inngest";
import {connectDB} from "./db.js";
import {User} from "../models/user.model.js";

export const inngest = new Inngest({id: "marvel63cars"})

const syncUser = inngest.createFunction(
    {id: "sync-user"},
    {event: "clerk/user.created"},
    async ({event}) => {
        await connectDB(); // ⚠️ FIX 1: Need to call the function with ()
        const {id, email_addresses, first_name, last_name, image_url} = event.data;
        
        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address, // ⚠️ FIX 2: Should be email_address, not email_addresses
            name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
            imageUrl: image_url,
            addresses: [],
            wishlist: [], 
        };

        await User.create(newUser);
    }
);

const deleteUserFromDB = inngest.createFunction(
    {id: "delete-user-from-db"},
    {event: "clerk/user.deleted"},
    async ({event}) => {
        await connectDB(); // ⚠️ FIX 3: Need to call the function with ()
        const {id} = event.data;
        await User.deleteOne({clerkId: id}); // ⚠️ FIX 4: Should be lowercase 'id', not 'Id'
    }
);

export const functions = [syncUser, deleteUserFromDB];