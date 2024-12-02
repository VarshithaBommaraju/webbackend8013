const http = require("http");
const path = require("path");
const fs = require("fs");
const { MongoClient } = require('mongodb');

const URI = 'mongodb+srv://bommarajuvarshitha12:EOnc0ty9XsKVpMLd@cluster0.ygp4t.mongodb.net/';
async function connectToMongoDB() {
  const client = new MongoClient(URI);
  try {
    await client.connect();
    console.log('Connected MongoDB');
    return client.db('city_population');
  } catch (error) {
    console.error('Error connection', error);
  }
}

const server = http.createServer(async (req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'),
                    (err, content) => {
                                    if (err) throw err;
                                    res.setHeader("Access-Control-Allow-Origin", "*")
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content);
                        }
              );
     }
     else if (req.url === '/main.css') {
        fs.readFile(path.join(__dirname, 'public', 'main.css'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(content);
        });
    }
    else if (req.url === '/script.js') {
        fs.readFile(path.join(__dirname, 'public', 'script.js'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/js' });
            res.end(content);
        });
    }
    else if (req.url.startsWith('/Assets/')) {
    const assetPath = path.join(__dirname, req.url);
    fs.readFile(assetPath, (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }
      const contentType = path.extname(assetPath) === '.png' ? 'image/png' : 'image/jpeg';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  }
    else if (req.url === '/about') {
        
        fs.readFile(
            path.join(__dirname, 'public', 'about.html'),
                    (err, content) => {
                                    
                                    if (err) throw err;
                                    res.setHeader("Access-Control-Allow-Origin", "*")
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content);
                        }
              );
     }
    else if (req.url==='/api')
    {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    try {
      const db = await connectToMongoDB();
      const data = await db.collection('city_population').find({}).toArray();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } catch (error) {
      console.error('Error Fetching data:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Error' }));
    }
    }
    else{
        res.end("<h1> 404 Error</h1>");
    }
});

const PORT= process.env.PORT || 8013;
server.listen(PORT,()=> console.log(`Server is running on ${PORT} `));