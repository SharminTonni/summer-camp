import { useClass } from "../../../hooks/useClass";
import SingleClass from "./SingleClass";

const Classes = () => {
  const [classes] = useClass();
  console.log(classes);
  return (
    <div className="my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((item) => (
          <SingleClass item={item} key={item._id}></SingleClass>
        ))}
      </div>
    </div>
  );
};

export default Classes;
