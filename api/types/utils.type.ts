export type TApiResponse<T> = {
    isSuccess: boolean
    data: T
    status: number
    message?: string
}

export type TMethods = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH';
export const defaultErrorMessage = 'Internal Server Error !';