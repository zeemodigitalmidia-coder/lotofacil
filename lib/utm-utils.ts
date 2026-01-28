export interface UTMParameters {
  utm_source: string | null
  utm_campaign: string | null
  utm_medium: string | null
  utm_content: string | null
  utm_term: string | null
  src: string | null
  sck: string | null
}

export function getUTMParameters(): UTMParameters {
  if (typeof window === 'undefined') {
    return {
      utm_source: null,
      utm_campaign: null,
      utm_medium: null,
      utm_content: null,
      utm_term: null,
      src: null,
      sck: null,
    }
  }

  const params = new URLSearchParams(window.location.search)
  
  return {
    utm_source: params.get('utm_source'),
    utm_campaign: params.get('utm_campaign'),
    utm_medium: params.get('utm_medium'),
    utm_content: params.get('utm_content'),
    utm_term: params.get('utm_term'),
    src: params.get('src'),
    sck: params.get('sck'),
  }
}

export function storeUTMParameters(): UTMParameters {
  const utm = getUTMParameters()
  
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('utm_parameters', JSON.stringify(utm))
  }
  
  return utm
}

export function getStoredUTMParameters(): UTMParameters {
  if (typeof window === 'undefined') {
    return {
      utm_source: null,
      utm_campaign: null,
      utm_medium: null,
      utm_content: null,
      utm_term: null,
      src: null,
      sck: null,
    }
  }

  const stored = sessionStorage.getItem('utm_parameters')
  return stored ? JSON.parse(stored) : getUTMParameters()
}
