import { ChangeEvent, useState } from "react";
import "./App.css";

function App() {
  const [searchData, setSearchData] = useState<Record<string, any>[]>([]);
  const [rawResult, setRawResult] = useState<string>();

  function getResult(page: string) {
    fetch(`https://id.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=${page}`)
    .then(response => response.json())
    .then(value => {
      setRawResult(value.parse.text['*']);
    })
  }

  function getUrl(query: string): string {
    return `https://id.wikipedia.org/w/rest.php/v1/search/title?q=${query}&limit=10`;
  }

  function searching(e: ChangeEvent) {
    fetch(
      getUrl(
        (e.target as HTMLInputElement).value.split(" ").map((value: string) =>
          value[0].toUpperCase() + value.slice(1)
        ).join("_"),
      ),
    )
      .then((response: Response) => response.json())
      .then((value: Record<string, any>) => {
        
        setSearchData(value.pages);
        console.log(value);
      });
  }

  return (
    <>
      <h1>Search</h1>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="search"
        onChange={searching}
      />
      <div>{ searchData.map((value: Record<string, any>) => (
        <p onClick={() => getResult(value.key)}>{value.title}</p>
      )) }</div>
      <div dangerouslySetInnerHTML={{__html: rawResult}}>
      </div>

    </>
  );
}

export default App;
