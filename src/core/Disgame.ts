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
    readonly message!: Discord.Message;
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

        for (var yIndex = 0; yIndex < this.size.height; yIndex++) {
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
            return this.message.edit({ embeds: [this.message.embeds[0].setDescription(renderText)] }); //embeds
        } else {
            return this.message.edit(renderText); // plain text
        }
    }

    addTile(tile: Tile) {
        tile.id = this.nextId;
        this.nextId++;

        this.tiles.push(tile);
        return tile;
    }

    removeTile(tile: Tile) {
        this.tiles = this.tiles.filter((v) => v !== tile);
    }

    getTile(name: string) {
        return this.tiles.filter((v) => v.name == name);
    }
}

export default Disgame;