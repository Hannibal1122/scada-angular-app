import { Format } from "../../system/format";
import { MathGraphInterface } from "./types/math-graph-item";

export class MathGraphLogic
{
    itemsMap: Map<string, MathGraphInterface.Item> = new Map();
    constructor()
    {

    }
    createItem(): MathGraphInterface.Item
    {
        let item: MathGraphInterface.Item = {
            id: Format.getGUID(),
            inputs: { },
            outputs: { }
        }
        this.itemsMap.set(item.id, item);
        return item;
    }
    removeItem(id: string)
    {
        this.itemsMap.delete(id);
    }
    bindItem(
        keyA: MathGraphInterface.Bind,
        keyB: MathGraphInterface.Bind
    ): {
        from: MathGraphInterface.Bind,
        to: MathGraphInterface.Bind,
        remove?: MathGraphInterface.Bind } | false
    {
        let A = this.itemsMap.get(keyA.id);
        let B = this.itemsMap.get(keyB.id);
        
        if(A && B)
        {
            let fromItem = A;
            let toItem = B;
            let out:{
                from: MathGraphInterface.Bind,
                to: MathGraphInterface.Bind,
                remove?: MathGraphInterface.Bind
            } = {
                from: { ...keyA },
                to: { ...keyB }
            }
            /** Соединять входы/выходы можно слева направо и справа налево
             * Поэтому здесь проверяется случай перетягивания справа налево
            */
            if(A.inputs[keyA.key] && B.inputs[keyB.key]
                || A.outputs[keyA.key] && B.outputs[keyB.key]) return false;
            if(A.inputs[keyA.key])
            {
                toItem = A;
                fromItem = B;
                out.from = { ...keyB };
                out.to = { ...keyA };
            }
            if(!this.checkInfinity(fromItem, toItem))
            {
                if(toItem.inputs[out.to.key].bind)
                    out.remove = this.removeBind(out.to.id, out.to.key);
                toItem.inputs[out.to.key].bind = {
                    id: out.from.id,
                    key: out.from.key,
                }
            }
            else return false;
            return out;
        }
        return false;
    }
    removeBind(id: string, key: string): MathGraphInterface.Bind
    {
        const item = this.itemsMap.get(id);
        if(item)
            delete item.inputs[key].bind;
        return { id, key };
    }
    /** Защита от зацикливания */
    private checkInfinity(fromItem: MathGraphInterface.Item | undefined, toItem: MathGraphInterface.Item): boolean
    {
        let error = false;
        if(!fromItem || fromItem.id === toItem.id) return true;
        for(let key in fromItem.inputs)
        {
            let bind = fromItem.inputs[key].bind;
            if(bind)
                error = this.checkInfinity(
                    this.itemsMap.get(bind.id),
                    toItem
                )
        }
        return error;
    }
}