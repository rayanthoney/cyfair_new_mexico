import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
    projectId: "koxreack",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false, // true for fast production, false for realtime development
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
