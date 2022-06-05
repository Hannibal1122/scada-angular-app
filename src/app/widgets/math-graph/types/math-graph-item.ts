import { Vector2 } from "./type"

export type VisualItem = MathGraphInterface.Item & MathGraphInterface.VisualItem
export namespace MathGraphInterface
{
    export type VisualItem = {
        name?: string
        position?: Vector2
        color?: string
    }

    export interface Item
    {
        id: string
        inputs: {
            [key: string]: Point
        }
        outputs: {
            [key: string]: true
        }
    }

    export interface Point
    {
        default?: any
        bind?: Bind
    }

    export interface Bind
    {
        id: string
        key: string
    }
}