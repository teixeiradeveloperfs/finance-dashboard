export type UserSettings = {
  profile: {
    name: string
    email: string
    role: string
    avatarColor: string
  }
  preferences: {
    currency: string
    locale: string
    timezone: string
    startPage: string
  }
  notifications: {
    emailReports: boolean
    whatsappAlerts: boolean
    transactionDigest: boolean
  }
  security: {
    twoFactorEnabled: boolean
    sessionTimeout: string
  }
}

const storageKey = 'dashboard-finance:user-settings'

const defaultSettings = (): UserSettings => ({
  profile: {
    name: 'Usuario',
    email: '',
    role: 'Administrador',
    avatarColor: '#03c494'
  },
  preferences: {
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Bahia',
    startPage: '/'
  },
  notifications: {
    emailReports: true,
    whatsappAlerts: true,
    transactionDigest: false
  },
  security: {
    twoFactorEnabled: false,
    sessionTimeout: '30'
  }
})

const mergeSettings = (base: UserSettings, stored: Partial<UserSettings>): UserSettings => ({
  profile: {
    ...base.profile,
    ...stored.profile
  },
  preferences: {
    ...base.preferences,
    ...stored.preferences
  },
  notifications: {
    ...base.notifications,
    ...stored.notifications
  },
  security: {
    ...base.security,
    ...stored.security
  }
})

export const useUserSettings = () => {
  const settings = useState<UserSettings>('user-settings:data', () => defaultSettings())
  const isLoaded = useState('user-settings:isLoaded', () => false)
  const savedAt = useState<string | null>('user-settings:savedAt', () => null)

  const loadSettings = (userEmail?: string, profile?: { name?: string, role?: string }) => {
    if (!import.meta.client) {
      return settings.value
    }

    const base = defaultSettings()
    base.profile.email = userEmail || ''
    base.profile.name = profile?.name || userEmail?.split('@')[0] || base.profile.name
    base.profile.role = profile?.role || base.profile.role

    const storedRaw = localStorage.getItem(storageKey)

    if (storedRaw) {
      try {
        settings.value = mergeSettings(base, JSON.parse(storedRaw) as Partial<UserSettings>)
      } catch {
        settings.value = base
      }
    } else {
      settings.value = base
    }

    isLoaded.value = true
    return settings.value
  }

  const saveSettings = (nextSettings: UserSettings) => {
    settings.value = mergeSettings(defaultSettings(), nextSettings)
    savedAt.value = new Date().toLocaleString('pt-BR')

    if (import.meta.client) {
      localStorage.setItem(storageKey, JSON.stringify(settings.value))
    }
  }

  const resetSettings = (userEmail?: string, profile?: { name?: string, role?: string }) => {
    const nextSettings = defaultSettings()
    nextSettings.profile.email = userEmail || ''
    nextSettings.profile.name = profile?.name || userEmail?.split('@')[0] || nextSettings.profile.name
    nextSettings.profile.role = profile?.role || nextSettings.profile.role
    settings.value = nextSettings
    savedAt.value = null

    if (import.meta.client) {
      localStorage.removeItem(storageKey)
    }

    return settings.value
  }

  return {
    settings,
    isLoaded,
    savedAt,
    loadSettings,
    saveSettings,
    resetSettings
  }
}
