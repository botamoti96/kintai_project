// import RequestRecordType from "@/app/types/RequestRecordType";

import RequestTableType from "../types/RequestRecordType";

// export interface Requests{
//     requests: RequestRecordType[];
// }

// export default async function fetchRequest() {
//     const url = "http://localhost:5000/api/request";
//     await fetch(url).then((res :Response)=>{
//         if(res.statusText === "OK"){
//             return Promise.resolve;
//         }else{
//             return Promise.reject;
//         }
//     });

    
// }

export default async function fetchRequest() {
    const url = "http://localhost:5000/api/request";
    return await fetch(url, {
        method: 'GET',
    })
        .then((res:Response) => {
            if(!res.ok) {
                throw new Error('HTTP Error:  ${res.status}');

            }
            console.log("あ")
            return res.json() as Promise<RequestTableType[]>;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}