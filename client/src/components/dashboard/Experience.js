import React, { Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import PropTypes from "prop-types";

const Experience = ({ experience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          " Sekarang "
        ) : (
          <Moment format="DD/MM/YYYY">{exp.to}</Moment>
        )}
      </td>
      <td>
        <button className="btn btn-danger">Hapus</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Pengalaman Nyambut Gawe</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Perusahaan</th>
            <th className="hide-sm">Jabatan</th>
            <th className="hide-sm">Tahun</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default Experience;
