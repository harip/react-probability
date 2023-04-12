import URL from "./api.url";

export async function postUserEventData(data: any) {
    try {
      const response = await fetch(URL.captureUserEvents, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        "body":  JSON.stringify(data)
      });
      const responseData = await response.json();
      return responseData;
    } catch {
      return {
        "message": "fail"
      }
    } 
  }