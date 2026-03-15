import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
  title: "GlowAura. - Store Dashboard",
  description: "GlowAura. - Store Dashboard",
};

export default function RootAdminLayout({ children }) {
  return (
    <>
      <StoreLayout>{children}</StoreLayout>
    </>
  );
}
