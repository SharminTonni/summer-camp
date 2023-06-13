const Footer = () => {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <div className="flex items-center">
        <img
          className="h-12 w-12"
          src="https://logowik.com/content/uploads/images/935_music.jpg"
          alt=""
        />
        <p>
          Summer Music School
          <br />
          Providing music classes for everyone
        </p>
      </div>
      <div>
        <span className="footer-title">Connect With Us</span>
        <div className="grid grid-flow-col gap-4"></div>
      </div>
    </footer>
  );
};

export default Footer;
