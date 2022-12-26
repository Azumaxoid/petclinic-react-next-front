import axios, {AxiosResponse} from "axios";

export const get = async (path: string, options? : any): Promise<AxiosResponse<any, any>> => {
    // @ts-ignore
    const url = process.env.NEXT_PUBLIC_API_URL + path
    console.log(url)
    const response = await axios.get(url)
    return response
}

export const post = async (path: string, object: any, options? : any): Promise<AxiosResponse<any, any>> => {
    // @ts-ignore
    const url = process.env.NEXT_PUBLIC_API_URL + path
    const response = await axios.post(url, object, {...options, withCredentials: true})
    return response
}
