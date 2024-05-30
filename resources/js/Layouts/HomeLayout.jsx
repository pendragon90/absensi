import React from 'react'
import Header from './../Components/Header'
import { Container } from '@mantine/core'

function HomeLayout({ children, user }) {
  return (
    <>
      <Header user={user} />
      <Container size="responsive">
        <main className="pt-5">{children}</main>
      </Container>
    </>
  )
}

export default HomeLayout
