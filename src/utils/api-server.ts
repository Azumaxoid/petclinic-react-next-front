import axios, {AxiosResponse} from "axios";

export const get = async (path: string): Promise<AxiosResponse<any, any>> => {
    // @ts-ignore
    const url = process.env.REACT_APP_API_URL + path
    console.log(url)
    const response = await axios.get(url)
    return response
}

export const post = async (path: string, object: any): Promise<AxiosResponse<any, any>> => {
    // @ts-ignore
    const url = process.env.REACT_APP_API_URL + path
    const response = await axios.post(url, object)
    return response
}