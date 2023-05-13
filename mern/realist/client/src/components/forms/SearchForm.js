import { useSearch } from '../../context/Search';

export default function SearchForm() {
  const [search, setSearch] = useSearch();

  return (
    <div className='d-flex justify-content-center'>
      {JSON.stringify(search)}
    </div>
  );
}
