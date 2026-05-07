import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const defaultFlags = {
  dars_e_nizami: false,
  hifz: false,
  nazra: false,
  short_courses: false,
  darul_ifta: false,
  research_center: false,
  wazifa: false,
  student_reports: false,
}

const FeatureFlagContext = createContext({
  flags: defaultFlags,
  loading: true,
})

export function FeatureFlagProvider({ children }) {
  const [flags, setFlags] = useState(defaultFlags)
  const [loading, setLoading] = useState(true)

  const fetchFlags = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('feature_flags')
      .select('module, enabled')

    if (data) {
      const mapped = data.reduce((acc, row) => {
        acc[row.module] = row.enabled
        return acc
      }, {})
      setFlags((prev) => ({ ...prev, ...mapped }))
    }
    setLoading(false)
  }

  useEffect(() => {
    // Initial fetch
    fetchFlags()

    // Re-fetch when auth state changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      fetchFlags()
    })

    // Realtime subscription for live updates
    const channel = supabase
      .channel('feature_flags_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'feature_flags' },
        (payload) => {
          const row = payload.new
          if (row?.module) {
            setFlags((prev) => ({
              ...prev,
              [row.module]: row.enabled,
            }))
          }
        },
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <FeatureFlagContext.Provider value={{ flags, loading }}>
      {children}
    </FeatureFlagContext.Provider>
  )
}

export function useFeatureFlags() {
  return useContext(FeatureFlagContext)
}
