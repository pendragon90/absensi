import React from "react";
import { Container } from "@mantine/core";
import SideNav from "../Components/SideNav";

function DashboardLayout({ children, user }) {
    return (
        <>
            <Container size="responsive">
                <SideNav user={user} />

                <main className="lg:ml-64 lg:mt-16 mt-10">{children}</main>
            </Container>
        </>
    );
}

export default DashboardLayout;
