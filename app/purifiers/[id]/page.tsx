import { Purifier } from "@/types";
import Link from "next/link";
import { Metadata } from "next";

interface PageProps {
    params: {
        id: Promise<string>;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;

    try {
        const res = await fetch(`http://localhost:3001/api/purifiers?uid=${id}`);
        const purifiers = await res.json();

        if (!purifiers.length) {
            return {
                title: "Purifiers Not Found",
                description: "No purifier data found for the specified user.",
            };
        }

        return {
            title: `💧AquaSync | ${id}`,
            description: `View service and installation details for purifiers with #ID ${id}.`,
        };
    } catch (error) {
        console.error("Failed to fetch metadata:", error);
        return {
            title: "Error Loading Purifier",
            description: "An error occurred while loading purifier metadata.",
        };
    }
}

const PurifierPage = async ({ params }: PageProps) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:3001/api/purifiers?uid=${id}`, {
        cache: "no-store"
    });

    if (!res.ok) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] px-4">
                <div className="bg-background border border-muted rounded-2xl shadow-md p-8 max-w-md text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-3">No Purifier Found</h1>
                    <p className="text-muted-foreground mb-6">
                        It looks like you haven't registered a purifier yet. Register now to get started.
                    </p>
                    <Link
                        href="/purifiers/register"
                        className="inline-block px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-full transition-colors duration-200"
                    >
                        Register Your Purifier
                    </Link>
                </div>
            </div>

        );
    }
    const data: Purifier[] = await res.json();

    return (
        <div>
            <h1>Purifier Details for UID: {id}</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default PurifierPage;
