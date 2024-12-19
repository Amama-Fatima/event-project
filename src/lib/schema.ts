import * as z from 'zod';

export const EventType = ['Conference', 'Meeting', 'Dining', 'Studying', 'Working', 'Other'] as const;

export const EventSchema = z.object({
    name: z.string().nonempty(),
    location: z.string().nonempty(),
    date: z.union([
        z.date(),
        z.string().transform((str) => new Date(str))
    ]),
    time: z.string().nonempty(),
    address: z.string().nonempty(),
    organizer_name: z.string().nonempty(),
    event_type: z.enum(EventType)
})

export type EventSchemaType = z.infer<typeof EventSchema>;