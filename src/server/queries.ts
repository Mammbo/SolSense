import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

// this function is used to get the geo data of the user (for future project use)
export async function getMyGeoData() {

    const user = auth();
    const geoData = db.query.geoData.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
        orderBy: (model, { desc }) => desc(model.id)
      });
    return geoData;
}

