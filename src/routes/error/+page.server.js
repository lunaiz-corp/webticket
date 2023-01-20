import { error } from '@sveltejs/kit'

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()

		throw error(500, {
			message: data.get('message'),
			description: data.get('description')
		})
	}
}
