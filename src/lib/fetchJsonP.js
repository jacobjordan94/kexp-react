import fetchJsonp from "fetch-jsonp";

export default async function fetch() {
    const _url = new URL(url);
    _url.search = new URLSearchParams(params).toString();

    const response = await fetchJsonp(_url.toString());
    const json = await response.json();

    return json;
}