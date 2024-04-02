import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import UMForm from "../../../components/form/UMForm";
import UMSelect from "../../../components/form/UMSelect";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import UMDatePicker from "../../../components/form/UMDatePicker";
import UMInput from "../../../components/form/UMInput";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";
import { semesterStatusOptions } from "../../../constants/semester.constant";

const CreateCourse = () => {
    const { data: academicSemester } = useGetAllSemestersQuery([
        {
            name: "sort",
            value: "year",
        },
    ]);

    const [addSemesterRegistration] = useAddSemesterRegistrationMutation();

    const academicSemesterOptions = academicSemester?.data?.map((item) => ({
        value: item._id,
        label: `${item.name} ${item.year}`,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Semester registering...");

        const semesterRegistrationData = {
            ...data,
            minCredit: Number(data.minCredit),
            maxCredit: Number(data.maxCredit),
        };

        console.log(semesterRegistrationData);

        try {
            const res = (await addSemesterRegistration(
                semesterRegistrationData
            )) as TResponse<any>;
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success("Semester registered successfully!", {
                    id: toastId,
                });
            }

            console.log(res);
        } catch (error) {
            toast.error("Something went wrong!", { id: toastId });
        }
    };

    return (
        <Flex justify="center" align="middle">
            <Col span={6}>
                <UMForm
                    onSubmit={onSubmit}
                    // resolver={zodResolver(semesterRegistrationSchema)}
                >
                    <UMInput label="Title" name="title" type="text" />
                    <UMInput label="Prefix" name="prefix" type="text" />
                    <UMInput label="Code" name="code" type="text" />
                    <UMInput label="Credits" name="credits" type="text" />

                    <Button htmlType="submit">Submit</Button>
                </UMForm>
            </Col>
        </Flex>
    );
};

export default CreateCourse;
