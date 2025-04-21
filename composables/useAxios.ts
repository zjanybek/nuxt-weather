export const useAxios = () => {
  const { $axiosDefault } = useNuxtApp()

  const get = async <T = any>(url: string, params?: Record<string, any>) => {
    return await $axiosDefault.get<T>(url, { params })
  }

  const post = async <T = any>(
    url: string,
    data?: any,
    params?: Record<string, any>
  ) => {
    return await $axiosDefault.post<T>(url, data, { params })
  }

  const put = async <T = any>(
    url: string,
    data?: any,
    params?: Record<string, any>
  ) => {
    return await $axiosDefault.put<T>(url, data, { params })
  }

  const patch = async <T = any>(
    url: string,
    data?: any,
    params?: Record<string, any>
  ) => {
    return await $axiosDefault.patch<T>(url, data, { params })
  }

  const del = async <T = any>(url: string, params?: Record<string, any>) => {
    return await $axiosDefault.delete<T>(url, { params })
  }

  return {
    get,
    post,
    put,
    patch,
    delete: del,
  }
}
