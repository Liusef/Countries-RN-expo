async function sendGraphQl(query, endpoint) {
    let r = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({query})
          })
    r = r.json();
    return r;
}


export {sendGraphQl}