import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-table-grid',
    templateUrl: './table-grid.component.html',
    styleUrls: ['./table-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableGridComponent implements OnInit
{
    @Output("onEdit") onClickRowEditEmitter = new EventEmitter<TableGridEventEdit>();
    @Output("onClickRow") onClickRowEmitter = new EventEmitter<TableGridEventEdit>();
    @Output("onRemove") onClickRowRemoveEmitter = new EventEmitter<TableGridEventRemove>();
    @Input() set header(header: TableGridHeader[])
    {
        this.drawHeader = header;
        this.drawHeader.forEach((item, i) => {
            this.headerMap[item.dataField] = i;
        })
    }
    @Input() set data(data: any[])
    {
        this.drawData = [];
        data.forEach((row, i) => {
            this.drawData[i] = [];
            for(let key in this.headerMap)
            {
                this.drawData[i][this.headerMap[key]] = row[key];
            }
        })
    }
    @Input() set readonly(readonly: boolean)
    {
        this._readonly = readonly || false;
    }

    private headerMap: { [key: string]: number } = {};
    drawHeader: TableGridHeader[] = [];
    drawData: string[][] = [];
    _readonly: boolean = false;
    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit(): void
    {
    }
    onClickEdit(row: any[])
    {
        let rowOut: any = {};
        for(const key in this.headerMap)
        {
            rowOut[key] = row[this.headerMap[key]];
        }
        this.onClickRowEditEmitter.emit({ row: rowOut });
    }
    onRowClick(row: any[])
    {
        let rowOut: any = {};
        for(const key in this.headerMap)
        {
            rowOut[key] = row[this.headerMap[key]];
        }
        this.onClickRowEmitter.emit({ row: rowOut });
    }
    onClickRemove(row: any[])
    {
        this.onClickRowRemoveEmitter.emit({ id: Number(row[this.headerMap["id"]]) });
    }
}
interface TableGridHeader
{
    name: string
    dataField: string
}
export interface TableGridEventEdit
{
    row: any
}
export interface TableGridEventRemove
{
    id: number
}
