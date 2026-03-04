import NavbarPublic from "@/components/NavbarPublic";
import FooterMega from "@/components/FooterMega";
import BrandProfileView from "@/components/profile/BrandProfileView";

export default function BrandPublicProfile({ params }: { params: { slug: string } }) {
  return (
    <>
      <NavbarPublic />
      <BrandProfileView slug={params.slug} />
      <FooterMega />
    </>
  );
}
