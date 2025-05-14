import * as arctic from "arctic";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectURI =
    process.env.NODE_ENV === "production"
        ? process.env.GOOGLE_REDIRECT_URI_PROD
        : process.env.GOOGLE_REDIRECT_URI_DEV;

export const google = new arctic.Google(clientId, clientSecret, redirectURI);
