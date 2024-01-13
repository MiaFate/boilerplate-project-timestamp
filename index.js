// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", function(req, res) {
  const date = req.params.date || ""
  //the first if is not really important
  if (date.length === 10) {
    const utc = new Date(date).toUTCString()
    const unix = Number(new Date(date).getTime())
    utc === "Invalid Date" ? res.json({ error: utc }) : res.json({ utc, unix })
  } else if (!!Number(date)) {
    const unix = Number(date)
    const utc = new Date(unix).toUTCString()
    utc === "Invalid Date" ? res.json({ error: utc }) : res.json({ unix, utc })
  } else if (date.length === 0) {
    const time = new Date()
    const utc = time.toUTCString()
    const unix = Number(time.getTime())
    utc === "Invalid Date" ? res.json({ error: utc }) : res.json({ utc, unix })
  } else {
    const utc = new Date(date).toUTCString()
    const unix = Number(new Date(date).getTime())
    utc === "Invalid Date" ? res.json({ error: utc }) : res.json({ utc, unix })
  }
})


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
