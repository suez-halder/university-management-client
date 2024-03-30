import { Button, Table, TableColumnsType } from "antd";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFaculty } from "../../../types/academicManagement.type";

export type TTableData = Pick<TAcademicFaculty, "name">;

const AcademicFaculty = () => {
    const {
        data: academicFacultyData,

        isFetching,
    } = useGetAllAcademicFacultiesQuery(undefined);

    const academicFacultyTableData = academicFacultyData?.data?.map(
        ({ _id, name }) => ({
            key: _id,
            name,
        })
    );

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Name",
            dataIndex: "name",
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
            dataSource={academicFacultyTableData}
        />
    );
};

export default AcademicFaculty;
