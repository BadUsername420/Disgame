# Disgame

Disgame is an extremely lightweight Discord game engine. (**Beta**)

![ezgif-2-42edb508961e](https://user-images.githubusercontent.com/44450511/121056411-2aa90180-c78c-11eb-8cf7-93a97aabf3f6.gif)

```typescript
// ...
const wait = (ms: number) => new Promise((resolve, reject) => setTimeout(resolve, ms));

client.on("message", async (msg) => {
    // ... listen for command
    
        const gameMessage = await msg.channel.send(
            new Discord.MessageEmbed()
                .setTitle("Game")
                .setDescription("...") // The description will automatically be overwritten by Disgame to contain the game view
                .setFooter("")
        )

        const game = new Disgame({
            message: gameMessage, // the message disgam will "render" to. (If embed uses description; if message uses content)
            size: { // the emoji background tile size
                width: 10,
                height: 7
            },
            backgroundEmoji: "⬜" // the game background
        });

        // create tiles
        const appleTile = game.addTile(new Tile({ emoji: "🍎", position: { x: 0, y: 0 } }));
        const bananaTile = game.addTile(new Tile({ emoji: "🍌", position: { x: 3, y: 3 } }));
        const pearTile = game.addTile(new Tile({ emoji: "🍐", position: { x: 5, y: 5 } }));

        for (var i = 0; i < 4; i++) {
            // increment position of "appleTile" to move diagonally
            appleTile.position.x++;
            appleTile.position.y++;

            game.render(); // call render fuction to edit the message with the updated scene
            await wait(1000); // wait 1 second
        }

        game.removeTile(appleTile); // remove "appleTile" once its done
        game.render(); // render 
});

// ...
```



## Table of Contents

1. [Overview](#Disgame)
2. [Usage](#Usage)
   1. [Base](#Base)
   2. [Tiles](#Tiles)
3. [Examples]()
4. Credits



## Usage

### Base

The base (Disgame) is the start to any game. It is used to render the view to a chosen message

```typescript
 const game = new Disgame({
    message: gameMessage, // a created message (embed, plain, etc)
    size: { 
        width: 10,
        height: 7
    },
    backgroundEmoji: "⬜"
});
```

![Disgame_Dimension](https://user-images.githubusercontent.com/44450511/121057964-dacb3a00-c78d-11eb-9e05-dba17e300a8c.png)



#### Options/Properties

| Optional | Name              | Description                                                  | Default                   |
| :------- | ----------------- | ------------------------------------------------------------ | ------------------------- |
| ❌        | `message`         | `Discord.Message` The message in which you want to render the game when `render()` is called. |                           |
| ✅        | `size`            | `{width: number; height: number}` The size of the canvas.    | `{width: 10, height: 10}` |
| ✅        | `backgroundEmoji` | `string The emoji used to fill the background.               | ⬛                         |



#### Methods

| Name                     | Description                                                  | Returns  |
| ------------------------ | ------------------------------------------------------------ | -------- |
| `render()`               | "Renders" the game view as text to the Discord message. (Should be called when you want to update a change on the screen) | `void`   |
| `addTile(tile: Tile)`    | Adds a new tile object to the game.                          | `tile`   |
| `removeTile(tile: Tile)` | Removes a tile from the game.                                | `void`   |
| `getTile(name: string)`  | Gets all tiles with the chosen name.                         | `Tile[]` |

### Tiles

Tiles are emojis at certain positions on the game canvas. The can be added and remove from games using the respective game functions `addTile(tile: Tile)`/`removeTile(tile: Tile)`. Tiles can also be found by calling `getTile(name: string)`.

![Disgame_Position](https://user-images.githubusercontent.com/44450511/121060536-c89ecb00-c790-11eb-874e-beed729f1a61.png)

```typescript
const game = new Disgame({
   message: gameMessage, // a created message (embed, plain, etc)
   size: { 
        width: 10,
        height: 7
    },
    backgroundEmoji: "⬜"
});

let bananaTile = game.addTile(new Tile({
    emoji: "🍌",
    position: {
        x: 3,
        y: 4
    }
}));

game.render();
```

#### Options/Properties

| Optional | Name       | Description                                                  | Default        |
| -------- | ---------- | ------------------------------------------------------------ | -------------- |
| ❌        | `emoji`    | `string `The emoji used to display the tile                  |                |
| ✅        | `name`     | `name` Used to get tiles by name using the `getTile(tile: string)` function. |                |
| ✅        | `position` | `(IPosition) {x: number, y: number}` The tile's position     | `{x: 0, y: 0}` |



## Examples

### Moving Tile

**Coming soon**



## Credits

**Made by** [Badusername420](https://badusername420.github.io)

