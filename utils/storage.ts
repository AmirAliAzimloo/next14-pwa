class Storage {
  static setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(key, serializedValue)
      if (key === 'accessToken' && typeof document !== 'undefined') {
        const d = new Date()
        const exp = d.setDate(d.getDate() + 30).toString()
        const expStr = exp.toString()
        document.cookie = `accessToken=${serializedValue}; expires=${expStr}; path=/`
      }
    } catch (error) {
      console.error('Error storing data in local storage:', error)
    }
  }

  static getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      const serializedValue = localStorage.getItem(key)
      if (serializedValue === null) {
        return defaultValue !== undefined ? defaultValue : null
      }
      return JSON.parse(serializedValue)
    } catch (error) {
      console.error('Error retrieving data from local storage:', error)
      return defaultValue !== undefined ? defaultValue : null
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key)
      if (key === 'accessToken' && typeof document !== 'undefined') {
        document.cookie =
          'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      }
    } catch (error) {
      console.error('Error removing data from local storage:', error)
    }
  }
}

export default Storage
