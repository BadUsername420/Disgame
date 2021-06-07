enum Material {

}

interface IPosition {
    x: number;
    y: number;
}

interface ITileOptions {
    emoji: Material | string;
    position?: IPosition;
}
class Tile {
    public emoji!: Material | string;
    public position!: IPosition;
    public id!: number;

    constructor(options: ITileOptions) {
        const { emoji, position } = options;

        this.emoji = emoji || "🍎";
        this.position = position || { x: 0, y: 0 };
    }
}

export default Tile;
export { Material, IPosition };