import RequestTableType from "../types/RequestTableType";


/*フロントエンドからバックエンドに接続して指定したデータをもらってくるやつ？*/ 
export default async function fetchRequestList(userId:Number, year:Number, month:Number){
    const url = `http://localhost:5000/api/requestGet/list?employeeId=${userId}&year=${year}&month=${month}`;
    console.log(url);
    const result : RequestTableType[] = await fetch(url, {
        method: "GET",
    }).then((res : Response)=>{
        if(!res.ok){
            throw new Error(`HTTP Error: ${res.status}`)
        }
        return res.json() as Promise<RequestTableType[]>;
    }).catch((error)=>{
        console.error("ERROR:" + error);
        return [];
    })
    return result;
}