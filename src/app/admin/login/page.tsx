'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      window.location.href = '/admin'
    } else {
      setError('Wrong password')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111213' }}>
      <form onSubmit={handleSubmit} style={{ background: '#1a1a1a', padding: '2.5rem', borderRadius: '1rem', width: '100%', maxWidth: '360px', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h1 style={{ color: '#f8f8f8', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          <span style={{ color: '#bac6ff' }}>Impact</span> Admin
        </h1>
        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Impact Property Media</p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', background: '#222', color: '#f8f8f8', fontSize: '1rem', marginBottom: '1rem', boxSizing: 'border-box' }}
          autoFocus
        />
        {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: '#bac6ff', color: '#111213', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
