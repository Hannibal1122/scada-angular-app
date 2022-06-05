import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MathGraphInterface, VisualItem } from '../../types/math-graph-item';
import { Position, Vector2 } from '../../types/type';

@Component({
    selector: 'math-graph-item',
    templateUrl: './math-graph-item.component.html',
    styleUrls: ['./math-graph-item.component.scss']
})
export class MathGraphItemComponent implements OnInit
{
    @ViewChild("item", { static: false }) item: ElementRef;
    @Input() set data(item: VisualItem)
    {
        this._inputs = [];
        this._outputs = [];

        for(let key in item.inputs)
            this._inputs.push({
                key/* ,
                ...item.inputs[key] */
            });
        for(let key in item.outputs)
            this._outputs.push({
                key
            });

        this.id = item.id;
        this.color = item.color || "#356cb8";
        this.name = item.name || "untitled";
        this.timePosition.from(item.position);
        this.position.from(this.timePosition);
    }
    @Output() onEvent: EventEmitter<any> = new EventEmitter();

    public id: string;
    public name = "untitled";
    public position = new Vector2(0, 0);
    public timePosition = new Vector2(0, 0);
    public color = ""
    _inputs: any[] = [];
    _outputs: any[] = [];

    ngOnInit(): void {
    }
    onMousedown(e: MouseEvent)
    {
        this.onEvent.emit({ name: "on-mousedown", item: this, event: e });
        this.timePosition.from(this.position);
    }
    onMouseup(e: MouseEvent)
    {
        this.onEvent.emit({ name: "on-mouseup", item: this, event: e });
    }
    onPointEvent(e: MouseEvent, key: string, type: "input" | "output", eventType: "on-pointdown" | "on-pointup" | "on-pointremove")
    {
        this.onEvent.emit({
            name: eventType,
            bindEvent: { id: this.id, key },
            item: this,
            event: e,
            targetBox: this.getPositionByKeyName(key, type)
        });
    }
    getPositionByKeyName(key: string, type: "input" | "output"): DOMRect
    {
        let box = this.item.nativeElement.querySelector(`[name="${ type }_${ key }"]`).getBoundingClientRect();
        box.x += 5;
        box.y += 5;
        return box;
    }
}
