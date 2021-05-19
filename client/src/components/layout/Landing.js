import React from "react";
import { Link } from "react-router-dom";


const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Social-Hub</h1>
          <p className="lead">
            Menghubungkan para developer! Buat profil/portofolio, bagikan postingan dan cari bantuan dari developer lain !
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Gabung Gratis !
            </Link>
            <Link to="/login" className="btn btn-light">
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
