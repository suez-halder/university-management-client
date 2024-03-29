import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import UMForm from "../../../components/form/UMForm";
import UMSelect from "../../../components/form/UMSelect";
import { monthOptions } from "../../../constants/global.constant";
import { semesterOptions } from "../../../constants/semester.constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const currentYear = new Date().getFullYear();

const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
}));

console.log(yearOptions);

const CreateAcademicSemester = () => {
    const [addAcademicSemester] = useAddAcademicSemesterMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Semester creating...");

        const name = semesterOptions[Number(data.name) - 1]?.label;

        const semesterData = {
            name,
            code: data.name,
            year: data.year,
            startMonth: data.startMonth,
            endMonth: data.endMonth,
        };

        try {
            const res = (await addAcademicSemester(semesterData)) as TResponse;
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success("Semester created successfully!", {
                    id: toastId,
                });
            }
        } catch (error) {
            toast.error("Something went wrong!", { id: toastId });
        }
    };

    return (
        <Flex justify="center" align="middle">
            <Col span={6}>
                <UMForm
                    onSubmit={onSubmit}
                    resolver={zodResolver(academicSemesterSchema)}
                >
                    <UMSelect
                        label="Name"
                        name="name"
                        options={semesterOptions}
                    />
                    <UMSelect label="Year" name="year" options={yearOptions} />
                    <UMSelect
                        label="Start Month"
                        name="startMonth"
                        options={monthOptions}
                    />
                    <UMSelect
                        label="End Month"
                        name="endMonth"
                        options={monthOptions}
                    />
                    <Button htmlType="submit">Submit</Button>
                </UMForm>
            </Col>
        </Flex>
    );
};

export default CreateAcademicSemester;
