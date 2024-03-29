import { Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester } from "../../../types/academicManagement.type";

export type TTableData = Pick<
    TAcademicSemester,
    "name" | "year" | "startMonth" | "endMonth"
>;

const AcademicSemester = () => {
    const [params, setParams] = useState([]);

    const { data: semesterData } = useGetAllSemestersQuery(params);

    const semesterTableData = semesterData?.data?.map(
        ({ _id, name, startMonth, endMonth, year }) => ({
            key: _id,
            name,
            year,
            startMonth,
            endMonth,
        })
    );

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Name",
            dataIndex: "name",
            filters: [
                {
                    text: "Autumn",
                    value: "Autumn",
                },
                {
                    text: "Summer",
                    value: "Summer",
                },
                {
                    text: "Fall",
                    value: "Fall",
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

    const onChange: TableProps<TTableData>["onChange"] = (
        pagination,
        filters,
        sorter,
        extra
    ) => {
        if (extra.action === "filter") {
            const queryParams = [];

            filters.name?.forEach((item) =>
                queryParams.push({ name: "name", value: item })
            );

            setParams(queryParams);
        }
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
