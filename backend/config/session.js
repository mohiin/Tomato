
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

dotenv.config();

const store = MongoStore.create({
    mongoUrl: process.env.ATLASDB_URL, // Use environment variable for the MongoDB URL
    crypto: {
        secret: process.env.SESSION_SECRET, // Session encryption key
    },
    touchAfter: 24 * 3600, // Update session only after 24 hours
});

store.on("error", (err) => {
    logger.error("Error in MongoDB session store: ", err); // Log the error to a file
});

// Session options configuration
const sessionOptions = {
    store,
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false, 
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
};

export { sessionOptions };
