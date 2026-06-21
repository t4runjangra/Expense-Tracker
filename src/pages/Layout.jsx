import React from 'react'
import Sidebar from '../components/SIdebar'
import Header from '../components/Header'
function Layout({children}) {
    return (
        <>
            <div className="flex h-screen ">
                <Sidebar />

                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </>
    )
}

export default Layout
