import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Courses from "../pages/admin/courseManagement/Courses";
import CreateCourse from "../pages/admin/courseManagement/CreateCourse";
import OfferCourse from "../pages/admin/courseManagement/OfferCourse";
import OfferedCourses from "../pages/admin/courseManagement/OfferedCourses";
import RegisteredSemesters from "../pages/admin/courseManagement/RegisteredSemesters";
import SemesterRegistration from "../pages/admin/courseManagement/SemesterRegistration";
import CreateAdmin from "../pages/admin/UserManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/UserManagement/CreateFaculty";
import CreateStudent from "../pages/admin/UserManagement/CreateStudent";
import StudentData from "../pages/admin/UserManagement/StudentData";
import StudentDetails from "../pages/admin/UserManagement/StudentDetails";

export const adminPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <AdminDashboard />,
    },
    {
        name: "Academic Management",
        children: [
            {
                name: "Create A. Semester",
                path: "create-academic-semester",
                element: <CreateAcademicSemester />,
            },
            {
                name: "Academic Semester",
                path: "academic-semester",
                element: <AcademicSemester />,
            },
            {
                name: "Create A. Faculty",
                path: "create-academic-faculty",
                element: <CreateAcademicFaculty />,
            },
            {
                name: "Academic Faculty",
                path: "academic-Faculty",
                element: <AcademicFaculty />,
            },
            {
                name: "Create A. Department",
                path: "create-academic-department",
                element: <CreateAcademicDepartment />,
            },
            {
                name: "Academic Department",
                path: "academic-department",
                element: <AcademicDepartment />,
            },
        ],
    },

    {
        name: "User Management",
        children: [
            {
                name: "Create Student",
                path: "create-student",
                element: <CreateStudent />,
            },

            {
                name: "All Students",
                path: "student-data",
                element: <StudentData />,
            },
            {
                path: "student-data/:studentId",
                element: <StudentDetails />,
            },

            {
                name: "Create Faculty",
                path: "create-faculty",
                element: <CreateFaculty />,
            },
            {
                name: "Create Admin",
                path: "create-admin",
                element: <CreateAdmin />,
            },
        ],
    },
    {
        name: "Course Management",
        children: [
            {
                name: "Semester Registration",
                path: "semester-registration",
                element: <SemesterRegistration />,
            },

            {
                name: "Registered Semesters",
                path: "registered-semesters",
                element: <RegisteredSemesters />,
            },

            {
                name: "Create Course",
                path: "create-course",
                element: <CreateCourse />,
            },
            {
                name: "Courses",
                path: "courses",
                element: <Courses />,
            },
            {
                name: "Offer Course",
                path: "offer-course",
                element: <OfferCourse />,
            },
            {
                name: "Offered Courses",
                path: "offered-courses",
                element: <OfferedCourses />,
            },
        ],
    },
];

//! Generating Routes

// export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
//     if (item.path && item.element) {
//         acc.push({
//             path: item.path,
//             element: item.element,
//         });
//     }

//     if (item.children) {
//         item.children.forEach((child) => {
//             acc.push({
//                 path: child.path,
//                 element: child.element,
//             });
//         });
//     }

//     return acc;
// }, []);

//! Generating Sidebar

// export const adminSidebarItems = adminPaths.reduce(
//     (acc: TSidebarItem[], item) => {
//         if (item.path && item.name) {
//             acc.push({
//                 key: item.name,
//                 label: (
//                     <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>
//                 ),
//             });
//         }

//         if (item.children) {
//             acc.push({
//                 key: item.name,
//                 label: item.name,
//                 children: item.children.map((child) => ({
//                     key: child.name,
//                     label: (
//                         <NavLink to={`/admin/${child.path}`}>
//                             {child.name}
//                         </NavLink>
//                     ),
//                 })),
//             });
//         }

//         return acc;
//     },
//     []
// );
