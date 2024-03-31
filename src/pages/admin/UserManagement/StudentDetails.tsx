import { useParams } from "react-router-dom";

const StudentDetails = () => {
    const { studentId } = useParams();
    console.log(studentId);

    return (
        <div>
            <h2>Welcome to the StudentDetails of {studentId}</h2>
        </div>
    );
};

export default StudentDetails;
