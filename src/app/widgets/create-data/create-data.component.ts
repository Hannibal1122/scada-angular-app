import { Component, OnInit } from '@angular/core';
import { DataPresenter } from './data.presenter';
import { Link, LinksModel } from './links.model';
import { Registry, RegistryModel } from './registry.model';

@Component({
  selector: 'app-create-data',
  templateUrl: './create-data.component.html',
  styleUrls: ['./create-data.component.scss']
})
export class CreateDataComponent implements OnInit {

    public value: string = "";
    public table: Registry[] = [];
    public links: Link[] = [];

    public idFrom: number;
    public idType: number;
    public idTo: number;
    public dataPresenter: DataPresenter;

    constructor(private registryModel: RegistryModel, private linksModel: LinksModel) {
        this.dataPresenter = new DataPresenter(this, registryModel, linksModel);
    }
    ngOnInit(): void {
    }
    updateTable(data: Registry[])
    {
        this.table = data;
    }
    updateLinks(links: Link[])
    {
        this.links = links;
    }
    appendData()
    {
        this.dataPresenter.appendData(this.value);
    }
    removeData(id: number)
    {
        this.dataPresenter.removeData(id);
    }
    createLink()
    {
        this.dataPresenter.createLink({
            idFrom: this.idFrom,
            idType: this.idType,
            idTo: this.idTo,
        })
    }
    getDataByIdType()
    {
        this.dataPresenter.getDataByIdType(this.idType, this.idTo);
    }
    getDataByIdTypeRecursion()
    {
        this.dataPresenter.getDataByIdTypeRecursion(this.idType, this.idTo);
    }
}
