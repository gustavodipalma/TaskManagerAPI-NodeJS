import express from "express";
import taskRoutes from "./routes/tasks";
import { swaggerSetup } from './config/swagger';

const app = express();

swaggerSetup(app);
app.use(express.json());
app.use("/api", taskRoutes);

app.get("/health", (_req,res) => {
    //Exemplo de como fazer uma verificação de algo antes de falar que o servico ta rodando, tipo uma verificacao do DB
    //const check = false;
    //if(!check) return res.status(503).json({status:"DOWN"});
    res.status(200).json({status:"OK"});
});

export default app;