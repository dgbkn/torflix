import { useState, useEffect } from 'react';
// const BASE_API_URL ="https://pwapi.flixyback.repl.co/api.php?";



//  action=getBatches 

// action=getBatchDetails&batch_id=6172a60a2bf30e0011aae115

const useFetchAll = (part) => {
  const [data, setData] = useState(null);
  const [loading, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    var uri_1337x = `https://serverdevbk.cybranceehost.com/tor/sandr.php?qry=${part}`;
      fetch(uri_1337x, { signal: abortCont.signal })
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('Could Not fetch the data for that resource');
        } 

        return res.json();
      })
      .then(data => {
        setIsPending(false);
        console.log(data);
        setData(data);
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      });

    // abort the fetch
    return () => abortCont.abort();
  }, [part])

  return { data, loading, error };
}
 
export default useFetchAll;