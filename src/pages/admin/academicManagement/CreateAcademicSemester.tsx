import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import UMForm from "../../../components/form/UMForm";
import UMSelect from "../../../components/form/UMSelect";

const CreateAcademicSemester = () => {
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };

    return (
        <Flex justify="center" align="middle">
            <Col span={6}>
                <UMForm onSubmit={onSubmit}>
                    <UMSelect label="Name" name="name" />
                    <Button htmlType="submit">Submit</Button>
                </UMForm>
            </Col>
        </Flex>
    );
};

export default CreateAcademicSemester;
