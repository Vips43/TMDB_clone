import useApiStore from "../../oth/js_files/store";


function SearchCompany({ movie }) {
 const isLoading = useApiStore((s) => s.isLoading);

 if (isLoading)
  <div className="mt-14 text-2xl font-bold animate-bounce grid place-items-center">
   Loading...
  </div>;
 // if(!movie) return
 return (
  <>
   <div>
    <div className="mt-14 text-2xl font-bold grid place-items-center">
     No Data for Companies...
    </div>
   </div>
  </>
 );
}

export default SearchCompany;
