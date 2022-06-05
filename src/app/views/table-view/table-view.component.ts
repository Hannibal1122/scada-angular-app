import { Component, OnInit } from '@angular/core';
import { RegistryModel } from '../../widgets/create-data/registry.model';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit
{
    header: any = [];
    data: any = [];
    constructor(private registryModel: RegistryModel) {
        
    }

    ngOnInit(): void {
        this.registryModel.getDataByQuery([{
            scheme: {
                idType: 25,
                idTo: 24,
                out: false
            },
            header: {
                idType: 8,
                idTo: "scheme"
            },
            rows: {
                idType: 12,
                idTo: 24,
                out: false
            },
            data: {
                compare: {
                    from: "header",
                    byFrom: 14,
                    byTo: 12,
                    to: "rows"
                }
            }
        }]).then(({ header, data }) => {
            /* console.log(header);
            console.log(data); */
            this.header = header;
            this.data = data;
        })
    }

}
