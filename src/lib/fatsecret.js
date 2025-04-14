import oauthSignature from "oauth-signature";
import qs from "qs";
import { createId } from "@paralleldrive/cuid2";

const CONSUMER_KEY = process.env.FATSECRET_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.FATSECRET_CONSUMER_SECRET;

export async function searchFood(query) {
    if (!CONSUMER_KEY || !CONSUMER_SECRET) {
        throw new Error("Missing FatSecret API credentials.");
    }

    const url = "https://platform.fatsecret.com/rest/server.api";
    const httpMethod = "GET";

    const oauthParams = {
        format: "json",
        max_results: 50,
        method: "foods.search",
        search_expression: query,
        oauth_consumer_key: CONSUMER_KEY,
        oauth_nonce: createId(),
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_version: "1.0",
    };

    const signature = oauthSignature.generate(
        httpMethod,
        url,
        oauthParams,
        CONSUMER_SECRET
    );

    const fullParams = {
        ...oauthParams,
        oauth_signature: signature,
    };

    const queryString = qs.stringify(fullParams, { encode: false });
    const fullUrl = `${url}?${queryString}`;

    try {
        const response = await fetch(fullUrl);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `API Error: ${response.status} ${response.statusText} - ${errorText}`
            );
        }

        const data = await response.json();
        console.log(data);
        if (!data.foods || !data.foods.food) {
            return null;
        }

        return data.foods.food;
    } catch (error) {
        console.error("Error in searchFood:", error.message);
        throw error;
    }
}

export async function getFood(foodId) {
    if (!CONSUMER_KEY || !CONSUMER_SECRET) {
        throw new Error("Missing FatSecret API credentials.");
    }

    const url = "https://platform.fatsecret.com/rest/server.api";
    const httpMethod = "GET";
    const oauthParams = {
        food_id: foodId,
        format: "json",
        method: "food.get.v4",
        oauth_consumer_key: CONSUMER_KEY,
        oauth_nonce: createId(),
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_version: "1.0",
    };
    const signature = oauthSignature.generate(
        httpMethod,
        url,
        oauthParams,
        CONSUMER_SECRET
    );
    const fullParams = {
        ...oauthParams,
        oauth_signature: signature,
    };
    const queryString = qs.stringify(fullParams, { encode: false });
    const fullUrl = `${url}?${queryString}`;

    try {
        const response = await fetch(fullUrl);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `API Error: ${response.status} ${response.statusText} - ${errorText}`
            );
        }

        const data = await response.json();

        if (!data) {
            throw new Error("Unexpected API response structure.");
        }

        return data.food.servings.serving;
    } catch (error) {
        console.error("Error in searchFood:", error.message);
        throw error;
    }
}
