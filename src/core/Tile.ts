enum Material {

}

interface IPosition {
    x: number;
    y: number;
}

interface ITileOptions {
    name?: string;
    emoji: Material | string;
    position?: IPosition;
}
class Tile {
    public name?: string;
    public emoji!: Material | string;
    public position!: IPosition;
    public id!: number;

    constructor(options: ITileOptions) {
        const { emoji, position, name } = options;

        this.name = name;
        this.emoji = emoji;
        this.position = position || { x: 0, y: 0 };
    }
}

export default Tile;
export { Material, IPosition };