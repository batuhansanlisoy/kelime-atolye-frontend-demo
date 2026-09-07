<template>
  <div>
    <header>
      <UIHeader />
    </header>

    <main
		role="main"
		class="mx-auto max-w-6xl flex-1 my-6">
			<slot />
		</main>

    <footer class="border-t border-gray-100 py-6 text-center text-xs text-slate-400">
      <p>&copy; {{ new Date().getFullYear() }} KelimeAtölye. Tüm hakları saklıdır.</p>
    </footer>

  </div>
</template>