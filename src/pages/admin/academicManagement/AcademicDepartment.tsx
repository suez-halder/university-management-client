import { Button, Table, TableColumnsType } from "antd";
import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicDepartment } from "../../../types/academicManagement.type";

export type TTableData = Pick<TAcademicDepartment, "name" | "academicFaculty">;

const AcademicDepartment = () => {
    const { data: academicDepartmentData, isFetching } =
        useGetAllAcademicDepartmentsQuery(undefined);

    const academicDepartmentTableData = academicDepartmentData?.data?.map(
        ({ _id, name, academicFaculty }) => ({
            key: _id,
            name,
            academicFaculty: academicFaculty.name,
        })
    );

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Academic Faculty",
            dataIndex: "academicFaculty",
        },
        {
            title: "Action",
            key: "x",
            render: () => {
                return (
                    <div>
                        <Button>Update</Button>
                    </div>
                );
            },
        },
    ];

    return (
        <Table
            loading={isFetching}
            columns={columns}
            dataSource={academicDepartmentTableData}
        />
    );
};

export default AcademicDepartment;
