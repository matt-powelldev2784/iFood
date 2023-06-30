import axios from 'axios'
import { ApiOptions } from '../ts/interfaces'

export const apiCall = async (apiOptions: ApiOptions) => {
  const { httpMethod, route, body } = apiOptions
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL

  try {
    let response: any

    switch (httpMethod) {
      case 'POST':
        response = await axios.post(`${BASE_URL}/${route}`, body)
        break
      case 'GET':
        response = await axios.get(`${BASE_URL}/${route}`)
        break
      case 'PUT':
        response = await axios.put(`${BASE_URL}/${route}`)
        break
      case 'DELETE':
        response = await axios.delete(`${BASE_URL}/${route}`)
        break
      default:
        console.log('Api call type not recognised')
    }

    const { data } = response
    return data
  } catch (err: any) {
    throw err
  }
}
