export function useApiUrl () {
  const config = useRuntimeConfig();
  const { scheme, base, port } = config.public.api;

  function apiHost () {
    return port ? `${scheme}://${base}:${port}` : `${scheme}://${base}`
  }

  return { apiHost };
}