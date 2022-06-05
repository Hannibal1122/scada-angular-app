import { Injectable } from "@angular/core";
import { QueryService } from "../../system/query.service";

@Injectable()
export class RegistryModel
{
    public data: Registry[] = [];
    private map: Map<number, Registry> = new Map();
    constructor(private queryService: QueryService)
    {

    }
    async appendData(value: string): Promise<Registry>
    {
        let data = await this.queryService.post("/core/append_data/", {
            value: value
        });
        this.data.push(data);
        this.map.set(data.id, data);
        return data;
    }
    async removeData(id: number)
    {
        await this.queryService.post("/core/remove_data/", { id });
        this.map.delete(id);
        for(let i = 0; i < this.data.length; i++)
            if(this.data[i].id === id) {
                this.data.splice(i, 1);
                break;
            }
    }
    async findAll(): Promise<Registry[]>
    {
        this.data = await this.queryService.post("/core/get_data/");
        this.data.forEach(item => this.map.set(item.id, item));
        return this.data;
    }
    async findOne(id: number): Promise<Registry>
    {
        let data = await this.queryService.post("/core/get_data/", { id });
        return data;
    }
    async getDataByIdType(idType: number, idTo: number): Promise<Registry[]>
    {
        return await this.queryService.post("/core/get_data_by_type/", { idType, idTo });
    }
    async getDataByIdTypeRecursion(idType: number, idTo: number): Promise<any>
    {
        return await this.queryService.post("/core/get_data_by_type_recursion/", { idType, idTo });
    }
    async getDataByQuery(query: any): Promise<any>
    {
        return await this.queryService.post("/core/get_data_by_query/", query);
    }
    get(id: number)
    {
        return this.map.get(id);
    }
}
export interface Registry
{
    id: number;
    value: string;
    dateCreated: number;
    dateCreatedFormat?: string;
    isDeleted: boolean;
}