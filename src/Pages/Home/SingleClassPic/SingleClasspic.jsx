const SingleClasspic = ({ item }) => {
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={item.image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-error">Popular</div>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SingleClasspic;
