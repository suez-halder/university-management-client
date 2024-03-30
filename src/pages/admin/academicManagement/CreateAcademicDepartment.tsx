import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";
import UMSelect from "../../../components/form/UMSelect";
import {
    useAddAcademicDepartmentMutation,
    useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";

const CreateAcademicDepartment = () => {
    const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

    const { data: academicFacultyData } =
        useGetAllAcademicFacultiesQuery(undefined);

    const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
        value: item._id,
        label: item.name,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating...");

        const academicDepartmentData = {
            name: data.name,
            academicFaculty: data.academicFaculty,
        };

        try {
            await addAcademicDepartment(academicDepartmentData);
            toast.success("Academic Department Created Successfully!", {
                id: toastId,
            });
        } catch (error) {
            toast.error("Something went wrong!", { id: toastId });
        }
    };

    return (
        <Flex justify="center" align="middle">
            <Col span={6}>
                <UMForm
                    onSubmit={onSubmit}
                    resolver={zodResolver(academicDepartmentSchema)}
                >
                    <UMInput label="Name" name="name" type="text" />
                    <UMSelect
                        label="Academic Faculty"
                        name="academicFaculty"
                        options={academicFacultyOptions!}
                    />

                    <Button htmlType="submit">Submit</Button>
                </UMForm>
            </Col>
        </Flex>
    );
};

export default CreateAcademicDepartment;
