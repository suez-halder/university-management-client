import { useGetAllStudentQuery } from "../../../redux/features/admin/userManagement.api";
import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { TStudentData } from "../../../types/userManagement.type";
import { Link } from "react-router-dom";

export type TTableData = Pick<TStudentData, "fullName" | "id">;

const StudentData = () => {
    const { data: studentData, isFetching } = useGetAllStudentQuery(undefined);
    console.log(studentData);

    const studentTableData = studentData?.data?.map(
        ({ _id, fullName, id }) => ({
            key: _id,
            fullName,
            id,
        })
    );

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Full Name",
            dataIndex: "fullName",
        },
        {
            title: "Roll No.",
            dataIndex: "id",
        },

        {
            title: "Action",
            key: "x",
            render: (item) => {
                console.log(item);
                return (
                    <Space>
                        <Button>Update</Button>
                        <Link to={`/admin/student-data/${item.key}`}>
                            <Button>Details</Button>
                        </Link>
                        <Button>Block</Button>
                    </Space>
                );
            },
            width: "1%",
        },
    ];

    const onChange: TableProps<TTableData>["onChange"] = (
        _pagination,
        filters,
        _sorter,
        extra
    ) => {};

    return (
        <Table
            loading={isFetching}
            columns={columns}
            dataSource={studentTableData}
            onChange={onChange}
        />
    );
};

export default StudentData;
