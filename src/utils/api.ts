import axios from "axios";

export const get = async (path: string): Promise<any> => {
    // @ts-ignore
    const url = (process.env.REACT_APP_BK_DIRECT === 'true' ? process.env.NEXT_PUBLIC_API_URL : '') + process.env.NEXT_PUBLIC_API_PREFIX + path
    console.log(url)
    const response = await axios.get(url)
    return response.data
}

export const post = async (path: string, object: any): Promise<any> => {
    // @ts-ignore
    const url = (process.env.REACT_APP_BK_DIRECT === 'true' ? process.env.NEXT_PUBLIC_API_URL : '') + process.env.NEXT_PUBLIC_API_PREFIX + path
    console.log(url)
    const response = await axios.post(url, object)
    return response.data
}