import { useAllClasses } from "../../../hooks/useAllClasses";
import SingleClass from "../Classes/SingleClass";

const ClassesPage = () => {
  const [allClass] = useAllClasses();
  return (
    <div className="my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allClass.map((item) => (
          <SingleClass item={item} key={item._id}></SingleClass>
        ))}
      </div>
    </div>
  );
};

export default ClassesPage;
