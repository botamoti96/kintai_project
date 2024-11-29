
export default async function postLoginInfo(employeeId:Number, password:string){
    const url = "http://localhost:5000/api/login";
    
    const result = await fetch(url, {
        method : "POST",
        headers: {
            'Content-Type': 'application/json', // これが重要！
        },
        body: JSON.stringify({
            "EmployeeId" : employeeId,
            "Password": password
        })
    }).then((response: Response) => {
        if(response.ok){
            Promise.resolve();
        } else {
            Promise.reject();
        }
    })
}