<script>
	export let data;
</script>

<title>Arasoft Ticket System</title>

{#if data.fetch}
	<iframe srcdoc={data.body} title="Transcript" />
{:else}
	<iframe src="/error" title="Error Page" />
{/if}
