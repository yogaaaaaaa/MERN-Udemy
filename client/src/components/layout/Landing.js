import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {

  if(isAuthenticated){
   return <Redirect to='/dashboard'/>
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Social-Hub</h1>
          <p className="lead">
            Menghubungkan para developer! Buat profil/portofolio, bagikan
            postingan dan cari bantuan dari developer lain !
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

Landing.propTypes = {
  isAuthenticated: propTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
