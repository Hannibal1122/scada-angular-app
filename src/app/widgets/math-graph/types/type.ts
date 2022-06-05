/** @deprecated */
export interface Position
{
    x: number
    y: number
}
export class Vector2
{
    constructor(public x: number, public y: number)
    {

    }
    from(vector2?: { x: number, y: number })
    {
        this.x = vector2 ? vector2.x : 0;
        this.y = vector2 ? vector2.y : 0;
    }
    assign(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }
    sum(vector2: Vector2)
    {
        this.x += vector2.x;
        this.y += vector2.y;
    }
    sum$(vector2: Vector2): Vector2
    {
        return new Vector2(this.x + vector2.x, this.y + vector2.y);
    }
}