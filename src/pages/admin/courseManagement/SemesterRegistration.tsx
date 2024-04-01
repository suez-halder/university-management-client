import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import UMForm from "../../../components/form/UMForm";
import UMSelect from "../../../components/form/UMSelect";
import { semesterStatusOptions } from "../../../constants/global.constant";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import UMDatePicker from "../../../components/form/UMDatePicker";
import UMInput from "../../../components/form/UMInput";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";

const SemesterRegistration = () => {
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
                    <UMSelect
                        label="Academic Semester"
                        name="academicSemester"
                        options={academicSemesterOptions}
                    />
                    <UMSelect
                        label="Status"
                        name="status"
                        options={semesterStatusOptions}
                    />
                    <UMDatePicker label="Start Date" name="startDate" />
                    <UMDatePicker label="End Date" name="endDate" />
                    <UMInput
                        label="Min Credit"
                        name="minCredit"
                        type="number"
                    />
                    <UMInput
                        label="Max Credit"
                        name="maxCredit"
                        type="number"
                    />

                    <Button htmlType="submit">Submit</Button>
                </UMForm>
            </Col>
        </Flex>
    );
};

export default SemesterRegistration;
