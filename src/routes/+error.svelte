<script>
  import { page } from '$app/stores';
</script>

{#if $page.error.description}
<title>{$page.error.message} : Arasoft Ticket System</title>
{:else}
<title>찾으시는 페이지가 없습니다. : Arasoft Ticket System</title>
{/if}

<div class="errorWrapper">
  <main>
    <div>
      <div class="error">
        {#if $page.error.description}
        <strong>{$page.error.message}</strong>

        <p>{@html $page.error.description}</p>
        {:else}
        <strong>찾으시는 페이지가 없습니다.</strong>

        <p>
          잘못된 접근이거나 요청하신 페이지를 찾을 수 없습니다. <br />
          입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
        </p>
        {/if}
      </div>
    </div>
  </main>
</div>

<style>
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-dynamic-subset.css');

  * {
  	font-family: 'Pretendard Variable' !important;
  }

  .errorWrapper {
  	height: 100vh; width: 100vw;
  	background: #ffffff;
  }

  .error {
  	position: absolute;
  	top: 50%;
  	left: 0;
  	right: 0;
  	-webkit-transform: translateY(-50%);
  	transform: translateY(-50%);
  	text-align: center;
  }

  .error strong {
  	display: block;
  	font-size: 32px;
  	font-weight: 700;
  	line-height: 46px;
  	letter-spacing: -0.8px;
  	color: #000000;
  }

  .error p {
  	margin: 12px 0 0 0;
  	line-height: 1.71;
  	letter-spacing: -0.2px;
  	color: #666;
  }

  @media screen and (max-width: 767px) {
  	.error {
  		left: 24px;
  		right: 24px;
  	}
  }

  @media (prefers-color-scheme: dark) {
  	.errorWrapper {
  		background: #131516;
  	}

  	.error strong {
  		color: #ffffff;
  	}

  	.error p {
  		color: #a8a095;
  	}
  }
</style>
