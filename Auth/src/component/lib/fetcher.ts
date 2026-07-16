import { httpInterceptor } from "./httpInterceptor"

const Fetcher =async(url:string)=>{
    const {data}  = await httpInterceptor.get(url)
    return data
}

export default Fetcher