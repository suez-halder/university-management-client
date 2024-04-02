import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";

import {
    useGetAllRegisteredSemesterQuery,
    useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import { TResponse, TSemesterRegistration } from "../../../types";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";

export type TTableData = Pick<
    TSemesterRegistration,
    "academicSemester" | "status" | "startDate" | "endDate"
>;

const items = [
    {
        label: "UPCOMING",
        key: "UPCOMING",
    },
    {
        label: "ONGOING",
        key: "ONGOING",
    },
    {
        label: "ENDED",
        key: "ENDED",
    },
];

const RegisteredSemesters = () => {
    const [semesterId, setSemesterId] = useState("");

    const {
        data: registeredSemesterData,

        isFetching,
    } = useGetAllRegisteredSemesterQuery(undefined);

    const [updateSemesterStatus] = useUpdateRegisteredSemesterMutation();

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

    const handleStatusUpdate: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Updating status...");

        const updateData = {
            id: semesterId,
            data: {
                status: data.key,
            },
        };

        console.log(updateData);

        try {
            const res = (await updateSemesterStatus(
                updateData
            )) as TResponse<any>;
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success("Semester status changed successfully!", {
                    id: toastId,
                });
            }

            console.log(res);
        } catch (error) {
            toast.error("Something went wrong!", { id: toastId });
        }
    };

    const menuProps = {
        items,
        onClick: handleStatusUpdate,
    };

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
            render: (item) => {
                return (
                    <Dropdown menu={menuProps} trigger={["click"]}>
                        <Button onClick={() => setSemesterId(item.key)}>
                            Change Status
                        </Button>
                    </Dropdown>
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
