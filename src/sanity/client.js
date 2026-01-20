import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: "koxreack",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: true, // true for fast production, false for realtime development
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
