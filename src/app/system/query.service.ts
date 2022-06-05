import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class QueryService
{
    constructor(private http: HttpClient) {}
    async post<T = any>(url: string, param = {}): Promise<T>
    {
        let promise = new Promise<T>((resolve, reject) => {
            this.http.post(environment.url + url, param).subscribe((data: any) => resolve(data), reject);
        })
        return promise;
    }
}