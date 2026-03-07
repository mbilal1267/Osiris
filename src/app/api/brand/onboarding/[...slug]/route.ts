import { NextRequest } from "next/server";
import { fetchBackend } from "@/app/api/utils/fetchBackend";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
    const resolvedParams = await params;
    const slugPath = resolvedParams.slug.join("/");
    return fetchBackend(req, `/brand/onboarding/${slugPath}`, "GET");
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
    const resolvedParams = await params;
    const slugPath = resolvedParams.slug.join("/");
    return fetchBackend(req, `/brand/onboarding/${slugPath}`, "POST");
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
    const resolvedParams = await params;
    const slugPath = resolvedParams.slug.join("/");
    return fetchBackend(req, `/brand/onboarding/${slugPath}`, "PUT");
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
    const resolvedParams = await params;
    const slugPath = resolvedParams.slug.join("/");
    return fetchBackend(req, `/brand/onboarding/${slugPath}`, "DELETE");
}
