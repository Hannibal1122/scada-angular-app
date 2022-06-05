import { Injectable } from "@angular/core";
import { QueryService } from "../../system/query.service";
import { Registry } from "./registry.model";

@Injectable()
export class LinksModel
{
    public links: Link[] = [];
    constructor(private queryService: QueryService)
    {

    }
    async createLink(linkParam: Link): Promise<Link>
    {
        let link = await this.queryService.post("/core/create_link/", linkParam);
        this.links.push(link);
        return link;
    }
    async findAll(): Promise<Link[]>
    {
        this.links = await this.queryService.post("/core/get_links/");
        return this.links;
    }
    async findOne(id: number): Promise<Link>
    {
        let link = await this.queryService.post("/core/get_link/", { id });
        return link;
    }
}
export interface Link
{
    id?: number;
    idFrom: number;
    idType: number;
    idTo: number;
    from?: Registry;
    type?: Registry;
    to?: Registry;
}