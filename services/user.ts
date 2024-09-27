import Storage from "@/utils/storage"

export function removeAuthToken(redirect = true) {
    Storage.removeItem('accessToken')
    Storage.removeItem('refreshToken')
    if (redirect && typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
}