import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";

const CreateAcademicFaculty = () => {
    const [addAcademicFaculty] = useAddAcademicFacultyMutation();
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating...");
        const academicFacultyData = {
            name: data.name,
        };

        try {
            await addAcademicFaculty(academicFacultyData);
            toast.success("Academic faculty created successfully!", {
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
                    resolver={zodResolver(academicFacultySchema)}
                >
                    <UMInput label="Name" name="name" type="text" />

                    <Button htmlType="submit">Submit</Button>
                </UMForm>
            </Col>
        </Flex>
    );
};

export default CreateAcademicFaculty;
