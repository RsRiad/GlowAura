import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
  title: "GlowAura. - Admin",
  description: "GlowAura. - Admin",
};

export default function RootAdminLayout({ children }) {
  return (
    <AdminLayout>{children}</AdminLayout>
  );
}
