import { useLocation, useSearchParams } from 'react-router-dom';

const Search = () => {
  // url 의 data를 캐치해오는 훅
  // const location = useLocation();
  // console.log(location);
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');
  console.log(keyword);

  return (
    <div>
      <h1>3</h1>
    </div>
  );
};
export default Search;
