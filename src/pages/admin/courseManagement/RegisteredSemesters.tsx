import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";

import { useGetAllRegisteredSemesterQuery } from "../../../redux/features/admin/courseManagement.api";
import { TSemesterRegistration } from "../../../types";
import { format } from "date-fns";

export type TTableData = Pick<
    TSemesterRegistration,
    "academicSemester" | "status" | "startDate" | "endDate"
>;

const RegisteredSemesters = () => {
    const {
        data: registeredSemesterData,

        isFetching,
    } = useGetAllRegisteredSemesterQuery(undefined);

    const registeredSemesterTableData = registeredSemesterData?.data?.map(
        ({ _id, academicSemester, status, startDate, endDate }) => ({
            key: _id,
            name: `${academicSemester.name} ${academicSemester.year}`,
            status,
            // startDate: moment(new Date(startDate)).format("Do,MMM,YYYY"),
            // endDate: moment(new Date(endDate)).format("Do,MMM,YYYY"),
            startDate: format(new Date(startDate), "do MMM, yyyy"),
            endDate: format(new Date(endDate), "do MMM, yyyy"),
        })
    );

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Academic Semester",
            dataIndex: "name",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (item) => {
                let color;
                if (item === "UPCOMING") {
                    color = "blue";
                }
                if (item === "ONGOING") {
                    color = "green";
                }
                if (item === "ENDED") {
                    color = "red";
                }

                return <Tag color={color}>{item}</Tag>;
            },
        },
        {
            title: "Start Date",
            dataIndex: "startDate",
        },
        {
            title: "End Date",
            dataIndex: "endDate",
        },
        {
            title: "Action",
            key: "x",
            render: () => {
                return (
                    <div>
                        <Dropdown>Change Status</Dropdown>
                    </div>
                );
            },
        },
    ];

    // const onChange: TableProps<TTableData>["onChange"] = (
    //     _pagination,
    //     filters,
    //     _sorter,
    //     extra
    // ) => {
    //     if (extra.action === "filter") {
    //         const queryParams: TQueryParam[] = [];

    //         filters.name?.forEach((item) =>
    //             queryParams.push({ name: "name", value: item })
    //         );
    //         filters.year?.forEach((item) =>
    //             queryParams.push({ name: "year", value: item })
    //         );

    //         setParams(queryParams);
    //     }
    // };

    return (
        <Table
            loading={isFetching}
            columns={columns}
            dataSource={registeredSemesterTableData}
            // onChange={onChange}
        />
    );
};

export default RegisteredSemesters;
