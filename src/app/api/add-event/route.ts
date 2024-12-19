import { EventSchema } from "@/lib/schema";
import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { z } from "zod";
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsedEventData = EventSchema.parse(body.eventData);
        const userId: string = body.userId;

        const csvFilePath = path.join(process.cwd(), "data", "events.csv");
        // Read existing events to determine the next ID
        const csvData = fs.readFileSync(csvFilePath, "utf-8");
        const rows = csvData
            .split("\n")
            .map((row) => row.trim())
            .filter((row) => row.length > 0);

        // Get the highest ID (skip header row)
        const highestId =
            rows.length > 1
                ? Math.max(...rows.slice(1).map((row) => parseInt(row.split(",")[0])))
                : 0;

        const newId = highestId + 1;

        // Format the date to YYYY-MM-DD for CSV storage
        const formattedDate = parsedEventData.date.toISOString().split('T')[0];

        // Create the new event row
        const newEventRow = [
            newId,
            parsedEventData.name,
            parsedEventData.location,
            formattedDate,
            parsedEventData.time,
            parsedEventData.address.replace(/,/g, ' '),  // Replace commas with spaces in address
            parsedEventData.organizer_name,
            parsedEventData.event_type,
            userId
        ].map(value => String(value).trim());  // Trim all values

        // Ensure the file ends with a newline before appending
        if (!csvData.endsWith('\n')) {
            fs.appendFileSync(csvFilePath, '\n');
        }

        // Append the new event to the CSV file
        fs.appendFileSync(csvFilePath, `${newEventRow.join(',')}\n`);

        return new Response(JSON.stringify({ 
            success: true, 
            eventId: newId 
        }), {
            status: 201,
        });        

    } catch (error: unknown) {
        console.log('error is ', error);
        if (error instanceof z.ZodError) {
          return new Response(JSON.stringify(error.issues), { status: 422 });
        } else {
          return new Response(null, { status: 500 });
        }
    }    
}