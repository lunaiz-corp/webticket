import { error } from '@sveltejs/kit';

function replaceTag(tag) {
	let tagsToReplace = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;'
	};

	return tagsToReplace[tag] || tag;
}

export async function load({ url, fetch }) {
	let response = {};
	let { ticketUrl } = Object.fromEntries(url.searchParams);

	if (ticketUrl) {
		if (
			ticketUrl.startsWith('https://cdn.discordapp.com/attachments/') &&
			ticketUrl.endsWith('.html')
		) {
			try {
				response = await fetch(ticketUrl);
			} catch (e) {
				throw error(500, {
					message: '티켓 내용을 불러오는 중 오류가 발생했어요.',
					description: e.toString()
				});
			}

			if (response?.ok) {
				return {
					body: `${await response.text()}
					<script>
						parent.document.title = document.title + ' : Arasoft Ticket System'
			
						setTimeout(() => {
							let text = document.createElement('discord-button')
							text.type = 'success'
							text.emoji = 'https://cdn.discordapp.com/attachments/740171137203568643/1064784853402390538/download_light.png?size=36'
							text.classList.value = 'discord-button discord-button-success discord-button-hoverable hydrated'
							text.innerHTML = '<span>티켓 다운로드</span>'
							text.addEventListener("click", () => {
								window.open("${ticketUrl}")
							})
							
							document.querySelector(".discord-action-row.hydrated").appendChild(text)
						}, 1000)
					</script>`
				};
			} else {
				if (response?.status == 403 || response?.status == 404) {
					throw error(404, {
						message: '찾으시는 티켓이 존재하지 않습니다.',
						description:
							'잘못된 접근이거나 요청하신 티켓을 찾을 수 없습니다.<br />티켓 정보가 올바른지 다시 한번 확인해 주시기 바랍니다.'
					});
				} else {
					throw error(response?.status, {
						message: '티켓 내용을 불러오는 중 오류가 발생했어요.',
						description: (await response.text()).replace(/[&<>]/g, replaceTag)
					});
				}
			}
		} else {
			throw error(404, {
				message: '찾으시는 티켓이 존재하지 않습니다.',
				description:
					'잘못된 접근이거나 요청하신 티켓을 찾을 수 없습니다.<br />티켓 정보가 올바른지 다시 한번 확인해 주시기 바랍니다.'
			});
		}
	} else {
		throw error(400, {
			message: '잘못된 접근입니다.',
			description: '티켓 정보가 올바른지 다시 한번 확인해 주시기 바랍니다.'
		});
	}
}
