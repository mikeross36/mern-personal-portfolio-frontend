import Login from "../../pages/login/Login";

const Contact = () => {
  return (
    <section className="contact section" id="contact">
      <h2 className="section__title">I'd love to hear from you</h2>
      <h3 style={{ marginTop: "1rem" }}>vladimir.monarov@yahoo.com</h3>
      <h3 style={{ marginBottom: "0" }}>or you can..</h3>
      <div>
        <Login />
      </div>
    </section>
  );
};

export default Contact;
