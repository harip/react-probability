// import URL from "./api.url";

// // const source = new EventSource(URL.combinationStream);
// // source.onmessage = (event) => {
// //     const data=JSON.parse(event.data);
// //     console.log(data);
// // }

// export const  makeAPICall = () => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', 'http://localhost:4000/streams');
//     xhr.setRequestHeader('Content-Type', 'text/event-stream');
//     xhr.onreadystatechange = function() {
//       if (xhr.readyState === 3) {
//         // handle partial response data received
//         console.log(xhr.responseText);
//       } else if (xhr.readyState === 4) {
//         // handle complete response received
//         console.log(xhr.responseText);
//       }
//     };
//     xhr.send();
//   }
  
export function makeAPICall() {
    fetch('http://localhost:4000/streams', {
      headers: {
        'Content-Type': 'text/event-stream'
      }
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }
  