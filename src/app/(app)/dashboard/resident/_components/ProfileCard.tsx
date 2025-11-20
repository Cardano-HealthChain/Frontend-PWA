import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Copy, Download } from "lucide-react";
import Link from "next/link";

export const ProfileCard = ({ user }: { user: any }) => {
    return (
        <Card className="bg-white py-6 px-6 max-w-xl flex flex-row items-center justify-evenly text-center border-none">
            <div className="rounded-full h-34 w-34 bg-primary/20 flex items-center justify-center">
                <User className="h-24 w-24 text-primary" />
            </div>
            {/* <div className="mx-6 h-16 w-px bg-muted-foreground/50" /> */}
            <div>
                <div>
                    <h2 className="mt-4 text-xl lg:text-2xl font-bold">{user.name}</h2>
                    <p className="text-xs lg:text-sm text-muted-foreground">{user.region}</p>
                </div>
                <div className="ml-6 flex w-full flex-col items-center">
                    <div className="mt-4 flex w-full justify-center space-x-2 text-xs lg:text-sm">
                        <span className="rounded-full bg-primary/20 px-3 py-2">{user.gender}</span>
                        <span className="rounded-full bg-primary/20 px-3 py-2">{user.dob}</span>
                        <span className="rounded-full bg-primary/20 px-3 py-2">{user.region.split(' / ')[1]}</span>
                    </div>

                    <div className="mt-6 flex w-ful flex-row gap-2">
                        <Button variant="outline" size="lg" className="w-1/2 text-xs h-8 border-primary text-primary">
                            <Copy className="mr-2 h-4 w-4 text-primary" /> Copy DID Code
                        </Button>
                        <Button variant="outline" size="lg" className="w-1/2 text-xs h-8 border-primary text-primary">
                            <Download className="mr-2 h-4 w-4 text-primary" /> Download DID File
                        </Button>
                    </div>
                </div>
            </div>

        </Card>
    );
};
