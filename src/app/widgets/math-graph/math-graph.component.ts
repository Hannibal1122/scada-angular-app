import { Component, Directive, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MathGraphLogic } from './math-graph.logic';
import { MathGraphInterface, VisualItem } from './types/math-graph-item';
import { Position, Vector2 } from './types/type';
import { MathGraphItemComponent } from './widgets/item/math-graph-item.component';

@Component({
    selector: 'app-math-graph',
    templateUrl: './math-graph.component.html',
    styleUrls: ['./math-graph.component.scss']
})
export class MathGraphComponent implements OnInit
{
    @ViewChild("container", { static: true }) container;
    @ViewChildren("items") itemComponents!: QueryList<MathGraphItemComponent>;

    private selectedItem: MathGraphItemComponent | null = null;
    private logic: MathGraphLogic = new MathGraphLogic();
    private mouseDownPosition = new Vector2(0, 0);
    private mouseMovePosition = new Vector2(0, 0);
    public selectedPoints: {
        pointFrom: {
            id: string
            key: string
        } | null
        pointTo: {
            id: string
            key: string
        } | null
        position: Vector2
    } = {
        pointFrom: null,
        pointTo: null,
        position: new Vector2(0, 0)
    };
    public currentState = {
        mousedown: false,
        position: {
            x: 0,
            y: 0
        }
    }
    public links: {
        from: MathGraphInterface.Bind
        to: MathGraphInterface.Bind
        hover: boolean
        // path: string
        points: { a: { x: number, y: number }, b: { x: number, y: number } }[]
    }[] = [];
    public items: VisualItem[] = [];
    public itemsMap: Map<string, MathGraphItemComponent> = new Map();

    ngOnInit(): void {
    }
    ngAfterViewInit() {
        this.itemComponents.changes.subscribe(e => {
            e.toArray().forEach((item: MathGraphItemComponent) => {
                if(!this.itemsMap.get(item.id))
                    this.itemsMap.set(item.id, item);
            })
        })
    }
    onMouseup()
    {
        this.selectedItem = null;
        if(this.selectedPoints.pointFrom && this.selectedPoints.pointTo) {
            let bind: any = this.logic.bindItem(this.selectedPoints.pointFrom, this.selectedPoints.pointTo);
            if(bind)
            {
                if(bind.remove)
                   this.removeLink(bind.remove);
                this.appendLink(bind.from, bind.to);
            }
        }

        this.selectedPoints.pointFrom = null;
        this.selectedPoints.pointTo = null;
        this.currentState.mousedown = false;
    }
    onMousemove(e: MouseEvent)
    {
        this.currentState.position = this.convertPosition({ x: e.clientX, y: e.clientY });
        if(this.selectedItem)
        {
            this.mouseMovePosition.assign(e.clientX - this.mouseDownPosition.x, e.clientY - this.mouseDownPosition.y);
            this.selectedItem.position.from(this.selectedItem.timePosition.sum$(this.mouseMovePosition));

            /** Обновление связей */
            this.links.forEach(link => {
                const itemA = this.itemsMap.get(link.from.id);
                const itemB = this.itemsMap.get(link.to.id);
                if(!itemA || !itemB) return;
                if(link.from.id == this.selectedItem?.id)
                    link.points = this.getConvertPoints(
                        link.from,
                        this.selectedItem.getPositionByKeyName(link.from.key, "output"),
                        itemB.getPositionByKeyName(link.to.key, "input")
                    )
                if(link.to.id == this.selectedItem?.id)
                    link.points = this.getConvertPoints(
                        link.from,
                        itemA.getPositionByKeyName(link.from.key, "output"),
                        this.selectedItem.getPositionByKeyName(link.to.key, "input")
                    )
            })
        }
    }
    onEvent({ name, item, bindEvent, event, targetBox }: {
        name: string,
        item: MathGraphItemComponent,
        event: MouseEvent,
        bindEvent?: {
            id: string,
            key: string,
        },
        targetBox?: DOMRect
    })
    {
        switch(name)
        {
            case "on-mousedown":
                this.selectedItem = item;
                this.mouseDownPosition.assign(event.clientX, event.clientY);
                break;
            case "on-pointdown":
                this.currentState.mousedown = true;
            case "on-pointup":
                if(bindEvent && targetBox)
                    if(name == "on-pointdown")
                    {
                        this.selectedPoints.pointFrom = bindEvent;
                        this.selectedPoints.position = this.convertPosition(targetBox);
                    }
                    else this.selectedPoints.pointTo = bindEvent;
                    event.preventDefault();
                break;
            case "on-pointremove":
                event.preventDefault();
                if(bindEvent)
                {
                    this.logic.removeBind(bindEvent.id, bindEvent.key);
                    this.removeLink(bindEvent);
                }
                break;
        }
    }
    appendNewItem()
    {
        let x = 0;
        let y = 0;

        const item: VisualItem = this.logic.createItem();
        item.name = "Test " + Math.random();
        item.position = new Vector2(x, y);
        
        let r = Math.floor(Math.random() * 10);
        for(let j = 0; j < r; j++)
            item.inputs["in " + j] = {};
        r = Math.floor(Math.random() * 10);
        for(let j = 0; j < r; j++)
            item.outputs["out " + j] = true;

        this.items.push(item);
    }
    removeItem()
    {
        if(this.items.length)
        {
            // TODO Удалять все связи
            this.items.splice(this.items.length - 1, 1);
        }
    }
    private appendLink(from: MathGraphInterface.Bind, to: MathGraphInterface.Bind)
    {
        const fromItem = this.itemsMap.get(from.id);
        const toItem = this.itemsMap.get(to.id);
        if(fromItem && toItem)
        {
            this.links.push({
                from,
                to,
                hover: false,
                points: this.getConvertPoints(
                    from,
                    fromItem.getPositionByKeyName(from.key, "output"),
                    toItem.getPositionByKeyName(to.key, "input"),
                )
            });
        }
    }
    /* private getConvertPoints(from: MathGraphInterface.Bind, fromBox: DOMRect, toBox: DOMRect): string
    {
        let i = 0;
        let k = 0;
        const fromItem = this.logic.itemsMap.get(from.id);
        for(let key in fromItem?.outputs)
        {
            if(key === from.key) i = k;
            k++;
        }
        const pointA = this.convertPosition(fromBox);
        const pointB = this.convertPosition(toBox);
        const w = pointB.x - pointA.x;
        const h = pointB.y - pointA.y;
        // M -33.262 65.679 c -45.43 10.364 -79.945 67.836 -127.756 72.571
        return `M${ pointA.x },${ pointA.y } ${ pointA.x + 20 },${ pointA.y }
         C ${ pointA.x + 20 },${ pointA.y } ${ pointA.x + w / 2 },${ pointA.y } ${ pointA.x + w / 2 },${ pointA.y + h / 2 }
         C ${ pointA.x + w / 2 },${ pointA.y + h / 2 } ${ pointA.x + w / 2 },${ pointB.y } ${ pointB.x - 20 },${ pointB.y }
         T ${ pointB.x },${ pointB.y }`;
    } */
    private getConvertPoints(from: MathGraphInterface.Bind, fromBox: DOMRect, toBox: DOMRect): { a: { x: number, y: number }, b: { x: number, y: number } }[]
    {
        let i = 0;
        let k = 0;
        const fromItem = this.logic.itemsMap.get(from.id);
        for(let key in fromItem?.outputs)
        {
            if(key === from.key) i = k;
            k++;
        }
        const pointA = this.convertPosition(fromBox);
        const pointB = this.convertPosition(toBox);
        const points = [
            { x: pointA.x, y: pointA.y },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: pointB.x, y: pointB.y },
        ];
        points[1].x = points[0].x + 20 + (k - i) * 5;
        points[1].y = points[0].y;

        points[2].x = points[3].x - (20 + i * 5);
        points[2].y = points[3].y;

        return [
            { a: points[0], b: points[1] },
            { a: points[1], b: points[2] },
            { a: points[2], b: points[3] },
        ];
    }
    private removeLink(to: MathGraphInterface.Bind)
    {
        for(let i = 0; i < this.links.length; i++)
            if(this.links[i].to.id === to.id && this.links[i].to.key === to.key)
                this.links.splice(i, 1);
    }
    private convertPosition(position: { x: number, y: number }): Vector2
    {
        const box = this.container.nativeElement.getBoundingClientRect();
        return new Vector2(
            this.container.nativeElement.scrollLeft + position.x - box.x,
            this.container.nativeElement.scrollTop + position.y - box.y,
        )
    }
}
