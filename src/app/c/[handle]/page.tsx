import NavbarApp from "@/components/NavbarApp";
import FooterMega from "@/components/FooterMega";
import CreatorProfileView from "@/components/profile/CreatorProfileView";

export default function CreatorPublicProfile({ params }: { params: { handle: string } }) {
  return (
    <>
      <NavbarApp />
      <CreatorProfileView handle={params.handle} />
      <FooterMega />
    </>
  );
}
