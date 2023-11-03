import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import { Contact } from '../pages/Contact';
import { Dashboard } from '../pages/Dashboard';
import { Home } from '../pages/Home';
import { Detail } from '../pages/Home/components/Detail';
import { StaffUpdate } from '../pages/Dashboard/components/StaffUpdate';
import { StaffAdd } from '../pages/Dashboard/components/StaffAdd';

export const AppRouting = () => {
    return (
        <Routes>
            <Route path='/' element={<AppLayout />}>
                <Route path='' element={<Home />} />
                <Route path='/detail/:staffId' element={<Detail />} />
                <Route path='/update/:staffId' element={<StaffUpdate />} />
                <Route path='/add' element={<StaffAdd />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/contact' element={<Contact />} />
            </Route>
            {/* <Route path='*' element={<Error />} /> */}
        </Routes>
    );
};