import CreatorProfileView from "@/components/profile/CreatorProfileView";

type PublicProfileViewProps = {
  handle: string;
  inviteHref?: string;
};

export default function PublicProfileView({ handle, inviteHref = "/auth" }: PublicProfileViewProps) {
  return <CreatorProfileView handle={handle} inviteHref={inviteHref} />;
}
