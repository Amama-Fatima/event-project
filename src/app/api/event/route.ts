import { EventSchema } from "@/lib/schema";
import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { stringify } from "csv-stringify/sync";
import { parse } from "csv-parse/sync";
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

export async function PUT(req: NextRequest) {
    try {
      const body = await req.json();
      const parsedEventData = EventSchema.parse(body.eventData);
      const userId: string = body.userId;
      const eventId: string = body.eventId;
  
      if (!userId || !eventId) {
        return new Response(
          JSON.stringify({ error: "Missing userId or eventId" }),
          { status: 400 }
        );
      }
  
      const csvFilePath = path.join(process.cwd(), "data", "events.csv");
  
      // Check if file exists
      if (!fs.existsSync(csvFilePath)) {
        return new Response(
          JSON.stringify({ error: "Events file not found" }),
          { status: 404 }
        );
      }
  
      const fileContent = fs.readFileSync(csvFilePath, "utf-8");
  
      // Parse CSV data
      let records = parse(fileContent, {
        columns: true, // Automatically uses the header row as keys
        skip_empty_lines: true,
      });
  
      let eventFound = false;
  
      // Update the specific event
      records = records.map((record: Record<string, string>) => {
        if (record.id === eventId && record.user_id === userId) {
          eventFound = true;
          return {
            ...record,
            name: parsedEventData.name,
            location: parsedEventData.location,
            date: parsedEventData.date.toISOString().split("T")[0], // Format date
            time: parsedEventData.time,
            address: parsedEventData.address.replace(/,/g, " "), // Replace commas
            organizer_name: parsedEventData.organizer_name,
            event_type: parsedEventData.event_type,
          };
        }
        return record;
      });
  
      if (!eventFound) {
        return new Response(
          JSON.stringify({ error: "Event not found or unauthorized" }),
          { status: 404 }
        );
      }
  
      // Convert records back to CSV
      const updatedCsv = stringify(records, {
        header: true, // Include headers in the output
      });
  
      // Write the updated CSV back to the file
      fs.writeFileSync(csvFilePath, updatedCsv);
  
      return new Response(
        JSON.stringify({
          success: true,
          message: "Event updated successfully",
        }),
        { status: 200 }
      );
    } catch (error: unknown) {
      console.error("Error updating event:", error);
  
      if (error instanceof z.ZodError) {
        return new Response(
          JSON.stringify({
            error: "Validation error",
            details: error.issues,
          }),
          { status: 422 }
        );
      }
  
      return new Response(
        JSON.stringify({
          error: "Internal server error",
        }),
        { status: 500 }
      );
    }
  }