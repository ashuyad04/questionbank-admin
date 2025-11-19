import Layout from "../components/Layout";

export default function SuperAdmin() {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Super Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage admin access requests below.
        </p>
      </div>
    </Layout>
  );
}