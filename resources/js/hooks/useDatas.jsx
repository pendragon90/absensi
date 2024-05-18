import axios from 'axios';
import { useState } from 'react';

const useDatas = () => {
    const [students, setStudents] = useState([]);
    
    const getStudentsByClassroom = async (slug) => {
        await axios
            .get(`/api/classrooms/${slug}/students`)
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                console.error("Error fetching students:", error);
            });
    };

    return {
        students,
        getStudentsByClassroom,
    }
}

export default useDatas