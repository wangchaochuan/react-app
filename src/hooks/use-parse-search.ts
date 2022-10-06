import { useSearchParams, URLSearchParamsInit } from 'react-router-dom';

/* 
eg:

当前url ： http://localhost:3000/task/task-details/370000197805317204/120000200408079968?theme=light；

const {theme} = useParseSearch();

const {theme, q, topic} = useParseSearch("http://baidu.com?q=URLUtils.searchParams&topic=api");

etc.

*/

const useParseSearch = (defaultInit?: URLSearchParamsInit) => {
  const [searchParams] = useSearchParams(defaultInit);

  const searchParamsObject = Array.from(searchParams.entries()).reduce((m, [key, value]) => {
    m[key] = value;
    return m;
  }, {} as { [key: string]: string });

  return searchParamsObject;
};

export default useParseSearch;
