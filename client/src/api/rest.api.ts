// Не используються в проєкте, просто типизация

export interface api {
  url: string;
  method?: string;
  body?: { id?: string } | null;
  id?: string;
}

//MEIN FETCH
function sendRequest({ url, method = "GET", body = null }: api): Promise<any> {
  return fetch(url, {
    method: method,
    body: body != null ? JSON.stringify(body) : null,
    headers: { "Content-Type": "application/json" }
  });
}

// GET OBJ LIST
export function getObjList(url: string) {
  return sendRequest({ url }).then((res) => res.json());
}

// GET OBJ
export function getObj({ url, id }: api) {
  return sendRequest({ url: url + id }).then((res) => res.json());
}

//PUT OBJ
export function updateObj({ url, body }: api) {
  return sendRequest({ url: url + body?.id, method: "PUT", body }).then((res) =>
    res.json()
  );
}

//DELETE OBJ
export function removeObj({ url, id }: api) {
  return sendRequest({ url: url + id, method: "DELETE" });
}
//POST OBJ
export function createObj({ url, body }: api) {
  return sendRequest({ url, method: "POST", body }).then((res) => res.json());
}
