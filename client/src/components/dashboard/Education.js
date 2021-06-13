import React, { Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import PropTypes from "prop-types";

const Education = ({ education }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          " Sekarang "
        ) : (
          <Moment format="DD/MM/YYYY">{edu.to}</Moment>
        )}
      </td>
      <td>
        <button className="btn btn-danger">Hapus</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Pendidikan</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Kampus/Sekolah</th>
            <th className="hide-sm">Lulusan</th>
            <th className="hide-sm">Tahun</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default Education;
