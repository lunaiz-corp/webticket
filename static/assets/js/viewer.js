window.changeTitle = (title) => {
	parent.document.title = title + ' : Arasoft Ticket System'
}

document.addEventListener('DOMContentLoaded', () => {
	window.changeTitle(document.title)
})

window.addEventListener('load', () => {
	setTimeout(() => {
		let { ticketUrl } = Object.fromEntries(new URLSearchParams(parent.location.search))

		try {
			/* 상단 헤더 수정 */
			document.querySelector('discord-header').style.gap = '1.5rem'
			document.querySelector('.discord-header-icon').style.width = 'unset'
			document.querySelector('.discord-header-icon > img').style.height = '50px'
			document.querySelector('.discord-header-text').lastChild.remove()

			/* 하단 푸터 삭제 */
			for (let i in document.querySelectorAll('div a')) {
				if (document.querySelectorAll('div a')[i].innerText) {
					document.querySelectorAll('div a')[i].parentNode.parentNode.remove()
					break
				}
			}

			/* 다운로드 버튼 추가 */
			let buttonParent = document.querySelector('.discord-action-row.hydrated')

			let downloadBtn = document.createElement('discord-button')
			downloadBtn.type = 'success'
			downloadBtn.emoji = 'https://cdn.discordapp.com/attachments/740171137203568643/1064784853402390538/download_light.png?size=36'
			downloadBtn.classList.value = 'discord-button discord-button-success discord-button-hoverable hydrated'
			downloadBtn.innerHTML = '<span>티켓 다운로드</span>'
			downloadBtn.addEventListener('click', () => {
				window.open(ticketUrl)
			})

			while (buttonParent.hasChildNodes()) {
				buttonParent.removeChild(buttonParent.firstChild)
			}

			document.querySelector('.discord-action-row.hydrated').appendChild(downloadBtn)
		} catch (e) {
			/* JS 진행 중 오류 발생 시 오류 페이지로 이동 */

			let errorForm = {
				form: document.createElement('form'),
				input: [document.createElement('input'), document.createElement('input')]
			}

			errorForm.form.method = 'post'
			errorForm.form.action = '/error'

			errorForm.input[0].name = 'message'
			errorForm.input[0].value = '웹 티켓을 초기화 하는 중 오류가 발생했어요.'

			errorForm.input[1].name = 'description'
			errorForm.input[1].value = `아래 오류 정보와 함께 관리자에게 문의해 주세요.<br /><br /><code>${e}</code>`

			document.body.appendChild(errorForm.form)

			errorForm.input.map((x) => {
				errorForm.form.appendChild(x)
			})

			window.changeTitle('웹 티켓을 초기화 하는 중 오류가 발생했어요.')
			errorForm.form.submit()
		}
	}, 100)
})
