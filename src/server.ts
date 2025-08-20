import app from "./app";

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server running on http://192.168.2.14:"+PORT);
    console.log("Link to test http://192.168.2.14:"+PORT+"/health");
});