import Discord from "discord.js";
import Tile, { IPosition } from "./Tile";

interface IDisgameOptions {
    message: Discord.Message;
    size?: {
        width: number;
        height: number;
    }
    backgroundEmoji?: string;
}
class Disgame {
    protected message!: Discord.Message;
    public size!: {
        width: number;
        height: number;
    }
    public backgroundEmoji!: string;

    public tiles: Tile[] = [];
    public nextId: number = 0;

    constructor(options: IDisgameOptions) {
        const { message, size, backgroundEmoji } = options;

        this.message = message;
        this.size = size || { width: 10, height: 10 };
        this.backgroundEmoji = backgroundEmoji || "⬛";

        this.render();
    }

    async render() {
        let renderText = "";

        for (var yIndex = 0; yIndex < this.size.width; yIndex++) {
            for (var xIndex = 0; xIndex < this.size.width; xIndex++) {
                let foundTile = this.tiles.find((value) => value.position.x === xIndex && value.position.y === yIndex);
                if (foundTile)
                    renderText += foundTile?.emoji;
                else
                    renderText += this.backgroundEmoji;
            }
            renderText += "\n";
        }

        if (this.message.embeds[0]) {
            this.message.edit(this.message.embeds[0].setDescription(renderText)); //embeds
        } else {
            this.message.edit(renderText); // plain text
        }
    }

    addTile(tile: Tile) {
        tile.id = this.nextId;
        this.nextId++;

        this.tiles.push(tile);
        return tile;
    }

    removeTile(tile: Tile) {
        let foundTile = this.tiles.find((v) => v.id == tile.id);

        if (foundTile) {
            this.tiles = this.tiles.filter((v) => v !== foundTile);
        }

    }
}

export default Disgame;