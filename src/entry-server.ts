// Simple version for SSR testing
export function render(url: string) {
  return `<div id="root">
    <div class="flex flex-col min-h-screen">
      <header class="bg-gray-800 text-white p-4">
        <h1>Murder Party App (SSR)</h1>
      </header>
      <main class="flex-1 p-4">
        <h2 class="text-2xl font-bold mb-6">Page rendue côté serveur</h2>
        <p>Cette page a été rendue côté serveur à l'URL: ${url}</p>
        <p class="mt-4">Le client React va maintenant l'hydrater pour la rendre interactive.</p>
      </main>
    </div>
  </div>`;
}