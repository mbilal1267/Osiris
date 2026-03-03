import CreatorProfileView from "@/components/profile/CreatorProfileView";

export default function BrandCreatorProfilePage({ params }: { params: { handle: string } }) {
  return <CreatorProfileView handle={params.handle} />;
}
