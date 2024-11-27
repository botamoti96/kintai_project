import RequestRecordType from "@/app/types/RequestRecordType";

export interface Requests{
    requests: RequestRecordType[];
}

export default async function fetchRequest() {
    const url = "http://localhost:5000/api/request";
    await fetch(url).then((res :Response)=>{
        if(res.statusText === "OK"){
            return Promise.resolve;
        }else{
            return Promise.reject;
        }
    });

    
}