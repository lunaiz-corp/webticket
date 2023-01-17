export async function load({ url, fetch }) {
	let res = {};
	let { ticketUrl } = Object.fromEntries(url.searchParams);

	if (ticketUrl) {
		if (ticketUrl.startsWith('https://cdn.discordapp.com/attachments/')) {
			res = await fetch(ticketUrl);

			if (!res.ok) {
				res = await fetch('error');
			}
		} else {
			res = await fetch('error');
		}
	} else {
		res = await fetch('error');
	}

	return {
		body: `
		${await res.text()}
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
		</script>
	`
	};
}
