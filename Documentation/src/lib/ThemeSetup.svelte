<script lang="ts">
	import { themeIsDark } from './themeIsDark';

	themeIsDark.subscribe((value) => {
		if (typeof document != 'undefined') {
			document.documentElement.classList.toggle('dark', value);
		}
	});
</script>
