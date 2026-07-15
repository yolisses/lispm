<script lang="ts">
	import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { themeIsDark } from './themeIsDark';

	function handleClick() {
		themeIsDark.update((value) => !value);
	}
</script>

<button class="basic-button basic-border" onclick={handleClick}>
	<Fa icon={$themeIsDark ? faMoon : faSun} />
	{$themeIsDark ? 'Dark' : 'Light'}
</button>
