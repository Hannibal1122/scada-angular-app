import { Format } from "../../system/format";
import { CreateDataComponent } from "./create-data.component";
import { Link, LinksModel } from "./links.model";
import { Registry, RegistryModel } from "./registry.model";

export class DataPresenter
{
    constructor(
        public createDataComponent: CreateDataComponent,
        private registryModel: RegistryModel,
        private linksModel: LinksModel
    ) {
        this.loadData();
    }
    async loadData()
    {
        await this.registryModel.findAll();
        this.registryModel.data.forEach(item => item.dateCreatedFormat = Format.getFormat(item.dateCreated));
        await this.linksModel.findAll();
        this.linksModel.links.forEach(link => this.updateLink(link));
        this.updateTable();
        this.updateLinks();
    }
    async appendData(value: string)
    {
        let data = await this.registryModel.appendData(value);
        data.dateCreatedFormat = Format.getFormat(data.dateCreated);
        this.updateTable();
    }
    async removeData(id: number)
    {
        await this.registryModel.removeData(id);
        this.updateTable();
    }
    async createLink(linkParam: Link)
    {
        let link = await this.linksModel.createLink(linkParam);
        this.updateLink(link);
        this.updateLinks();
    }
    async getDataByIdType(idType: number, idTo: number)
    {
        await this.registryModel.getDataByIdType(idType, idTo);
    }
    async getDataByIdTypeRecursion(idType: number, idTo: number)
    {
        await this.registryModel.getDataByIdTypeRecursion(idType, idTo);
    }
    async getDataByQuery(query: any)
    {
        await this.registryModel.getDataByQuery(query);
    }
    updateLink(link: Link)
    {
        link.from = this.registryModel.get(link.idFrom);
        link.type = this.registryModel.get(link.idType);
        link.to = this.registryModel.get(link.idTo);
    }
/*     async getData(): Promise<Registry[]>
    {
        return this.registryModel.findAll();
    }
    async getLink(): Promise<Registry[]>
    {
        return this.registryModel.findAll();
    } */
    updateTable()
    {
        this.createDataComponent.updateTable(this.registryModel.data);
    }
    updateLinks()
    {
        this.createDataComponent.updateLinks(this.linksModel.links);
    }
}