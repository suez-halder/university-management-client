import { Button } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";

const studentDummyData = {
    password: "student123",
    student: {
        name: {
            firstName: "newStudent",
            middleName: "Dev",
            lastName: "test",
        },
        gender: "male",
        dateOfBirth: "2004-09-30",
        email: "new2@gmail.com",
        contactNo: "+880123456789",
        emergencyContactNo: "+880987654321",
        bloodGroup: "B+",
        presentAddress: "House 15, Road 8, Dhanmondi, Dhaka 1205",
        permanentAddress:
            "Village: Shantinagar, Upazila: Feni Sadar, District: Feni",
        guardian: {
            fatherName: "Mahmudur Rahman",
            fatherOccupation: "Businessman",
            fatherContactNo: "+880123456788",
            motherName: "Farzana Begum",
            motherOccupation: "School Teacher",
            motherContactNo: "+880123456787",
        },
        localGuardian: {
            name: "Nasir Uddin",
            occupation: "Bank Manager",
            contactNo: "+8801987654321",
            address: "Flat 3A, Block B, Bashundhara R/A, Dhaka 1229",
        },
        admissionSemester: "65bcce753baa6a9b0f6f4ea8",
        academicDepartment: "65bcc8323baa6a9b0f6f4ea3",
    },
};

const CreateStudent = () => {
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };

    return (
        <UMForm onSubmit={onSubmit}>
            <UMInput type="text" name="name" label="Name" />
            <Button htmlType="submit">Submit</Button>
        </UMForm>
    );
};

export default CreateStudent;
