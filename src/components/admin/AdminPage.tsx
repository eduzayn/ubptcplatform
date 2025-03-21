import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./Dashboard";
import MembersManagement from "./members/MembersManagement";
import ContentManagement from "./content/ContentManagement";
import CoursesManagement from "./courses/CoursesManagement";
import LibraryManagement from "./library/LibraryManagement";
import EventsManagement from "./events/EventsManagement";
import CredentialsManagement from "./credentials/CredentialsManagement";
import UsersManagement from "./users/UsersManagement";
import SettingsPage from "./settings/SettingsPage";

const AdminPage = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/members" element={<MembersManagement />} />
        <Route path="/content" element={<ContentManagement />} />
        <Route path="/courses" element={<CoursesManagement />} />
        <Route path="/library" element={<LibraryManagement />} />
        <Route path="/events" element={<EventsManagement />} />
        <Route path="/credentials" element={<CredentialsManagement />} />
        <Route path="/users" element={<UsersManagement />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminPage;
