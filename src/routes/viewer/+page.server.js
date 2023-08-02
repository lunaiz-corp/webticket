import { error } from '@sveltejs/kit'

function replaceTag(tag) {
	let tagsToReplace = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;'
	}

	return tagsToReplace[tag] || tag
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, fetch }) {
	let response = {}
	let { ticketUrl } = Object.fromEntries(url.searchParams)

	if (ticketUrl) {
		if (ticketUrl.startsWith('https://cdn.discordapp.com/attachments/') && ticketUrl.endsWith('.html')) {
			try {
				response = await fetch(ticketUrl)
			} catch (e) {
				throw error(500, {
					message: '티켓 내용을 불러오는 중 오류가 발생했어요.',
					description: `아래 오류 정보와 함께 관리자에게 문의해 주세요.<br /><br /><code>${e.toString().replace(/[&<>]/g, replaceTag)}</code>`
				})
			}

			if (response?.ok) {
				return {
					body: `${await response.text()}<script src="/assets/js/viewer.js" defer></script>`
				}
			} else {
				if (response?.status == 403 || response?.status == 404) {
					throw error(404, {
						message: '찾으시는 티켓이 존재하지 않습니다.',
						description: '잘못된 접근이거나 요청하신 티켓을 찾을 수 없습니다.<br />티켓 정보가 올바른지 다시 한번 확인해 주시기 바랍니다.'
					})
				} else {
					throw error(response?.status, {
						message: '티켓 내용을 불러오는 중 오류가 발생했어요.',
						description: `아래 오류 정보와 함께 관리자에게 문의해 주세요.<br /><br /><code>${(await response.text()).replace(/[&<>]/g, replaceTag)}</code>`
					})
				}
			}
		} else {
			throw error(404, {
				message: '찾으시는 티켓이 존재하지 않습니다.',
				description: '잘못된 접근이거나 요청하신 티켓을 찾을 수 없습니다.<br />티켓 정보가 올바른지 다시 한번 확인해 주시기 바랍니다.'
			})
		}
	} else {
		throw error(400, {
			message: '잘못된 접근입니다.',
			description: '티켓 정보가 올바른지 다시 한번 확인해 주시기 바랍니다.'
		})
	}
}
