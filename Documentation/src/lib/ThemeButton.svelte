<script lang="ts">
	import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	let isDark = $state(true);

	function handleClick() {
		isDark = !isDark;
	}
</script>

<button class="basic-button basic-border" onclick={handleClick}>
	<Fa icon={isDark ? faMoon : faSun} />
	{isDark ? 'Dark' : 'Light'}
</button>
