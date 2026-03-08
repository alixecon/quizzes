import { useState, useEffect } from 'react'
import {
  collection, addDoc, query,
  orderBy, limit, getDocs, serverTimestamp
} from 'firebase/firestore'
import { db } from '../firebase'

const COLLECTION = 'leaderboard'

export function useLeaderboard() {
  const [entries,    setEntries]    = useState([])
  const [loading,    setLoading]    = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error,      setError]      = useState(null)

  const fetchTop = async (limitCount = 20) => {
    setLoading(true)
    setError(null)
    try {
      const q = query(
        collection(db, COLLECTION),
        orderBy('score', 'desc'),
        limit(limitCount)
      )
      const snap = await getDocs(q)
      setEntries(snap.docs.map((d, i) => ({ id: d.id, rank: i + 1, ...d.data() })))
    } catch (e) {
      setError('تعذّر تحميل المتصدرين')
    } finally {
      setLoading(false)
    }
  }

  const submitScore = async ({ name, avatar, score, category, difficulty, correct, total }) => {
    setSubmitting(true)
    setError(null)
    try {
      await addDoc(collection(db, COLLECTION), {
        name, avatar, score, category,
        difficulty, correct, total,
        accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
        createdAt: serverTimestamp(),
      })
      await fetchTop()  // refresh after submit
    } catch (e) {
      setError('تعذّر حفظ النتيجة')
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => { fetchTop() }, [])

  return { entries, loading, submitting, error, fetchTop, submitScore }
}
