const http = require('http'); 
const express = require('express');
const cors = require('cors');

const app= express();
app.use(cors());

app.listen(4000,()=>{
  console.log('server started');
});

app.get('/ping',(req,res)=>{
  res.setHeader('Content-Type', 'application/json');
  res.send({
    message: "success"
  }); 
})

app.get('/permutations',(req,res)=>{
  const diceValues = ["1","2","3","4","5","6"]
  const numberOfRolls = 2
  const stack = ["1","2","3","4","5","6"]
  let myArray = [];
  while(stack.length>0) {
    const poppedItem = stack.pop();
    for (const val of diceValues) {
      const combo = `${poppedItem}${val}`;
      if (combo.length === numberOfRolls) {
        myArray.push(combo);
      } else {
        stack.push(combo);
      }
    }
  }

  // Set headers to indicate SSE stream
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Set up stream interval to send 100 items at a time
  let intervalId = setInterval(() => {
    // Slice the next 100 items from your array and send as SSE message
    let chunk = myArray.slice(0, 10);
    myArray = myArray.slice(10);
    res.write(`data: ${JSON.stringify(chunk)}\n\n`);

    // If array is empty, close the SSE stream
    if (myArray.length === 0) {
      res.write(`data: \n\n`);
      clearInterval(intervalId);
      res.end();
    }
  }, 1000); // Interval in milliseconds
});