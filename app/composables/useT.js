import { useLanguageStore } from '@/stores/language'

export function useT() {
  const languageStore = useLanguageStore()

  const t = (key, params = {}) => {
    let text = key

    const tr = languageStore.t
    if (typeof tr === 'function') text = tr(key)
    else if (tr && typeof tr === 'object') text = tr[key] ?? key

    for (const [k, v] of Object.entries(params)) {
      text = text.replaceAll(`{${k}}`, String(v))
    }
    return text
  }

  return { t, languageStore }
}
