import { useInstructor } from "../../../hooks/useInstructor";
import SingleInstructor from "./SingleInstructor";

const Instructors = () => {
  const [instructors] = useInstructor();
  //   console.log(instructors);
  return (
    <div className="mb-12">
      <div className="mx-auto text-center my-6">
        <h3 className="text-red-600 text-3xl font-bold">Our Instructors</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {instructors.slice(0, 6).map((instructor) => (
          <SingleInstructor
            key={instructor._id}
            instructor={instructor}
          ></SingleInstructor>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
