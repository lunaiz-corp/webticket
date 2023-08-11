<script>
	/** @type {import('./$types').PageData} */
	export let data
</script>

<div id="loading" class="loadingBackdrop">
	<div class="loadingDiv">
		<div class="spinnerWrapper">
			<div class="spinner"></div>
			<h5>티켓을 불러오는 중입니다...</h5>
		</div>
	</div>
</div>

<iframe srcdoc={data.body} name="transcript" title="Transcript"></iframe>

<style>
	@keyframes spinner {
		to {
			transform: rotate(1turn)
		}
	}

	#loading.loadingBackdrop {
		width: 100%;
    	height: 100vh;

		position: absolute;
		z-index: 10;

		display: flex;
		align-items: center;
		justify-content: center;

		background: #36393e;

		transition-duration: .15s;
		transition-property: opacity;
		transition-timing-function: cubic-bezier(.4, 0, .2, 1);
	}

	#loading .loadingDiv {
		margin: 0 auto;
		position: absolute;
		transition-duration: .2s;
		transition-property: opacity;
		transition-timing-function: cubic-bezier(.4, 0, .2, 1);
	}

	#loading .spinnerWrapper {
		text-align: center;
	}

	#loading .spinner {
		display: inline-block;

		height: 2.5rem;
    	width: 2.5rem;

		border: .25em solid #e5e7eb;
		border-right: .25em solid transparent;
		border-radius: 9999px;

		animation: spinner .75s linear infinite;
	}
	
	#loading h5 {
		color: #dcddde;
	    font-size: 1rem;
		font-weight: 400;
    	line-height: 1.5rem;
	}
</style>