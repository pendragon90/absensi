import React from "react";
import { Group, Container } from "@mantine/core";
import SideNavStudents from "../Components/SideNavStudents";
import SideNavTeachers from "../Components/SideNavTeachers";
import SideNavAdmin from "../Components/SideNavAdmin";

function DashboardLayout({ children,user }) {

    return (
        <>
            <Container size="responsive">

                {user.data.role == 'teacher' && (
                    <SideNavTeachers />
                 )} 
                 
                {user.data.role == 'admin' && (
                    <SideNavAdmin />
                 )} 

                {user.data.role == 'student' && (
                    <SideNavStudents />
                 )} 
                  
                <main className="lg:ml-64 lg:mt-16 mt-10">
                    {children}
                </main>

            </Container>
        </>
    );
}

export default DashboardLayout;
