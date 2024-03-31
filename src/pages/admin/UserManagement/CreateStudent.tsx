import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import UMDatePicker from "../../../components/form/UMDatePicker";
import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";
import UMSelect from "../../../components/form/UMSelect";
import {
    bloodGroupsOptions,
    genderOptions,
} from "../../../constants/global.constant";
import {
    useGetAllAcademicDepartmentsQuery,
    useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";

const studentDummyData = {
    password: "student123",
    student: {
        //? Personal Info
        name: {
            firstName: "newStudent",
            middleName: "Dev",
            lastName: "test",
        },
        gender: "male",
        dateOfBirth: "2004-09-30",
        bloodGroup: "B+",

        //? Contact Info
        email: "new2@gmail.com",
        contactNo: "+880123456789",
        emergencyContactNo: "+880987654321",
        presentAddress: "House 15, Road 8, Dhanmondi, Dhaka 1205",
        permanentAddress:
            "Village: Shantinagar, Upazila: Feni Sadar, District: Feni",

        //? Guardian Info
        guardian: {
            fatherName: "Mahmudur Rahman",
            fatherOccupation: "Businessman",
            fatherContactNo: "+880123456788",
            motherName: "Farzana Begum",
            motherOccupation: "School Teacher",
            motherContactNo: "+880123456787",
        },

        //? Local Guardian Info
        localGuardian: {
            name: "Nasir Uddin",
            occupation: "Bank Manager",
            contactNo: "+8801987654321",
            address: "Flat 3A, Block B, Bashundhara R/A, Dhaka 1229",
        },

        //? Academic Info
        admissionSemester: "65bcce753baa6a9b0f6f4ea8",
        academicDepartment: "65bcc8323baa6a9b0f6f4ea3",
    },
};

//! This is for development - remove when done
const studentDefaultValues = {
    //? Personal Info
    name: {
        firstName: "Dr.",
        middleName: "Udity",
        lastName: "Roy",
    },
    gender: "female",
    bloodGroup: "B+",

    //? Contact Info
    email: "new2@gmail.com",
    contactNo: "+880123456789",
    emergencyContactNo: "+880987654321",
    presentAddress: "House 15, Road 8, Dhanmondi, Dhaka 1205",
    permanentAddress:
        "Village: Shantinagar, Upazila: Feni Sadar, District: Feni",

    //? Guardian Info
    guardian: {
        fatherName: "Mahmudur Rahman",
        fatherOccupation: "Businessman",
        fatherContactNo: "+880123456788",
        motherName: "Farzana Begum",
        motherOccupation: "School Teacher",
        motherContactNo: "+880123456787",
    },

    //? Local Guardian Info
    localGuardian: {
        name: "Nasir Uddin",
        occupation: "Bank Manager",
        contactNo: "+8801987654321",
        address: "Flat 3A, Block B, Bashundhara R/A, Dhaka 1229",
    },
};

const CreateStudent = () => {
    const [addStudent] = useAddStudentMutation();

    const { data: semesterData, isLoading: semesterIsLoading } =
        useGetAllSemestersQuery(undefined);

    const { data: departmentData, isLoading: departmentIsLoading } =
        useGetAllAcademicDepartmentsQuery(undefined, {
            skip: semesterIsLoading,
        });

    const semesterOptions = semesterData?.data?.map((item) => ({
        value: item._id,
        label: `${item.name} ${item.year}`,
    }));
    const departmentOptions = departmentData?.data?.map((item) => ({
        value: item._id,
        label: item.name,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);

        // const studentData = {
        //     password: "student123",
        //     student: data,
        // };

        // const formData = new FormData();

        // formData.append("data", JSON.stringify(studentData));

        //! This is for development - just for checking
        // await addStudent(Object.fromEntries(formData));
    };

    return (
        <Row>
            <Col span={24}>
                <UMForm
                    onSubmit={onSubmit}
                    defaultValues={studentDefaultValues}
                >
                    <Divider>Personal Info</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMInput
                                type="text"
                                name="name.firstName"
                                label="First Name"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMInput
                                type="text"
                                name="name.middleName"
                                label="Middle Name"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMInput
                                type="text"
                                name="name.lastName"
                                label="Last Name"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMSelect
                                name="gender"
                                label="Gender"
                                options={genderOptions}
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMDatePicker
                                name="dateOfBirth"
                                label="Date of Birth"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <Controller
                                name="profileImg"
                                render={({ field: { onChange, ...field } }) => {
                                    <Form.Item label="Profile Picture">
                                        <Input
                                            type="file"
                                            {...field}
                                            onChange={(e) =>
                                                onChange(e.target.files?.[0])
                                            }
                                        />
                                        ;
                                    </Form.Item>;
                                }}
                            />
                        </Col>

                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMSelect
                                name="bloodGroup"
                                label="Blood Group"
                                options={bloodGroupsOptions}
                            />
                        </Col>
                    </Row>
                    <Divider>Contact Info</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMInput type="text" name="email" label="Email" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMInput
                                type="text"
                                name="contactNo"
                                label="Contact No."
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMInput
                                type="text"
                                name="emergencyContactNo"
                                label="Emergency Contact No."
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMInput
                                type="text"
                                name="presentAddress"
                                label="Present Address"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMInput
                                type="text"
                                name="permanentAddress"
                                label="Permanent Address"
                            />
                        </Col>
                    </Row>
                    <Divider>Guardian Info</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMInput
                                type="text"
                                name="guardian.fatherName"
                                label="Father Name"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMInput
                                type="text"
                                name="guardian.fatherOccupation"
                                label="Father Occupation"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMInput
                                type="text"
                                name="guardian.fatherContactNo"
                                label="Father Contact No."
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMInput
                                type="text"
                                name="guardian.motherName"
                                label="Mother Name"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMInput
                                type="text"
                                name="guardian.motherOccupation"
                                label="Mother Occupation"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMInput
                                type="text"
                                name="guardian.motherContactNo"
                                label="Mother Contact No."
                            />
                        </Col>
                    </Row>
                    <Divider>Local Guardian Info</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMInput
                                type="text"
                                name="localGuardian.name"
                                label="Name"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMInput
                                type="text"
                                name="localGuardian.occupation"
                                label="Occupation"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMInput
                                type="text"
                                name="localGuardian.contactNo"
                                label="Contact No."
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMInput
                                type="text"
                                name="localGuardian.address"
                                label="Address"
                            />
                        </Col>
                    </Row>
                    <Divider>Academic Info</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMSelect
                                name="admissionSemester"
                                label="Academic Semester"
                                options={semesterOptions}
                                disabled={semesterIsLoading}
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <UMSelect
                                name="academicDepartment"
                                label="Academic Department"
                                options={departmentOptions}
                                disabled={departmentIsLoading}
                            />
                        </Col>
                    </Row>
                    <Button htmlType="submit">Submit</Button>
                </UMForm>
            </Col>
        </Row>
    );
};

export default CreateStudent;
