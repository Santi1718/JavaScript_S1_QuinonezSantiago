async function api () {
    let response = await fetch ("https://6818a32f5a4b07b9d1d01baa.mockapi.io/api/v1/Api")
    let data = await response.json();
    return data;
}