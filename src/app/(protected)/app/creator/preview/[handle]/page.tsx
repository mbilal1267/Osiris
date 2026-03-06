import CreatorProfileView from "@/components/profile/CreatorProfileView";

export default function CreatorPublicProfilePreview({ params }: { params: { handle: string } }) {
  return <CreatorProfileView handle={params.handle} isPreview />;
}
