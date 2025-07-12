import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./SingleCampus.css";
import SingleStudent from "./SingleStudent";
import AddStudent from "./AddStudent";

const SingleCampus = () => {
  const [campus, setCampus] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getSingleCampus = async (id) => {
    try {
      const getSingleCampus = await axios.get(
        `http://localhost:8080/api/campuses/${id}`
      );
      setCampus(getSingleCampus.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleCampus(id);
  }, []);

  const handleDelete = async (studentId) => {
    try {
      const deleteStudent = await axios.delete(
        `http://localhost:8080/api/students/${studentId}`
      );
      await getSingleCampus(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  if (!campus) return <p>Loading...</p>;

  return (
    <div className="campus-container">
      <h2 className="campus-title">Campus Details</h2>
      <div className="campus-info">
        <h3>
          <strong>Name:</strong> {campus.name}
        </h3>
        <p>
          <strong>Address:</strong> {campus.address}
        </p>
        <p>
          <strong>Description:</strong> {campus.description}
        </p>
        <img
          src={
            campus.imageUrl ||
            "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
          }
          alt={`${campus.name}`}
          className="campus-image"
        />
      </div>

      <div className="students-section">
        <h3 className="students-title">Students in this Campus</h3>
        {campus.students.length === 0 ? (
          <p>No students enrolled yet.</p>
        ) : (
          <div className="student-cards">
            {campus.students.map((student) => (
              <div
                key={student.id}
                className="student-card"
                onClick={() => navigate(`/students/${student.id}`)}
              >
                {student.name}
                <p
                  className="student-trash-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(student.id);
                  }}
                >
                  🗑️
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      {showForm === true ? (
        <AddStudent refreshCampus={() => getSingleCampus(id)} />
      ) : (
        <button className="toggle-campus-button" onClick={handleShowForm}>
          Add Student
        </button>
      )}
    </div>
  );
};

export default SingleCampus;
