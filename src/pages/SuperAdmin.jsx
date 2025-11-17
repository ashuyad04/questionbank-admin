import React from "react";
import Layout from "../components/Layout";
import { Outlet } from "react-router-dom";

export default function SuperAdmin() {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Super Admin Panel</h1>
        <p className="text-muted-foreground">
          Use the navigation on the left to manage admins and site data.
        </p>
        <div>
          <Outlet />
        </div>
      </div>
    </Layout>
  );
}
