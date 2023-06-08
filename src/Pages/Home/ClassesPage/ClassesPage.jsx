import { useAllClasses } from "../../../hooks/useAllClasses";
import SingleClass from "../Classes/SingleClass";

const ClassesPage = () => {
  const [allClass] = useAllClasses();
  return (
    <div className="my-12">
      <div className="mx-auto text-center my-6">
        <h3 className="text-red-600 text-3xl font-bold">
          --------Our Music Classes--------
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allClass.map((item) => (
          <SingleClass item={item} key={item._id}></SingleClass>
        ))}
      </div>
    </div>
  );
};

export default ClassesPage;
