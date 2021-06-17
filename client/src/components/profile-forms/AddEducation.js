import React, { Fragment, useState } from "react";
import {withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";


const AddEducation = ({
    addEducation, history
}) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 class="large text-primary">Pernah sekolah kan??</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Tambahkan pendidikan kuliah atau sekolah mu, atau butkem juga bolehhh.
      </p>
      <small>* = perlu diisi bosque</small>
      <form class="form" onSubmit={e => {
          e.preventDefault();
          addEducation(formData, history)
      }}>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Sekolah, PTS/PTN, bootcamp, terserah deh apa aja."
            name="school"
            value={school}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Gelar atau sertifikat"
            name="degree"
            value={degree}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              onChange={e => {
                setFormData({
                  ...formData,
                  current: !current,
                });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
            Current Education
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to}
            onChange={(e) => onChange(e)} disabled={toDateDisabled ? 'disabled': ''} />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
            cols="30"
            rows="5"
            placeholder="Program Description"
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="/dashboard">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
