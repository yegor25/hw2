import { runDb } from "./db"
import { app } from "./settings"

const port = 3000




const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log("server running...")
    })
}
startApp()
