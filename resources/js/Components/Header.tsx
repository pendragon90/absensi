import React from 'react'
import { Button, Group } from '@mantine/core'
import classes from './css/Header.module.css'
import Profile from './Profile'
import { Link } from '@inertiajs/inertia-react'

export default function Header({ user }) {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          {user.data ? (
            <Profile user={user} />
          ) : (
            <Group>
              <Link href="/login">
                <Button variant="light">Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline">Register</Button>
              </Link>
            </Group>
          )}
        </Group>
      </div>
    </header>
  )
}
