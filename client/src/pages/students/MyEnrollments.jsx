import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/students/Footer.jsx";
// import Footer from "../../components/student/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { data } from "react-router-dom";



const MyEnrollMents = () => {
    const {
        navigate,
        enrolledCourses,
        calculateCourseDuration,
        userData,
        fetchUserEnrolledCourses,
        backendUrl,
        getToken,
        calculateNoOfLectures,
    } = useContext(AppContext);

    const [progressArray, setProgressArray] = useState([]);

    const getCourseProgress = async () => {
        try {
            const token = await getToken();

            const tempProgressArray = await Promise.all(
                enrolledCourses.map(async (course) => {
                    const { data } = await axios.post(
                        `${backendUrl}/api/user/get-course-progress`,
                        { courseId: course._id },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    console.log("dta", data.progressData);


                    let totalLectures = calculateNoOfLectures(course);

                    const lectureCompleted = data.progressData
                        ? data.progressData.lectureCompleted.length
                        : 0;
                    return { totalLectures, lectureCompleted };
                })
            );

            setProgressArray(tempProgressArray);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (userData) {
            fetchUserEnrolledCourses();
        }
    }, [userData])

    useEffect(() => {
        if (enrolledCourses.length > 0) {
            getCourseProgress();
        }
    }, [enrolledCourses])

    return (
        <>

            <div className="md:px-36 px-8 pt-10">
                <h1 className="text-2xl font-semibold">My EnrollMents</h1>
                <table className="md:table-auto table-fixed w-full overflow-hidden border mt-10">
                    <thead className="text-gray-900 border-b border-gray-500/20  text-sm text-left max-sm:hidden">
                        <tr>
                            <th className="px-4 py-3 font-semibold truncate">Course</th>
                            <th className="px-4 py-3 font-semibold truncate">Duration</th>
                            <th className="px-4 py-3 font-semibold truncate">Completed</th>
                            <th className="px-4 py-3 font-semibold truncate">Status</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-700">
                        {enrolledCourses.map((course, index) => (
                            <tr className="border-b border-gray-500/20" key={index}>
                                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 ">
                                    <img
                                        className="w-14 sm:w-24 md:w-28 cursor-pointer"
                                        onClick={() => navigate("/player/" + course._id)}
                                        src={course.courseThumbnail}
                                        alt="courseThumbnail"
                                    />
                                    <div className="flex-1 cursor-pointer" onClick={() => navigate("/player/" + course._id)}>
                                        <p className="mb-1 max-sm:text-sm">{course.courseTitle}</p>
                                        <Line
                                            strokeWidth={2}
                                            percent={
                                                progressArray[index]
                                                    ? (progressArray[index].lectureCompleted * 100) /
                                                    progressArray[index].totalLectures
                                                    : 0
                                            }
                                            className="bg-gray-300 rounded-full"
                                        />
                                    </div>
                                </td>
                                <td className="px-4 py-3 max-sm:hidden">
                                    {calculateCourseDuration(course)}
                                </td>
                                <td className="px-4 py-3 max-sm:hidden">
                                    {progressArray[index] &&
                                        `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures} `}{" "}
                                    <span>Lectures</span>
                                </td>
                                <td className="px-3 py-3 max-sm:text-right">
                                    <button
                                        className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white"
                                        onClick={() => navigate("/player/" + course._id)}
                                    >
                                        {progressArray[index] &&
                                            progressArray[index].lectureCompleted /
                                            progressArray[index].totalLectures ===
                                            1
                                            ? "Completed"
                                            : "On Going"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
};

export default MyEnrollMents;


// import React, { useContext, useState } from 'react'
// import { AppContext } from '../../context/AppContext';
// import { Line } from 'rc-progress';
// import Footer from '../../components/students/Footer.jsx'


// const MyEnrollments = () => {

//     const { enrolledCourses, calculateCourseDuration, navigate } = useContext(AppContext);

//     const [prograssArray, setPrograssArray] = useState([
//         { lectureCompleted: 2, totalLectures: 4 },
//         { lectureCompleted: 1, totalLectures: 5 },
//         { lectureCompleted: 3, totalLectures: 6 },
//         { lectureCompleted: 4, totalLectures: 4 },
//         { lectureCompleted: 0, totalLectures: 3 },
//         { lectureCompleted: 5, totalLectures: 7 },
//         { lectureCompleted: 6, totalLectures: 8 },
//         { lectureCompleted: 2, totalLectures: 6 },
//         { lectureCompleted: 4, totalLectures: 10 },
//         { lectureCompleted: 3, totalLectures: 5 },
//         { lectureCompleted: 7, totalLectures: 7 },
//         { lectureCompleted: 1, totalLectures: 4 },
//         { lectureCompleted: 0, totalLectures: 2 },
//         { lectureCompleted: 5, totalLectures: 5 }
//     ]);

//     return (
//         <>
//             <div className='md:px-36 px-8 pt-10'>
//                 <h1 className='text-2xl font-semibold'>My Enrollments</h1>
//                 <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
//                     <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
//                         <tr>
//                             <th className='px-4 py-3 font-semibold translate'>Course</th>
//                             <th className='px-4 py-3 font-semibold translate'>Duration</th>
//                             <th className='px-4 py-3 font-semibold translate'>Completed</th>
//                             <th className='px-4 py-3 font-semibold translate'>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody className='text-gray-700'>
//                         {enrolledCourses.map((course, index) => (
//                             <tr key={index} className='border-b border-gray-500/20'>
//                                 <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
//                                     <img src={course.courseThumbnail} alt='w-14 sm:w-24 md:-28' className='w-14 sm:w-24' />
//                                     <div className='flex-1'>
//                                         <p className='mb-1 max-sm:text-sm'>{course.courseTitle} </p>
//                                         <Line strokeWidth={2} percent={prograssArray[index] ?
//                                             (prograssArray[index].lectureCompleted * 100) / prograssArray[index].totalLectures : 0}
//                                             className='bg-gray-300 rounded-full' />
//                                     </div>
//                                 </td>
//                                 <td className='px py max-sm:hidden'>
//                                     {calculateCourseDuration(course)}
//                                 </td>
//                                 <td className='px-4 py-3 max-sm:hidden'>
//                                     {prograssArray[index] && `${prograssArray[index].lectureCompleted} / ${prograssArray[index].totalLectures}`} <span>Letures</span>
//                                 </td>
//                                 <td className='px-4 py-3 max-sm:text-right'>
//                                     <button
//                                         onClick={() => navigate('/player/' + course._id)}
//                                         className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white'>
//                                         {prograssArray[index] && prograssArray[index].lectureCompleted / prograssArray[index].totalLectures === 1 ? 'Completed' : ' On Going'}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <Footer />
//         </>
//     )
// }

// export default MyEnrollments;