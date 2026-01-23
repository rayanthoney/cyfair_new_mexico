import { defineType, defineField } from 'sanity'

export const scheduleEvent = defineType({
    name: 'scheduleEvent',
    title: 'Schedule Event',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Event Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'eventType',
            title: 'Event Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Tournament', value: 'tournament' },
                    { title: 'Training', value: 'training' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'string',
            description: 'e.g., "Jan 04-06" or "Feb 3"',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'country',
            title: 'Country',
            type: 'string',
            initialValue: 'USA',
        }),
        defineField({
            name: 'time',
            title: 'Time',
            type: 'string',
            description: 'e.g., "10:00 AM" or "TBA"',
        }),
        defineField({
            name: 'result',
            title: 'Result',
            type: 'string',
            description: 'e.g., "W 58-45" or "L 40-52" (leave empty for upcoming events)',
        }),
        defineField({
            name: 'sortOrder',
            title: 'Sort Order',
            type: 'number',
            description: 'Lower numbers appear first',
            initialValue: 0,
        }),
    ],
    orderings: [
        {
            title: 'Sort Order',
            name: 'sortOrderAsc',
            by: [{ field: 'sortOrder', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'date',
            eventType: 'eventType',
        },
        prepare(selection) {
            const { title, subtitle, eventType } = selection
            return {
                title: title,
                subtitle: `${eventType === 'tournament' ? '🏆' : '🏀'} ${subtitle}`,
            }
        },
    },
})
