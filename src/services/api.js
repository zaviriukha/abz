const BASE = 'https://frontend-test-assignment-api.abz.agency/api/v1'

export async function getUsers({ page = 1, count = 6, signal } = {}) {
  const res = await fetch(`${BASE}/users?page=${page}&count=${count}`, { signal })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function getToken() {
  const res = await fetch(`${BASE}/token`)
  if (!res.ok) throw await res.json().catch(() => new Error('HTTP ' + res.status))
  const data = await res.json()
  if (!data?.success || !data?.token) throw new Error('No token')
  return data.token
}

export async function getPositions() {
  const res = await fetch(`${BASE}/positions`)
  if (!res.ok) throw await res.json().catch(() => new Error('HTTP ' + res.status))
  return res.json()
}

export async function createUser({ token, formData }) {
  const res = await fetch(`${BASE}/users`, {
    method: 'POST',
    headers: { Token: token },
    body: formData,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = data?.message || `HTTP ${res.status}`
    const errors = data?.fails || data?.errors || null
    const err = new Error(msg)
    err.payload = errors
    throw err
  }
  return data
}
