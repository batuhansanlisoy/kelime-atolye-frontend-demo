export function apiHelper () {
  const { apiHost } = useApiUrl()
  const auth = useAuthStore()

  function apiFetch<T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    target: string,
    payload?: Record<string, any>,
    options: any = {}
  ): Promise<T> {
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      ...(options.headers || {})
    }

    const endpoint = target.startsWith('/') ? target : `/${target}`;
    const url = `${apiHost()}${endpoint}`

    const fetchOptions: any = {
      method,
      headers,
      ...options,
    }

    if (method.toLowerCase() === 'get') {
      if (payload) fetchOptions.query = payload
    } else {
      if (payload) fetchOptions.body = payload
    }

    return $fetch(url, fetchOptions)
  }

  return { apiFetch }
}