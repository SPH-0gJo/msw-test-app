type ApiResponse  = {
    code : number;
    data : any;
    ok : boolean;
}
export type User = {
    name : string;
}

class UserRepository {

    URL = "/api/users"

    constructor(url? : string){
        this.URL = url || this.URL;
    }

    findOne() : Promise<ApiResponse>{
        return new Promise((resolve,reject)=>{
            const user : User = {
                name : 'Anna',
            };
            const token = 'sphinfo2023!@';
            const res = {
                code : 200,
                data : {
                    user,
                    token,
                },
                ok : true,
            }
            resolve(res);
        })
    }



}


export default new UserRepository();