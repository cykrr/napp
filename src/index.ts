import app from "./app"
import { AppDataSource } from "./data-source"

const PORT = 3000

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  })
}).catch(error => console.error("DB connection failed", error))