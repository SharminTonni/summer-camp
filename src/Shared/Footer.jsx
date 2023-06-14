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
        <span className="footer-title">Company</span>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </div>
      <div>
        <span className="footer-title">Connect With Us</span>
        <div className="grid grid-flow-col items-center gap-4">
          <img
            src="https://cliply.co/wp-content/uploads/2019/07/371907490_FACEBOOK_ICON_400px.gif"
            className="rounded-full w-12 h-12"
            alt=""
          />
          <img
            src="https://cliply.co/wp-content/uploads/2019/07/371907300_INSTAGRAM_ICON_400px.gif"
            className="rounded-full w-12 h-12"
            alt=""
          />
          <img
            src="https://cliply.co/wp-content/uploads/2019/07/371907120_YOUTUBE_ICON_400px.gif"
            className="rounded-full w-12 h-12"
            alt=""
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
