import { defineType, defineField } from 'sanity'

export const player = defineType({
    name: 'player',
    title: 'Player',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'jerseyNumber',
            title: 'Jersey Number',
            type: 'number',
            validation: (Rule) => Rule.required().min(0).max(99),
        }),
        defineField({
            name: 'position',
            title: 'Position',
            type: 'string',
            options: {
                list: [
                    { title: 'Point Guard', value: 'Point Guard' },
                    { title: 'Shooting Guard', value: 'Shooting Guard' },
                    { title: 'Small Forward', value: 'Small Forward' },
                    { title: 'Power Forward', value: 'Power Forward' },
                    { title: 'Center', value: 'Center' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'gradYear',
            title: 'Graduation Year',
            type: 'number',
            validation: (Rule) => Rule.required().min(2020).max(2035),
        }),
        defineField({
            name: 'division',
            title: 'Division',
            type: 'string',
            options: {
                list: [
                    { title: '17U', value: '17U' },
                    { title: '16U', value: '16U' },
                    { title: '15U', value: '15U' },
                    { title: '14U', value: '14U' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Player Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'text',
            rows: 3,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'division',
            media: 'image',
        },
        prepare(selection) {
            const { title, subtitle, media } = selection
            return {
                title: title,
                subtitle: `#${subtitle}`,
                media: media,
            }
        },
    },
})
