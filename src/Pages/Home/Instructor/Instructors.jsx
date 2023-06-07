import { useInstructor } from "../../../hooks/useInstructor";

const Instructors = () => {
  const [instructors] = useInstructor();
  console.log(instructors);
  return (
    <div className="mb-12">
      <div className="mx-auto text-center my-6">
        <h3 className="text-amber-600 text-3xl font-bold">
          --------Our Instructors--------
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {instructors.map((instructor) => (
          <div
            key={instructor._id}
            className="card lg:card-side bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className="h-[200px] w-[200px]"
                src={instructor.photo}
                alt="Album"
              />
            </figure>
            <div className="card-body flex items-center justify-center">
              <h2 className="card-title">Instructor: {instructor.name}</h2>
              <h2 className="card-title">Email: {instructor.email}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
