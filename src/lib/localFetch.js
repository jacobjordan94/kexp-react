export default async function localFetch(url, params) {
    const _url = new URL(url);
    _url.search = new URLSearchParams(params).toString();

    const response = await fetch(_url);
    const json = await response.json();

    return json;
}