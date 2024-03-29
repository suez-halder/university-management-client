import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const AcademicSemester = () => {
    const { data: semesterData } = useGetAllSemestersQuery(undefined);

    const semesterTableData = semesterData?.data!.map(
        ({ _id, name, startMonth, endMonth, year }) => ({
            _id,
            name,
            year,
            startMonth,
            endMonth,
        })
    );

    const columns: TableColumnsType<DataType> = [
        {
            title: "Name",
            dataIndex: "name",
            filters: [
                {
                    text: "Name",
                    value: "name",
                },
                {
                    text: "Year",
                    value: "year",
                },
            ],
        },
        {
            title: "Year",
            dataIndex: "year",
        },
        {
            title: "Start Month",
            dataIndex: "startMonth",
        },
        {
            title: "End Month",
            dataIndex: "endMonth",
        },
    ];

    const onChange: TableProps<DataType>["onChange"] = (
        pagination,
        filters,
        sorter,
        extra
    ) => {
        console.log(filters);
    };

    return (
        <Table
            columns={columns}
            dataSource={semesterTableData}
            onChange={onChange}
        />
    );
};

export default AcademicSemester;
