import { ref, onMounted, watch } from "vue";

export function useFetch<T>(url: string, options?: RequestInit) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const isLoading = ref(false);

  async function fetchData() {
    if (!url) {
      return;
    }
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      data.value = await response.json();
    } catch (err) {
      error.value = err as Error;
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(fetchData);

  watch(() => url, fetchData);

  return { data, error, isLoading };
}
