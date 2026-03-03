import BrandProfileView from "@/components/profile/BrandProfileView";

export default function BrandPublicProfilePreviewPage({ params }: { params: { slug: string } }) {
  return <BrandProfileView slug={params.slug} />;
}
