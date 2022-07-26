import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";

class NetworkManager {
    private static io: Server;

    public static init(httpServer: HttpServer): void {
        this.initializeIO(httpServer);
        this.initializeListeners();
    }

    private static initializeIO(httpServer: HttpServer): void {
        this.io = new Server(httpServer);
    }

    private static initializeListeners(): void {

        this.io.on("connection", (socket: Socket) => {
            console.log("A user connected");
            socket.emit("bruh");

            socket.on("test", () => {
                console.log("AHHHHHH");
            });


        });

    }
}

export { NetworkManager };